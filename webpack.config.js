var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrotliPlugin = require('brotli-webpack-plugin');
var MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
	context: __dirname + '/app/js',
	entry: './index.js',
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: "/node_modules/",
				loaders: ["babel-loader", "eslint-loader"]
			},
			{
				test: /\.(scss|css)$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader", 
					use: "css-loader!sass-loader"
				})
			}
		]
	},

	plugins: [
		
		new webpack.ProvidePlugin({
			$: "jquery",
 				jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
		new ExtractTextPlugin("[name].css")
    ]

}