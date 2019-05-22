const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  target: 'web',
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },{
        test: /\.babel$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'stylus-loader',
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 利用该插件可以在js代码里调用node变量，同时可以利用该插件在编译时剔除调试代码
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
};

if(isDev) {
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    port: '8000',
    host: '0.0.0.0',
    overlay: {
      errors: true, // 把错误显示在页面上
    },
    hot: true
    // open: true,
    // historyFallback: {
    //
    // }
  };
  config.plugins.push(
    // 热加载
    new webpack.HotModuleReplacementPlugin(),
    // 减少不需要的信息展示
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config;