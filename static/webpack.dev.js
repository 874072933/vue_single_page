const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//var px2rem = require('postcss-px2rem');
var entry = require('./webpack.entry.js');


module.exports = {
	entry: entry,
	devtool: 'inline-source-map',
	module: {

		loaders: [{
			test: /\.html$/,
			loader: 'html-loader'
		}, {
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
//			options: {
//				postcss: function() {
//					return [px2rem({
//						remUnit: 75
//					})];
//				}
//			}
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)\w*/,
			loader: 'url-loader?limit=10000&name=img/[name].[hash].[ext]'
		}]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "[name].js"
	}
	// devServer: {
	// 	inline: true,
	// 	contentBase: './',
	// 	hot: true
	// },
	// plugins: [
	// 	new webpack.HotModuleReplacementPlugin()
	// 	// new UglifyJSPlugin()
	// ]
};