export default function decorate(block) {
  // Collect slides (each top-level row = one slide)
  const slides = [...block.children];

  block.classList.add('carousel');

  // Create track
  const track = document.createElement('div');
  track.className = 'carousel-track';

  slides.forEach((slide, index) => {
    slide.classList.add('carousel-slide');

    // Detect image-only columns
    [...slide.children].forEach((col) => {
      const picture = col.querySelector('picture');
      if (picture && col.children.length === 1) {
        col.classList.add('carousel-img-col');
      }
    });

    if (index === 0) slide.classList.add('active');

    track.appendChild(slide);
  });

  // Replace block content with track
  block.textContent = '';
  block.append(track);

  /* Navigation buttons */
  const prev = document.createElement('button');
  prev.className = 'carousel-nav prev';
  prev.setAttribute('aria-label', 'Previous slide');
  prev.textContent = '‹';

  const next = document.createElement('button');
  next.className = 'carousel-nav next';
  next.setAttribute('aria-label', 'Next slide');
  next.textContent = '›';

  block.append(prev, next);

  // State
  let currentIndex = 0;

  function update() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    update();
  });

  next.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    update();
  });
}
