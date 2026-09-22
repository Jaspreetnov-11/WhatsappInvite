# Vivek & Bhavini — Wedding Invitation

Scroll-driven mobile wedding invitation. Static HTML, no build step.

| Card | Path | What it has |
|------|------|-------------|
| Card 1 (full) | `index.html` → `/` | Ganesha reveal, names, both days (Haldi, Mehendi, Baraat, Sangeet, Muhurtham, Bhojnam, Sufi Night), venue, RSVP form → WhatsApp |
| Card 2 (wedding only) | `wedding/index.html` → `/wedding/` | Ganesha reveal, names, 26 Dec only (Muhurtham, Bhojnam), venue. No RSVP page |

- Edit only `index.html`; then run `node build-card2.js` to regenerate `wedding/index.html`.
- Set `RSVP_WHATSAPP` at the top of the script in `index.html` to the RSVP number (country code, no `+`).
- Libraries load from CDN: GSAP + ScrollTrigger, Lenis, Google Fonts.
- Deployed on Vercel: https://whatsapp-invite-omega.vercel.app/ and https://whatsapp-invite-omega.vercel.app/wedding/
