const path = require('path');
const glob = require('glob');

const ENV = process.env.npm_lifecycle_event;
const PATHS = { src: path.join(__dirname, 'src') };

const HtmlCriticalPlugin = require('html-critical-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
	plugins: [
		new StyleLintPlugin({
			configFile: '.stylelintrc',
			files: ['src/scss/**/*.scss', 'src/app/**/*.scss'],
			fix: true,
		}),
	],
};

if (ENV === 'build') {
	module.exports.plugins.push(
		new HtmlCriticalPlugin({
			base: 'dist/browser',
			src: 'index.html',
			dest: 'index.html',
			inline: true,
			minify: true,
			extract: true,
		}),
		new PurgecssPlugin({
			paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
		}),
	);
}
