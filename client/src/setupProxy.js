const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
/*
  app.use(
    '/geocode',
    createProxyMiddleware({
        target: 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode',
        changeOrigin: true,
        pathRewrite: {
            '^/geocode':''
        }
    }),
  );

  app.use(
    '/address',
    createProxyMiddleware({
        target: 'https://openapi.naver.com/v1/search/local.json',
        changeOrigin: true,
        pathRewrite: {
            '^/address':''
        }
    }),
  );
*/
  app.use(
    '/info',
    createProxyMiddleware({
        //target: 'http://192.168.0.51:8080/info',
        target: 'http://localhost:8080/info',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
            '^/info':''
        }
    }),
  );

  
};