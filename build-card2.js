// Derives wedding/index.html (Card 2: marriage day only, no RSVP) from index.html (Card 1).
// Run: node build-card2.js
const fs = require('fs'), path = require('path');
let h = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const must = (from, to, label) => { if (!h.includes(from)) throw new Error('missing: ' + (label || from.slice(0, 60))); h = h.replace(from, to); };
const cut = (re, label) => { if (!re.test(h)) throw new Error('missing: ' + label); h = h.replace(re, ''); };

cut(/\s*<!-- ================= 8\. RSVP ================= -->[\s\S]*?<\/section>/, 'rsvp section');

h = h.replace(/Haldi · Mehendi · Baraat · Sangeet · Muhurtham · Bhojnam · Sufi Night ·/g, 'Muhurtham · Bhojnam · Vivek &amp; Bhavini ·');
must('    <div class="spacer"></div>', '    <div class="spacer" style="height:6svh"></div>');

fs.mkdirSync(path.join(__dirname, 'wedding'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'wedding', 'index.html'), h);
console.log('wedding/index.html written', h.length, 'bytes');
