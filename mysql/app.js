// app.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const studentsRouter = require('./routes/students');
const registrationRouter = require('./routes/registrations');

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

// Usa el enrutador de estudiantes
app.use('/students', studentsRouter);
app.use('/registrations', registrationRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
