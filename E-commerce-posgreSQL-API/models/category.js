const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Product, {
        through: "product_categories",
        foreignKey: "category_id",
        onDelete: "CASCADE",
      });
    }
  }

  Category.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      underscored: true,
    },
  );

  return Category;
};