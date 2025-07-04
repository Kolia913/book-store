"use strict";
import { Model, DataTypes } from "sequelize";
export class Book extends Model {
  static associate(_models) {}
}
Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    draft: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    author: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    page_desc_caption: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    is_on_sale: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    price_with_signature: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    discount_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    discount_price_with_signature: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    feedback_images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    is_feedback_shown: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    keep_images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    keep_feedback_images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "bks_books",
    underscored: true,
    timestamps: true,
  }
);
