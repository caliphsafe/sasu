const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const year = document.querySelector('#year');
const estimateForm = document.querySelector('#estimate-form');

if (year) {
  year.textContent = new Date().getFullYear();
}

function closeNav() {
  if (!navToggle || !navLinks) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('is-open');
  document.body.classList.remove('nav-open');
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navLinks.classList.toggle('is-open', !open);
    document.body.classList.toggle('nav-open', !open);
  });

  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

  window.addEventListener('resize', () => {
    if (window.innerWidth > 940) closeNav();
  });
}

if (estimateForm) {
  estimateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(estimateForm);
    const name = formData.get('name')?.toString().trim() || '';
    const phone = formData.get('phone')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const project = formData.get('project')?.toString().trim() || '';
    const details = formData.get('details')?.toString().trim() || '';

    const subject = encodeURIComponent(`Free Estimate Request — ${project || 'Upholstery Project'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nProject type: ${project}\n\nProject details:\n${details}\n\nI can attach project photos to this email.`
    );

    window.location.href = `mailto:Sandstripes37@gmail.com?subject=${subject}&body=${body}`;
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Gallery setup: add JPG files named project-01.jpg through project-12.jpg
// to assets/gallery/. Missing files are ignored automatically.
const galleryCandidates = Array.from({ length: 12 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  return {
    src: `assets/gallery/project-${number}.jpg`,
    alt: `Stars & Stripes Upholstery project ${index + 1}`,
    caption: `Custom upholstery project ${index + 1}`
  };
});

const galleryGrid = document.querySelector('#gallery-grid');
const galleryFallback = document.querySelector('#gallery-fallback');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let loadedGalleryImages = [];
let activeGalleryIndex = 0;

function testImage(image) {
  return new Promise((resolve) => {
    const tester = new Image();
    tester.onload = () => resolve(image);
    tester.onerror = () => resolve(null);
    tester.src = image.src;
  });
}

function renderGallery(images) {
  if (!galleryGrid || !galleryFallback) return;
  loadedGalleryImages = images;

  if (!images.length) {
    galleryFallback.hidden = false;
    return;
  }

  galleryFallback.hidden = true;
  galleryGrid.innerHTML = '';

  images.forEach((image, index) => {
    const button = document.createElement('button');
    button.className = 'gallery-card';
    button.type = 'button';
    button.setAttribute('aria-label', `Open ${image.caption}`);
    button.innerHTML = `
      <img src="${image.src}" alt="${image.alt}" loading="lazy">
      <span>${image.caption}</span>
    `;
    button.addEventListener('click', () => openLightbox(index));
    galleryGrid.appendChild(button);
  });
}

function updateLightbox() {
  const image = loadedGalleryImages[activeGalleryIndex];
  if (!image || !lightboxImage || !lightboxCaption) return;
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = image.caption;
}

function openLightbox(index) {
  if (!lightbox || !loadedGalleryImages.length) return;
  activeGalleryIndex = index;
  updateLightbox();
  lightbox.showModal();
}

function shiftLightbox(direction) {
  if (!loadedGalleryImages.length) return;
  activeGalleryIndex = (activeGalleryIndex + direction + loadedGalleryImages.length) % loadedGalleryImages.length;
  updateLightbox();
}

Promise.all(galleryCandidates.map(testImage)).then((results) => {
  renderGallery(results.filter(Boolean));
});

lightboxClose?.addEventListener('click', () => lightbox.close());
lightboxPrev?.addEventListener('click', () => shiftLightbox(-1));
lightboxNext?.addEventListener('click', () => shiftLightbox(1));

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

window.addEventListener('keydown', (event) => {
  if (!lightbox?.open) return;
  if (event.key === 'ArrowLeft') shiftLightbox(-1);
  if (event.key === 'ArrowRight') shiftLightbox(1);
});
