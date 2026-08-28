<?php
// ============================================================
// TSolutions IPIDD — Backend de Reserva de Citas (PHP)
// Guarda citas en MySQL de Hostinger y notifica a contacto@tsolutionsipidd.com
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
$selectedDate = isset($input['selectedDate']) ? trim($input['selectedDate']) : '';
$selectedTime = isset($input['selectedTime']) ? trim($input['selectedTime']) : '';
$pkg = isset($input['package']) ? trim($input['package']) : '';
$notes = isset($input['notes']) ? trim($input['notes']) : '';

if (empty($name) || empty($email) || empty($selectedDate) || empty($selectedTime)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Faltan campos obligatorios para agendar la cita"]);
    exit;
}

// 1. Guardar en Base de Datos MySQL
$db_saved = false;
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if (!$conn->connect_error) {
        $conn->set_charset("utf8mb4");

        $table_query = "CREATE TABLE IF NOT EXISTS appointments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(100) DEFAULT '',
            business_name VARCHAR(255) DEFAULT '',
            selected_date VARCHAR(100) NOT NULL,
            selected_time VARCHAR(100) NOT NULL,
            package VARCHAR(255) DEFAULT '',
            notes TEXT,
            status VARCHAR(50) DEFAULT 'confirmed',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
        $conn->query($table_query);

        $stmt = $conn->prepare("INSERT INTO appointments (name, email, phone, business_name, selected_date, selected_time, package, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        if ($stmt) {
            $stmt->bind_param("ssssssss", $name, $email, $phone, $businessName, $selectedDate, $selectedTime, $pkg, $notes);
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
$csv_file = __DIR__ . '/appointments.csv';
$is_new = !file_exists($csv_file);
$file = fopen($csv_file, 'a');
if ($file) {
    if ($is_new) {
        fputs($file, (chr(0xEF) . chr(0xBB) . chr(0xBF)));
        fputcsv($file, ['FechaRegistro', 'Nombre', 'Correo', 'Telefono', 'Empresa', 'DiaCita', 'HoraCita', 'Paquete', 'Notas']);
    }
    $date = date('Y-m-d H:i:s');
    fputcsv($file, [$date, $name, $email, $phone, $businessName, $selectedDate, $selectedTime, $pkg, $notes]);
    fclose($file);
}

// 3. Notificación a contacto@tsolutionsipidd.com
$to = "contacto@tsolutionsipidd.com";
$subject = "📅 Cita Confirmada de Entrega de Resultados: $name ($selectedDate a las $selectedTime)";
$email_body = "====================================================\n" .
              "  NUEVA CITA CONFIRMADA - TSOLUTIONS IPIDD\n" .
              "====================================================\n\n" .
              "DETALLES DE LA SESIÓN:\n" .
              "- Fecha Seleccionada: $selectedDate\n" .
              "- Horario: $selectedTime\n" .
              "- Duración: 20 minutos (Google Meet / Llamada)\n\n" .
              "PROSPECTO:\n" .
              "- Nombre: $name\n" .
              "- Correo: $email\n" .
              "- Teléfono / WhatsApp: $phone\n" .
              "- Empresa: $businessName\n" .
              "- Paquete de Interés: $pkg\n" .
              "- Notas: $notes\n\n" .
              "Fecha de Reserva: " . date('Y-m-d H:i:s') . "\n";

$headers = "From: webmaster@tsolutionsipidd.com\r\n" .
           "Reply-To: $email\r\n" .
           "X-Mailer: PHP/" . phpversion();

@mail($to, $subject, $email_body, $headers);

echo json_encode([
    "success" => true,
    "message" => "¡Cita reservada y confirmada con éxito!",
    "appointment" => [
        "name" => $name,
        "email" => $email,
        "selectedDate" => $selectedDate,
        "selectedTime" => $selectedTime
    ],
    "db_saved" => $db_saved
]);
?>
