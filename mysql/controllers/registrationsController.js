// controllers/registrationsController.js

const Registration = require('../models/registrations');
const Course = require('../models/courses');
const Student = require('../models/students')

const registrationsController = {};

exports.getAllData = (req, res) => {
  Registration.getRegistrations((registrations) => {
    Course.getAllCourses((courses) => {
      res.render('registrations/index', { registrations: registrations, courses: courses });
    });
  });
};

// Esta función manejará tanto el registro del estudiante como el de la matrícula
exports.createRegistration = (req, res) => {
  const { name, age, email, curso } = req.body;

  // Verificar si el estudiante ya existe por su correo electrónico
  Student.getStudentByEmail(email, (existingStudent) => {
    if (!existingStudent) {
      // Si no existe, crea un nuevo estudiante
      const studentData = { name, age, email };
      Student.createStudent(studentData, (newStudent) => {
        // Luego procede a registrar la matrícula para el nuevo estudiante
        const registrationData = { student_id: newStudent.insertId, course_id: curso };
        Registration.createRegistration(registrationData, (registration) => {
          res.redirect('/registrations'); // Redirige al listado de matrículas
        });
      });
    } else {
      // Si el estudiante ya existe, procede a registrar la matrícula directamente
      const registrationData = { student_id: existingStudent.id, course_id: curso };
      Registration.createRegistration(registrationData, (registration) => {
        res.redirect('/registrations'); // Redirige al listado de matrículas
      });
    }
  });
};

module.exports = registrationsController;