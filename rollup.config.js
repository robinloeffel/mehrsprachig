import buble from '@rollup/plugin-buble';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';

const dev = process.env.dev === 'true';

export default {
    input: 'mehrsprachig.js',
    plugins: [
        eslint(),
        resolve(),
        commonjs(),
        !dev && buble(),
        !dev && terser({
            output: { comments: false }
        })
    ].filter(p => p),
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'mehrsprachig',
        file: 'public/mehrsprachig.js'
    }
};
