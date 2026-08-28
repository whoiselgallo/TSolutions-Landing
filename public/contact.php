<?php
// ============================================================
// TSolutions IPIDD — Backend de Formulario de Contacto (PHP)
// Guarda los leads en base de datos MySQL de Hostinger y CSV
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
$pkg = isset($input['package']) ? trim($input['package']) : '';
$message = isset($input['message']) ? trim($input['message']) : '';
$source = isset($input['source']) ? trim($input['source']) : 'Landing Contact Form';

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Nombre y correo son obligatorios"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "El correo electrónico no es válido"]);
    exit;
}

// 1. Guardar en Base de Datos MySQL
$db_saved = false;
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if (!$conn->connect_error) {
        $conn->set_charset("utf8mb4");

        // Crear la tabla si no existe
        $table_query = "CREATE TABLE IF NOT EXISTS contact_leads (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(100) DEFAULT '',
            package VARCHAR(255) DEFAULT '',
            message TEXT,
            source VARCHAR(100) DEFAULT 'Web',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
        $conn->query($table_query);

        $stmt = $conn->prepare("INSERT INTO contact_leads (name, email, phone, package, message, source) VALUES (?, ?, ?, ?, ?, ?)");
        if ($stmt) {
            $stmt->bind_param("ssssss", $name, $email, $phone, $pkg, $message, $source);
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

// 2. Respaldo en Archivo CSV
$csv_file = __DIR__ . '/leads.csv';
$is_new = !file_exists($csv_file);
$file = fopen($csv_file, 'a');
if ($file) {
    if ($is_new) {
        fputs($file, (chr(0xEF) . chr(0xBB) . chr(0xBF)));
        fputcsv($file, ['Fecha', 'Nombre', 'Correo', 'Telefono', 'Paquete', 'Mensaje', 'Fuente']);
    }
    $date = date('Y-m-d H:i:s');
    fputcsv($file, [$date, $name, $email, $phone, $pkg, $message, $source]);
    fclose($file);
}

// 3. Notificación por Correo a contacto@tsolutionsipidd.com
$to = "contacto@tsolutionsipidd.com";
$subject = "🚀 Nuevo Lead de Marketing: $name ($pkg)";
$email_body = "Se ha recibido un nuevo registro de contacto para marketing:\n\n" .
              "Nombre: $name\n" .
              "Correo: $email\n" .
              "Teléfono / WhatsApp: $phone\n" .
              "Paquete: $pkg\n" .
              "Mensaje: $message\n" .
              "Fecha: " . date('Y-m-d H:i:s') . "\n";
$headers = "From: webmaster@tsolutionsipidd.com\r\n" .
           "Reply-To: $email\r\n" .
           "X-Mailer: PHP/" . phpversion();

@mail($to, $subject, $email_body, $headers);

echo json_encode([
    "success" => true,
    "message" => "¡Solicitud registrada con éxito en Base de Datos para Marketing!",
    "db_saved" => $db_saved
]);
?>
