import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import pkg from './package.json';

const prod = process.env.PRODUCTION === 'true';


export default [{
    input: pkg.entry,
    output: {
        sourcemap: true,
        file: pkg.module,
        format: 'es'
    },
    external: [
        'whatwg-fetch',
        'es6-promise/auto'
    ]
}, {
    input: pkg.entry,
    plugins: [
        eslint(),
        resolve(),
        commonjs(),
        babel(),
        ...(prod ? [terser()] : [])
    ],
    output: {
        sourcemap: prod ? false : true,
        file: pkg.browser,
        format: 'umd',
        name: 'Mehrsprachig'
    }
}];
