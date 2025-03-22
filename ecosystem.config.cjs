module.exports = {
  apps: [
    {
      name: "obert",
      exec_mode: "cluster",
      instances: 1,
      script: "./.output/server/index.mjs",
    },
  ],
};

// export $(cat .env | xargs) && pm2 start .output/server/index.mjs --name obert
// Ubuntu
