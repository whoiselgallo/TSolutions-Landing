<?php
// ============================================================
// TSolutions IPIDD — Backend de Formulario de Contacto (PHP)
// Guarda los leads en base de datos MySQL de Hostinger
// ============================================================

// Habilitar CORS y cabeceras JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

// Solo procesar peticiones POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit;
}

// ------------------------------------------------------------
// ⚙️ CONFIGURACIÓN DE BASE DE DATOS (HOSTINGER)
// Modifica estos valores con las credenciales que crees en hPanel
// ------------------------------------------------------------
define('DB_HOST', 'localhost');
define('DB_USER', 'u115767692_rua');
define('DB_PASS', 'exhsbcmvsJ87e/$');
define('DB_NAME', 'u115767692_ipiddsolutions');

// Obtener datos enviados en formato JSON
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

// Validar campos requeridos
$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$message = isset($input['message']) ? trim($input['message']) : '';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Todos los campos son obligatorios"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "El correo electrónico no es válido"]);
    exit;
}

// ------------------------------------------------------------
// 🗄️ MÉTODOS DE ALMACENAMIENTO
// ------------------------------------------------------------

// 1. Intento de guardar en Base de Datos MySQL
$db_connected = false;
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if (!$conn->connect_error) {
        $db_connected = true;
        $conn->set_charset("utf8mb4");

        // Crear la tabla si no existe de forma automática
        $table_query = "CREATE TABLE IF NOT EXISTS contact_leads (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
        $conn->query($table_query);

        // Insertar registro
        $stmt = $conn->prepare("INSERT INTO contact_leads (name, email, message) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $message);
        
        if ($stmt->execute()) {
            $stmt->close();
            $conn->close();
            echo json_encode(["success" => true, "message" => "¡Solicitud registrada con éxito en Base de Datos!"]);
            exit;
        }
        $stmt->close();
        $conn->close();
    }
} catch (Exception $e) {
    // Falla silenciosa para pasar al plan de contingencia de archivos local
}

// 2. Plan B: Si la base de datos no está configurada, guardar en archivo CSV local en Hostinger
$csv_file = __DIR__ . '/leads.csv';
$is_new = !file_exists($csv_file);

$file = fopen($csv_file, 'a');
if ($file) {
    if ($is_new) {
        // UTF-8 BOM para Excel
        fputs($file, $bom =(chr(0xEF) . chr(0xBB) . chr(0xBF)));
        fputcsv($file, ['Fecha', 'Nombre', 'Correo', 'Mensaje']);
    }
    $date = date('Y-m-d H:i:s');
    fputcsv($file, [$date, $name, $email, $message]);
    fclose($file);

    echo json_encode([
        "success" => true,
        "message" => "¡Mensaje guardado localmente en leads.csv!"
    ]);
    exit;
}

// Si todo falla
http_response_code(500);
echo json_encode(["success" => false, "message" => "Error del servidor al procesar la solicitud"]);
?>
