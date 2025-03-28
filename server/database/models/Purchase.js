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
    payment_status: {
      type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
      allowNull: false,
      defaultValue: "pending",
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
    is_processed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    customer_data: {
      type: DataTypes.JSON,
      allowNull: true,
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
