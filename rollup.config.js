import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import pkg from './package.json';

// two separate objects for two separate outputs
// firstly esnext and cjs for bundlers, then umd for browsers
// treat whatwg-fetch as external, so the bundlers can import it themselves
export default [{
    input: pkg.entry,
    output: {
        file: pkg.module,
        format: 'es'
    },
    external: [ 'whatwg-fetch' ]
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
        file: pkg.unpkg,
        format: 'umd',
        name: 'Mehrsprachig'
    }
}];
