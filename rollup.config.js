import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import pkg from './package.json';

// merge the basic config that is the same for all
// with the one tailored to the respective output
const mergeConfigs = config => Object.assign(config, {
    dir: 'dist',
    sourcemap: true,
    plugins: [ resolve(), commonjs(), eslint(), babel() ]
});

export default {
    input: pkg.index,
    output: [ mergeConfigs({
        file: 'mehrsprachig.es.js',
        format: 'es'
    }), mergeConfigs({
        name: 'mehrsprachig',
        file: 'mehrsprachig.iife.js',
        format: 'iife'
    }) ]
};
