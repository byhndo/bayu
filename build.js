import fs from 'fs';
import JavaScriptObfuscator from 'javascript-obfuscator';

// List file yang mau diobfuscate
const files = ['src/app.js', 'src/bio.js', 'src/photos.js'];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const obfuscationResult = JavaScriptObfuscator.obfuscate(content, {
    compact: true,
    controlFlowFlattening: true
  });

  // Tulis ke dist/ atau docs/
  const outPath = file.replace('src', 'docs'); // atau 'dist'
  fs.writeFileSync(outPath, obfuscationResult.getObfuscatedCode(), 'utf8');
});
