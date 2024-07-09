const jwt = require('jsonwebtoken');

const token = jwt.sign({ name: "oubai", email: "oubai@gmail.com" }, "1234567shs")



