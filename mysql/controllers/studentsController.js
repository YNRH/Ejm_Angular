// controllers/studentsController.js

const Student= require('../models/students');

exports.getAllStudents = (req, res) => {
  Student.getAllStudents((students) => {
    res.render('students/index', { students: students });
  });
};

