export default {
    presets: [
        ['@babel/preset-env', {
            targets: {
                ie: 11,
                browsers: 'last 2 versions'
            },
            useBuiltIns: 'usage',
            modules: false,
            debug: true
        }]
    ],
    ignore: [ 'node_modules' ]
};
