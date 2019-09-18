import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import copy from 'rollup-plugin-copy';
import { entry, main, unpkg } from './package.json';


const prod = process.env.prod === 'true';
const copyConfig = {
  targets: [{
    src: 'dist/mehrsprachig.browser.*',
    dest: 'page'
  }],
  hook: 'writeBundle'
};


export default [{
    input: entry,
    output: {
        sourcemap: true,
        file: main,
        format: 'es'
    },
    external: [
        'whatwg-fetch',
    ]
}, {
    input: entry,
    plugins: [
        eslint(),
        resolve(),
        commonjs(),
        babel(),
        prod && terser(),
        copy(copyConfig)
    ],
    output: {
        sourcemap: !prod,
        file: unpkg,
        format: 'iife',
        name: 'Mehrsprachig'
    }
}];
