const { Genre, genreValidate, updateGenreValidate } = require('../models/genre');
const asyncHandler = require('../middleware/async')

const getAllGenres = asyncHandler(async (req, res) => {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
});

const createNewGenre = asyncHandler(async (req, res) => {
    const { error } = genreValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = new Genre({ name: req.body.name })
    await genre.save();
    res.send(genre)
});

const getGenre = asyncHandler(async (req, res) => {
    const genre = await Genre.findById({ _id: req.params.id });
    if (!genre) {
        throw new Error("genre By Given id not found")
    }
    res.status(200).send(genre);
});

const updateGenre = asyncHandler(async (req, res) => {
    const { error } = updateGenreValidate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    const genre = await Genre.findByIdAndUpdate(req.params.id,
        { name: req.body.name },
        { new: true });
    if (!genre) {
        throw new Error("this genre by given id is not found")
    }
    await genre.save();
    res.status(200).send(genre);

});

const deleteGenre = asyncHandler(async (req, res) => {
    const genre = await Genre.findByIdAndDelete({ _id: req.params.id });
    if (!genre) {
        throw new Error("genre by given id not found")
    }
    res.status(200).send("genre has been deleted successfully")
});

module.exports = {
    getAllGenres,
    createNewGenre,
    getGenre,
    updateGenre,
    deleteGenre
}