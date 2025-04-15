"use strict";
import { Model, DataTypes } from "sequelize";
export class Event extends Model {
  static associate(_models) {}
}
Event.init(
  {
   id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(1024),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    tickets_available: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    event_end:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Event",
    tableName: "bks_events",
    underscored: true,
    timestamps: true,
  }
);
