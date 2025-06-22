CREATE DATABASE RestauranteV2;
USE RestauranteV2;

CREATE TABLE CLIENTE (
    id_cliente INT PRIMARY KEY,
    rut_completo VARCHAR(12) UNIQUE,
    p_nombre VARCHAR(100),
    p_apellido VARCHAR(100),
    s_apellido VARCHAR(100),
    telefono VARCHAR(20),
    correo VARCHAR(100),
    contrasenia VARCHAR(256),
    fecha_creacion DATE,
    estado VARCHAR(20)
);

CREATE TABLE EMPLEADO (
    id_empleado INT PRIMARY KEY,
    rut_empleado VARCHAR(12) UNIQUE,
    dv_empleado VARCHAR(1),
    p_nombre VARCHAR(100),
    p_apellido VARCHAR(100),
    s_apellido VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    contrasenia VARCHAR(256),
    fecha_creacion DATE,
    estado VARCHAR(20)
);

CREATE TABLE ROL (
    id_rol INT PRIMARY KEY,
    nombre_rol VARCHAR(20) UNIQUE
);

CREATE TABLE TURNO (
    id_turno INT PRIMARY KEY,
    id_rol INT,
    id_empleado INT,
    fecha_inicio DATE,
    fecha_termino DATE,
    FOREIGN KEY (id_rol) REFERENCES ROL(id_rol),
    FOREIGN KEY (id_empleado) REFERENCES EMPLEADO(id_empleado)
);

CREATE TABLE MESA (
    id_mesa INT PRIMARY KEY,
    numero_mesa VARCHAR(50),
    capacidad INT,
    ubicacion VARCHAR(20),
    estado VARCHAR(20)
);

CREATE TABLE RESERVA_WEB (
    id_reserva_web INT PRIMARY KEY,
    id_cliente INT,
    id_mesa INT,
    fecha_hora_reserva TIMESTAMP,
    cantidad_personas INT,
    estado VARCHAR(20),
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente),
    FOREIGN KEY (id_mesa) REFERENCES MESA(id_mesa)
);

CREATE TABLE LISTA_ESPERA (
    id_lista_espera INT PRIMARY KEY,
    id_cliente INT,
    id_empleado INT,
    fecha_hora_ingreso TIMESTAMP,
    cantidad_personas INT,
    estado VARCHAR(20),
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente),
    FOREIGN KEY (id_empleado) REFERENCES EMPLEADO(id_empleado)
);

CREATE TABLE PAGO (
    id_pago INT PRIMARY KEY,
    id_cliente INT,
    fecha_pago DATE,
    monto_total DECIMAL(10,2),
    medio_pago VARCHAR(50),
    estado VARCHAR(20),
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente)
);

CREATE TABLE COMANDA (
    id_comanda INT PRIMARY KEY,
    id_mozo INT,
    id_mesa INT,
    id_pago INT,
    fecha_hora TIMESTAMP,
    observaciones VARCHAR(255),
    estado VARCHAR(30),
    FOREIGN KEY (id_mozo) REFERENCES EMPLEADO(id_empleado),
    FOREIGN KEY (id_mesa) REFERENCES MESA(id_mesa),
    FOREIGN KEY (id_pago) REFERENCES PAGO(id_pago)
);

CREATE TABLE PRODUCTO (
    id_producto INT PRIMARY KEY,
    nombre_producto VARCHAR(100),
    descripcion VARCHAR(255),
    tipo_producto VARCHAR(50),
    precio DECIMAL(10,2),
    estado VARCHAR(30)
);

CREATE TABLE DETALLE_COMANDA (
    id_detalle_comanda INT PRIMARY KEY,
    id_comanda INT,
    id_producto INT,
    cantidad INT,
    precio_unitario DECIMAL(10,2),
    precio_total DECIMAL(10,2),
    FOREIGN KEY (id_comanda) REFERENCES COMANDA(id_comanda),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto)
);