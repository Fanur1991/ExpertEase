const { createProxyMiddleware } = require('http-proxy-middleware');
const { BACKEND_BASE_URL } = require('./config');

// https://www.unpkg.com/browse/http-proxy-middleware@1.0.4/README.md
const options = {
  target: BACKEND_BASE_URL,
  changeOrigin: true,
};

module.exports = function (app) {
  app.use(createProxyMiddleware(['/api'], options));
};
