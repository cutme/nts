const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const sourceMap = true;

module.exports = merge(common, {
    module: {
    	rules: [
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: 'happypack/loader?id=sass'
                }),
                enforce: "pre"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        createHappyPlugin('sass', ['css-loader?importLoaders:1!group-css-media-queries-loader?options:sourceMap!postcss-loader!sass-loader']),

        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                drop_console: false
            },
            minimize: true,
            sourceMap: true,
		}),
		
        
	]
});

function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    verbose: false,
  });
}