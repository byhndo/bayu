// build.js
import fs from 'fs';
import path from 'path';
import obfuscator from 'javascript-obfuscator';

const inputDir = './js';
const outputDir = './dist/js';
const htmlSource = './index.html';
const htmlDest = './dist/index.html';

// 1. Buat folder output jika belum ada
fs.mkdirSync(outputDir, { recursive: true });

// 2. Obfuscate semua file JS di ./js → ./dist/js
fs.readdirSync(inputDir).forEach(file => {
  const filePath = path.join(inputDir, file);
  if (file.endsWith('.js')) {
    const code = fs.readFileSync(filePath, 'utf-8');
    const obfuscated = obfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: true
    }).getObfuscatedCode();

    fs.writeFileSync(path.join(outputDir, file), obfuscated);
    console.log(`✔️ Obfuscated: ${file}`);
  }
});

// 3. Salin index.html ke ./dist
if (fs.existsSync(htmlSource)) {
  fs.mkdirSync('./dist', { recursive: true });
  fs.copyFileSync(htmlSource, htmlDest);
  console.log('✔️ Copied index.html');
} else {
  console.warn('⚠️ index.html not found!');
}
