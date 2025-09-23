# Cursor Context — Handyman Zach

## Rules
- All code is Next.js (App Router) + TypeScript + Tailwind.  
- Content (services, testimonials, phone, service areas) must live in `/content/site.json`.  
- Do not hard-code values in components; always load from site.json.  
- SEO is top priority: include Saugerties, Kingston, Woodstock, and Catskill in titles, headings, and schema.  
- Accessibility: semantic HTML, labeled inputs, one <h1> per page, keyboard navigable.  
- Security: never expose secrets (RESEND_API_KEY stays in environment variables only).  
- Vercel free tier deploy target.  

## Non-Goals
- No external CMS.  
- No animations or fancy styling until core site is complete.  
- Do not use paid dependencies.  

## Reminders
- Always confirm schema.org JSON-LD (LocalBusiness + Service).  
- Keep `ContactForm` validation strict (name, email, service, message required).  
- Alt text must combine activity + location (e.g., "Deck repair in Kingston NY").  

