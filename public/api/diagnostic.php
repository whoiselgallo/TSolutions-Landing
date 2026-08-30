<?php
// ============================================================
// TSolutions IPIDD — /public/api/diagnostic.php
// Envío de Paquete y Diagnóstico por Gmail (javier.gallardo@tsolutionsipidd.com)
// Incluye imagen de Código QR dinámico generado para el cliente
// ============================================================

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: [];

$name = $data['name'] ?? 'Cliente';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? 'N/A';
$businessName = $data['businessName'] ?? 'N/A';
$industry = $data['industry'] ?? 'General';
$selectedPkg = $data['selectedPkg'] ?? 'Paquete Híbrido Escala Rápida ($3,700 MXN)';
$calculatedScore = $data['calculatedScore'] ?? 68;

if (empty($email)) {
    http_response_code(400);
    echo json_encode(["error" => "El correo electrónico es requerido."]);
    exit;
}

// URL destino para agendar y Código QR dinámico con colores de la marca
$targetUrl = "https://tsolutionsipidd.com/agenda?nombre=" . urlencode($name) . "&email=" . urlencode($email) . "&telefono=" . urlencode($phone);
$qrImageUrl = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" . urlencode($targetUrl) . "&bgcolor=11141a&color=ff6b00&margin=10";

// Plantilla de Correo HTML Profesional con Código QR
$htmlContent = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Tu Paquete y Diagnóstico TSolutions IPIDD</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0c10; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; color: #ffffff;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b0c10; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #11141a; border: 1px solid rgba(255,107,0,0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 0 40px rgba(255,107,0,0.2);">
          
          <!-- HEADER -->
          <tr>
            <td style="background-color: #161b22; padding: 25px 30px; border-bottom: 2px solid #ff6b00; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 2px; color: #ffffff;">
                TSOLUTIONS <span style="color: #ff6b00; font-size: 16px; background: rgba(255,107,0,0.15); border: 1px solid #ff6b00; padding: 2px 8px; border-radius: 4px;">IPIDD</span>
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 11px; color: #94a3b8; letter-spacing: 1px;">
                TECNOLOGÍA INSTALADA | CONOCIMIENTO TRANSFERIDO | NEGOCIOS ESCALADOS
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding: 35px 30px;">
              <p style="font-size: 16px; color: #ffffff; margin-top: 0;">
                Hola <strong>' . htmlspecialchars($name) . '</strong>,
              </p>
              <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
                Hemos procesado con éxito el diagnóstico digital y la propuesta de infraestructura para tu negocio <strong>' . htmlspecialchars($businessName) . '</strong> (' . htmlspecialchars($industry) . ').
              </p>

              <!-- PAQUETE SELECCIONADO -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: rgba(255,107,0,0.08); border: 1px solid #ff6b00; border-radius: 12px; margin: 20px 0; padding: 18px;">
                <tr>
                  <td>
                    <span style="font-size: 10px; font-weight: bold; color: #ff6b00; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">
                      PAQUETE SELECCIONADO / RECOMENDADO
                    </span>
                    <h2 style="margin: 0 0 6px 0; font-size: 18px; color: #ffffff;">
                      ' . htmlspecialchars($selectedPkg) . '
                    </h2>
                    <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                      • Evaluación de Madurez Digital: <strong style="color: #22c55e;">' . $calculatedScore . ' / 100 Puntos</strong><br>
                      • <strong>Regalo Incluido:</strong> Terminal Point Mini de Mercado Pago de regalo en pasarelas.<br>
                      • <strong>Garantía:</strong> 30 días de soporte y transferencia andragógica de conocimiento.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CÓDIGO QR DESTACADO -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #0b0c10; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; margin: 25px 0; padding: 20px; text-align: center;">
                <tr>
                  <td align="center">
                    <span style="font-size: 11px; font-weight: bold; color: #ff6b00; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 12px;">
                      📱 ESCANEA TU CÓDIGO QR PARA AGENDAR TU SESIÓN
                    </span>
                    
                    <!-- IMAGEN DEL CÓDIGO QR -->
                    <img src="' . $qrImageUrl . '" alt="Código QR TSolutions" width="200" height="200" style="display: block; margin: 0 auto; border: 3px solid #ff6b00; border-radius: 12px; box-shadow: 0 0 25px rgba(255,107,0,0.4);" />
                    
                    <p style="margin: 14px 0 0 0; font-size: 11px; color: #94a3b8;">
                      Apunta la cámara de tu celular a este código QR para abrir tu agenda en vivo de 20 minutos con tu estratega asignado.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- BOTÓN CTA -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 30px 0 10px 0;">
                <tr>
                  <td align="center">
                    <a href="' . $targetUrl . '" target="_blank" style="background-color: #ff6b00; color: #ffffff; text-decoration: none; padding: 14px 30px; font-size: 14px; font-weight: bold; border-radius: 8px; display: inline-block; box-shadow: 0 0 20px rgba(255,107,0,0.6);">
                      📅 Agendar Mi Sesión de Entrega (20 min) →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #0b0c10; padding: 20px 30px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center; font-size: 11px; color: #64748b;">
              TSolutions IPIDD &bull; Dirección Tecnológica: <a href="mailto:javier.gallardo@tsolutionsipidd.com" style="color: #ff6b00; text-decoration: none;">javier.gallardo@tsolutionsipidd.com</a><br>
              Todos los derechos reservados 2026.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
';

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: Javier Gallardo | TSolutions IPIDD <javier.gallardo@tsolutionsipidd.com>\r\n";
$headers .= "Reply-To: javier.gallardo@tsolutionsipidd.com\r\n";

// Envío de correos
$sentClient = @mail($email, "🚀 Tu Paquete y Diagnóstico Digital — " . ($businessName ?: $name) . " (TSolutions IPIDD)", $htmlContent, $headers);
$sentAdmin = @mail("javier.gallardo@tsolutionsipidd.com", "🔔 [NUEVO DIAGNÓSTICO/PAQUETE] " . $name . " — " . $businessName, $htmlContent, $headers);

http_response_code(200);
echo json_encode([
    "success" => true,
    "qrUrl" => $qrImageUrl,
    "clientEmailSent" => $sentClient,
    "adminNotified" => $sentAdmin
]);
