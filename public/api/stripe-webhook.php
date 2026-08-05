<?php
// =============================================================
// public/api/stripe-webhook.php — Webhook Handler para Stripe
// Escucha y procesa eventos de Stripe de forma segura en el servidor.
// Guarda la transacción en la base de datos MySQL de Hostinger o en CSV local.
// =============================================================

header("Content-Type: application/json; charset=utf-8");

// Cargar variables de entorno locales si existen
function loadEnv($path) {
    if (!file_exists($path)) return;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
            putenv(sprintf('%s=%s', $name, $value));
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}
loadEnv(__DIR__ . '/../../.env');

// Configuración de base de datos MySQL (valores por defecto de Hostinger)
$dbHost = getenv("DB_HOST") ?: "localhost";
$dbUser = getenv("DB_USER") ?: "u115767692_rua";
$dbPass = getenv("DB_PASS") ?: "exhsbcmvsJ87e/$";
$dbName = getenv("DB_NAME") ?: "u115767692_ipiddsolutions";

$webhookSecret = getenv("STRIPE_WEBHOOK_SECRET") ?: (isset($_ENV["STRIPE_WEBHOOK_SECRET"]) ? $_ENV["STRIPE_WEBHOOK_SECRET"] : null);
$stripeSecret = getenv("STRIPE_SECRET_KEY") ?: (isset($_ENV["STRIPE_SECRET_KEY"]) ? $_ENV["STRIPE_SECRET_KEY"] : null);

// 1. Obtener payload crudo
$payload = file_get_contents("php://input");
$sigHeader = $_SERVER["HTTP_STRIPE_SIGNATURE"] ?? "";

if (!$payload || !$sigHeader) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Payload o firma faltantes"]);
    exit;
}

// 2. Verificar firma de Stripe
$isValid = false;

if ($webhookSecret) {
    $parts = explode(",", $sigHeader);
    $timestamp = null;
    $signatures = [];
    foreach ($parts as $part) {
        $kv = explode("=", $part, 2);
        if (count($kv) === 2) {
            $k = trim($kv[0]);
            $v = trim($kv[1]);
            if ($k === "t") $timestamp = $v;
            if ($k === "v1") $signatures[] = $v;
        }
    }

    if ($timestamp && !empty($signatures)) {
        if (abs(time() - intval($timestamp)) < 300) {
            $signedPayload = $timestamp . "." . $payload;
            foreach ($signatures as $sig) {
                $computed = hash_hmac("sha256", $signedPayload, $webhookSecret);
                if (hash_equals($computed, $sig)) {
                    $isValid = true;
                    break;
                }
            }
        }
    }
} else {
    // Si no está configurada la firma de webhook en producción, permitimos el paso temporalmente
    $isValid = true;
    error_log("[Webhook] Advertencia: STRIPE_WEBHOOK_SECRET no configurada. Saltando verificación de firma.");
}

if (!$isValid) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Firma de webhook inválida"]);
    exit;
}

// 3. Procesar evento
$event = json_decode($payload, true);
$eventType = $event["type"] ?? "";

error_log("[Webhook] Recibido evento de Stripe: " . $eventType);

if ($eventType === "checkout.session.completed") {
    $session = $event["data"]["object"] ?? [];
    
    // Obtener datos críticos
    $email = $session["customer_details"]["email"] ?? $session["customer_email"] ?? $session["metadata"]["email"] ?? null;
    $itemId = $session["client_reference_id"] ?? $session["metadata"]["itemId"] ?? null;
    $sessionId = $session["id"] ?? "";
    $amount = $session["amount_total"] ?? 0;
    $currency = $session["currency"] ?? "usd";

    if (!$email || !$itemId) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Datos de sesión incompletos (email o itemId faltantes)"]);
        exit;
    }

    $dbSaved = false;

    // 4. Intentar guardar en MySQL
    try {
        $conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
        if (!$conn->connect_error) {
            $conn->set_charset("utf8mb4");

            // Crear la tabla si no existe de forma automática
            $table_query = "CREATE TABLE IF NOT EXISTS purchases (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                item_id VARCHAR(255) NOT NULL,
                stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
                amount INT NOT NULL,
                currency VARCHAR(10) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
            $conn->query($table_query);

            // Insertar registro
            $stmt = $conn->prepare("INSERT INTO purchases (email, item_id, stripe_session_id, amount, currency) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id");
            $emailLower = strtolower($email);
            $stmt->bind_param("sssis", $emailLower, $itemId, $sessionId, $amount, $currency);
            
            if ($stmt->execute()) {
                $dbSaved = true;
                error_log("[Webhook] Compra registrada con éxito en MySQL para: " . $emailLower);
            }
            $stmt->close();
            $conn->close();
        }
    } catch (Exception $e) {
        error_log("[Webhook] Falló guardado en MySQL: " . $e->getMessage());
    }

    // 5. Plan B: Si falla la base de datos, guardar en archivo CSV local
    if (!$dbSaved) {
        $csv_file = __DIR__ . '/purchases.csv';
        $is_new = !file_exists($csv_file);
        
        $file = fopen($csv_file, 'a');
        if ($file) {
            if ($is_new) {
                // UTF-8 BOM para Excel
                fputs($file, chr(0xEF) . chr(0xBB) . chr(0xBF));
                fputcsv($file, ['Fecha', 'Email', 'ItemId', 'StripeSessionId', 'Amount', 'Currency']);
            }
            $date = date('Y-m-d H:i:s');
            fputcsv($file, [$date, strtolower($email), $itemId, $sessionId, $amount, $currency]);
            fclose($file);
            error_log("[Webhook] Compra registrada localmente en purchases.csv para: " . $email);
        } else {
            error_log("[Webhook] Error crítico: No se pudo escribir en base de datos ni en archivo CSV local.");
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error del servidor al registrar compra"]);
            exit;
        }
    }
}

http_response_code(200);
echo json_encode(["status" => "success"]);
?>
