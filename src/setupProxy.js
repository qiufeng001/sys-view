const {createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // createProxyMiddleware('^/portal',{target: 'http://localhost'});
    app.use(
        createProxyMiddleware('/portal', {
            target: 'http://localhost',
            changeOrigin: true
        })
    )
}