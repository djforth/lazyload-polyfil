// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',

  plugins: [
    resolve({
      mainFields: ['module', 'main', 'jsnext:main'],
      browser: true,
      extensions: ['.js'],
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
      // , externalHelpers: true
      // , plugins: ['external-helpers']
      // , runtimeHelpers: true
    }),
    replace({
      exclude: 'node_modules/**',
      ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
    }),
    uglify(),
  ],
  external: ['@djforth/viewport-detection-fp', 'lodash/isEmpty'],

  output: {
    name: 'VanillaCarousel',
    sourcemap: true,
    file: 'index.js',
    format: 'umd',
    globals: {
      // map 'some-npm-package' to 'SomeNPMPackage' global variable
      lodash: '_',
      'lodash/isEmpty': 'isEmpty',
      '@djforth/viewport-detection-fp': 'ViewportDetect',
    },
  },
};
