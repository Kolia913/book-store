import consola from "consola";
export default defineNitroPlugin(async (_nitro) => {
  try {
    consola.success("Connecting to database...");
    await sequelize.authenticate();
    consola.success("Connection has been established successfully.");

    consola.success("All models associations established");
  } catch (error) {
    consola.error("Cannot connect to database.");
    consola.box(error);
  }
});
