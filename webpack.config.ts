import path from 'path'
// @ts-ignore
import SizePlugin from 'size-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default {
	devtool: 'sourcemap',
	stats: 'errors-only',
	entry: {
		background: './source/background',
		content: './source/content'
	},
	output: {
		path: path.join(__dirname, 'distribution'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new SizePlugin({
			writeFile: false
		}),
		new CopyWebpackPlugin([
			{
				from: '**/*',
				context: 'source',
				ignore: ['*.js', '*.ts', '*.tsx']
			},
			{
				from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js'
			}
		])
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
}
