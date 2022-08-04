const express = require('express');
const router = express.Router();
const users = require('../controllers/usersController')

router.get('/users', users.getAll);
router.get('/users/:id', users.getOne);
router.post('/users', users.create);
module.exports = router;