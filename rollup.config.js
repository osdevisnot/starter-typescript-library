const json = require('rollup-plugin-json')
const typescript = require('rollup-plugin-typescript2')
const commonjs = require('rollup-plugin-commonjs')
const sourcemap = require('rollup-plugin-sourcemaps')
const terser = require('rollup-plugin-terser').terser

const pkg = require('./package.json')

const libName = pkg.name
  .split('/')
  .pop()
  .replace(/-([a-z])/g, match => match[1].toUpperCase())

const config = {
  input: 'src/starter-typescript-library.ts',
  external: Object.keys(pkg.dependencies),
  watch: { include: 'src/**' },
  plugins: [json(), typescript({ useTsconfigDeclarationDir: true }), commonjs(), sourcemap()]
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
