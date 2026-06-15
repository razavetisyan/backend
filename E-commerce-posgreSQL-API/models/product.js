const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Category, {
        through: "product_categories",
        foreignKey: "product_id",
        onDelete: "CASCADE",
      });

      Product.hasMany(models.CartItem, { foreignKey: "product_id" });
      Product.hasMany(models.OrderItem, { foreignKey: "product_id" });
      Product.hasMany(models.Review, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
      });
    }
  }

  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { min: 0.01 },
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { min: 0 },
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      underscored: true,
      timestamps: true,
    },
  );

  return Product;
};
