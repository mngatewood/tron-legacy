const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: "./lib/index.js",
    test: "mocha-loader!./test/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.css']
  }
};
