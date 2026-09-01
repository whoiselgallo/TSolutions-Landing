<?php
// ============================================================
// TSolutions IPIDD — /public/api/data-deletion-callback.php
// Meta / Facebook User Data Deletion Callback
// Cumplimiento oficial con Meta Platform Data Deletion Guidelines
// ============================================================

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        "status" => "active",
        "message" => "TSolutions IPIDD Data Deletion Endpoint",
        "instructionsUrl" => "https://tsolutionsipidd.com/eliminacion-de-datos"
    ]);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: [];
$signedRequest = $_POST['signed_request'] ?? ($data['signed_request'] ?? null);

$userId = "user_" . time();
$appSecret = getenv('META_APP_SECRET') ?: (getenv('WHATSAPP_APP_SECRET') ?: '');

if ($signedRequest) {
    list($encodedSig, $payload) = explode('.', $signedRequest, 2);
    $sig = base64_decode(strtr($encodedSig, '-_', '+/'));
    $userData = json_decode(base64_decode(strtr($payload, '-_', '+/')), true);
    
    $expectedSig = hash_hmac('sha256', $payload, $appSecret, true);
    if (hash_equals($sig, $expectedSig) && isset($userData['user_id'])) {
        $userId = $userData['user_id'];
    }
}

$confirmationCode = "DEL-" . strtoupper(substr(bin2hex($userId . "-" . time()), 0, 16));
$statusUrl = "https://tsolutionsipidd.com/eliminacion-de-datos?code=" . $confirmationCode;

echo json_encode([
    "url" => $statusUrl,
    "confirmation_code" => $confirmationCode
]);
