import fs from 'fs'
import obfuscator from 'javascript-obfuscator'

// Buat folder dist
fs.mkdirSync('dist', { recursive: true })

// Copy index.html dan style.css
fs.copyFileSync('src/index.html', 'dist/index.html')
fs.copyFileSync('src/style.css', 'dist/style.css')

// Obfuscate script.js
const js = fs.readFileSync('src/script.js', 'utf8')
const obfuscated = obfuscator.obfuscate(js, {
  compact: true,
  controlFlowFlattening: true,
}).getObfuscatedCode()

fs.writeFileSync('dist/script.js', obfuscated)

console.log('✅ Build selesai dengan obfuscation')
