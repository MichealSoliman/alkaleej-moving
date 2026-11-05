const fs = require('fs');
const path = require('path');
const { generateNeighborhoodHTML } = require('./generate_neighborhood_template.js');
const { neighborhoodsData } = require('./neighborhoods_data.js');

const areasDir = path.join(__dirname, '..', 'areas');

const targetSlugs = [
  'hayu-almalqa',
  'hayu-aleulya',
  'hayu-alsahafa',
  'hayu-alyasamin',
  'hayu-alnarjis',
  'hayu-hatayn',
  'hayu-alearid',
  'hayu-alqayrawan',
  'hayu-alrabie',
  'hayu-alrawda',
  'hayu-alnasim',
  'hayu-alkhalij',
  'hayu-ishbiliya',
  'hayu-almonsiya',
  'hayu-alrimal',
  'hayu-aleaqiq'
];

console.log(`Starting update for ${targetSlugs.length} neighborhoods...`);

targetSlugs.forEach(slug => {
  const data = neighborhoodsData[slug];
  if (!data) {
    console.error(`Missing data for ${slug}`);
    return;
  }

  const folder = path.join(areasDir, slug);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  const filePath = path.join(folder, 'index.html');
  const html = generateNeighborhoodHTML(data);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${slug}/index.html (${html.length} chars)`);
});

console.log('All 16 neighborhoods updated successfully!');

