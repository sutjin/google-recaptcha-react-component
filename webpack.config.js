const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: 'development',
  entry: './sample/index.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./sample/index.html",
      filename: "./index.html"
    })
  ]
};
