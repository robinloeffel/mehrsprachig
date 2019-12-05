import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import copy from 'rollup-plugin-copy';
import { entry, module as esm, unpkg as iife , main as cjs } from './package.json';


const prod = process.env.prod === 'true';
const copyConfig = {
  targets: [{
    src: 'dist/mehrsprachig.iife.*',
    dest: 'page'
  }],
  hook: 'writeBundle'
};


export default [{
    input: entry,
    plugins: [
        eslint()
    ],
    output: {
        sourcemap: true,
        file: esm,
        format: 'es'
    },
    external: [
        'whatwg-fetch',
    ]
}, {
    input: entry,
    plugins: [
        resolve(),
        commonjs(),
        babel(),
        prod && terser(),
        copy(copyConfig)
    ],
    output: {
        sourcemap: !prod,
        file: iife,
        format: 'iife',
        name: 'Mehrsprachig'
    }
}, {
    input: entry,
    plugins: [
        resolve(),
        commonjs(),
        babel()
    ],
    output: {
        sourcemap: !prod,
        file: cjs,
        format: 'cjs'
    }
}];
