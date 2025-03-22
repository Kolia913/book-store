module.exports = {
  apps: [
    {
      name: "Obert_Book_Store",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
