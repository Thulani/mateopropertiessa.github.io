# Mateo Properties: website

Static website for **Mateo Properties (Pty) Ltd**, providing premium student accommodation for VUT and Sedibeng College students.

Plain HTML, CSS and a small amount of vanilla JavaScript. There's no build step, no server and no framework. It runs as-is on GitHub Pages.

---

## Placeholders to replace

Search the whole repository for each bracketed value and replace it. In VS Code, use **Edit → Replace in Files** (Ctrl/Cmd + Shift + H).

| Placeholder | Where | Notes |
|---|---|---|
| `[PROPERTY NAME]` | `properties.html` (3 cards), `contact.html` (property dropdown) | One per residence. Add or remove cards as needed. |
| `[ADDRESS]` | `properties.html` | Street address of each residence. |
| `[NEAREST CAMPUS]` | `properties.html` | e.g. "VUT main campus" or "Sedibeng College, Vanderbijlpark campus". |
| `[PATRICK NUMBER]` | All pages | **Filled in from the business card: 073 723 3405.** Please verify. |
| `[NOKUTHULA NUMBER]` | All pages | **Filled in from the business card: 081 804 4359.** Please verify. |
| `[EMAIL]` | Footer of every page, `contact.html`, `privacy.html`, JSON-LD in `index.html` | The enquiries email address. |
| `[WHATSAPP GROUP LINK]` | Footer, `index.html`, `contact.html` | **Filled in from the QR code on the business card:** `https://chat.whatsapp.com/EhBZCbNbRGr0KqjdTXfCkf`. Please confirm it's the right group. |
| WhatsApp chat number | Header button on every page, plus other "WhatsApp us" buttons | Currently `https://wa.me/27737233405` (Patrick's number). To change it, replace `27737233405` everywhere, using international format with no `+`, spaces or leading `0`. |
| `[FORMSPREE ENDPOINT]` | `contact.html` (the `<form action="…">`) | See **Contact form** below. |
| `[SITE URL]` | `<head>` of every page (canonical + Open Graph), JSON-LD in `index.html` and `faq.html` | The full live URL **with a trailing slash**, e.g. `https://mateopropertiessa.co.za/`. Social previews only work once this is set. |
| `[INFORMATION OFFICER NAME]`, `[DATE]`, `[RETENTION PERIOD…]`, `[FORM PROVIDER…]` | `privacy.html` | Complete these as part of the privacy notice review. |
| Office hours | `contact.html` | Currently "To be confirmed". |
| Logo and show room photos | `images/` | See `images/README.md`. |

> The privacy notice (`privacy.html`) is a **draft**. Have it reviewed, complete the bracketed details, then delete the yellow "Draft for client review" banner at the top of the page.

---

## Publish on GitHub Pages

1. Push these files to the **root** of the `main` branch.
2. On GitHub, open the repository and go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Set **Branch** to `main` and the folder to **`/ (root)`**, then click **Save**.
5. Wait a minute or two. The live URL appears at the top of the Pages settings screen.
6. Replace `[SITE URL]` (see above) with that URL and push again.

**Which URL will the site have?**

- If the repository is owned by an account or organisation called `mateopropertiessa` and named `mateopropertiessa.github.io`, the site is served at `https://mateopropertiessa.github.io/`.
- Otherwise it's a *project site* at `https://<owner>.github.io/<repository-name>/`. All links use relative paths, so this works without changes.
- **Custom domain:** add it under **Settings → Pages → Custom domain** and follow GitHub's DNS instructions.

**404 page:** `404.html` sets its own base path so links still work on deep URLs. If you rename the repository, update `REPO_NAME` in the small script at the top of `404.html`.

The empty `.nojekyll` file tells GitHub Pages to serve the files exactly as they are.

---

## Contact form

The enquiry form on `contact.html` posts to a form service, because GitHub Pages can't process forms itself. Until an endpoint is set, the form shows visitors a message asking them to WhatsApp or call instead.

To connect [Formspree](https://formspree.io) (the free tier is fine to start with):

1. Create a Formspree account and a new form. Set it to deliver to the enquiries email address.
2. Copy the form endpoint. It looks like `https://formspree.io/f/abcdwxyz`.
3. In `contact.html`, find

   ```html
   <form id="enquiry-form" action="[FORMSPREE ENDPOINT]" method="POST"
   ```

   and replace `[FORMSPREE ENDPOINT]` with your endpoint.
4. Submit a test enquiry from the live site and confirm it in Formspree (the first submission may ask you to verify).

The form already includes a hidden `_subject` line and a `_gotcha` spam honeypot, which Formspree recognises. Any other provider that accepts a standard form POST and returns JSON for `Accept: application/json` will also work.

---

## Project structure

```
index.html        Home: hero, intro, features, room types, lease info, no-pets notice, team, JSON-LD
properties.html   Property cards (no prices, "Contact us for availability and details")
amenities.html    Living / Study and Wellness / Safety and Power / Water
gallery.html      Building photos + show room placeholders, with lightbox
contact.html      Enquiry form, WhatsApp, phone numbers, office address, team
faq.html          FAQ (native <details> accordions) + FAQPage JSON-LD
privacy.html      POPIA-aligned privacy notice (DRAFT)
404.html          Not-found page
css/styles.css    All styles (mobile-first)
js/main.js        Mobile menu, back-to-top, smooth scroll, lightbox, form handling
images/           Logo, photos, favicon, social share image (see images/README.md)
```

### Editing the header and footer

The header and footer are copied into every HTML page so the site works without JavaScript and is fully indexable. If you change a menu link or a contact detail, make the same change in **all** `.html` files. A find-and-replace across files is the quickest way.

### Enquire buttons and the form

"Enquire about this property" buttons link to `contact.html?property=1` (or `2`, `3`). The form uses this to pre-select the matching option via its `data-key` attribute. If you add a property, add a card in `properties.html` and a matching `<option data-key="4" …>` in `contact.html`.

### External resources

- Fonts: Montserrat (headings) and Inter (body), loaded from Google Fonts.
- Icons: Font Awesome 6 Free, loaded from the cdnjs CDN.
