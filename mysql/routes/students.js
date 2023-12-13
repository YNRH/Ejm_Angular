// routes/students.js

const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

router.get('/all', studentsController.getAllStudents);

module.exports = router;
