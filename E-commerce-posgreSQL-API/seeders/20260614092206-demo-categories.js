"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "Electronics",
        description: "All electronic devices",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Phones",
        description: "Mobile phones",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Laptops",
        description: "Laptop computers",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
