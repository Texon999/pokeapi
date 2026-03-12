CREATE DATABASE IF NOT EXISTS hotel_costa_azul;
USE hotel_costa_azul;

CREATE TABLE IF NOT EXISTS usuario (
  id_usuario         INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario     VARCHAR(100) NOT NULL UNIQUE,
  contrasena_usuario VARCHAR(255) NOT NULL,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS sede (
  id_sede     INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(150) NOT NULL,
  ciudad      VARCHAR(100) NOT NULL,
  direccion   VARCHAR(150) NOT NULL,
  imagen_url  VARCHAR(500) NOT NULL,
  precio_base DECIMAL(10,2) NOT NULL,
  descripcion VARCHAR(300)
);

CREATE TABLE IF NOT EXISTS reserva (
  id_reserva   INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario   INT NOT NULL,
  id_sede      INT NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin    DATE NOT NULL,
  precio       DECIMAL(10,2) NOT NULL,
  estado       ENUM('pendiente','confirmada','cancelada','completada')
               NOT NULL DEFAULT 'pendiente',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_sede)    REFERENCES sede(id_sede)
);