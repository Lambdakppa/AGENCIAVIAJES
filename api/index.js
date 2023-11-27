const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json({
    type: "*/*"
}))

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'Agencia_Viajes'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos');
});

// Rutas para clientes
app.post('/clientes', async (req, res) => {
    try {
        // Obtén los datos del cliente desde el cuerpo de la solicitud
        const { rut, nombre, apellido, email, telefono } = req.body;

        // Realiza la inserción en la base de datos
        const sql = `INSERT INTO clientes (rut, nombre, apellido, email, telefono) VALUES (?, ?, ?, ?, ?)`;
        await db.query(sql, [rut, nombre, apellido, email, telefono]);

        res.status(201).json({ mensaje: 'Cliente registrado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar el cliente' });
    }
});


app.get('/clientes',(req, res)=>{
    const resultado = db.query ('SELECT * FROM clientes')
    res.send (resultado)
} )


app.get('/clientes/:rut', (req, res) => {
  let sql = `SELECT * FROM clientes WHERE rut = ${db.escape(req.params.rut)}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put('/clientes/:rut', async (req, res) => {
    try {
        const rutCliente = req.params.rut;
        // Obtén los nuevos detalles del cliente desde el cuerpo de la solicitud
        const { nombre, apellido, email, telefono } = req.body;

        // Realiza la actualización en la base de datos
        const sql = `UPDATE clientes SET nombre = ?, apellido = ?, email = ?, telefono = ? WHERE rut = ?`;
        await db.query(sql, [nombre, apellido, email, telefono, rutCliente]);

        res.status(200).json({ mensaje: 'Detalles del cliente actualizados correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar los detalles del cliente' });
    }
});


app.delete('/clientes/:rut', async (req, res) => {
    try {
        const rutCliente = req.params.rut;

        // Realiza la eliminación en la base de datos
        const sql = `DELETE FROM clientes WHERE rut = ?`;
        await db.query(sql, [rutCliente]);

        res.status(200).json({ mensaje: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el cliente' });
    }
});

// Rutas para vuelos
app.post('/vuelos', async (req, res) => {
    try {
        // Obtén los datos del vuelo desde el cuerpo de la solicitud
        const { fecha_hora_partida, fecha_hora_llegada, ciudad_origen, ciudad_destino, aeropuerto_origen, aeropuerto_llegada, pais_origen, pais_destino } = req.body;

        // Realiza la inserción en la base de datos
        const sql = `INSERT INTO vuelos (fecha_hora_partida, fecha_hora_llegada, ciudad_origen, ciudad_destino, aeropuerto_origen, aeropuerto_llegada, pais_origen, pais_destino) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        await db.query(sql, [fecha_hora_partida, fecha_hora_llegada, ciudad_origen, ciudad_destino, aeropuerto_origen, aeropuerto_llegada, pais_origen, pais_destino]);

        res.status(201).json({ mensaje: 'Vuelo registrado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar el vuelo' });
    }
});

app.get('/vuelos/:id_vuelo', async (req, res) => {
    try {
        const idVuelo = req.params.id_vuelo;

        // Realiza la consulta en la base de datos para obtener detalles del vuelo
        const sql = `SELECT * FROM vuelos WHERE id_vuelo = ?`;
        const result = await db.query(sql, [idVuelo]);

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener detalles del vuelo' });
    }
});

// Rutas para reservas
app.post('/reservas', async (req, res) => {
    try {
        // Obtén los datos de la reserva desde el cuerpo de la solicitud
        const { id_reserva, id_estado_reserva, rut_cliente, id_vuelo } = req.body;

        // Realiza la inserción en la base de datos
        const sql = `INSERT INTO reservas (id_reserva, id_estado_reserva, rut_cliente, id_vuelo) VALUES (?, ?, ?, ?)`;
        await db.query(sql, [id_reserva, id_estado_reserva, rut_cliente, id_vuelo]);

        res.status(201).json({ mensaje: 'Reserva realizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al realizar la reserva' });
    }
});


app.get('/reservas/:id_reserva', async (req, res) => {
    try {
        const idReserva = req.params.id_reserva;

        // Realiza la consulta en la base de datos para obtener los detalles de la reserva
        const sql = `SELECT * FROM reservas WHERE id_reserva = ?`;
        const result = await db.query(sql, [idReserva]);

        // Verifica si se encontraron resultados
        if (result.length === 0) {
            return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener detalles de la reserva' });
    }
});


app.put('/reservas/:id_reserva', async (req, res) => {
    try {
        const idReserva = req.params.id_reserva;

        // Obtén los nuevos datos de la reserva desde el cuerpo de la solicitud
        const { id_estado_reserva, rut_cliente, id_vuelo } = req.body;

        // Realiza la actualización en la base de datos
        const sql = `UPDATE reservas SET id_estado_reserva = ?, rut_cliente = ?, id_vuelo = ? WHERE id_reserva = ?`;
        await db.query(sql, [id_estado_reserva, rut_cliente, id_vuelo, idReserva]);

        res.status(200).json({ mensaje: 'Reserva actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar la reserva' });
    }
});

app.delete('/reservas/:id_reserva', async (req, res) => {
    try {
        const idReserva = req.params.id_reserva;

        // Realiza la eliminación de la reserva en la base de datos
        const sql = `DELETE FROM reservas WHERE id_reserva = ?`;
        await db.query(sql, [idReserva]);

        res.status(200).json({ mensaje: 'Reserva cancelada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al cancelar la reserva' });
    }
});


app.listen(port, () => {
    console.log(`Estoy ejecutandome en http://localhost:${port}`)
});
// Rutas para vuelos
app.post('/vuelos', async (req, res) => {
    try {
        // Obtén los datos del vuelo desde el cuerpo de la solicitud
        const { fechaHoraPartida, fechaHoraLlegada, ciudadOrigen, ciudadDestino, aeropuertoOrigen, aeropuertoLlegada, paisOrigen, paisDestino } = req.body;

        // Crea un nuevo objeto VueloModel
        const nuevoVuelo = new VueloModel({
            fechaHoraPartida,
            fechaHoraLlegada,
            ciudadOrigen,
            ciudadDestino,
            aeropuertoOrigen,
            aeropuertoLlegada,
            paisOrigen,
            paisDestino
        });

        // Guarda el vuelo en la base de datos
        await nuevoVuelo.save();

        res.status(201).json({ mensaje: 'Vuelo registrado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar el vuelo' });
    }
});

// Rutas para reservas
app.post('/reservas', async (req, res) => {
    try {
        // Obtén los datos de la reserva desde el cuerpo de la solicitud
        const { idVuelo, nombrePasajero, fechaVuelo } = req.body;

        // Crea un nuevo objeto ReservaModel
        const nuevaReserva = new ReservaModel({
            idVuelo,
            nombrePasajero,
            fechaVuelo
        });

        // Guarda la reserva en la base de datos
        await nuevaReserva.save();

        res.status(201).json({ mensaje: 'Reserva realizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al realizar la reserva' });
    }
});
