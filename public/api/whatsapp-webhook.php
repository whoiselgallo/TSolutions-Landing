<?php
// ============================================================
// TSolutions IPIDD — /public/api/whatsapp-webhook.php
// Integración Oficial de RUA con WhatsApp Business (PHP Backend)
// ============================================================

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$VERIFY_TOKEN = getenv('WHATSAPP_VERIFY_TOKEN') ?: 'TSOLUTIONS_RUA_VERIFY_TOKEN_2026';
$WHATSAPP_TOKEN = getenv('WHATSAPP_TOKEN') ?: getenv('META_WHATSAPP_TOKEN');
$PHONE_NUMBER_ID = getenv('WHATSAPP_PHONE_NUMBER_ID');
$GEMINI_KEY = getenv('GEMINI_API_KEY') ?: getenv('VITE_GEMINI_API_KEY');

// 1. VERIFICACIÓN DE WEBHOOK (GET - Meta Challenge)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $mode = $_GET['hub_mode'] ?? '';
    $token = $_GET['hub_verify_token'] ?? '';
    $challenge = $_GET['hub_challenge'] ?? '';

    if ($mode === 'subscribe' && $token === $VERIFY_TOKEN) {
        http_response_code(200);
        echo $challenge;
        exit;
    }
    http_response_code(403);
    echo json_encode(["error" => "Token de verificación inválido"]);
    exit;
}

// 2. RECEPCIÓN DE MENSAJES (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $body = json_decode($rawInput, true) ?: [];

    $entry = $body['entry'][0] ?? null;
    $changes = $entry['changes'][0]['value'] ?? null;
    $message = $changes['messages'][0] ?? null;

    if ($message && ($message['type'] ?? '') === 'text') {
        $fromNumber = $message['from'] ?? '';
        $userText = $message['text']['body'] ?? '';
        $profileName = $changes['contacts'][0]['profile']['name'] ?? 'Prospecto';

        // Generar respuesta con RUA
        $ruaReply = generateRuaResponse($userText);

        // Enviar respuesta por WhatsApp API
        if (!empty($WHATSAPP_TOKEN) && !empty($PHONE_NUMBER_ID)) {
            sendWhatsAppMsg($fromNumber, $ruaReply, $WHATSAPP_TOKEN, $PHONE_NUMBER_ID);
        }

        // Guardar registro de lead
        $logDir = __DIR__ . '/../../data';
        if (!is_dir($logDir)) {
            @mkdir($logDir, 0777, true);
        }
        $logFile = $logDir . '/whatsapp_leads.json';
        $currentLogs = file_exists($logFile) ? json_decode(file_get_contents($logFile), true) : [];
        if (!is_array($currentLogs)) $currentLogs = [];
        
        $currentLogs[] = [
            'name' => $profileName,
            'phone' => $fromNumber,
            'message' => $userText,
            'ruaResponse' => $ruaReply,
            'timestamp' => date('c')
        ];
        @file_put_contents($logFile, json_encode(array_slice($currentLogs, -100), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        http_response_code(200);
        echo json_encode(["status" => "success", "reply" => $ruaReply]);
        exit;
    }

    http_response_code(200);
    echo json_encode(["status" => "ignored"]);
    exit;
}

// ---- Motor de Conocimiento RUA ----
function generateRuaResponse($userText) {
    $text = mb_strtolower($userText, 'UTF-8');

    if (strpos($text, 'precio') !== false || strpos($text, 'costo') !== false || strpos($text, 'paquete') !== false) {
        return "¡Hola! En *TSolutions IPIDD* manejamos precios 100% transparentes:\n\n" .
            "• 💳 *Tarjeta Smart:* $950 MXN (Mobile-first para WhatsApp)\n" .
            "• 📍 *Tu Negocio en Google:* $2,750 MXN (Rescate en Google Maps)\n" .
            "• 🔥 *Híbrido Escala Rápida:* $3,700 MXN (Smart Web + Maps - El más pedido)\n" .
            "• 🌐 *Ecosistema Total:* $5,450 MXN (Sitio web + Correos corporativos)\n" .
            "• 📦 *E-commerce Total:* $9,850 MXN (Con envíos Uber Direct y *Terminal Point Mini de regalo* 🎁)\n\n" .
            "¿Qué tipo de negocio tienes para orientarte?";
    }

    if (strpos($text, 'diagnostico') !== false || strpos($text, 'diagnóstico') !== false || strpos($text, 'empezar') !== false) {
        return "¡Excelente! Para evaluar las fugas operativas de tu negocio en Google Maps, WhatsApp y pedidos, diseñamos nuestro *Diagnóstico Digital de 2 minutos*:\n\n" .
            "👉 Llénalo aquí: https://tsolutionsipidd.com/diagnostico\n\n" .
            "Al completarlo, te agendaremos una sesión 1 a 1 de 20 min con un Estratega Tecnológico para entregarte tus resultados sin costo.";
    }

    if (strpos($text, 'agenda') !== false || strpos($text, 'cita') !== false || strpos($text, 'horario') !== false) {
        return "¡Listo! Puedes apartar tu *Sesión Estratégica 1 a 1 de 20 minutos* directamente en nuestra agenda oficial:\n\n" .
            "👉 Elige tu horario: https://tsolutionsipidd.com/agenda\n\n" .
            "Revisaremos tu modelo de negocio y cómo automatizar tu operación.";
    }

    if (strpos($text, 'ebook') !== false || strpos($text, 'libro') !== false || strpos($text, 'gratis') !== false) {
        return "¡Sí! Tenemos *3 E-books Oficiales Gratuitos* listos para descargar:\n\n" .
            "1. 🎨 *Arquitectura de Marca: Cómo Construir una Identidad que Venda*\n" .
            "2. 🚀 *El Manual Anticaos: Erradica el Desorden en Maps y WhatsApp*\n" .
            "3. 📦 *De Mostrador a Máquina de Despachos: E-commerce con Uber Direct*\n\n" .
            "👉 Descárgalos gratis aquí: https://tsolutionsipidd.com/ebooks";
    }

    return "¡Hola! Soy *RUA 🤖 (Real Utility Agent)*, el asesor de inteligencia artificial de *TSolutions IPIDD*.\n\n" .
        "Estoy aquí para ayudarte a digitalizar tu negocio, erradicar cuellos de botella en pedidos y capacitar a tu equipo.\n\n" .
        "¿En qué te puedo apoyar hoy?\n" .
        "1️⃣ Cotizar un paquete web o tienda online\n" .
        "2️⃣ Iniciar Diagnóstico de Fugas Operativas\n" .
        "3️⃣ Agendar sesión de 20 min con un Estratega";
}

function sendWhatsAppMsg($to, $text, $token, $phoneId) {
    $url = "https://graph.facebook.com/v19.0/{$phoneId}/messages";
    $payload = [
        "messaging_product" => "whatsapp",
        "recipient_type" => "individual",
        "to" => $to,
        "type" => "text",
        "text" => [
            "preview_url" => true,
            "body" => $text
        ]
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer {$token}",
        "Content-Type: application/json"
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    $res = curl_exec($ch);
    curl_close($ch);
    return $res;
}
