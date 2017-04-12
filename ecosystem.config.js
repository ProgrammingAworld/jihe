var path = require('path');

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : "wapsite-game",
      script    : './bin/www',
      env: {
        NODE_ENV: "dev",
        PORT: 4000
      },
      env_production : {
        NODE_ENV: "production",
        PORT: 4002
      },
      env_test: {
        NODE_ENV: "test",
        PORT: 4001
      },
      env_dev: {
        NODE_ENV: "dev",
        PORT: 4000
      }
    }
  ]
}
