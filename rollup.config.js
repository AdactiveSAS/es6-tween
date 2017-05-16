import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js-harmony';

const { BUILD } = process.env;

const plugins = [ buble() ];

let moduleName = 'TWEEN';
let destFile = 'dist/' + moduleName;

if ( BUILD === 'prod' ) {
	plugins.push(uglify({}, minify));
	destFile = 'dist/' + moduleName + '.min';
}

destFile = destFile + '.js';

export default {
  entry: 'src/Tween.js',
  format: 'umd',
  dest: destFile, // equivalent to --output
  moduleName: moduleName,
  plugins: plugins
}