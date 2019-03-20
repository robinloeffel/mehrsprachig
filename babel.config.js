module.exports = {
    sourceMaps: true,
    presets: [
        ['@babel/preset-env', {
            useBuiltIns: 'usage',
            corejs: 'core-js@3'
        }]
    ],
    ignore: [ 'node_modules' ]
};
