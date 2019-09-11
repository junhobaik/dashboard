/* eslint-disable func-names */
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/auth/*', {
      target: 'https://ec2-52-78-242-130.ap-northeast-2.compute.amazonaws.com:4000',
      logLevel: 'debug'
    })
  );
  app.use(
    proxy('/api/*', {
      target: 'https://ec2-52-78-242-130.ap-northeast-2.compute.amazonaws.com:4000',
      logLevel: 'debug'
    })
  );
  app.use(
    proxy('/graphql', {
      target: 'https://ec2-52-78-242-130.ap-northeast-2.compute.amazonaws.com:4000/graphql',
      logLevel: 'debug'
    })
  );
};
