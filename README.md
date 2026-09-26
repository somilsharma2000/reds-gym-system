# REDS GYM — Digital System (canonical template, site 2 of 8)

Rebuilt 2026-09-26 on the Beyond Pixells canonical client template.
Live: https://somilsharma2000.github.io/reds-gym-system/

## Structure
- `index.html` — branded landing on the shared design system (bp-design-system.css + bp-motion.js)
- `site.config.js` — ALL club data: contact, plans, coaches, services, rating. Owner-editable, zero code.
- `styles.css` / `script.js` — template styles + config renderer
- `gym-os-connect.js` — Gym OS integration: portal links, QR check-in, lead capture (consent + offline fallback)
- `portal/` · `dashboard/` — member portal + staff dashboard entry points
- `OWNER_CONTENT_CHECKLIST.md` — every slot the owner can edit
- `website/` — legacy page (kept for reference, unreferenced)

## Data provenance (no invention)
Every value in site.config.js is the club's real, published information
(address, phone, hours, £30/mo no-contract pricing, £5 PAYG, free day pass, BIGRED first-month offer,
5.0★/32 Google rating, Jack/Mitchell, Nautilus & Watson equipment, Level Wellness massage).
Trainers list only real published people (Poncho is Jack's dog — deliberately not listed as a coach).

## Owner sign-off
`isDemo: true` in index.html until founder/club sign-off → flip to `false` to remove the demo banner.

## Verify after deploy
```bash
curl -s https://somilsharma2000.github.io/reds-gym-system/ | grep -o "REDS GYM" | head -1
```
