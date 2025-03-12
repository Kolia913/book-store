"use strict";
import { Model, DataTypes } from "sequelize";

export class Page extends Model {
  static associate(_models) {}
}

Page.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    admin_title: {
      type: DataTypes.STRING(512),
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: "{}",
    },
  },
  {
    sequelize,
    modelName: "Page",
    tableName: "bks_pages",
    underscored: true,
    timestamps: false,
  }
);
