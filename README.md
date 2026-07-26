# Portfolio '25

A minimal, refined portfolio site for a web developer. Pure HTML / CSS / vanilla JS — no build step, no framework.

## Files

```
portfolio/
├── index.html   # structure + content
├── styles.css   # all styling (CSS variables, layout, responsive)
├── script.js    # nav scroll state + reveal-on-scroll
└── README.md    # this file
```

## Run it

Just open `index.html` in a browser. That's it.

If you want a dev server for live reload:
```bash
# Python (comes pre-installed on most machines)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## What to edit

### 1. Your name and copy
Search `index.html` for **"Your Name"** and replace. Also edit:
- The hero (`<header class="hero">`)
- The About paragraph
- Experience, Activities, Contact, Stack lists
- Project cards (titles, descriptions, stacks)

### 2. Colors and fonts
All design tokens live at the top of `styles.css` under `:root`:
```css
--bg:     #F6F3EE;   /* page background */
--ink:    #1A1A1A;   /* text */
--accent: #B89968;   /* highlight color */
```
Change those three and the whole site shifts mood.

### 3. Project accent colors
Each project `<li>` has an inline `style="--accent: #XXXXXX;"` — that's the card color. Swap freely.

### 4. Adding real project images
Right now projects show stylized number tiles. To use real screenshots, inside each `.project__art` div replace:
```html
<span>01</span>
```
with:
```html
<img src="images/travlo.jpg" alt="Travlo screenshot" />
```
and add this to `styles.css`:
```css
.project__art img { width: 100%; height: 100%; object-fit: cover; }
```

## Deploy

- **Netlify / Vercel**: drag the folder in, done.
- **GitHub Pages**: push to a repo, enable Pages on the main branch.
- **Anything else**: it's 3 static files, upload anywhere.

## Design notes

- **Typography**: Fraunces (display serif) + Inter Tight (body) + JetBrains Mono (meta). Distinctive pairing that avoids the Inter/Roboto default.
- **Palette**: warm off-white instead of stark white, warm beige accent instead of the usual blue/purple.
- **Texture**: subtle SVG noise overlay via `body::before` — adds paper-like warmth without images.
- **Motion**: gentle rise-in on load + intersection-observed reveals on scroll. Respects `prefers-reduced-motion`.
