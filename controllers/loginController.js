const { User } = require('../models/user')
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const Joi = require('joi')

const auth = async (req, res) => {
    const { error } = authValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('user  not found');
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("please enter a valid password");

        const token = user.generateAuthToken();

        res.status(200).header('x-auth-token', token).send("login successfully")
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const currentUser = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -_id');
    res.send(user);
}

function authValidate(user) {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        password: Joi.string().min(6).max(1024).required()
    });
    return schema.validate(user)
}


module.exports = {
    auth,
    currentUser
}

