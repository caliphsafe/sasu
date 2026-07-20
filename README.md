# Stars & Stripes Upholstery — Modern 43 Build

A responsive one-page static site designed for GitHub + Vercel.

## Upload
1. Extract the ZIP.
2. Upload all files and folders to the root of a GitHub repository.
3. Import the repository into Vercel.
4. Framework preset: Other. No build command is required.

## Logo
Replace `assets/logo.png` with the final 2048 × 862 logo. Keep the filename the same. The design preserves its proportions on desktop and mobile.

## Gallery
The gallery is native and local. It never links visitors to Facebook.

1. Save approved project photos inside `assets/gallery/`.
2. Open `gallery.js`.
3. Add entries such as:

```js
window.GALLERY_IMAGES = [
  { src: "assets/gallery/project-01.jpg", alt: "Restored automotive seat" },
  { src: "assets/gallery/project-02.jpg", alt: "Custom boat interior" }
];
```

Excluded Facebook photo IDs:
- 499227952212404
- 499227948879071

## Contact information
- Office: 508-999-2923
- Cell: 774-301-0116
- Email: Sandstripes37@gmail.com
- Address used: 1 Wamsutta Street, Door #37, New Bedford, MA 02740
