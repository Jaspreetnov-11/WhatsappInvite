// Derives wedding/index.html (Card 2: marriage day only, no RSVP) from index.html (Card 1).
// Run: node build-card2.js
const fs = require('fs'), path = require('path');
let h = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const must = (from, to, label) => { if (!h.includes(from)) throw new Error('missing: ' + (label || from.slice(0, 60))); h = h.replace(from, to); };
const cut = (re, label) => { if (!re.test(h)) throw new Error('missing: ' + label); h = h.replace(re, ''); };

cut(/\s*<!-- ================= 4\. DAY 1 ================= -->[\s\S]*?(?=\s*<!-- ================= 5\. DAY 2)/, 'day1 section');
cut(/\s*<!-- ================= 7\. RSVP ================= -->[\s\S]*?<\/section>/, 'rsvp section');
cut(/\s*<div class="card">\s*<span class="idx">03<\/span>[\s\S]*?<h3>Sufi Night<\/h3>[\s\S]*?<\/div>\s*<\/div>/, 'sufi card');

must('<meta name="description" content="Wedding of Vivek Karicheti with Bhavini Kapur · 24 & 26 December 2026 · Maira Resort, Raipur">',
     '<meta name="description" content="Wedding of Vivek Karicheti with Bhavini Kapur · 26 December 2026 · Maira Resort, Raipur">');
must('<div class="eyebrow">Save the dates</div>', '<div class="eyebrow">Save the date</div>');
must('<div class="nums"><span class="n" id="n24">24</span><span class="amp">&amp;</span><span class="n" id="n26">26</span></div>',
     '<div class="nums"><span class="n" id="n26">26</span></div>');
must('<div class="knot">Two days · One knot</div>', '<div class="knot">Saturday · The wedding day</div>');
h = h.replace(/Haldi · Mehendi · Baraat · Sangeet · Muhurtham · Bhojnam · Sufi Night ·/g, 'Muhurtham · Bhojnam · Vivek &amp; Bhavini ·');
must("    .from('#n24', { xPercent: -160, rotate: -18, duration: .45, ease: 'power3.out' }, 0)\n    .from('#n26', { xPercent: 160, rotate: 18, duration: .45, ease: 'power3.out' }, 0)\n    .from('#date .amp', { scale: 0, rotate: -90, duration: .3, ease: 'back.out(2)' }, .25)\n",
     "    .from('#n26', { scale: 3.2, opacity: 0, rotate: -8, duration: .5, ease: 'power3.out' }, 0)\n", 'date tl');
must('<div class="eyebrow rise">Venue · Both days</div>', '<div class="eyebrow rise">Venue</div>');
must("      'BEGIN:VEVENT','UID:vb-day1@wedding','DTSTART;VALUE=DATE:20261224','DTEND;VALUE=DATE:20261225',\n      'SUMMARY:Vivek & Bhavini · Haldi, Mehendi, Baraat & Sangeet','LOCATION:Maira Resort & Convention Center, Raipur, Chhattisgarh','END:VEVENT',\n", '', 'ics day1');
must("'SUMMARY:Vivek & Bhavini · Muhurtham, Bhojnam & Sufi Night'", "'SUMMARY:Vivek & Bhavini · Muhurtham & Bhojnam'");
must("    24 · 26 December 2026 · Raipur", "    26 December 2026 · Raipur");
must("    <div class=\"spacer\"></div>", "    <div class=\"spacer\" style=\"height:12svh\"></div>");

fs.mkdirSync(path.join(__dirname, 'wedding'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'wedding', 'index.html'), h);
console.log('wedding/index.html written', h.length, 'bytes');
