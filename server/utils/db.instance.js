import { Sequelize } from "sequelize";
import configFile from "../database/config/config";

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const models = [];

sequelize.Sequelize.addHook("afterDefine", (model) => {
  console.log("Define model", model.name);
  models.push(model);
});

sequelize.Sequelize.addHook("beforeFind", () => {
  models.forEach((model) => {
    model.associate(models);
  });
});

export { sequelize, Sequelize };
