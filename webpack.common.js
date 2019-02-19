const path = require('path');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// TODO - exclude node_modules in css loader
module.exports = {
	output: {
		publicPath: '/admin/static/'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all'
				}
			}
		}
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json', '.scss', '.css'],
		plugins: [
			new TsConfigPathsPlugin()
		],
		modules: [
			__dirname,
			path.join(__dirname, 'node_modules'),
		]
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin(),
		new StyleLintPlugin({
			files: './assets/styles/**/*.s?(a|c)ss',
			configFile: 'stylelint.json'
		})
	]
};
