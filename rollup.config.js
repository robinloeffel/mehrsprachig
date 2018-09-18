import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import { eslint } from 'rollup-plugin-eslint';

// two separate objects for two separate outputs
// firstly esnext for bundlers, then umd for browsers
export default [{
    input: 'src/mehrsprachig.js',
    plugins: [
        eslint(),
        resolve(),
        commonjs()
    ],
    output: {
        dir: 'dist',
        sourcemap: true,
        file: 'mehrsprachig.es.js',
        format: 'es'
    }
}, {
    input: 'src/mehrsprachig.js',
    plugins: [
        eslint(),
        resolve(),
        commonjs(),
        babel(),
        uglify()
    ],
    output: {
        dir: 'dist',
        sourcemap: true,
        name: 'Mehrsprachig',
        file: 'mehrsprachig.umd.js',
        format: 'umd'
    }
}];
