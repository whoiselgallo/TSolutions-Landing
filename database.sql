-- =============================================================================
-- TSolutions Landing - Estructura de Base de Datos para Pasarela de Pagos
-- =============================================================================
-- Este script crea la tabla 'purchases' para registrar las compras de Stripe
-- y la información de facturación automática generada por Facturapi.
--
-- Instrucciones para Hostinger:
-- 1. Ingresa al panel de Hostinger.
-- 2. Ve a Bases de Datos -> phpMyAdmin e inicia sesión en la base de datos de tu sitio.
-- 3. Ve a la pestaña "SQL".
-- 4. Pega este código y presiona "Continuar" (Go).
-- =============================================================================

CREATE TABLE IF NOT EXISTS `purchases` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL COMMENT 'Correo electrónico del comprador',
  `item_id` VARCHAR(255) NOT NULL COMMENT 'Identificador del producto/servicio adquirido',
  `stripe_session_id` VARCHAR(255) UNIQUE NOT NULL COMMENT 'ID de la sesión de Stripe Checkout',
  `amount` INT NOT NULL COMMENT 'Monto total en centavos (ej. 10000 = 100.00)',
  `currency` VARCHAR(10) NOT NULL COMMENT 'Divisa de la transacción (usd / mxn)',
  `wants_invoice` VARCHAR(10) DEFAULT 'false' COMMENT 'Indica si solicitó factura fiscal',
  `invoice_id` VARCHAR(255) DEFAULT NULL COMMENT 'ID de la factura en Facturapi',
  `invoice_pdf` VARCHAR(1000) DEFAULT NULL COMMENT 'Enlace de descarga del PDF de la factura',
  `invoice_xml` VARCHAR(1000) DEFAULT NULL COMMENT 'Enlace de descarga del XML de la factura',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora del registro'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
