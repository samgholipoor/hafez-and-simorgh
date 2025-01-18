const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const minimize = mode === 'production';
const plugins = [];

module.exports = {
  mode,
  target: 'web',
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'index.js'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.cjs', '.js', '.jsx', '.json'],
  },
  externals: {
    osjs: 'OSjs',
  },
  optimization: {
    minimize,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/**/*'),
          context: path.resolve(__dirname, 'src'),
        },
      ],
    }),
    new webpack.DefinePlugin({
      'window.__ASSETS_PREFIX__': JSON.stringify('/apps/Simorgh/'),
    }),
    ...plugins,
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|cjs)$/, // Match both .js and .jsx files
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', // Transpile modern JavaScript
              ['@babel/preset-react', {runtime: 'automatic'}], // Transpile JSX and React
            ],
          },
        },
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   'style-loader',
        //   'css-loader',
        //   'postcss-loader',
        // ],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true},
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('tailwindcss'), require('autoprefixer')],
              },
            },
          },
        ],
      },
    ],
  },
};
