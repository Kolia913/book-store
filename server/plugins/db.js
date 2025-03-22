import consola from "consola";
export default defineNitroPlugin(async (_nitro) => {
  try {
    consola.success("Connecting to database...");
    await sequelize.authenticate();
    consola.success("Connection has been established successfully.");

    const models = sequelize.models;
    console.log("Available models:", Object.keys(models));

    Object.values(models).forEach((model) => {
      if (typeof model.associate === "function") {
        console.log(`Associating model: ${model.name}`);
        model.associate(models);
      } else {
        console.log(`Model ${model.name} has no associate method`);
      }
    });
    consola.success("All models associations established");
  } catch (error) {
    consola.error("Cannot connect to database.");
    consola.box(error);
  }
});
