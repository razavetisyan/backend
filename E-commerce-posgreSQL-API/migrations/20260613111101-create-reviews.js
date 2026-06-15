"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("reviews", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
                onDelete: "CASCADE",
            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "products", key: "id" },
                onDelete: "CASCADE",
            },
            rating: { type: Sequelize.INTEGER, allowNull: false },
            comment: { type: Sequelize.TEXT },
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

        await queryInterface.addIndex("reviews", ["user_id", "product_id"], {
            unique: true,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("reviews");
    },
};
