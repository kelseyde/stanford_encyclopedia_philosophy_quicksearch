module.exports = {
  entry: __dirname + "/client/app.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/client/build"
  },
  devtool: 'source-map'
}
