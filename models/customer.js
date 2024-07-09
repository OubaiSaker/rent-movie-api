const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model("Customer", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
    },
    isGold: {
        type: Boolean,
        defalut: false,
        required: true
    }
}));

function customerValidate(customer) {
    schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(10).max(10).required(),
        isGold: Joi.boolean().required()
    })
    return schema.validate(customer)
}

function updateCustomerValidate(customer) {
    schema = Joi.object({
        name: Joi.string().min(3).max(50),
        phone: Joi.string().min(10).max(10),
        isGold: Joi.boolean
    })
    return schema.validate(customer)
}

module.exports = {
    Customer,
    customerValidate,
    updateCustomerValidate
}