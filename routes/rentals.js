const mongoose = require('mongoose');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { Rental, rentalValidate } = require('../models/rental');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const rentals = await Rental.find().sort({ dateOut: -1 })
        res.status(200).send(rentals);
    }
    catch (err) {
        res.status(500).json({ "message": err.message })
    }
});

router.post('/', async (req, res) => {
    const { error } = rentalValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const customer = await Customer.findById(req.body.customerId);
        if (!customer) return res.status(400).send("invalid Customer..");

        const movie = await Movie.findById(req.body.movieId);
        if (!movie) return res.status(400).send("invalid movie..");

        if (movie.numberInStock === 0) return res.status(404).send("movie not in stack");

        let rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                isGlod: customer.isGold,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        });
        await rental.save();
        res.status(200).send(rental);
    }
    catch (error) {
        res.status(500).send("some thing went wrong", err)
    }

})

module.exports = router;