# Viva Dental — Project Brief

## Overview
Multi-page dental clinic website in Russian. Professional, elegant, light design.
Reference: abcclinic.ru (structure & content depth, not a copy)

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Nodemailer (contact form → email via .env)

## Color Palette
- Primary: Soft blue #4A90D9
- Accent: Gold #C9A84C
- Background: White #FFFFFF / #F8F9FC
- Text: Dark charcoal #1A1A2E
- Muted: #6B7280

## Pages
1. `/` — Home (hero, features, popular services, doctors preview, reviews CTA)
2. `/about` — About Us (clinic story, values, stats, certificates)
3. `/doctors` — Our Doctors (grid of cards with photo placeholder, name, specialty, experience)
4. `/services` — Services (categorized list with descriptions)
5. `/prices` — Price List (table by category: diagnostics, treatment, surgery, orthodontics, etc.)
6. `/reviews` — Reviews / Blog (patient reviews + video blog placeholder)
7. `/contacts` — Contacts (address, phone, map placeholder, working hours)

## Global Components
- Navbar (logo placeholder, nav links, CTA button → opens popup)
- Footer (links, contacts, social icons)
- InquiryPopup (name, phone, email, message → sends to email via Nodemailer)
- PopupTrigger (button used across all pages)

## Content
All content in Russian.
Placeholder data used for: logo, doctor photos, clinic photos.
Real content to be replaced by client.

## Email
Uses Nodemailer. .env.local:
  EMAIL_USER=
  EMAIL_PASS=
  EMAIL_TO=
Leave blank — client fills in.

## Status
- [ ] Project scaffolded
- [ ] All pages built
- [ ] Popup form wired
- [ ] Verified running locally
- [ ] Deployed to Vercel

## Logo
To be added by client. Placeholder text "Viva Dental" used in navbar.
