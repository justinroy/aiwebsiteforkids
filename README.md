# Meet AI!

`Meet AI!` is a single-page, kid-friendly website that explains what AI is, what it can do, where it can go wrong, and how kids can use it safely.

## File Structure

```text
.
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Preview Locally

Because this is a plain static site, you can preview it in any browser.

Option 1:
- Double-click `index.html`

Option 2:
- From this folder, run `python3 -m http.server`
- Then open `http://localhost:8000`

## Publish to GitHub Pages

1. Create a GitHub repository and add these files.
2. Push the repository to GitHub.
3. In GitHub, open `Settings` > `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select your main branch and the `/ (root)` folder.
6. Save, then wait for the Pages URL to appear.

## Where to Edit Content

- Main page structure and section text: `index.html`
- Theme colors, spacing, layout, and visual style: `styles.css`
- Quiz questions, prompt lab examples, hotspot content, and mini-game data: `script.js`

Helpful spots in the code:
- Theme colors are at the top of `styles.css` inside `:root`
- Quiz questions are in the `quizQuestions` array in `script.js`
- Prompt Lab text is in the `promptPieces` object in `script.js`
- Everyday AI hotspot text is in the `hotspotContent` object in `script.js`
- Sorting game tasks are in the `sortTasks` array in `script.js`

## Notes

- No build tools, frameworks, or external APIs are required.
- The site is ready to publish as static files on GitHub Pages.
- All interactions are powered by vanilla JavaScript.
