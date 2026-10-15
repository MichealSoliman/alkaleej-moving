const fs = require('fs');

const content = fs.readFileSync('.htaccess', 'utf8');
const lines = content.split('\n');

const rules = [];
const sources = new Map();
const targets = new Set();

lines.forEach((line, idx) => {
  const trimmed = line.trim();
  if (trimmed.startsWith('Redirect 301') || trimmed.startsWith('Redirect 410')) {
    const parts = trimmed.split(/\s+/);
    const type = parts[1];
    const source = parts[2];
    const target = parts[3] || null;

    rules.push({ line: idx + 1, type, source, target, raw: trimmed });

    if (sources.has(source)) {
      console.error(`DUPLICATE SOURCE on line ${idx + 1}: ${source} (previously on line ${sources.get(source)})`);
    } else {
      sources.set(source, idx + 1);
    }

    if (target) {
      targets.add(target.replace('https://alkaleej-moving.com', ''));
    }
  }
});

console.log(`Parsed ${rules.length} Redirect rules from .htaccess.`);

// Check for redirect chains (where a target is also a source)
let loopsFound = 0;
targets.forEach(t => {
  if (sources.has(t) && t !== '/') {
    console.error(`REDIRECT CHAIN / LOOP DETECTED: Target "${t}" is also a redirect source!`);
    loopsFound++;
  }
});

if (loopsFound === 0) {
  console.log('Zero redirect loops or chains detected. All targets are final endpoints.');
}

// Verify physical existence of all 301 destinations
let missingTargets = 0;
rules.filter(r => r.type === '301').forEach(r => {
  const clean = r.target.replace('https://alkaleej-moving.com/', '');
  let local = clean === '' ? 'index.html' : clean.replace(/\/$/, '') + '/index.html';
  if (!fs.existsSync(local)) {
    local = clean.replace(/\/$/, '') + '.html';
  }
  if (!fs.existsSync(local)) {
    console.error(`MISSING TARGET FILE for rule on line ${r.line}: ${r.target} (tried ${local})`);
    missingTargets++;
  }
});

if (missingTargets === 0) {
  console.log('All 301 redirect target destinations physically exist on disk (100% Validated).');
}
