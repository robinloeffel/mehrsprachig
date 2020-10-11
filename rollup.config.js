import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import eslint from '@rbnlffl/rollup-plugin-eslint';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

const development = process.env.dev === 'true';
const watch = process.env.ROLLUP_WATCH === 'true';
const external = [
  /core-js/,
  /whatwg-fetch/,
  /regenerator-runtime/,
  /mdn-polyfills/,
  /@babel/
];

const config = [{
  input: 'source',
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
    }),
    watch && serve({
      open: true,
      contentBase: 'public'
    }),
    watch && livereload('public')
  ],
  output: {
    format: 'iife',
    name: 'mehrsprachig',
    file: 'public/mehrsprachig.iife.js',
    sourcemap: development
  }
}];

if (!development) {
  config.push({
    input: 'source',
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
      sourcemap: true,
      exports: 'default'
    },
    external
  }, {
    input: 'source',
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
  });
}

export default config;
