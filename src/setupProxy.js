const { createProxyMiddleware } = require('http-proxy-middleware');
// const {REACT_APP_BACKEND_URL} = require('./config');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_BACKEND_URL,
      changeOrigin: true,
    })
  );
};
