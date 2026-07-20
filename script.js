(() => {
  const images = Array.isArray(window.GALLERY_IMAGES) ? window.GALLERY_IMAGES : [];
  const grid = document.querySelector('#gallery-grid');
  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = document.querySelector('#lightbox-image');
  const lightboxCount = document.querySelector('#lightbox-count');
  const lightboxTitle = document.querySelector('#lightbox-title');
  const closeButton = document.querySelector('.lightbox-close');
  const previousButton = document.querySelector('.lightbox-prev');
  const nextButton = document.querySelector('.lightbox-next');
  const dotsContainer = document.querySelector('#lightbox-dots');
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('#primary-nav');
  let currentIndex = 0;
  const available = new Set();

  images.forEach((item, index) => {
    const button = document.createElement('button');
    button.className = 'gallery-item';
    button.type = 'button';
    button.hidden = true;
    button.setAttribute('aria-label', `Open ${item.title}`);

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('load', () => {
      available.add(index);
      button.hidden = false;
      button.classList.add('loaded');
      updateGalleryState();
    });
    img.addEventListener('error', () => {
      button.remove();
      updateGalleryState();
    });
    button.appendChild(img);

    const caption = document.createElement('span');
    caption.className = 'gallery-caption';
    caption.innerHTML = `<span>${item.title}</span><strong>View project</strong>`;
    button.appendChild(caption);

    button.addEventListener('click', () => openLightbox(index));
    grid.appendChild(button);
  });

  const emptyState = document.createElement('div');
  emptyState.className = 'gallery-empty glass';
  emptyState.innerHTML = '<strong>Project gallery</strong><p>Recent upholstery work will be featured here.</p>';
  grid.after(emptyState);

  function updateGalleryState() {
    emptyState.hidden = available.size > 0;
  }

  updateGalleryState();

  function validIndexes() {
    return [...available].sort((a, b) => a - b);
  }

  function openLightbox(index) {
    if (!available.has(index)) return;
    currentIndex = index;
    renderLightbox();
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeButton.focus();
  }

  function renderLightbox() {
    const item = images[currentIndex];
    const valid = validIndexes();
    const position = valid.indexOf(currentIndex);
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    lightboxCount.textContent = `${position + 1} / ${valid.length}`;
    lightboxTitle.textContent = item.title;
    previousButton.disabled = valid.length < 2;
    nextButton.disabled = valid.length < 2;
    dotsContainer.innerHTML = '';
    valid.forEach((imageIndex, dotIndex) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'lightbox-dot';
      dot.setAttribute('aria-label', `View image ${dotIndex + 1}`);
      if (imageIndex === currentIndex) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = imageIndex;
        renderLightbox();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function move(direction) {
    const valid = validIndexes();
    if (valid.length < 2) return;
    const position = valid.indexOf(currentIndex);
    currentIndex = valid[(position + direction + valid.length) % valid.length];
    renderLightbox();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    document.body.classList.remove('modal-open');
  }

  closeButton.addEventListener('click', closeLightbox);
  previousButton.addEventListener('click', () => move(-1));
  nextButton.addEventListener('click', () => move(1));
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', event => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);
  });

  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));

  document.querySelector('#year').textContent = new Date().getFullYear();
})();
