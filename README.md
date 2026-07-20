# Stars & Stripes Upholstery II — 43 Build

A complete, responsive one-page static website prepared for GitHub and Vercel.

## Files

- `index.html` — complete one-page site
- `styles.css` — full responsive design
- `script.js` — mobile navigation, animations, gallery and estimate-email form
- `assets/logo.png` — temporary logo extracted from the supplied business card
- `assets/gallery/` — upload-ready project gallery
- `vercel.json` — Vercel routing configuration

## Replace the temporary logo

The website header is designed around the supplied logo ratio of **2048 × 862**.

1. Rename the final logo image to `logo.png`.
2. Open the `assets` folder.
3. Replace the existing `logo.png` file.
4. Keep the exact filename and path: `assets/logo.png`.

The image automatically scales down for desktop, tablet and mobile while preserving its proportions.

## Add the Facebook gallery images

Facebook does not provide a reliable direct bulk download through this build environment, so the gallery is fully coded but waits for local image files.

1. Download the approved project photos from the business Facebook page.
2. Do not download or use these excluded photo IDs:
   - `499227952212404`
   - `499227948879071`
3. Rename approved photos:
   - `project-01.jpg`
   - `project-02.jpg`
   - continue through `project-12.jpg`
4. Upload them into `assets/gallery/`.

The site automatically displays every numbered image it finds. No HTML or JavaScript edits are needed.

## Business information currently used

- Office: 508-999-2923
- Cell: 774-301-0116
- Email: Sandstripes37@gmail.com
- Address: 55 Wamsutta Street, Door #37, New Bedford, MA 02740

Verify the street number before launch.

## Upload through GitHub in your browser

1. Create or open the GitHub repository for the site.
2. Click **Add file** → **Upload files**.
3. Open the unzipped build folder on your computer.
4. Select every file and folder inside it, including the `assets` folder.
5. Drag everything into GitHub's upload area.
6. Add a commit message such as `Add Stars and Stripes website`.
7. Click **Commit changes**.

## Deploy through Vercel

1. Open Vercel and select **Add New** → **Project**.
2. Import the GitHub repository.
3. Leave the framework preset as **Other** if Vercel does not detect one.
4. No build command is needed.
5. The output directory can remain blank or use `.`.
6. Click **Deploy**.

## Estimate form behavior

The estimate form is compatible with a static site. It opens the visitor's email app and pre-fills the project information to `Sandstripes37@gmail.com`. Visitors can attach photos before sending.
