const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const GenerateAssetPlugin = require('generate-asset-webpack-plugin-new');

const config = require('./config/app-config.json');
function createServerConfig(compilation) {
  return JSON.stringify(
    Object.assign({
      _hash: compilation.hash
    }, config)
  )
}

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_URL]: ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/styles/global.scss";'
      },
    }
  },
  configureWebpack: {
    name: process.env.VUE_APP_TITLE_NAME,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    plugins: [
      new GenerateAssetPlugin({
        filename: 'config/app-config.json',
        fn: (compilation, cb) => {
          cb(null, createServerConfig(compilation));
        }
      }),
    ]
  },
  chainWebpack: (config) => {
    config.module
      .rule('svg')
      .exclude.add(path.resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
