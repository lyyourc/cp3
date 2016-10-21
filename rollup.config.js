import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  entry: 'src/main.js',
  format: 'umd',
  dest: 'dist/couple.js',
  moduleName: 'couple',
  plugins: [
    livereload('dist'),
    serve()
  ]
}