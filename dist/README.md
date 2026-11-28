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
2. Add the final page copy and event photography supplied by the organising team.
3. Replace the annotated corridor working map with the agreed clean version.
4. Add the first newsletter PDF and activate its download link.
5. Connect the mailing-list form using Nature North London's EmailOctopus form ID or embed code.
6. Choose a form-delivery service if the contact and project forms must submit without opening the visitor's email app.
7. Add any required privacy, safeguarding and organisational information, then test the site on mobile and desktop.

## File guide

- `index.html` — home page.
- `about.html`, `map.html`, `resources.html`, `events.html`, `contact.html`, `newsletters.html` — main website pages.
- `data/projects.js` — the only file normally needed for project updates.
- `data/parks.js` — named North London parks shown as a separate map layer.
- `assets/map.css` — embedded map, park directory and added brand styling.
- `assets/nature-north-london-tree.png` — transparent tree logo derived from the supplied Nature North London artwork.
- `assets/styles.css` and `assets/pages.css` — shared colours, type and page layouts.
- `assets/app.js` — map filtering and interaction logic.

The interactive map uses OpenStreetMap's official embeddable map, which does not require an API key. Named park links and each project detail open the corresponding latitude/longitude on OpenStreetMap. The project model can later be connected to a CMS or Google Sheet without changing the visitor-facing layout.
