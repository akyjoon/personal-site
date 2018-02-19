module.exports = {
  entry: {
    App: "./app/assets/scripts/index.js",
    api: "./app/assets/scripts/music.js"
  },
  output: {
    path: "./app/temp/scripts",
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}