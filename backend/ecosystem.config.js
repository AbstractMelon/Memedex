module.exports = {
  apps: [
    {
      name: "memedex-backend",
      script: "server.js",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
