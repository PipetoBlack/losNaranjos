CREATE DATABASE RestauranteBD;
USE RestauranteDB;

CREATE TABLE MESA (
    id_mesa INT PRIMARY KEY,
    numero_mesa INT,
    capacidad INT,
    ubicacion VARCHAR(255),
    estado VARCHAR(255)
);

CREATE TABLE RESTAURANTE (
    id_restaurante INT PRIMARY KEY,
    nombre_restaurante VARCHAR(255),
    direccion VARCHAR(255),
    telefono VARCHAR(50),
    email VARCHAR(100),
    horario_apertura VARCHAR(100),
    estado VARCHAR(50)
);

CREATE TABLE USUARIO (
    id_usuario INT PRIMARY KEY,
    nombre_usuario VARCHAR(255),
    correo VARCHAR(100),
    contrasena_hash VARCHAR(255),
    tipo_usuario VARCHAR(50),
    fecha_creacion DATE
);

CREATE TABLE PRODUCTO (
    id_producto INT PRIMARY KEY,
    nombre VARCHAR(255),
    precio DECIMAL(10, 2),
    categoria VARCHAR(100),
    descripcion TEXT
);

CREATE TABLE RESERVA_WEB (
    id_reserva INT PRIMARY KEY,
    fecha_reserva DATE,
    hora_reserva TIME,
    cantidad_personas INT,
    estado VARCHAR(50),
    id_cliente INT,
    id_mesa INT,
    FOREIGN KEY (id_cliente) REFERENCES USUARIO(id_usuario),
    FOREIGN KEY (id_mesa) REFERENCES MESA(id_mesa)
);

CREATE TABLE PAGO_WEB (
    id_pago_web INT PRIMARY KEY,
    monto_total DECIMAL(10, 2),
    fecha_pago DATE,
    medio_pago VARCHAR(100),
    estado VARCHAR(50),
    id_cliente INT,
    id_reserva_web INT,
    FOREIGN KEY (id_cliente) REFERENCES USUARIO(id_usuario),
    FOREIGN KEY (id_reserva_web) REFERENCES RESERVA_WEB(id_reserva)
);

CREATE TABLE CARRITO (
    id_carrito INT PRIMARY KEY,
    fecha_creacion DATE,
    estado VARCHAR(50),
    id_cliente INT,
    id_producto INT,
    cantidad INT,
    precio_unitario DECIMAL(10, 2),
    FOREIGN KEY (id_cliente) REFERENCES USUARIO(id_usuario),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto)
);