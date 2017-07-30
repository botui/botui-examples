module.exports = {
  entry: {
    app: './app.js'
  },
  output: {
    filename: 'build.js'
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.min.js',
    }
  },
}
