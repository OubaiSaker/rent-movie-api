const loginController = require('../controllers/loginController')
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', loginController.auth);
router.get('/:me', auth, loginController.currentUser);

module.exports = router;