/* ============================================================
   REDS GYM — SITE CONFIG (owner-editable)
   Every value the owner can change without code lives here.
   All data below is the club's real, published information.
   Full slot list: OWNER_CONTENT_CHECKLIST.md
   ============================================================ */
window.REDS_SITE_CONFIG = {
  brandName: "REDS GYM",
  publicSlug: "reds-gym",
  locationLabel: "OLDHAM",
  tagline: "Oldham's Finest",
  description: "Oldham's premier independent gym with Nautilus & Watson equipment. Bodybuilding, powerlifting, boxing, PT & on-site massage. £30/month, no contract.",

  /* --- Contact (real values from the club) --- */
  whatsapp: "447515788990",            // club WhatsApp, country code, no +
  whatsappName: "REDS GYM",
  whatsappPreFill: "Hi REDS GYM! I'd like to know more about memberships and a free day pass.",
  instagram: "https://www.instagram.com/redsgymoldham",
  email: "",                          // empty = hidden
  address: "Pennine House, Denton Lane, Chadderton, Oldham OL9 8PU",
  phone: "+44 7515 788990",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=REDS+GYM+Denton+Lane+Chadderton+Oldham+OL9+8PU",

  /* --- Google reviews (real: from the club's published profile) --- */
  googleRating: 5.0,
  googleReviewCount: 32,

  /* --- Trial pass (UK club — no UPI; free day pass is the club's real offer) --- */
  upiId: "",                          // empty = pay button hidden
  trialPass: { label: "Free Day Pass", price: 0, note: "One full-day pass — try the whole gym" },

  /* --- Membership plans (real, from the club's published pricing) --- */
  plans: [
    { kicker: "MONTHLY", name: "Unlimited Monthly", price: "£30", period: "/month", popular: true,
      desc: "Rolling contract. Cancel anytime. No joining fee. First month just £5 with code BIGRED.",
      features: ["Unlimited gym access", "All equipment & facilities", "No contract — cancel anytime", "Gym OS member portal + QR check-in", "WhatsApp support"] },
    { kicker: "PAY AS YOU GO", name: "Single Session", price: "£5", period: "/session", popular: false,
      desc: "Turn up and train. No commitment, no paperwork.",
      features: ["Full gym access for one session", "All equipment", "Gym OS trial pass"] },
    { kicker: "FREE", name: "Day Pass", price: "Free", period: "", popular: false,
      desc: "Claim your free day pass — try the full gym before you decide.",
      features: ["One full day of access", "All equipment & facilities", "Book via WhatsApp"] }
  ],

  /* --- Coaches (real people from the club's published site — never invented) --- */
  trainers: [
    { role: "OWNER", name: "Jack", bio: "Owned and run by Jack — a community where everyone knows your name.", tags: ["Strength", "Powerlifting", "Boxing"] },
    { role: "PERSONAL TRAINER", name: "Mitchell", bio: "Specialist in strength training and bodybuilding. Find him at @1mitchellfitness on Instagram.", tags: ["Strength", "Bodybuilding"] }
  ],

  /* --- Training & services (real offerings — times via WhatsApp, none invented) --- */
  classes: [
    { category: "Strength", name: "Open Floor — Bodybuilding", time: "All opening hours", desc: "Nautilus & Watson equipment. Built for bodybuilders who want a proper gym, not a crowded chain." },
    { category: "Strength", name: "Open Floor — Powerlifting", time: "All opening hours", desc: "Serious iron, no queues for machines. Train heavy in a gym that respects the work." },
    { category: "Boxing", name: "Boxing Training", time: "Book via WhatsApp", desc: "Boxing conditioning and technique for enthusiasts — part of REDS' DNA since day one." },
    { category: "Coaching", name: "Personal Training", time: "Flexible — book via WhatsApp", desc: "Multiple PTs operate out of REDS — experts in weight loss, muscle gain, and injury rehabilitation. Flexible approach, no contracted hours." },
    { category: "Recovery", name: "Sports Massage", time: "Book via Level Wellness", desc: "On-site massage therapist for recovery and performance. Book directly through Level Wellness for sports massage and contrast therapy." },
    { category: "Strength", name: "Strength & Conditioning", time: "Book via WhatsApp", desc: "Structured athletic strength and conditioning work." }
  ]
};
