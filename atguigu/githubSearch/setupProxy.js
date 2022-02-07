const proxy = require('http-proxy-middleware')  //默认库

module.exports = function(app) {
	app.use(
		proxy('/api1', {    //遇到‘/api1‘前缀，则触发该代理配置
			target:'http://localhost:5000',    //转发的目标URL
			changeOrigin:true,    //控制服务器收到的请求头中host的值。若为false，则为localhost:3000
			pathRewrite:{'^/api1':''}    //重写请求路径
		}),
		proxy('/api2', {
			target:'http://localhost:5000',
			changeOrigin:true,
			pathRewrite:{'^/api2':''}
		})
	)
}