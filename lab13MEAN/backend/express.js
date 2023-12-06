const express = require('express');
const mongoose = require('mongoose');
const itemController = require('./controllers/itemController');

const app = express();
const port = 3000;

// Conexión a la base de datos de MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch((error) => {
    console.log('Error al conectar a MongoDB:', error);
  });

// Definir rutas para CRUD
app.get('/api/musicas', itemController.getMusicas);
app.get('/api/items/:id', itemController.getItemById);
app.post('/api/musicas', itemController.createItem);
app.put('/api/items/:id', itemController.updateItem);
app.delete('/api/items/:id', itemController.deleteItem);
// Iniciar el servidor
app.listen(port, () => {
    console.log('Servidor backend en funcionamiento en el puerto', port);
});
