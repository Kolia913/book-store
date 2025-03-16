"use strict";
import { Model, DataTypes } from "sequelize";
export class Purchase extends Model {
  static associate(models) {
    Purchase.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      onDelete: "SET NULL",
    });
  }
}
Purchase.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    payment_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    payment_details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    delivery_data: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: "{}",
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cart_data: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: "{}",
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "bks_customers",
        key: "id",
      },
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "Purchase",
    tableName: "bks_purchases",
    underscored: true,
    timestamps: true,
  }
);
