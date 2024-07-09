const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function genreValidate(genre) {
    schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    })
    return schema.validate(genre)
}

function updateGenreValidate(genre) {
    schema = Joi.object({
        name: Joi.string().min(3).max(50)
    })
    return schema.validate(genre)
}

module.exports = {
    Genre,
    genreSchema,
    genreValidate,
    updateGenreValidate,
}