import fs from 'fs'
import path from 'path'
import obfuscator from 'javascript-obfuscator'

// Pastikan dist folder dibuat
fs.mkdirSync('dist', { recursive: true })

// Copy HTML dan CSS biasa
const copyIfExists = (filename) => {
  const srcPath = `src/${filename}`
  const distPath = `dist/${filename}`
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, distPath)
    console.log(`✅ Copied ${filename}`)
  }
}

copyIfExists('index.html')
copyIfExists('style.css')

// Obfuscate semua .js file di src/
const files = fs.readdirSync('src').filter(f => f.endsWith('.js'))

files.forEach(file => {
  const input = fs.readFileSync(`src/${file}`, 'utf8')
  const obfuscated = obfuscator.obfuscate(input, {
    compact: true,
    controlFlowFlattening: true,
  }).getObfuscatedCode()

  fs.writeFileSync(`dist/${file}`, obfuscated)
  console.log(`🔒 Obfuscated ${file}`)
})

console.log('✅ Semua file JS telah di-obfuscate dan siap deploy.')
