const { Customer, customerValidate, updateCustomerValidate } = require('../models/customer');

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().sort({ name: 1 })
        res.send(customers)
    }
    catch (error) {
        res.status(500).json(error)
    }
};

const createNewCustomer = async (req, res) => {
    const { error } = customerValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        });
        await customer.save();
        res.send(customer)
    }
    catch (err) {
        res.status(500).send("some thing get wrong")
    }
}

const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById({ _id: req.params.id });
        if (!customer) return res.status(404).send("customer by given id not found");
        res.status(200).send(customer)
    }
    catch (error) {
        res.status(500).json({ "message": error.message });
    }
};

const updateCustomer = async (req, res) => {
    const { error } = updateCustomerValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id,
            { ...req.body },
            { new: true });
        if (!customer) return res.status(404).send("this customer by given id not found");
        await customer.save();
        res.status(200).send(customer);
    }
    catch (error) {
        res.status(500).json({ "message": error.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete({ _id: req.params.id });
        if (!customer) return res.status(404).send("this customer by given id not found");
        res.status(200).send("customer has been deleted successfully")
    }
    catch (error) {
        res.status(500).json({ "message": error.message });
    }
};

module.exports = {
    getAllCustomers,
    createNewCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer
};