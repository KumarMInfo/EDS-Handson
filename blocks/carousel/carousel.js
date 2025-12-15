export default function decorate(block) {
  const slides = [...block.children];

  block.classList.add('carousel');

  const visual = document.createElement('div');
  visual.className = 'carousel-visual';

  const content = document.createElement('div');
  content.className = 'carousel-content';

  const images = [];
  const texts = [];

  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (!img) return;

    // clone content safely (EDS-friendly)
    const text = slide.cloneNode(true);

    images.push(img);
    texts.push(text);

    visual.appendChild(img);
    content.appendChild(text);
  });

  // replace original content
  block.textContent = '';
  block.append(visual, content);

  // navigation
  const prev = document.createElement('button');
  prev.className = 'carousel-nav prev';
  prev.setAttribute('aria-label', 'Previous slide');
  prev.textContent = '←';

  const next = document.createElement('button');
  next.className = 'carousel-nav next';
  next.setAttribute('aria-label', 'Next slide');
  next.textContent = '→';

  block.append(prev, next);

  let current = 0;
  const total = images.length;

  function update() {
    images.forEach((img, i) => {
      // 🔑 reset only carousel-related classes
      img.classList.remove('active', 'left', 'right');

      const diff = (i - current + total) % total;

      if (diff === 0) img.classList.add('active');
      else if (diff === 1) img.classList.add('right');
      else if (diff === total - 1) img.classList.add('left');
    });

    texts.forEach((t, i) => {
      t.classList.toggle('active', i === current);
    });
  }

  prev.addEventListener('click', () => {
    current = (current - 1 + total) % total;
    update();
  });

  next.addEventListener('click', () => {
    current = (current + 1) % total;
    update();
  });

  update();
}
