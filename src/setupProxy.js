const { createProxyMiddleware } = require('http-proxy-middleware');
const {REACT_APP_BACKEND_URL} = require('./config');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: REACT_APP_BACKEND_URL,
      changeOrigin: true,
    })
  );
};
