# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Zion Direct Care** - A single-page website for Adam Hyatt's mobile medical practice in Springdale, UT (near Zion National Park).

**Live Site**: http://zion.refreshbiology.com (temporary preview domain)
**GitHub Repo**: https://github.com/jonchyatt/zion-direct-care-website
**Future Domain**: ziondirectcare.com

## Tech Stack

- Static HTML/CSS/JS (no build tools)
- GitHub Pages hosting
- Custom domain via Cloudflare DNS

## Project Structure

```
├── index.html              # Main single-page website
├── css/
│   └── styles.css          # All styling (responsive)
├── js/
│   └── main.js             # Smooth scroll, mobile menu, form handling
├── ZionDirectCareWaterfall.mp4  # Hero background video (licensed)
├── ZionHeadshot.jpg        # Adam's professional headshot
├── ZionDirectCard.PNG      # Business card (branding reference)
├── ZionsDirectOfferings.md # Full website copy/content source
├── firebase.json           # Firebase hosting config (alternative deploy)
├── CNAME                   # GitHub Pages custom domain
└── .gitignore
```

## Design

**Colors** (from business card):
- Primary: `#C84C0C` (rust/terracotta)
- Secondary: `#F5E6C8` (cream)
- Background: `#FFFFFF`

**Fonts** (Google Fonts):
- Headings: Playfair Display
- Body: Montserrat

## Key Sections

1. **Hero** - Video background, logo, CTAs
2. **Services** - Family/Urgent Care, IV Therapy, Weight Loss
3. **About** - Provider bio with headshot
4. **Why Choose Us** - 4 feature boxes
5. **Service Areas** - Towns served
6. **Pricing** - Transparent pricing tables
7. **Contact** - Form + booking button
8. **Footer** - Medicare disclaimer required

## Pending Tasks

- [ ] Add Tebra scheduling link (replace `href="#"` on `id="tebra-booking"` in index.html)
- [ ] Set up final domain (ziondirectcare.com)
- [ ] Consider adding Google Analytics

## Commands

**Deploy** (automatic on push to master):
```bash
git add . && git commit -m "Update" && git push
```

**Local preview**:
Just open `index.html` in a browser (no server needed)

## Content Source

All website copy comes from `ZionsDirectOfferings.md` - edit that file for content changes, then update index.html accordingly.

## Enabled Plugins

- **GitHub** - Repository and PR management
- **Commit Commands** - Git utilities
- **Playwright** - Browser automation/testing
- **Firebase** - Alternative hosting option
- **Firecrawl** - Web scraping (see `firecrawl mcp server guide.md`)
