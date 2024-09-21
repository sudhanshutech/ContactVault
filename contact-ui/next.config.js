const compose = require("next-compose");
const webpack = require("webpack");

module.exports = compose([
  {
    experimental: { esmExternals: true },
  },
  {
    webpack: config => {
      const buildEnvironment = process.env.NODE_ENV;
      const env = new webpack.EnvironmentPlugin({
        "process.env.NODE_ENV": process.env.NODE_ENV || "production",
        "process.env.BUILD_ENV": buildEnvironment,
        
      });
      config.plugins = [...config.plugins, env];
      return config;
    }
  }
]);
