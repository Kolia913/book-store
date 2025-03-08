"use strict";
import { Model, DataTypes } from "sequelize";
export class Admin extends Model {
  static associate(_models) {}
}
Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Admin",
    tableName: "bks_managers",
    underscored: true,
    timestamps: false,
  }
);
