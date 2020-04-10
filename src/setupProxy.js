const proxy = require('http-proxy-middleware');
module.exports = function (app) {
	app.use(
		'/api',
		proxy.createProxyMiddleware({
			target: 'http://188.40.195.134:8081/',
			changeOrigin: true,
		})
	);
};