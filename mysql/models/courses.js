// models/courses.js

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'db_estudiantes'
});

connection.connect();

const Course = {};

Course.getAllCourses = (callback) => {
  connection.query('SELECT * FROM courses', (error, results) => {
    if (error) {
      throw error;
    }
    callback(results);
  });
};

// Crear un nuevo courses
Course.createCourse = (courseData, callback) => {
    connection.query('INSERT INTO courses SET ?', courseData, (error, results) => {
      if (error) {
        throw error;
      }
      callback(results);
    });
  };
  
  // Obtener un courses por ID
  Course.getCourseById = (courseId, callback) => {
    connection.query('SELECT * FROM courses WHERE id = ?', courseId, (error, results) => {
      if (error) {
        throw error;
      }
      callback(results[0]);
    });
  };
  
  // Actualizar un Course por ID
  Course.updateCourse = (courseId, courseData, callback) => {
    connection.query(
      'UPDATE courses SET ? WHERE id = ?',
      [courseData, courseId],
      (error, results) => {
        if (error) {
          throw error;
        }
        callback(results);
      }
    );
  };
  
  // Eliminar un Course por ID
  Course.deleteCourse = (courseId, callback) => {
    connection.query('DELETE FROM courses WHERE id = ?', courseId, (error, results) => {
      if (error) {
        throw error;
      }
      callback(results);
    });
  };

module.exports = Course;

