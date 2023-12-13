// models/students.js

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'db_estudiantes'
});

connection.connect();

const Student = {};

Student.getAllStudents = (callback) => {
  connection.query('SELECT * FROM students', (error, results) => {
    if (error) {
      throw error;
    }
    callback(results);
  });
};

// Crear un nuevo estudiante
Student.createStudent = (studentData, callback) => {
  connection.query('INSERT INTO students SET ?', studentData, (error, results) => {
    if (error) {
      throw error;
    }
    callback(results);
  });
};

// Función para buscar un estudiante por correo electrónico
Student.getStudentByEmail = (email, callback) => {
  connection.query('SELECT * FROM students WHERE email = ?', email, (error, results) => {
    if (error) {
      throw error;
    }
    callback(results[0]); // Devuelve el primer resultado encontrado
  });
};

// Obtener un estudiante por ID
Student.getStudentById = (studentId, callback) => {
  connection.query('SELECT * FROM students WHERE id = ?', studentId, (error, results) => {
    if (error) {
      throw error;
    }
    callback(results[0]);
  });
};

// Actualizar un estudiante por ID
Student.updateStudent = (studentId, studentData, callback) => {
  connection.query(
    'UPDATE students SET ? WHERE id = ?',
    [studentData, studentId],
    (error, results) => {
      if (error) {
        throw error;
      }
      callback(results);
    }
  );
};

// Eliminar un estudiante por ID
Student.deleteStudent = (studentId, callback) => {
  connection.query('DELETE FROM students WHERE id = ?', studentId, (error, results) => {
    if (error) {
      throw error;
    }
    callback(results);
  });
};

module.exports = Student;

