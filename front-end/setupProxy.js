const { createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        '/board/user',
        createProxyMiddleware({
            target:"http://localhost:4000",
            changeOrigin:true,
        })
    ),
    app.use(
        '/oauth',
        createProxyMiddleware({
            target:"https://kauth.kakao.com",
            changeOrigin:true,
        })
    ),
    app.use(
        '/v2',
        createProxyMiddleware({
            target:"https://kapi.kakao.com",
            changeOrigin:true,
        })
    )
    app.use(
        '/v1',
        createProxyMiddleware({
            target:"https://kapi.kakao.com",
            changeOrigin:true,
        })
    )
}