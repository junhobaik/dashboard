/* eslint-disable func-names */
const proxy = require('http-proxy-middleware');

const serverUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://ec2-52-78-242-130.ap-northeast-2.compute.amazonaws.com:4000';

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
