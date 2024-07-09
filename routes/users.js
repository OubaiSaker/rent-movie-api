const register = require('../controllers/usersConroller')
const express = require('express');
const router = express.Router();

router.post('/', register);

module.exports = router;