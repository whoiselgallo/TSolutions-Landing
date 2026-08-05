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

    // Facturación Fiscal Automática con Facturapi
    $wantsInvoice = $session["metadata"]["wants_invoice"] ?? "false";
    $invoiceId = null;
    $invoicePdf = null;
    $invoiceXml = null;

    if ($wantsInvoice === "true") {
        $facturapiApiKey = getenv("FACTURAPI_API_KEY") ?: (isset($_ENV["FACTURAPI_API_KEY"]) ? $_ENV["FACTURAPI_API_KEY"] : null);
        if ($facturapiApiKey) {
            $rfc = $session["metadata"]["rfc"] ?? "";
            $razonSocial = $session["metadata"]["razon_social"] ?? "";
            $regimenFiscal = $session["metadata"]["regimen_fiscal"] ?? "";
            $postalCode = $session["metadata"]["postal_code"] ?? "";
            $usoCfdi = $session["metadata"]["uso_cfdi"] ?? "G03";

            $satKeys = [
                "logo_express" => "82141502",
                "manifiesto" => "82141502",
                "pitch" => "82141502",
                "voice" => "82141502",
                "brandbook" => "82141502",
                "complete_bundle" => "82141502",
                "ia_estandar" => "81111508",
                "ia_premium" => "81111508",
                "web_estatico" => "81111802",
                "ecommerce" => "81111802",
                "integracion_logistica" => "81111802",
                "produccion_podcast" => "82131603",
                "produccion_video" => "82131603",
                "consultoria_1on1" => "80141600",
                "membership" => "80141600"
            ];
            $productNames = [
                "logo_express" => "Creador Express de Logotipo",
                "manifiesto" => "Manifiesto de Marca (Pilar 1)",
                "pitch" => "Elevator Pitch Estratégico (Pilar 2)",
                "voice" => "Identidad de Voz y Tono (Pilar 3)",
                "brandbook" => "Brandbook de Identidad (Pilar 4)",
                "complete_bundle" => "Brand Pack Completo (Acceso Total)",
                "ia_estandar" => "IA Personalizada para tu negocio (Licencia Estándar)",
                "ia_premium" => "IA Personalizada para tu negocio (Licencia Premium)",
                "web_estatico" => "Desarrollo de Sitio Web Estático / Landing Page",
                "ecommerce" => "Ecommerce Completo / Menú Digital",
                "integracion_logistica" => "Integración de Pasarela de Pagos & Logística",
                "produccion_podcast" => "Producción de Podcast Profesional",
                "produccion_video" => "Producción de Videos de Marca / Promocionales",
                "consultoria_1on1" => "Consultoría Estratégica 1-on-1",
                "membership" => "Membresía Mensual Pro TSolutions"
            ];

            $satProductKey = $satKeys[$itemId] ?? "82141502";
            $productDesc = $productNames[$itemId] ?? "Servicio TSolutions";

            $totalPrice = $amount / 100;
            $basePrice = $totalPrice / 1.16;

            $invoiceData = [
                "customer" => [
                    "legal_name" => $razonSocial,
                    "tax_id" => $rfc,
                    "tax_system" => $regimenFiscal,
                    "email" => $email,
                    "address" => [
                        "zip" => $postalCode
                    ]
                ],
                "items" => [
                    [
                        "quantity" => 1,
                        "product" => [
                            "description" => $productDesc,
                            "product_key" => $satProductKey,
                            "price" => $basePrice,
                            "taxes" => [
                                [
                                    "rate" => 0.16,
                                    "type" => "IVA"
                                ]
                            ],
                            "unit_key" => "ACT"
                        ]
                    ]
                ],
                "payment_form" => "04", // Tarjeta de Crédito (default seguro)
                "use" => $usoCfdi
            ];

            $chFact = curl_init();
            curl_setopt($chFact, CURLOPT_URL, "https://api.facturapi.io/v1/invoices");
            curl_setopt($chFact, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($chFact, CURLOPT_POST, true);
            curl_setopt($chFact, CURLOPT_USERPWD, $facturapiApiKey . ":");
            curl_setopt($chFact, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
            curl_setopt($chFact, CURLOPT_POSTFIELDS, json_encode($invoiceData));

            $factResponse = curl_exec($chFact);
            $factHttpCode = curl_getinfo($chFact, CURLINFO_HTTP_CODE);
            curl_close($chFact);

            if ($factHttpCode === 201 || $factHttpCode === 200) {
                $invoiceObj = json_decode($factResponse, true);
                $invoiceId = $invoiceObj["id"] ?? null;
                $invoicePdf = "https://api.facturapi.io/v1/invoices/" . $invoiceId . "/pdf";
                $invoiceXml = "https://api.facturapi.io/v1/invoices/" . $invoiceId . "/xml";
                error_log("[Webhook] Factura CFDI 4.0 creada en Facturapi con ID: " . $invoiceId);
            } else {
                error_log("[Webhook] Error en Facturapi (Código: " . $factHttpCode . "): " . $factResponse);
            }
        } else {
            error_log("[Webhook] Advertencia: FACTURAPI_API_KEY no configurada. No se emitió factura.");
        }
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
                wants_invoice VARCHAR(10) DEFAULT 'false',
                invoice_id VARCHAR(255) DEFAULT NULL,
                invoice_pdf VARCHAR(1000) DEFAULT NULL,
                invoice_xml VARCHAR(1000) DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
            $conn->query($table_query);

            // Agregar columnas si la tabla ya existía sin ellas
            try { $conn->query("ALTER TABLE purchases ADD COLUMN wants_invoice VARCHAR(10) DEFAULT 'false'"); } catch(Exception $e){}
            try { $conn->query("ALTER TABLE purchases ADD COLUMN invoice_id VARCHAR(255) DEFAULT NULL"); } catch(Exception $e){}
            try { $conn->query("ALTER TABLE purchases ADD COLUMN invoice_pdf VARCHAR(1000) DEFAULT NULL"); } catch(Exception $e){}
            try { $conn->query("ALTER TABLE purchases ADD COLUMN invoice_xml VARCHAR(1000) DEFAULT NULL"); } catch(Exception $e){}

            // Insertar registro
            $stmt = $conn->prepare("INSERT INTO purchases (email, item_id, stripe_session_id, amount, currency, wants_invoice, invoice_id, invoice_pdf, invoice_xml) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id");
            $emailLower = strtolower($email);
            $stmt->bind_param("sssisssss", $emailLower, $itemId, $sessionId, $amount, $currency, $wantsInvoice, $invoiceId, $invoicePdf, $invoiceXml);
            
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
                fputcsv($file, ['Fecha', 'Email', 'ItemId', 'StripeSessionId', 'Amount', 'Currency', 'WantsInvoice', 'InvoiceId', 'InvoicePdf', 'InvoiceXml']);
            }
            $date = date('Y-m-d H:i:s');
            fputcsv($file, [$date, strtolower($email), $itemId, $sessionId, $amount, $currency, $wantsInvoice, $invoiceId, $invoicePdf, $invoiceXml]);
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
