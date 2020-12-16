const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const config = {
  mode : 'development',
  entry : {
    main : './src/main.js'
  },
  output : {
    filename : "static/js/index.js",
    path : path.join(__dirname,'./dist')
  },
  resolve : {
    //配置引入文件不用加后缀
    extensions: ['.js','.jsx','.json','.vue'],
    //配置别名
    alias : {
      '@':path.join(__dirname,'./src')
    }
  },
  module : {
    rules : [
      {
        test : /\.(css|scss)$/,use : [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            //引入全局scss文件
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(__dirname,'./src/css/common.scss')]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test : /\.vue$/,loader : 'vue-loader'
      },
      {
        // 处理 html 中 img 资源
        test: /\.html$/,
        // 负责引入img，从而能被url-loader进行处理
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          // loader : 'file-loader',
          loader : 'url-loader',
          options : {
            esModule : false,
            limit : 1000
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  //热加载配置
  devServer : {
    contentBase : './dist',
    hot : true,
    port : 8001,
    host : 'localhost',
    open : false,
    //解决history模式下刷新404问题
    historyApiFallback : {
      index : '/index.html'
    }
  },
  plugins: [
    //清除上次打包的文件
    new CleanWebpackPlugin(),
    //热更新
    new webpack.HotModuleReplacementPlugin(),
    //入口文件及模板
    new HtmlWebpackPlugin({
      template : './index.html',
      filename : 'index.html'
    }),
    //处理vue loader
    new VueLoaderPlugin()
  ]
}

module.exports = config
