# REDS GYM — Owner Content Checklist

Everything the club can change without a developer lives in **site.config.js**.
Fill the real values below, then flip `isDemo:false` at the bottom of index.html.

- [ ] **whatsapp** — the club's own WhatsApp number (currently the studio line)
- [ ] **instagram / email** — real URLs (empty = button stays hidden)
- [ ] **address / phone / mapsUrl** — real location + Google Maps link
- [ ] **googleRating / googleReviewCount** — pull from the club's Google Business profile (0 = badge hidden)
- [ ] **upiId + trialPass** — UPI ID for trial-pass payments (empty = button hidden)
- [ ] **plans[]** — real £ membership plans, owner-approved only (empty = honest "confirmed on visit" card)
- [ ] **trainers[]** — real coach names, roles, bios (empty = generic team card — never invented people)
- [ ] **classes[]** — real timetable slots
- [ ] Hero description + tagline — club-approved copy
- [ ] Facility claims (equipment, recovery suite, amenities) — confirm or correct
- [ ] Owner sign-off → set `isDemo:false` in index.html (removes the demo banner)
