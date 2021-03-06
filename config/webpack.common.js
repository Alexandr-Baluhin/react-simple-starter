const webpack = require('webpack');
const helper = require('./root.helper');
const autoprefixer = require('autoprefixer');

exports.postCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
        flexbox: 'no-2009',
      })
    ]
  }
};

exports.config = {
  entry: {
    app: ['react-hot-loader/patch', helper.root('src', 'main.js')]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.less', '.html'],
    modules: [helper.root('src'), helper.root('node_modules')],
    mainFields: ['main', 'module']
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        polyfills: {
          test: /[\\/]node_modules[\\/](core-js|raf|es5-shim|object-assign|whatwg-fetch|@babel)/,
          name: 'polyfills',
          chunks: 'initial',
          priority: -5,
          enforce: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: -10,
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        include: helper.root('src'),
        use: ['eslint-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin()
  ]
};
