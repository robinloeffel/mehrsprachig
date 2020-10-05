module.exports = {
  presets: [[ '@babel/preset-env', {
    useBuiltIns: 'usage',
    bugfixes: true,
    corejs: 3
  }]],
  exclude: 'node_modules/**'
};
