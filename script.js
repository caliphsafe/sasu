(() => {
  const images = Array.isArray(window.GALLERY_IMAGES) ? window.GALLERY_IMAGES : [];
  const gallery = document.querySelector('#gallery');
  const heroStack = document.querySelector('#hero-photo-stack');
  const aboutImage = document.querySelector('#about-image');
  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = document.querySelector('#lightbox-image');
  const closeButton = document.querySelector('.lightbox-close');

  const makeImage = (item, className = '') => {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.referrerPolicy = 'no-referrer';
    if (className) img.className = className;
    img.addEventListener('error', () => {
      img.classList.add('image-unavailable');
      img.removeAttribute('src');
    });
    return img;
  };

  images.forEach((item, index) => {
    const figure = document.createElement('figure');
    figure.className = `gallery-item gallery-item-${index + 1}`;
    figure.tabIndex = 0;
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-label', `Open project image ${index + 1}`);
    figure.appendChild(makeImage(item));
    const label = document.createElement('figcaption');
    label.innerHTML = `<span>Project ${String(index + 1).padStart(2, '0')}</span><strong>View project</strong>`;
    figure.appendChild(label);
    const open = () => openLightbox(item);
    figure.addEventListener('click', open);
    figure.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
    });
    gallery.appendChild(figure);
  });

  images.slice(0, 3).forEach((item, index) => {
    const card = document.createElement('div');
    card.className = `stack-card stack-card-${index + 1}`;
    card.appendChild(makeImage(item));
    heroStack.appendChild(card);
  });

  if (images[1]) aboutImage.appendChild(makeImage(images[1]));

  function openLightbox(item) {
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.removeAttribute('src');
    document.body.classList.remove('modal-open');
  }

  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });

  document.querySelector('#year').textContent = new Date().getFullYear();
})();
