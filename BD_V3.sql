CREATE DATABASE RestauranteFinal;
USE RestauranteFinal;

-- Tabla de clientes
CREATE TABLE CLIENTE (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    rut VARCHAR(12) UNIQUE,
    primer_nombre VARCHAR(100),
    segundo_nombre VARCHAR(100),
    apellido_paterno VARCHAR(100),
    apellido_materno VARCHAR(100),
    telefono VARCHAR(20),
    correo VARCHAR(100) UNIQUE,
    contrasenia VARCHAR(30),
    fecha_creacion DATE,
    estado VARCHAR(20)
);

-- Tabla de empleados
CREATE TABLE EMPLEADO (
    id_empleado INT PRIMARY KEY AUTO_INCREMENT,
    rut VARCHAR(12) UNIQUE,
    dv VARCHAR(1),
    primer_nombre VARCHAR(100),
    segundo_nombre VARCHAR(100),
    apellido_paterno VARCHAR(100),
    apellido_materno VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    contrasenia VARCHAR(256),
    fecha_contratacion DATE,
    estado VARCHAR(20)
);

-- Tabla de roles
CREATE TABLE ROL (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(50) UNIQUE
);

-- Relación entre empleados y sus turnos
CREATE TABLE TURNO (
    id_turno INT PRIMARY KEY AUTO_INCREMENT,
    id_empleado INT,
    id_rol INT,
    fecha_inicio DATE,
    fecha_termino DATE,
    FOREIGN KEY (id_empleado) REFERENCES EMPLEADO(id_empleado),
    FOREIGN KEY (id_rol) REFERENCES ROL(id_rol)
);

-- Tabla de mesas
CREATE TABLE MESA (
    id_mesa INT PRIMARY KEY AUTO_INCREMENT,
    numero INT UNIQUE,
    capacidad INT,
    ubicacion VARCHAR(50),
    estado VARCHAR(20)
);

-- Tabla de productos
CREATE TABLE PRODUCTO (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    descripcion TEXT,
    tipo VARCHAR(50),
    precio DECIMAL(10,2),
    estado VARCHAR(20)
);

-- Tabla de pagos
CREATE TABLE PAGO (
    id_pago INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    fecha_pago DATE,
    monto_total DECIMAL(10,2),
    medio_pago VARCHAR(50),
    estado VARCHAR(20),
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente)
);

-- Tabla de comandas
CREATE TABLE COMANDA (
    id_comanda INT PRIMARY KEY AUTO_INCREMENT,
    id_mozo INT,
    id_mesa INT,
    id_pago INT,
    fecha_hora TIMESTAMP,
    observaciones TEXT,
    estado VARCHAR(30),
    FOREIGN KEY (id_mozo) REFERENCES EMPLEADO(id_empleado),
    FOREIGN KEY (id_mesa) REFERENCES MESA(id_mesa),
    FOREIGN KEY (id_pago) REFERENCES PAGO(id_pago)
);

-- Detalle de cada comanda
CREATE TABLE DETALLE_COMANDA (
    id_detalle INT PRIMARY KEY AUTO_INCREMENT,
    id_comanda INT,
    id_producto INT,
    cantidad INT,
    precio_unitario DECIMAL(10,2),
    precio_total DECIMAL(10,2),
    FOREIGN KEY (id_comanda) REFERENCES COMANDA(id_comanda),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto)
);

-- Tabla de reservas web
CREATE TABLE RESERVA_WEB (
    id_reserva INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    id_mesa INT,
    fecha_hora TIMESTAMP,
    cantidad_personas INT,
    estado VARCHAR(20),
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente),
    FOREIGN KEY (id_mesa) REFERENCES MESA(id_mesa)
);

-- Tabla de lista de espera
CREATE TABLE LISTA_ESPERA (
    id_lista INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    id_empleado INT,
    fecha_hora_ingreso TIMESTAMP,
    cantidad_personas INT,
    estado VARCHAR(20),
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente),
    FOREIGN KEY (id_empleado) REFERENCES EMPLEADO(id_empleado)
);