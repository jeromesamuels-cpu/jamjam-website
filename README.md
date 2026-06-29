# Jam Jam — Hot Jamaican Patties (host-acquisition website)

A static, brand-accurate marketing + lead-capture site for **jamjamvending.ca**.
Its job right now: take cold-outreach prospects, explain the no-staff hot-food amenity, and
capture **"Request a machine"** leads for the September install cohort.

Brand: Jam Jam Hot Jamaican Patties, a brand of **Westlight Food Manufacturing Corporation**.

## Files
```
website/
├── index.html      ← all page content
├── styles.css      ← brand styling (palette + type from the brand guide)
├── script.js       ← mobile nav, FAQ accordion, form submission
└── assets/
    ├── logo.png        ← transparent Jam Jam logo
    ├── machine.png     ← vending-machine wrap mockup
    └── patty-hero.png  ← hero patty photo
```

## 1. Connect the lead form (REQUIRED before outreach)
The "Request a machine" form is wired for **Formspree** (free tier, no backend, emails you each lead + keeps a dashboard list).

1. Go to https://formspree.io and sign up with **info@jamjamvending.ca**.
2. Create a new form. Set the notification email to **info@jamjamvending.ca**.
3. Copy the form's endpoint — it looks like `https://formspree.io/f/abcdwxyz`.
4. In `index.html`, find:
   ```html
   <form id="requestForm" class="lead-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   Replace `YOUR_FORM_ID` with your real ID (e.g. `abcdwxyz`).
5. Done. Submissions now email you AND appear in your Formspree dashboard (exportable to CSV/Sheets).

Until this is done, the form shows a friendly "email us instead" message instead of failing silently.

*(Alternative: Tally.so or a Google Form embed both work the same way — swap the `<form>` for their embed.)*

## 2. Point the domain
The site is deployed on GitHub Pages. To serve it at **jamjamvending.ca**:
1. Repo → **Settings → Pages → Custom domain** → enter `jamjamvending.ca` → Save.
2. At your domain registrar, add DNS records:
   - **A records** for the apex `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME** for `www` → `jeromesamuels-cpu.github.io`
3. Back in Settings → Pages, tick **Enforce HTTPS** once the certificate provisions (can take ~1 hour).

## 3. Editing copy later
Everything visible is plain text in `index.html`. Edit, commit, push — Pages redeploys automatically in ~1 minute.
