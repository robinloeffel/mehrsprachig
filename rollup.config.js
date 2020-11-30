import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import eslint from '@rbnlffl/rollup-plugin-eslint';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

import packageJson from './package.json';

const external = Object.keys(packageJson.dependencies).map(dependency => new RegExp(`${dependency}`));
const development = process.env.dev === 'true';
const watch = process.env.ROLLUP_WATCH === 'true';

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
      format: {
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
    file: packageJson.unpkg,
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
    output: [{
      format: 'cjs',
      file: packageJson.main,
      sourcemap: true,
      exports: 'auto'
    }, {
      format: 'esm',
      file: packageJson.module,
      sourcemap: true
    }],
    external
  });
}

export default config;
