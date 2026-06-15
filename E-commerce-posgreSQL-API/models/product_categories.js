const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ProductCategory extends Model {
    static associate(models) {}
  }

  ProductCategory.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ProductCategory",
      tableName: "productCategories",
      underscored: true,
    },
  );

  return ProductCategory;
};
