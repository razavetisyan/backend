const { pool } = require("../utils/db.js");

async function getAllCustomers() {
  const res = await pool.query("SELECT * FROM customers");

  return res.rows;
}

async function getCustomerById(id) {
  const res = await pool.query(
    `SELECT * FROM customers WHERE id = $1 RETURNING *`,
    [id],
  );

  return res.rows[0];
}

async function createCustomer(data) {
  const { full_name, email, phone, registered_at } = data;

  const res = await pool.query(
    `INSERT INTO customers
        (full_name, email, phone, registered_at)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
    [full_name, email, phone, registered_at],
  );

  return res.rows[0];
}

async function updateCustomer(id, updatedCustomer) {
    const { full_name, email, phone, registered_at } = updatedCustomer;

    const res = await pool.query(
        `UPDATE customers
        SET full_name = $1,
        email = $2,
        phone = $3,
        registered_ad = $4
        WHERE id = $5
        RETURNING *`,
        [full_name, email, phone, registered_at, id]
    );

    return res.rows[0];
}

async function deleteCustomer(id) {
    const res = await pool.query(
        `DELETE FROM customers
        WHERE id = $1 RETURNING *`,
        [id]
    );

    return res.rows[0];
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}