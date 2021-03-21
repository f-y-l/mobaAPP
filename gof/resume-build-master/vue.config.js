module.exports = {
  baseUrl : './',
  pages: {
    login: {
      entry: './src/pages/login/index.js',
      template: 'public/index.html',
      title: 'login.html',
      filename: 'login.html'
    },
    edit: {
      entry: './src/pages/edit/index.js',
      template: 'public/index.html',
      title: 'index.html',
      filename: 'index.html'
    },
    adm: {
      entry: './src/pages/adm/index.js',
      template: 'public/index.html',
      title: 'adm.html',
      filename: 'adm.html'
    }
  },
  baseUrl: process.env.NODE_ENV === 'production'
    ? ''
    : '/',

  outputDir: 'dist',

  assetsDir: 'static',

  filenameHashing: true,

  // 生产环境 sourceMap
  productionSourceMap: false,

  // All options for webpack-dev-server are supported
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    open: true,

    host: 'localhost',

    port: 8080,

    https: false,

    hotOnly: false,
    // proxy: {
    //   'resume': {
    //     target: 'http://localhost:3000', // 域名
    //     changOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //     pathRewrite: {
    //       '^/resume': '/admin/api/rest/resume'
    //     }
    //   }
    // }
  },

  // 构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1

}
