const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'dbangularalumno'
});

// Conexión a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a MySQL: ', error);
    return;
  }
  console.log('Conexión exitosa a MySQL');
});

// Configurar Pug como motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get('/', (req, res) => {
  // Realizar consulta a la base de datos
  connection.query('SELECT * FROM alumno', (error, resultados) => {
    if (error) {
      console.error('Error al obtener los datos: ', error);
      return;
    }
    res.render('index', { datos: resultados });
  });
});

// Manejar la solicitud POST para agregar datos
app.post('/', (req, res) => {
  const nuevoDato = req.body.nuevoDato;
  const consulta = 'INSERT INTO alumno (nombre) VALUES (?)';

  connection.query(consulta, [nuevoDato], (error, results) => {
    if (error) {
      console.error('Error al insertar datos: ', error);
      return;
    }
    console.log('Dato insertado exitosamente');
    res.redirect('/');
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
