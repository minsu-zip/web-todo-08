const path = require('path')

const mode = process.env.NODE_ENV || 'development'

module.exports = {
  mode,
  entry: {
    main: './src/frontend',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./public/dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
    ],
  },
}
