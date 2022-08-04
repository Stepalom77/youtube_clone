const express = require('express');
const router = express.Router();
const tareas = require('../controllers/tareaController')

router.get('/tareas', tareas.getAll);

module.exports = router;