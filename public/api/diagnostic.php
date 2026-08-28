<?php
// ============================================================
// TSolutions IPIDD — Backend de Diagnóstico Digital (PHP)
// Guarda evaluaciones en MySQL de Hostinger y envía email a contacto@tsolutionsipidd.com
// ============================================================

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit;
}

// ------------------------------------------------------------
// ⚙️ CONFIGURACIÓN DE BASE DE DATOS (HOSTINGER)
// ------------------------------------------------------------
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_USER', getenv('DB_USER') ?: 'u115767692_rua');
define('DB_PASS', getenv('DB_PASS') ?: 'exhsbcmvsJ87e/$');
define('DB_NAME', getenv('DB_NAME') ?: 'u115767692_ipiddsolutions');

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$phone = isset($input['phone']) ? trim($input['phone']) : '';
$businessName = isset($input['businessName']) ? trim($input['businessName']) : '';
$industry = isset($input['industry']) ? trim($input['industry']) : '';
$selectedPkg = isset($input['selectedPkg']) ? trim($input['selectedPkg']) : '';
$evaluation = isset($input['evaluation']) ? json_encode($input['evaluation'], JSON_UNESCAPED_UNICODE) : '{}';

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Nombre y correo son obligatorios"]);
    exit;
}

// 1. Guardar en Base de Datos MySQL
$db_saved = false;
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if (!$conn->connect_error) {
        $conn->set_charset("utf8mb4");

        // Crear la tabla de diagnósticos si no existe
        $table_query = "CREATE TABLE IF NOT EXISTS diagnostic_evaluations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(100) DEFAULT '',
            business_name VARCHAR(255) DEFAULT '',
            industry VARCHAR(150) DEFAULT '',
            selected_pkg VARCHAR(255) DEFAULT '',
            evaluation_data LONGTEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
        $conn->query($table_query);

        $stmt = $conn->prepare("INSERT INTO diagnostic_evaluations (name, email, phone, business_name, industry, selected_pkg, evaluation_data) VALUES (?, ?, ?, ?, ?, ?, ?)");
        if ($stmt) {
            $stmt->bind_param("sssssss", $name, $email, $phone, $businessName, $industry, $selectedPkg, $evaluation);
            if ($stmt->execute()) {
                $db_saved = true;
            }
            $stmt->close();
        }
        $conn->close();
    }
} catch (Exception $e) {
    // Continuar a respaldo
}

// 2. Respaldo en Archivo CSV de Diagnósticos
$csv_file = __DIR__ . '/diagnostics.csv';
$is_new = !file_exists($csv_file);
$file = fopen($csv_file, 'a');
if ($file) {
    if ($is_new) {
        fputs($file, (chr(0xEF) . chr(0xBB) . chr(0xBF)));
        fputcsv($file, ['Fecha', 'Nombre', 'Correo', 'Telefono', 'Empresa', 'Giro', 'Paquete', 'Evaluacion']);
    }
    $date = date('Y-m-d H:i:s');
    fputcsv($file, [$date, $name, $email, $phone, $businessName, $industry, $selectedPkg, $evaluation]);
    fclose($file);
}

// 3. Envío al Correo Corporativo contacto@tsolutionsipidd.com
$to = "contacto@tsolutionsipidd.com";
$subject = "🧠 Nuevo Diagnóstico Digital RUA: $businessName ($name)";
$evalObj = json_decode($evaluation, true) ?: [];

$email_body = "====================================================\n" .
              "  AUDITORÍA DE MADUREZ DIGITAL - TSOLUTIONS IPIDD\n" .
              "====================================================\n\n" .
              "PROSPECTO:\n" .
              "- Nombre: $name\n" .
              "- Correo: $email\n" .
              "- Teléfono / WhatsApp: $phone\n" .
              "- Empresa: $businessName\n" .
              "- Giro: $industry\n" .
              "- Paquete de Interés: $selectedPkg\n\n" .
              "EVALUACIÓN DE OPERACIONES:\n" .
              "- Google Maps: " . ($evalObj['mapsStatus'] ?? 'N/A') . "\n" .
              "- Presencia Web: " . ($evalObj['webPresence'] ?? 'N/A') . "\n" .
              "- Toma de Pedidos: " . ($evalObj['ordersFlow'] ?? 'N/A') . "\n" .
              "- Fricción en Respuestas: " . ($evalObj['responseFriction'] ?? 'N/A') . "\n" .
              "- Métodos de Cobro: " . ($evalObj['paymentMethods'] ?? 'N/A') . "\n" .
              "- Despacho Logístico: " . ($evalObj['shippingMethod'] ?? 'N/A') . "\n" .
              "- Capacitación de Equipo: " . ($evalObj['teamTraining'] ?? 'N/A') . "\n" .
              "- Procesos SOPs: " . ($evalObj['sopsStatus'] ?? 'N/A') . "\n" .
              "- Fuga u Obstáculo Principal: " . ($evalObj['mainObstacle'] ?? 'N/A') . "\n\n" .
              "Fecha y Hora: " . date('Y-m-d H:i:s') . "\n";

$headers = "From: webmaster@tsolutionsipidd.com\r\n" .
           "Reply-To: $email\r\n" .
           "X-Mailer: PHP/" . phpversion();

@mail($to, $subject, $email_body, $headers);

echo json_encode([
    "success" => true,
    "message" => "¡Diagnóstico digital registrado con éxito y conectado a RUA!",
    "recipient" => $to,
    "db_saved" => $db_saved
]);
?>
