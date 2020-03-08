import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';

const dev = process.env.dev === 'true';

const config = [{
    input: 'index.js',
    plugins: [
        eslint(),
        resolve(),
        commonjs(),
        !dev && babel(),
        terser({
            output: { comments: false }
        })
    ].filter(p => p),
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'mehrsprachig',
        file: 'public/mehrsprachig.iife.js'
    }
}];

if (!dev) {
    config.push({
        input: 'index.js',
        plugins: [
            resolve(),
            commonjs(),
            babel()
        ],
        output: {
            sourcemap: true,
            format: 'cjs',
            file: 'public/mehrsprachig.cjs.js'
        }
    });
}

export default config;
