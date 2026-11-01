# Mateo Properties: website

Static website for **Mateo Properties (Pty) Ltd**, providing premium student accommodation for VUT and Sedibeng College students.

Plain HTML, CSS and a small amount of vanilla JavaScript. There's no build step, no server and no framework. It runs as-is on GitHub Pages.

---

## Live site

**https://www.mateopropertiessa.co.za/**, served by GitHub Pages from the `main` branch (repository root). The `CNAME` file holds the custom domain; don't delete it.

## Details still to add

Anything that hasn't been confirmed by Mateo Properties has been left **off** the site rather than shown as a placeholder. Add these once confirmed:

| Detail | Where to add it |
|---|---|
| Enquiry form endpoint | `contact.html`: replace `[FORMSPREE ENDPOINT]` in the `<form action="…">` (see **Contact form** below). Until then the form tells visitors to call or WhatsApp instead. |
| Email address | Footer (every page), contact panel in `contact.html`, `privacy.html` ("Your rights"), and `"email"` in the JSON-LD in `index.html`. |
| WhatsApp group link | Footer and contact panel, if wanted. |
| Residence names, addresses and nearest campuses | `properties.html` currently describes the accommodation as a whole. Add a card per residence once the details are confirmed. |
| Office hours | Contact panel in `contact.html`. |
| Nokuthula's job title | Team cards in `index.html` and `contact.html`: add a `<p class="role">…</p>` under her name. |
| Information Officer, retention period, form provider | `privacy.html`. The notice is marked as a draft until it has been reviewed. |
| Show room photos and the original logo file | `images/` (see `images/README.md`). |

**WhatsApp chat number:** the WhatsApp buttons open a chat with **073 723 3405** (Patrick, from the business card) via `https://wa.me/27737233405`. To use a different number, replace `27737233405` in every `.html` file. Use international format with no `+`, spaces or leading `0`.

---

## Publish on GitHub Pages

1. Push these files to the **root** of the `main` branch.
2. On GitHub, open the repository and go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Set **Branch** to `main` and the folder to **`/ (root)`**, then click **Save**.
5. Wait a minute or two. The live URL appears at the top of the Pages settings screen.
6. If the site's address ever changes, update the `canonical`, `og:url` and `og:image` tags in each page's `<head>` and the URLs in the JSON-LD blocks.

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
properties.html   Accommodation overview (no prices, "Contact us for availability and details")
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

The room-type buttons on the home page link to `contact.html?room=single` or `?room=shared`, and the form pre-selects the matching room type.

### External resources

- Fonts: Montserrat (headings) and Inter (body), loaded from Google Fonts.
- Icons: Font Awesome 6 Free, loaded from the cdnjs CDN.
