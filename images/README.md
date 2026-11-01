# Images

All site images live in this folder and are referenced with relative paths (`images/…`).
To swap an image, **keep the same file name** and overwrite the file. No HTML changes needed.

## What's here now

| File | Used for | Source / status |
|---|---|---|
| `logo.png` | Header logo mark (next to the "MATEO PROPERTIES / PREMIUM STUDENT LIVING" text wordmark) | Extracted from the business card, with the background removed. **Replace with the original logo file** (transparent PNG, white and gold artwork, about 160 × 240 px or larger, same proportions) for the sharpest result. |
| `logo-full.png` | Footer logo (mark + wordmark) | Extracted from the business card. Replace with a transparent PNG of the full logo, about 640 px wide. It sits on dark green, so it needs light-coloured artwork. |
| `favicon.png` | Browser tab icon | Generated from the logo mark (64 × 64). |
| `og-image.jpg` | Preview image when the site is shared on WhatsApp, Facebook, etc. | 1200 × 630, building photo + logo. |
| `building-corner.jpg` | Home page intro, gallery, call-to-action backgrounds | Supplied photo. Cropped so the child standing on the pavement in the original isn't shown, and the car's number plate is blurred. |
| `building-street.jpg` | Home hero background, properties page, gallery | Supplied photo. |
| `team-patrick.jpg`, `team-nokuthula.jpg` | Team cards on Home and Contact | Cropped from the business card. Replace with higher-resolution portraits (about 520 × 600 px, portrait orientation, face near the top) if available. |
| `placeholder-room.svg` | "Show room photos coming soon" tiles in the gallery | Placeholder. |

## Adding show room photos

1. Export photos as **JPG**, about **1600 px on the longest side**, and ideally under 300 KB each. [Squoosh](https://squoosh.app) is a free way to compress them.
2. Name them clearly, e.g. `room-single-1.jpg`, `room-shared-1.jpg`, `kitchen-1.jpg`, `study-room-1.jpg`, `tv-room-1.jpg`, `gym-1.jpg`.
3. Upload them to this `images/` folder.
4. In `gallery.html`, find each "Show room photos coming soon" tile and change:
   - `data-full="images/placeholder-room.svg"` and `src="images/placeholder-room.svg"` → your file, e.g. `images/room-single-1.jpg`
   - `alt="…"` → a short description of the photo, e.g. "Furnished single room with a bed, desk and wardrobe"
   - `data-caption="…"`, the `aria-label` and the visible caption text → e.g. "Single room"
5. To add more photos, copy a whole `<li>…</li>` block and edit it. The lightbox picks up new items automatically.

## Property photos

`properties.html` shows one photo (`building-street.jpg`). When residence details are confirmed, add a card per residence with its own photo (4:3 landscape works best, about 1200 × 900 px).

## Photo tips

- Make sure no one in a photo, especially a minor, can be identified unless you have their permission.
- Blur or crop out vehicle number plates.
