module.exports = {
    sourceMaps: true,
    presets: [
        ['@babel/preset-env', {
            useBuiltIns: 'usage',
            corejs: 2
        }]
    ],
    ignore: [ 'node_modules' ]
};
