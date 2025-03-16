"use strict";
import { Model, DataTypes } from "sequelize";
export class Customer extends Model {
  static associate(models) {
    Customer.hasMany(models.Purchase, {
      foreignKey: "customer_id",
      onDelete: "SET NULL",
    });
  }
}
Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Customer",
    tableName: "bks_customers",
    underscored: true,
    timestamps: true,
  }
);
