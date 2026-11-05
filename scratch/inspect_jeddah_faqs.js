const fs = require('fs');
const html = fs.readFileSync('areas/riyadh-to-jeddah/index.html', 'utf8');
const faqQuestions = [...html.matchAll(/<h3[^>]*class=["'][^"']*faq[^"']*["'][^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('FAQ questions in riyadh-to-jeddah (h3):', faqQuestions);
if (!faqQuestions.length) {
  // try finding accordion or questions
  const anyQ = [...html.matchAll(/(?:سؤال|كم يستغرق|هل تقدمون|كيف|ما هي)/gi)].length;
  console.log('Matches for question words:', anyQ);
}

