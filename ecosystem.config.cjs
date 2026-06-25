module.exports = {
  apps: [
    {
      name: process.env.PM2_APP_NAME || "profile",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: process.env.DEPLOY_PATH || "/var/www/profile",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT || 3010,
      },
    },
  ],
};
