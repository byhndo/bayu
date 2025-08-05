import fs from 'fs';
import path from 'path';
import JavaScriptObfuscator from 'javascript-obfuscator';

// Folder tempat file asli berada
const inputDir = './js';
const outputDir = './js'; // Overwrite langsung

const files = ['app.js', 'bio.js', 'photos.js'];

files.forEach(file => {
  const inputPath = path.join(inputDir, file);
  const code = fs.readFileSync(inputPath, 'utf8');

  const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true
  }).getObfuscatedCode();

  fs.writeFileSync(path.join(outputDir, file), obfuscatedCode);
  console.log(`Obfuscated: ${file}`);
});
