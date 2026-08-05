<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

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

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);
$itemId = $input["itemId"] ?? "complete_bundle";
$currency = strtolower($input["currency"] ?? "usd");
if (!in_array($currency, ["usd", "mxn"])) {
    $currency = "usd";
}

$prices = [
    // --- BRANDING & NAMING ---
    "logo_express" => [
        "name" => "Creador Express de Logotipo",
        "usd" => 4900,
        "mxn" => 98000
    ],
    "manifiesto" => [
        "name" => "Manifiesto de Marca (Pilar 1)",
        "usd" => 4900,
        "mxn" => 98000
    ],
    "pitch" => [
        "name" => "Elevator Pitch Estratégico (Pilar 2)",
        "usd" => 7900,
        "mxn" => 158000
    ],
    "voice" => [
        "name" => "Identidad de Voz y Tono (Pilar 3)",
        "usd" => 7900,
        "mxn" => 158000
    ],
    "brandbook" => [
        "name" => "Brandbook de Identidad (Pilar 4)",
        "usd" => 9900,
        "mxn" => 198000
    ],
    "complete_bundle" => [
        "name" => "Brand Pack Completo (Acceso Total)",
        "usd" => 31900,
        "mxn" => 638000
    ],
    // --- INTELIGENCIA ARTIFICIAL ---
    "ia_estandar" => [
        "name" => "IA Personalizada para tu negocio (Licencia Estándar)",
        "usd" => 14900,
        "mxn" => 298000
    ],
    "ia_premium" => [
        "name" => "IA Personalizada para tu negocio (Licencia Premium)",
        "usd" => 39900,
        "mxn" => 798000
    ],
    // --- DESARROLLO WEB & LOGÍSTICA ---
    "web_estatico" => [
        "name" => "Desarrollo de Sitio Web Estático / Landing Page",
        "usd" => 19900,
        "mxn" => 398000
    ],
    "ecommerce" => [
        "name" => "Ecommerce Completo / Menú Digital",
        "usd" => 34900,
        "mxn" => 698000
    ],
    "integracion_logistica" => [
        "name" => "Integración de Pasarela de Pagos & Logística",
        "usd" => 29900,
        "mxn" => 598000
    ],
    // --- PRODUCCIÓN AUDIOVISUAL ---
    "produccion_podcast" => [
        "name" => "Producción de Podcast Profesional",
        "usd" => 19900,
        "mxn" => 398000
    ],
    "produccion_video" => [
        "name" => "Producción de Videos de Marca / Promocionales",
        "usd" => 12900,
        "mxn" => 258000
    ],
    // --- CONSULTORÍA & SOPORTE ---
    "consultoria_1on1" => [
        "name" => "Consultoría Estratégica 1-on-1 (Sesión de 1 Hora)",
        "usd" => 9900,
        "mxn" => 198000
    ],
    "membership" => [
        "name" => "Membresía Mensual Pro TSolutions",
        "usd" => 3900,
        "mxn" => 78000
    ]
];

$item = $prices[$itemId] ?? $prices["complete_bundle"];
$amount = $item[$currency];

$stripeSecret = getenv("STRIPE_SECRET_KEY") ?: (isset($_ENV["STRIPE_SECRET_KEY"]) ? $_ENV["STRIPE_SECRET_KEY"] : null);

// Si estamos en desarrollo local o no se ha configurado la key real, activar simulador
if (!$stripeSecret || $stripeSecret === "sk_test_mock") {
    $cancelUrl = $_SERVER["HTTP_REFERER"] ?? "#";
    $successUrl = strtok($cancelUrl, '#') . "?status=success&itemId=" . $itemId;
    echo json_encode([
        "status" => "mock",
        "message" => "Simulación de Stripe Checkout activa (sk_test_mock)",
        "url" => $successUrl
    ]);
    exit;
}

// Llamar a la API de Stripe real
$ch = curl_init();
$stripeUrl = "https://api.stripe.com/v1/checkout/sessions";
curl_setopt($ch, CURLOPT_URL, $stripeUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_USERPWD, $stripeSecret . ":");

$email = $input["email"] ?? null;
$refererUrl = $_SERVER["HTTP_REFERER"] ?? "https://tsolutionsipidd.com/";
$cancelUrl = strtok($refererUrl, '?') . "?status=cancel&itemId=" . $itemId;
$successUrl = strtok($refererUrl, '?') . "?status=success&itemId=" . $itemId;

$data = [
    "line_items[0][price_data][currency]" => $currency,
    "line_items[0][price_data][product_data][name]" => $item["name"],
    "line_items[0][price_data][unit_amount]" => $amount,
    "line_items[0][quantity]" => 1,
    "mode" => ($itemId === "membership") ? "subscription" : "payment",
    "success_url" => $successUrl,
    "cancel_url" => $cancelUrl,
    "client_reference_id" => $itemId,
    "metadata[itemId]" => $itemId
];

if ($itemId === "membership") {
    $data["line_items[0][price_data][recurring][interval]"] = "month";
}

if ($email) {
    $data["customer_email"] = $email;
    $data["metadata[email]"] = $email;
}

curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $session = json_decode($response, true);
    echo json_encode([
        "status" => "ok",
        "id" => $session["id"],
        "url" => $session["url"]
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Error de comunicación con Stripe",
        "stripe_response" => json_decode($response, true)
    ]);
}
?>
