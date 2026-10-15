const fs = require('fs');

const html = fs.readFileSync('services/index.html', 'utf8');
const lines = html.split('\n');

let dDepth = 0;
let sDepth = 0;

lines.forEach((l, i) => {
  const oD = (l.match(/<div\b/gi) || []).length;
  const cD = (l.match(/<\/div>/gi) || []).length;
  const oS = (l.match(/<section\b/gi) || []).length;
  const cS = (l.match(/<\/section>/gi) || []).length;
  dDepth += (oD - cD);
  sDepth += (oS - cS);
  if (oS > 0 || cS > 0) {
    console.log(`L${i+1} [sDepth=${sDepth}, dDepth=${dDepth}]: ${l.trim()}`);
  }
});
console.log(`Final: sDepth=${sDepth}, dDepth=${dDepth}`);
