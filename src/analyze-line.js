const fs = require('fs');
const content = fs.readFileSync('./data/cards.ts', 'utf8');
const lines = content.split('\n');
const line301 = lines[300]; // 0-indexed

console.log('Line 301:', line301);
console.log('\nChar codes:');
for (let i = 0; i < line301.length; i++) {
  const char = line301[i];
  const code = line301.charCodeAt(i);
  if (i >= 80 && i <= 95) {  // Focus on the apostrophe area
    console.log(`[${i}] '${char}' = ${code} (${String.fromCharCode(code)})`);
  }
}

// Now fix it
console.log('\n\nApplying fix...\n');
const fixed = content.replace(/can't/g, "can\\'t");
fs.writeFileSync('./data/cards.ts', fixed, 'utf8');
console.log('✅ DONE! File fixed.');
