"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("cart_items", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            cart_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "carts", key: "id" },
                onDelete: "CASCADE",
            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "products", key: "id" },
                onDelete: "CASCADE",
            },
            quantity: { type: Sequelize.INTEGER, allowNull: false },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });

        await queryInterface.addIndex("cart_items", ["cart_id", "product_id"], {
            unique: true,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("cart_items");
    },
};
