const json = require('rollup-plugin-json')
const typescript = require('rollup-plugin-typescript2')
const commonjs = require('rollup-plugin-commonjs')
const sourcemap = require('rollup-plugin-sourcemaps')
const serve = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')
const resolve = require('rollup-plugin-node-resolve')

const terser = require('rollup-plugin-terser').terser

const pkg = require('./package.json')

const isDev = !!process.env.ROLLUP_WATCH

const libName = pkg.name
  .split('/')
  .pop()
  .replace(/-([a-z])/g, match => match[1].toUpperCase())

const config = {
  input: 'src/starter-typescript-library.ts',
  external: isDev ? [] : Object.keys(pkg.dependencies),
  watch: { include: 'src/**' },
  plugins: [
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    isDev && resolve(),
    sourcemap(),
    isDev && serve({ contentBase: ['public', 'dist'], historyApiFallback: true, port: 4444 }),
    isDev && livereload('dist')
  ].filter(Boolean)
}

export default [
  {
    ...config,
    output: [{ file: pkg.main, format: 'cjs', sourcemap: true }, { file: pkg.module, format: 'es', sourcemap: true }]
  },
  {
    output: [{ file: pkg.browser, format: 'iife', sourcemap: true, name: libName }],
    ...config,
    plugins: [...config.plugins, terser()]
  }
]
