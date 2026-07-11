const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// CONFIGURACIÓN DE MONGODB (Adaptada para Docker y Local)
const url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/cafeteria_uleam';
const client = new MongoClient(url);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos directamente desde la raíz
app.use(express.static(__dirname));

async function iniciarServidor() {
    try {
        await client.connect();
        console.log('Conectado exitosamente a MongoDB');
        const db = client.db('cafeteria_uleam');
        const pedidosCollection = db.collection('pedidos');

        // Ruta para guardar un nuevo pedido (Frontend -> Backend)
        app.post('/pedidos', async (req, res) => {
            try {
                const nuevoPedido = {
                    producto: req.body.producto,
                    cantidad: parseInt(req.body.cantidad),
                    cliente: req.body.cliente,
                    fecha: new Date()
                };

                const resultado = await pedidosCollection.insertOne(nuevoPedido);
                console.log('Pedido guardado:', resultado.insertedId);
                res.send('<h1>¡Pedido Recibido con Éxito!</h1><a href="/index.html">Volver</a>');
            } catch (error) {
                console.error('Error al guardar el pedido:', error);
                res.status(500).send('Error interno del servidor');
            }
        });

        // Ruta para obtener todos los pedidos (Backend -> Panel del Barista)
        app.get('/api/pedidos', async (req, res) => {
            try {
                const listaPedidos = await pedidosCollection.find({}).toArray();
                
                // MAPEO SEGURO: Asegura que los campos coincidan exactamente con tu HTML
                const pedidosMapeados = listaPedidos.map(p => ({
                    _id: p._id,
                    producto: p.producto || "No especificado",
                    cantidad: p.cantidad || 1,
                    cliente: p.cliente || "Anónimo"
                }));

                res.json(pedidosMapeados);
            } catch (error) {
                console.error('Error al obtener pedidos:', error);
                res.status(500).json({ error: 'Error al obtener los pedidos' });
            }
        });

        // Enrutar vistas fijas
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'index.html'));
        });

        app.get('/barista', (req, res) => {
            res.sendFile(path.join(__dirname, 'barista.html'));
        });

        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });

    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

iniciarServidor();