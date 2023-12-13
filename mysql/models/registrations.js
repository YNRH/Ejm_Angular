// models/registrations.js

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'db_estudiantes'
});

connection.connect();

const Registration = {};

Registration.getRegistrations = (callback) => {
  const query = `
    SELECT r.id AS registrations_id, s.name AS student_name, s.email, c.name AS course_name
    FROM registrations r
    INNER JOIN students s ON r.student_id = s.id
    INNER JOIN courses c ON r.course_id = c.id
  `;

  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    callback(results);
  });
};

// Crear un nuevo registrations
Registration.createRegistration = (registrationData, callback) => {
  const studentData = {
    name: registrationData.name,
    age: registrationData.age,
    email: registrationData.email
  };

  // Verificar si el estudiante ya existe
  connection.query('SELECT * FROM students WHERE email = ?', registrationData.email, (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length > 0) {
      // El estudiante ya existe, registrar la matrícula
      registrationData.student_id = results[0].id;
      connection.query('INSERT INTO registrations SET ?', registrationData, (error, results) => {
        if (error) {
          throw error;
        }
        callback(results);
      });
    } else {
      // El estudiante no existe, crearlo y luego registrar la matrícula
      connection.query('INSERT INTO students SET ?', studentData, (error, studentResult) => {
        if (error) {
          throw error;
        }

        registrationData.student_id = studentResult.insertId;
        connection.query('INSERT INTO registrations SET ?', registrationData, (error, results) => {
          if (error) {
            throw error;
          }
          callback(results);
        });
      });
    }
  });
};

// Obtener un Registration por ID
Registration.getRegistrationById = (registrationId, callback) => {
  connection.query('SELECT * FROM registrations WHERE id = ?', registrationId, (error, results) => {
    if (error) {
      throw error;
    }
    callback(results[0]);
  });
};

// Actualizar un Registration por ID
Registration.updateRegistration = (registrationId, registrationData, callback) => {
  connection.query(
    'UPDATE registrations SET ? WHERE id = ?',
    [registrationData, registrationId],
    (error, results) => {
      if (error) {
        throw error;
      }
      callback(results);
    }
  );
};

// Eliminar un Registration por ID
Registration.deleteRegistration = (registrationId, callback) => {
  connection.query('DELETE FROM registrations WHERE id = ?', registrationId, (error, results) => {
    if (error) {
      throw error;
    }
    callback(results);
  });
};




module.exports = Registration;
