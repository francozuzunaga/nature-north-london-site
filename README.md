# Nature North London website template

A responsive, locally runnable website with a real OpenStreetMap, named North London parks, project filters, clickable project links and editable project data. The parks and geography are real; community project content is clearly marked as illustrative placeholder material.

## Run locally

### Easiest option

Open `index.html` in a modern browser. The site has no build step or API key. An internet connection is required for the official OpenStreetMap embed and Google Fonts.

### Recommended local server

From this folder, run either:

```powershell
python -m http.server 8080
```

or, if Node.js is installed:

```powershell
npx serve .
```

Then visit `http://localhost:8080` (the Node command may show a different address).

## Update projects

Open `data/projects.js`. Each project is one object in `window.NNL_PROJECTS`.

- `name`, `borough`, `corridor`, `type`, and `summary` control the displayed copy.
- `activities` is the list of tags in the project detail panel.
- `link` is the external project URL opened by “Visit project website”.
- `lat` and `lng` position the marker using real geographic coordinates.
- Keep each `id` unique and use lowercase letters, numbers and hyphens.

Copy an existing project object, change its values, and remember the comma between entries. Filters are generated automatically from the `type` values.

## Before publishing

1. Replace every illustrative project with verified data and links.
2. Replace `hello@naturenorthlondon.example` in `index.html` with the real email address.
3. Update the short organisation copy to match agreed language and add any required charity/privacy information.
4. If using Google Fonts is not appropriate, download and self-host the fonts or remove the font links; the site has safe fallbacks.
5. Test all links, keyboard navigation and marker positions on mobile and desktop.

## File guide

- `index.html` — page structure and organisation copy.
- `data/projects.js` — the only file normally needed for project updates.
- `data/parks.js` — named North London parks shown as a separate map layer.
- `assets/map.css` — embedded map, park directory and added brand styling.
- `assets/tree-mark.svg` — scalable tree mark recreated from the supplied presentation photograph.
- `assets/styles.css` — colours, type and layout.
- `assets/app.js` — map filtering and interaction logic.

The interactive map uses OpenStreetMap's official embeddable map, which does not require an API key. Named park links and each project detail open the corresponding latitude/longitude on OpenStreetMap. The project model can later be connected to a CMS or Google Sheet without changing the visitor-facing layout.
