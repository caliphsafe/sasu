window.GALLERY_IMAGES = Array.from({ length: 10 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  return {
    src: `assets/gallery/project-${number}.jpg`,
    title: `Project ${number}`,
    alt: `Stars & Stripes Upholstery project ${number}`
  };
});
