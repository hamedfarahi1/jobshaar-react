const proxy = require('http-proxy-middleware');
module.exports = function (app) {
	app.use(
		'/api',
		proxy.createProxyMiddleware({
			target: 'https://jobshaar.herokuapp.com',
			changeOrigin: true,
		})
	);
};