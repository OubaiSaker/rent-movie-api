const Mongoose = require("mongoose")
const config = require("config")

module.exports = function () {
    const url = config.get('MONGODB_URI');
    Mongoose.connect(url)
        .then(() => console.log("connect to database sucessfully"))
        .catch((err) => console.log("could not connect to database", err))
}