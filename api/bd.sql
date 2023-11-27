CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    rut VARCHAR(255) UNIQUE,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    email VARCHAR(255),
    telefono VARCHAR(20)
);
CREATE TABLE vuelos (
    id_vuelo INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora_partida DATETIME,
    fecha_hora_llegada DATETIME,
    ciudad_origen VARCHAR(255),
    ciudad_destino VARCHAR(255),
    aeropuerto_origen VARCHAR(255),
    aeropuerto_llegada VARCHAR(255),
    pais_origen VARCHAR(255),
    pais_destino VARCHAR(255)
);
CREATE TABLE reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_estado_reserva INT,
    rut_cliente VARCHAR(255),
    id_vuelo INT,
    FOREIGN KEY (id_estado_reserva) REFERENCES estados_reserva(id_estado_reserva),
    FOREIGN KEY (rut_cliente) REFERENCES clientes(rut),
    FOREIGN KEY (id_vuelo) REFERENCES vuelos(id_vuelo)
);
CREATE TABLE estados_reserva (
    id_estado_reserva INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(255)
);

