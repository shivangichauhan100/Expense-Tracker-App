// client/src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/favicon.ico',
    (req, res) => res.sendStatus(204)  // Responds with no content (successfully ignores the request)
  );
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
