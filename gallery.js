/*
  These images are not downloaded into the project. Each source is resolved at
  display time from a public Stars & Stripes Upholstery Facebook photo page.

  Intentionally excluded by request:
  - 499227952212404
  - 499227948879071
*/
const facebookPhoto = (id) => {
  const pageUrl = `https://www.facebook.com/Starsandstripes63/photos/${id}/`;
  return `https://api.microlink.io/?url=${encodeURIComponent(pageUrl)}&embed=image.url`;
};

window.GALLERY_IMAGES = [
  { id: '1889690447907566', src: facebookPhoto('1889690447907566'), alt: 'Stars & Stripes Upholstery project' },
  { id: '1919189904957620', src: facebookPhoto('1919189904957620'), alt: 'Custom upholstery work by Stars & Stripes Upholstery' },
  { id: '1780550532154892', src: facebookPhoto('1780550532154892'), alt: 'Recent Stars & Stripes Upholstery project' }
];
