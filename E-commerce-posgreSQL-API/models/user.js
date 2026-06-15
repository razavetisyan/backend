const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Cart, { foreignKey: "user_id", onDelete: "CASCADE" });
      User.hasMany(models.Order, { foreignKey: "user_id" });
      User.hasMany(models.Review, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }

  User.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.STRING,
        defaultValue: "customer",
        validate: { isIn: [["customer", "admin"]] },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      timestamps: true,
    },
  );

  return User;
};
