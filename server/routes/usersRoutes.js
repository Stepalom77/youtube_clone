const express = require('express');
const router = express.Router();
const users = require('../controllers/usersController')

router.get('/users', users.getAll);

module.exports = router;