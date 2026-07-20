# Stars & Stripes Upholstery — Glass 43 Build

## Upload to GitHub
1. Open the website repository in GitHub.
2. Choose **Add file → Upload files**.
3. Upload the contents of this folder, not the ZIP itself.
4. Commit the changes.
5. Vercel will redeploy automatically when connected to the repository.

## Logo
The supplied 2048 × 862 logo is stored at `assets/logo.png`. CSS preserves its proportions and scales it for desktop, tablet and mobile.

## Facebook images
The project does not contain downloaded Facebook photos. `gallery.js` uses public Facebook photo-page IDs and resolves their display image remotely at page load through Microlink. The images remain inside the website gallery and lightbox; clicking them does not send visitors to Facebook.

Excluded photo IDs:
- 499227952212404
- 499227948879071

Because Facebook controls the original pages and image delivery, remote images can stop loading if Facebook changes access rules or Microlink changes its public service. For permanent reliability, locally hosted copies or an official Facebook API token would eventually be better.

## Main files
- `index.html` — one-page website structure
- `styles.css` — responsive Apple-glass visual system
- `gallery.js` — Facebook-hosted photo references
- `script.js` — gallery rendering, lightbox and interactions
- `assets/logo.png` — business logo
