module.exports = {
  entry: './index.js',
  target: 'node',
  output: {
    path: './',
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        // exclude: /(node_modules|bower_components)/,
        // presets: [
        //   'es2015'
        // ]
        // cacheDirectory: true,
      }
    ]
  }
}
