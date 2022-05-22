module.exports = {
  entry: {
    quiz:"./src/quiz.ts"
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].bundle.js"
  },
  module:{
    rules:[
      {
        test:/\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use:[{
          loader: "ts-loader"
        }]
      }
  ]},
  resolve: {
    extensions: ['.js', '.ts', 'tsx'],
 }
}
