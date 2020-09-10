module.exports = {
    devServer:{
        host: 'localhost',   //这两个可加可不加
        port: '8080',        //这两个可加可不加
        proxy:{
            '/api':{   //1
                target:'http://localhost:3060',   // **注意*****需要加上http://********
                changeOrigin:true,
                secure: false,
                pathRewrite: {
                    '^/api': '' //重写接口，去掉/paas
                }
            },
            '/song':{
                target:'https://api.qq.jsososo.com',   // **注意*****需要加上http://********
                changeOrigin:true,
                secure: true,
            }
        }
    }
}
