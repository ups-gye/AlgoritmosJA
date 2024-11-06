USE algoritmosjabank;

CREATE TABLE cliente (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_nombre VARCHAR(50) NOT NULL,
    cliente_apellido VARCHAR(50) NOT NULL,
    cliente_tipo_identificacion VARCHAR(20) NOT NULL,
    cliente_identificacion VARCHAR(20) UNIQUE NOT NULL,
    cliente_correo_electronico VARCHAR(50),
    cliente_celular VARCHAR(20)
);

CREATE TABLE usuario (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_cliente_id INT,
    usuario_name VARCHAR(50) NOT NULL,
    usuario_password VARCHAR(255) NOT NULL,
    usuario_fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_cliente_id) REFERENCES cliente(cliente_id)
);

CREATE TABLE cuenta (
    cuenta_id INT AUTO_INCREMENT PRIMARY KEY,
    cuenta_cliente_id INT NOT NULL,
    cuenta_saldo DOUBLE DEFAULT 0.00,
    cuenta_fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cuenta_cliente_id) REFERENCES cliente(cliente_id)
);

CREATE TABLE movimiento (
    movimiento_id INT AUTO_INCREMENT PRIMARY KEY,
    movimiento_cuenta_origen INT NOT NULL,
    movimiento_cuenta_destino INT NOT NULL,
    movimiento_valor DOUBLE NOT NULL,
    movimiento_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movimiento_cuenta_origen) REFERENCES cuenta(cuenta_id),
    FOREIGN KEY (movimiento_cuenta_destino) REFERENCES cuenta(cuenta_id)
);

-- Insertar datos de ejemplo
INSERT INTO cliente (cliente_nombre, cliente_apellido, cliente_tipo_identificacion, cliente_identificacion, cliente_correo_electronico, cliente_celular)
VALUES 
('Sandra', 'Abril', 'Cedula', '1234567890', 'juan.perez@example.com', '0987654321'),
('Carlos', 'Alvarez', 'Cedula', '2345678901', 'maria.lopez@example.com', '0987654322'),
('Cristian', 'Estrada', 'Cedula', '3456789012', 'luis.garcia@example.com', '0987654323'),
('Pedro', 'Mendez', 'Cedula', '0104393475', 'ana.martinez@example.com', '0987654324'),
('Santiago', 'Parra', 'Cedula', '5678901234', 'carlos.ramos@example.com', '0987654325'),
('Adrian', 'Tene', 'Cedula', '4567890123', 'carlos.ramos@example.com', '0987654325');

INSERT INTO usuario (usuario_name, usuario_password, usuario_cliente_id)
VALUES 
('sabril', '$2a$12$c8D15wYjYjwcYlgubJaH.e6wR/DEqpBhLtxOgXxbX6fkPUxHZkO3W', 1),
('calvarez', '$2a$12$twAAJw6p8l6SO/1ef8uoiuZ1JI6fgO7wVFPGYUs4j1CmhMn5nvXHS', 2),
('cestrada', '$2a$12$jwcGKWWaY2ZvbCYmycJgzO4ozqjdc4Q8jYicCbiQXAQAKKp02woqS', 3),
('pmendez', '$2a$12$ivb8TgOzzvHdgrAm0Ew14OlV4.e7SP3BpCMLo6Y4IyYz9bHJGn5yi', 4),
('sparra', '$2a$12$QAPORYHTXLCU6OfpPQjmPevQs6b8YXPRBvX0lqu/x9TFteA0g7mRK', 5),
('atene', '$2a$12$hIXiCHl/8KzjC5GE1/UT2e..QUo6RP8VZ31L/ET9SliNLLZQuchO2', 6);

INSERT INTO cuenta (cuenta_cliente_id, cuenta_saldo)
VALUES 
(1, 5000.00),
(2, 3000.00),
(3, 1500.00),
(4, 2000.00),
(5, 2500.00),
(6, 3500.00);