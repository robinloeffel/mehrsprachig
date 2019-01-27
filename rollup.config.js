import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import pkg from './package.json';

// two separate objects for two separate outputs
// firstly esnext for bundlers, then umd for browsers
export default [{
    input: pkg.entry,
    plugins: [
        eslint(),
        resolve(),
        commonjs()
    ],
    output: {
        sourcemap: true,
        file: pkg.module,
        format: 'es'
    }
}, {
    input: pkg.entry,
    plugins: [
        eslint(),
        resolve(),
        commonjs(),
        babel(),
        terser()
    ],
    output: {
        sourcemap: true,
        file: pkg.main,
        format: 'umd',
        name: 'Mehrsprachig'
    }
}];
