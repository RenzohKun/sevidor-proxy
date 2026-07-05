const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

// Configuración de la conexión a MongoDB local (Puerto 27107 solicitado)
const mongoUrl = 'mongodb://127.0.0.1:27107'; 
const dbName = 'cafeteria_uleam';
let db;

// Middlewares necesarios para recibir datos del form y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para servir los archivos HTML estáticos de tu carpeta
app.use(express.static(__dirname));

// Conectar al Servidor de Base de Datos MongoDB
MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
    .then(client => {
        console.log('Conectado exitosamente a MongoDB');
        db = client.db(dbName);
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error);
    });

// Ruta GET para la raíz: envía la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta POST: Recibe los datos de hacer-pedido.html y los inserta en Mongo
app.post('/api/pedidos', async (req, res) => {
    try {
        const nuevoPedido = {
            cliente: req.body.cliente,
            tipo_cafe: req.body.tipo_cafe,
            tamano: req.body.tamano,
            notas: req.body.notas,
            estado: 'En preparación', 
            fecha: new Date() // Marca de tiempo del pedido
        };

        const collection = db.collection('pedidos');
        await collection.insertOne(nuevoPedido);
        
        console.log(`Nuevo pedido registrado de: ${req.body.cliente}`);
        
        // Al terminar, redirigimos automáticamente a la vista del Barista
        res.redirect('/panel-pedidos.html');
    } catch (error) {
        console.error('Error al guardar el pedido en MongoDB:', error);
        res.status(500).send('Error interno del servidor al procesar el pedido.');
    }
});

// Ruta GET: Consulta la colección para mostrar los datos en panel-pedidos.html
app.get('/api/pedidos', async (req, res) => {
    try {
        const collection = db.collection('pedidos');
        // Extraemos los pedidos, ordenando por fecha (el más reciente arriba)
        const pedidos = await collection.find({}).sort({ fecha: -1 }).toArray();
        res.json(pedidos);
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        res.status(500).json({ error: 'Error al obtener los pedidos de la base de datos' });
    }
});

// Levantar el Servidor de Aplicaciones en el puerto 3000
app.listen(port, () => {
    console.log(`☕ Servidor de "AromaVirtual" escuchando en http://localhost:${port}`);
    console.log('Asegúrate de que el servicio de MongoDB esté iniciado en el puerto 27107');
});