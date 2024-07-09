const { User, userValidate } = require('../models/user')
const _ = require('lodash');
const bcrypt = require('bcryptjs');


const register = async (req, res) => {
    const { error } = userValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("user already registered..")

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateAuthToken();
        return res.status(201).header('x-auth-token', token).send(_.pick(user, ['name', 'email']))
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

module.exports = register;