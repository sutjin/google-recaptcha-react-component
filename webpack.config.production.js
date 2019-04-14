const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, "./src/index.jsx"),
  output: {
      path: path.join(__dirname, './build'),
      filename: 'index.js',
      library: 'google-recaptcha-react-component',
      libraryTarget: 'commonjs2',
      publicPath: '/build/'
  },
  resolve: {
      alias: {
        'react': path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      }
  },
  externals: {
      // Don't bundle react or react-dom
      "react": {
          commonjs: "react",
          commonjs2: "react",
          amd: "React",
          root: "React"
      },
      "react-dom": {
          commonjs: "react-dom",
          commonjs2: "react-dom",
          amd: "ReactDOM",
          root: "ReactDOM"
      }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
