import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import eslint from '@rbnlffl/rollup-plugin-eslint';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

import packageJson from './package.json';

const development = process.env.dev === 'true';
const watch = process.env.ROLLUP_WATCH === 'true';

export default {
  input: 'source',
  plugins: [
    eslint(),
    resolve(),
    commonjs(),
    watch && serve({
      open: true,
      contentBase: 'public'
    }),
    watch && livereload('public')
  ].filter(plugin => plugin),
  output: [{
    format: 'iife',
    name: 'mehrsprachig',
    file: packageJson.browser,
    sourcemap: development,
    plugins: [
      terser({
        format: {
          comments: false
        }
      })
    ]
  }, {
    format: 'cjs',
    file: packageJson.main,
    sourcemap: true
  }].filter(output => output)
};
