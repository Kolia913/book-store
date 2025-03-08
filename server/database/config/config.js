import "dotenv/config";
function initDbConfig() {
  return {
    development: {
      username: process.env["DATABASE_USER"] || "",
      password: process.env["DATABASE_PASSWORD"] || "",
      database: process.env["DATABASE_NAME"] || "",
      host: process.env["DATABASE_HOST"] || "",
      port: process.env["DATABASE_PORT"] ? +process.env["DATABASE_PORT"] : 0,
      dialect: process.env["DATABASE_TYPE"] || "sqlite",
      migrationStorageTableName: "bks_migrations",
    },
    // test: {
    //   username: "root",
    //   password: null,
    //   database: "database_test",
    //   host: "127.0.0.1",
    //   dialect: "mysql",
    // },
    production: {
      username: process.env["DATABASE_USER"] || "",
      password: process.env["DATABASE_PASSWORD"] || "",
      database: process.env["DATABASE_NAME"] || "",
      host: process.env["DATABASE_HOST"] || "",
      port: process.env["DATABASE_PORT"] ? +process.env["DATABASE_PORT"] : 0,
      dialect: process.env["DATABASE_TYPE"] || "sqlite",
      migrationStorageTableName: "bks_migrations",
    },
  };
}

export default initDbConfig();
