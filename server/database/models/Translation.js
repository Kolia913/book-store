"use strict";
import { Model, DataTypes } from "sequelize";
export class Translation extends Model {
  static associate(_models) {}
}
Translation.init(
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
    text_ua: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Translation",
    tableName: "bks_translations",
    underscored: true,
    timestamps: false,
  }
);
