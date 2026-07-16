const router = require("express").Router();

const customersController = require("./customers.controller.js");

router.get("/", customersController.getAllCustomers);
router.get("/:id", customersController.getCustomerById);
router.post("/", customersController.createCustomer);
router.put("/:id", customersController.updateCustomer);
router.delete("/:id", customersController.deleteCustomer);

module.exports = router;