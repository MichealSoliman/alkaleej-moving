const { generateNeighborhoodHTML } = require('./generate_neighborhood_template.js');
const { neighborhoodsData } = require('./neighborhoods_data.js');

const almalqaData = neighborhoodsData['hayu-almalqa'];
const html = generateNeighborhoodHTML(almalqaData);

console.log('Generated Al-Malqa length:', html.length);

// Check JSON-LD
const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
if (schemaMatch) {
  try {
    const parsed = JSON.parse(schemaMatch[1]);
    console.log('Schema JSON is valid! Items count:', parsed['@graph'].length);
  } catch (e) {
    console.error('Schema JSON parse error:', e.message);
  }
}

// Check tag balance
const openDivs = (html.match(/<div\b/gi) || []).length;
const closeDivs = (html.match(/<\/div>/gi) || []).length;
const openSections = (html.match(/<section\b/gi) || []).length;
const closeSections = (html.match(/<\/section>/gi) || []).length;
console.log(`Divs: ${openDivs} open, ${closeDivs} close (diff: ${openDivs - closeDivs})`);
console.log(`Sections: ${openSections} open, ${closeSections} close (diff: ${openSections - closeSections})`);

// Check nav items vs section ids
const navHref = [...html.matchAll(/href=["']#([^"']+)["']/gi)].map(m => m[1]);
const sectionIds = [...html.matchAll(/id=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Nav targets count:', navHref.length);
const missingInDoc = navHref.filter(h => !sectionIds.includes(h));
console.log('Missing targets:', missingInDoc);

