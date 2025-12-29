export default function decorate(block) {
  const slides = [...block.children];

  /* Track */
  const track = document.createElement('div');
  track.className = 'carousel-type3-track';

  slides.forEach((slide) => {
    slide.classList.add('carousel-type3-slide');
    track.appendChild(slide);
  });

  block.textContent = '';
  block.appendChild(track);

  /* Arrows */
  const prev = document.createElement('button');
  prev.className = 'carousel-type3-nav carousel-type3-prev';
  prev.textContent = '‹';

  const next = document.createElement('button');
  next.className = 'carousel-type3-nav carousel-type3-next';
  next.textContent = '›';

  block.append(prev, next);

  /* Prepare state BEFORE use */
  let index = 0;
  let dots = [];

  /* 🔥 activate() restored to original logic behavior */
  function activate(i) {
    slides.forEach((slide, sIndex) => {
      slide.classList.toggle('is-active', sIndex === i);
    });

    dots.forEach((dot, dIndex) => {
      dot.classList.toggle('active', dIndex === i);
    });
  }

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    activate(index);
  }

  /* Dots */
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'carousel-type3-dots';

  dots = slides.map((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'carousel-type3-dot';
    dot.addEventListener('click', () => {
      index = i;
      update();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  block.appendChild(dotsWrap);

  prev.addEventListener('click', () => {
    index = Math.max(index - 1, 0);
    update();
  });

  next.addEventListener('click', () => {
    index = Math.min(index + 1, slides.length - 1);
    update();
  });

  update();
}
