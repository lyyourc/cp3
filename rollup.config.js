import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const env = process.env.NODE_ENV

const plugins = env === 'prod'
  ? []
  : [livereload('dist'), serve()]

export default {
  entry: 'src/main.js',
  format: 'umd',
  dest: 'dist/cp3.js',
  moduleName: 'cp3',
  plugins,
}