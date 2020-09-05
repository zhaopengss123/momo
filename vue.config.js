module.exports = {
    devServer: {
      port: 8080,
      open: true,  
      proxy: {
        '/api': {
          target: 'http://47.111.169.139:8765',
          ws: true,
          changeOrigin: true
        }
      }
    }
  }