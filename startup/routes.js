const express = require('express');
//import local module
const genresRouter = require('../routes/genres')
const customerRouter = require('../routes/customers')
const movieRouter = require('../routes/movies')
const rentalRouter = require('../routes/rentals')
const userRouter = require('../routes/users')
const authRouter = require('../routes/login')
const errorHandler = require('../middleware/errorHandler');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/genres', genresRouter)
    app.use('/api/customers', customerRouter)
    app.use('/api/movies', movieRouter)
    app.use('/api/rentals', rentalRouter)
    app.use('/api/register', userRouter)
    app.use('/api/login', authRouter)
    app.use(errorHandler);
}