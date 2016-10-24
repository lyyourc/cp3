import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  entry: 'src/main.js',
  format: 'umd',
  dest: 'dist/cp3.js',
  moduleName: 'cp3',
  plugins: [
    livereload('dist'),
    serve()
  ]
}