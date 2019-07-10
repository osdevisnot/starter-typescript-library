/**
 * Simple setup script to be executed after degit finished cloning
 * Note: Shell commands, Writing files manually should be avoided.
 */
const path = require('path')
const fs = require('fs')
const sync = require('child_process').execSync

/**
 * Last portion of working directory....
 */
const cwd = path.join(__dirname)
const name = cwd.split(path.sep).pop()

const fromRoot = (file) => path.join(cwd, file)

/**
 * Write a README.md file
 */
fs.writeFileSync(fromRoot('README.md'), `# ${name}\n\n`, 'utf-8')

/**
 * Rewrite files replacing starter name
 */
const rewriteFiles = [
  'package.json',
  'test/starter-typescript-library.test.tsx',
  'public/index.html',
  'rollup.config.js',
]
rewriteFiles.forEach((file) => {
  const content = fs.readFileSync(fromRoot(file), 'utf-8')
  fs.writeFileSync(fromRoot(file), content.replace(/starter-typescript-library/g, name), 'utf-8')
})

const renameFiles = ['src/starter-typescript-library.tsx', 'test/starter-typescript-library.test.tsx']
renameFiles.forEach((file) => {
  const newName = file.replace(/starter-typescript-library/g, name)
  fs.renameSync(fromRoot(file), fromRoot(newName))
})

/**
 * Remove Files and Self destruct...
 */
const files = ['.travis.yml', 'setup.js']
files.forEach((file) => fs.unlinkSync(fromRoot(file)))

/**
 * Add latest devDependencies and initialize git repo
 */
let commands = []
if (!fs.existsSync(path.join('..', '..', '.git'))) {
  commands = ['ncu -u', 'yarn', 'git init', 'git add .', 'git commit -am "first commit from tslib-cli"']
} else {
  console.log('Detected Monorepo Setup. Skipping install commands...')
  const deleteFiles = ['.gitignore', '.prettierrc']
  deleteFiles.forEach((file) => fs.unlinkSync(fromRoot(file)))
}
commands.forEach((command) => {
  console.log(`----- Executing Command -----> ${command}`)
  sync(command, { stdio: [0, 1, 2] })
})
