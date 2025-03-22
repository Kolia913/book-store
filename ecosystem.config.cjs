module.exports = {
  apps: [
    {
      name: "Obert_Book_Store",
      exec_mode: "cluster",
      instances: 1,
      script: "./.output/server/index.mjs",
      env: {
        PORT: 3000,
        NODE_ENV: "production",
      },
    },
  ],
};
