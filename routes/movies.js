const { Movie, movieValidate, updateMovieValidate } = require("../models/movie");
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort({ title: 1 });
    res.status(200).send(movies);
})

router.post("/", async (req, res) => {
    const { error } = movieValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.status(400).send("invalid genre..")
        const movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });
        await movie.save();
        res.status(200).send(movie);
    }
    catch (err) {
        res.status(500).json({ "message": err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById({ _id: req.params.id });
        if (!movie) return res.status(404).send("movie by given id not found");
        res.status(200).send(movie)
    }
    catch (error) {
        res.status(500).json({ "message": error.message });
    }
})

module.exports = router;