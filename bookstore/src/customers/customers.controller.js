const customersService = require("./customers.service.js");

async function getAllCustomers(req, res) {
    const customers = await customersService.getAllCustomers();

    res.status(200).json(customers);
}

async function getCustomerById(req, res) {
    const customer = await customersService.getCustomerById(req.params.id);

    if(!customer) {
        return res.status(404).json({
            message : "Customer not found"
        });
    }

    res.status(200).json(customer);
}

async function createCustomer(req, res) {
    const customer = await createCustomer.createCustomer(req.body);

    res.status(201).json(customer);
}

async function updateCustomer(req, res) {
    const customer = await customersService.updateCustomer(req.params.id, req.body);

    if(!customer) {
        return res.status(404).json({
            message : "Customer not found"
        });
    }

    res.status(200).json(customer);
}

async function deleteCustomer(req, res) {
    const customer = await customersService.deleteCustomer(req.params.id);
    
    if(!customer) {
        return res.status(404).json({
            message : "Customer not found"
        });
    }

    res.status(200).json(customer);
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}