import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';

const development = process.env.dev === 'true';

const config = [{
    input: 'index.js',
    plugins: [
        eslint(),
        resolve(),
        commonjs(),
        !development && babel(),
        !development && terser({
            output: { comments: false }
        })
    ].filter(p => p),
    output: {
        format: 'iife',
        sourcemap: development,
        name: 'mehrsprachig',
        file: 'public/mehrsprachig.iife.js'
    }
}, {
    input: 'index.js',
    plugins: [
        resolve(),
        commonjs(),
        !development && babel()
    ].filter(p => p),
    output: {
        format: 'cjs',
        file: 'public/mehrsprachig.cjs.js'
    }
}, {
    input: 'index.js',
    plugins: [
        resolve(),
        commonjs(),
        !development && babel()
    ].filter(p => p),
    output: {
        format: 'esm',
        file: 'public/mehrsprachig.esm.js'
    }
}];

export default config;
