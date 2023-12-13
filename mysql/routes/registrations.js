// routes/registrations.js

const express = require('express');
const router = express.Router();
const registrationsController = require('../controllers/registrationsController');

router.get('/create', registrationsController.getAllData); // Aquí deberías asegurarte de tener definida la función getAllData en registrationsController

router.post('/', registrationsController.createRegistration);

module.exports = router;
