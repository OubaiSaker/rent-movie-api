const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', genresController.getAllGenres)
router.post('/', auth, genresController.createNewGenre)
router.get('/:id', genresController.getGenre)
router.put('/:id', auth, genresController.updateGenre)
router.delete('/:id', [auth, admin], genresController.deleteGenre)


module.exports = router;