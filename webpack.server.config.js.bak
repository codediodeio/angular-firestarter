const webpack = require('webpack');
const WebpackConfigFactory = require('@nestjs/ng-universal')
  .WebpackConfigFactory;

module.exports = WebpackConfigFactory.create(webpack, {
  // Nest server for SSR
  server: './server/main.ts'
});
