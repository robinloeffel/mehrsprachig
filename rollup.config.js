// import babel from 'rollup-plugin-babel';
// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
// import { uglify } from 'rollup-plugin-uglify';
import { eslint } from 'rollup-plugin-eslint';

// merge the basic config that is the same for all
// with the one tailored to the respective output
const mergeConfigs = config => Object.assign(config, {
    dir: 'dist',
    sourcemap: true
});

export default {
    input: 'src/mehrsprachig.js',
    output: [ mergeConfigs({
        file: 'mehrsprachig.es.js',
        format: 'es'
    }), mergeConfigs({
        name: 'Mehrsprachig',
        file: 'mehrsprachig.umd.js',
        format: 'umd'
    }) ],
    plugins: [ eslint() ]
};
