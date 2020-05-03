import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';

const development = process.env.dev === 'true';
const external = [
  /core-js/,
  /whatwg-fetch/,
  /regenerator-runtime/,
  /@babel/
];

const config = [{
  input: 'index.js',
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      plugins: [ '@babel/plugin-transform-runtime' ]
    })
  ],
  output: {
    format: 'cjs',
    file: 'public/mehrsprachig.cjs.js',
    sourcemap: true
  },
  external
}, {
  input: 'index.js',
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      plugins: [ '@babel/plugin-transform-runtime' ]
    })
  ],
  output: {
    format: 'esm',
    file: 'public/mehrsprachig.esm.js',
    sourcemap: true
  },
  external
}, {
  input: 'index.js',
  plugins: [
    eslint(),
    resolve(),
    commonjs(),
    !development && babel({
      babelHelpers: 'bundled'
    }),
    !development && terser({
      output: {
        comments: false
      }
    })
  ],
  output: {
    format: 'iife',
    name: 'mehrsprachig',
    file: 'public/mehrsprachig.iife.js',
    sourcemap: development
  }
}];

export default config;
