const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

// Configuración de la conexión a MongoDB local (Puerto 27017 estándar)
const mongoUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'cafeteria_uleam';
let db;

// Middlewares necesarios para recibir datos del form y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para servir los archivos HTML estáticos de tu carpeta
app.use(express.static(__dirname));

// Conectar al Servidor de Base de Datos MongoDB
MongoClient.connect(mongoUrl)
    .then(client => {
        console.log('✅ Conectado exitosamente a MongoDB');
        db = client.db(dbName);
    })
    .catch(error => {
        console.error('❌ Error al conectar a la base de datos:', error);
    });

// Ruta GET para la raíz: envía la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ==== RUTA GET PARA EL PANEL DEL BARISTA (MODIFICADA PARA FORZAR EL CAFÉ) ====
// Duplicamos el campo del café en la salida JSON para asegurar que la tabla lo lea sí o sí
app.get('/api/pedidos', async (req, res) => {
    try {
        const listaPedidos = await db.collection('pedidos').find({}).toArray();
        
        // Mapeamos los pedidos antes de enviarlos para asegurar que lleven todas las variantes
        const pedidosFormateados = listaPedidos.map(pedido => ({
            ...pedido,
            tipo_cafe: pedido.producto || pedido.cafe || 'Café',
            cafe: pedido.producto || pedido.cafe || 'Café',
            cafeSeleccionado: pedido.producto || pedido.cafe || 'Café',
            cafe_seleccionado: pedido.producto || pedido.cafe || 'Café'
        }));
        
        res.json(pedidosFormateados);
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
});

// Ruta POST: Recibe los datos de hacer-pedido.html e insere en Mongo
app.post('/api/pedidos', async (req, res) => {
    try {
        // Mapeamos los datos de entrada del formulario de AromaVirtual
        const nuevoPedido = {
            cliente: req.body.cliente || req.body.nombre || req.body.txtCliente || 'Francis',
            nombre: req.body.cliente || req.body.nombre || 'Francis',
            
            // Atrapa el café según los campos comunes de formularios HTML
            producto: req.body.producto || req.body.cafe || req.body.tipo_cafe || req.body.selProducto || 'Espresso',
            cafe: req.body.producto || req.body.cafe || req.body.tipo_cafe || 'Espresso',
            tipo_cafe: req.body.producto || req.body.cafe || req.body.tipo_cafe || 'Espresso',
            
            cantidad: parseInt(req.body.cantidad) || 1,
            tamano: req.body.tamano || req.body.tamaño || req.body.selTamano || 'Normal',
            tamaño: req.body.tamano || req.body.tamaño || req.body.selTamano || 'Normal',
            notas: req.body.notas || req.body.notas_especiales || req.body.txtNotas || 'Ninguna',
            notas_especiales: req.body.notas || req.body.notas_especiales || req.body.txtNotas || 'Ninguna',
            estado: 'Recibido',
            fecha: new Date()
        };

        const result = await db.collection('pedidos').insertOne(nuevoPedido);
        console.log(`🛒 Pedido registrado con éxito. ID: ${result.insertedId}`);
        
        res.send('<h1>¡Pedido Realizado con Éxito!</h1><a href="/">Volver al inicio</a>');
    } catch (error) {
        console.error('Error al guardar el pedido:', error);
        res.status(500).send('Error interno al procesar el pedido');
    }
});

// Iniciar el Servidor de Express
app.listen(port, () => {
    console.log(`☕ Servidor de "AromaVirtual" escuchando en http://localhost:${port}`);
});