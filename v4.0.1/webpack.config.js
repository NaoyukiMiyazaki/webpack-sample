process.noDeprecation = true

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const bsConfig = require('./bs.config')
const browserlist = ['last 2 version']

module.exports = {
  devtool: process.env.DEV_TOOL,
  context: `${__dirname}/src`,
  entry: {
    bundle: './index.js',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.json', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  targets: { browsers: browserlist },
                  useBuiltIns: true,
                  debug: false
                }],
                'flow'
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
                plugins: (loader) => [
                  require('autoprefixer')({ browsers: browserlist , grid: true }),
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed',
                sourceMap: true,
              }
            }
          ]
        })
      },
      {
        test: /\.ejs$/,
        use: [
          { loader: 'ejs-view-loader' }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/style.css'),

    new CopyWebpackPlugin([
      { from: `${__dirname}/src/img`, to: `${__dirname}/dist/img` }
    ]),

    new HtmlWebpackPlugin({
      template: `${__dirname}/view/index.ejs`,
      filename: `${__dirname}/dist/index.html`,
      inject: false,
    }),

    new BrowserSyncPlugin(bsConfig),
  ],
}
