/* eslint-disable func-names */
const proxy = require('http-proxy-middleware');

const serverUrl = 'http://localhost:4000';

module.exports = function(app) {
  app.use(
    proxy('/auth/*', {
      target: serverUrl,
      logLevel: 'debug'
    })
  );
  app.use(
    proxy('/api/*', {
      target: serverUrl,
      logLevel: 'debug'
    })
  );
  app.use(
    proxy('/graphql', {
      target: `${serverUrl}/graphql`,
      logLevel: 'debug'
    })
  );
};
