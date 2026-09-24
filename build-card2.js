// Derives wedding/index.html (Card 2: marriage day only, no RSVP) from index.html (Card 1).
// Run: node build-card2.js
const fs = require('fs'), path = require('path');
let h = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const must = (from, to, label) => { if (!h.includes(from)) throw new Error('missing: ' + (label || from.slice(0, 60))); h = h.replace(from, to); };
const cut = (re, label) => { if (!re.test(h)) throw new Error('missing: ' + label); h = h.replace(re, ''); };

cut(/\s*<!-- ================= 5\. DAY 1 ================= -->[\s\S]*?(?=\s*<!-- ================= 6\. DAY 2)/, 'day1 section');
cut(/\s*<!-- ================= 8\. RSVP ================= -->[\s\S]*?<\/section>/, 'rsvp section');
cut(/\s*<div class="card">\s*<span class="idx">03<\/span>[\s\S]*?<h3>Sufi Night<\/h3>[\s\S]*?<\/div>\s*<\/div>/, 'sufi card');

must('<meta name="description" content="Wedding of Vivek Karicheti with Bhavini Kapur · 25 & 26 December 2026 · Maira Resort, Raipur">',
     '<meta name="description" content="Wedding of Vivek Karicheti with Bhavini Kapur · 26 December 2026 · Maira Resort, Raipur">');
must('<div class="datecode">25 · 26 . 12 . 26</div>', '<div class="datecode">26 . 12 . 2026</div>');
must('<span class="n" id="n24">25</span><span class="amp">&amp;</span><span class="n" id="n26">26</span>', '<span class="n" id="n26">26</span>');
h = h.replace(/Haldi · Mehendi · Baraat · Sangeet · Muhurtham · Bhojnam · Sufi Night ·/g, 'Muhurtham · Bhojnam · Vivek &amp; Bhavini ·');
must("    .from('#n24', { xPercent: -120, opacity: 0, duration: .3, ease: 'power3.out' }, .36)\n", '', 'n24 tween');
must("    .from('#std .dates .amp', { scale: 0, duration: .15, ease: 'back.out(2)' }, .5)\n", '', 'amp tween');
must('<div class="eyebrow rise">Venue · Both days</div>', '<div class="eyebrow rise">Venue</div>');
must("      'BEGIN:VEVENT','UID:vb-day1@wedding','DTSTART;VALUE=DATE:20261225','DTEND;VALUE=DATE:20261226',\n      'SUMMARY:Vivek & Bhavini · Haldi, Mehendi, Baraat & Sangeet','LOCATION:Maira Resort & Convention Center, Raipur, Chhattisgarh','END:VEVENT',\n", '', 'ics day1');
must("'SUMMARY:Vivek & Bhavini · Muhurtham, Bhojnam & Sufi Night'", "'SUMMARY:Vivek & Bhavini · Muhurtham & Bhojnam'");
must("    25 · 26 December 2026 · Raipur", "    26 December 2026 · Raipur");
must('    <div class="spacer"></div>', '    <div class="spacer" style="height:6svh"></div>');

fs.mkdirSync(path.join(__dirname, 'wedding'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'wedding', 'index.html'), h);
console.log('wedding/index.html written', h.length, 'bytes');
