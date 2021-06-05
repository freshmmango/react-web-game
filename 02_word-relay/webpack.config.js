const path = require('path')

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development', // 실서비스: production으로 바꾸면 됨
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'] // file 중 js, jsx extension 파일을 찾음
  },
  
  entry: {
    app: ['./client']
  }, // 입력

  module: {
    rules: [{
      test: /\.jsx?/, // js, jsx 파일에 babel을 적용하겠다
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react']
      }
    }]
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  }, // 출력
}