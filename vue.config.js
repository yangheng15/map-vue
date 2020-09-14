module.exports = {
    devServer: {
        proxy: {
            '/proxyApi': {
                target: 'http://dev.xxx.com',
                changeOrigin: true,
                pathRewrite: {
                    '/proxyApi': ''
                }
            }
        }
    }
}