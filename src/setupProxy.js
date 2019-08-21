/* eslint-disable func-names */
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/auth/*', { target: 'http://localhost:4000', logLevel: "debug" }));
  app.use(proxy('/api/*', { target: 'http://localhost:4000', logLevel: "debug" }));
};
