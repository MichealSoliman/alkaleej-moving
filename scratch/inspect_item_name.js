const fs = require('fs');
const content = fs.readFileSync('areas/index.html', 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.includes('${item') || line.includes('اختر منطقتك')) {
    console.log(`Line ${i}: ${line}`);
    for (let j = Math.max(0, i - 15); j <= Math.min(lines.length - 1, i + 35); j++) {
      console.log(`${j}: ${lines[j]}`);
    }
  }
});

