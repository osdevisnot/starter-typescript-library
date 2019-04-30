const bundles = require('tslib-cli')
const isDev = !!process.env.ROLLUP_WATCH

let config = [
  {
    input: 'src/starter-typescript-library.tsx',
    output: { file: 'dist/starter-typescript-library.mjs', format: 'es' },
    tsconfigOverride: { exclude: ['node_modules', 'dist', 'public', 'test'] },
    minify: true
  },
  {
    input: 'src/starter-typescript-library.tsx',
    output: { file: 'dist/starter-typescript-library.js', format: 'umd', name: 'starter-typescript-library' },
    tsconfigOverride: { exclude: ['node_modules', 'dist', 'public', 'test'] },
    minify: true
  }
]

// demo code on `npm start`
if (!!process.env.ROLLUP_WATCH) {
  config = [{ input: 'public/index.tsx', output: { file: 'dist/index.js', format: 'es' }, devServer: true }]
}

export default bundles(config)
