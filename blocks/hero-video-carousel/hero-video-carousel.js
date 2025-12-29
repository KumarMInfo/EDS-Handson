export default function decorate(block) {
  const slidesData = [...block.children];
  block.textContent = '';

  const slides = [];
  const dots = document.createElement('div');
  dots.className = 'hero-video-dots';
  let current = 0;

  function activate(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
      dots.children[i].classList.toggle('active', i === index);
    });
    current = index;
  }
  slidesData.forEach((slide, index) => {
    const videoPath = slide.querySelector('p')?.textContent?.trim();
    if (!videoPath) return;

    const title = slide.children[1]?.textContent;
    const ctaText = slide.querySelector('li')?.textContent || 'Discover';

    /* Slide */
    const slideEl = document.createElement('div');
    slideEl.className = 'hero-video-slide';

    /* Video */
    const video = document.createElement('video');
    video.src = videoPath.replace(/\\/g, '/');
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    /* Content */
    const content = document.createElement('div');
    content.className = 'hero-video-content';

    const eyebrow = document.createElement('div');
    eyebrow.className = 'hero-video-eyebrow';
    eyebrow.textContent = 'Collections';

    const heading = document.createElement('div');
    heading.className = 'hero-video-title';
    heading.textContent = title;

    const cta = document.createElement('div');
    cta.className = 'hero-video-cta';
    cta.innerHTML = `${ctaText} <span>→</span>`;

    content.append(eyebrow, heading, cta);
    slideEl.append(video, content);
    block.append(slideEl);

    slides.push(slideEl);

    /* Dot */
    const dot = document.createElement('div');
    dot.className = 'hero-video-dot';
    dot.addEventListener('click', () => activate(index));
    dots.append(dot);
  });

  block.append(dots);
  activate(0);

  /* Auto rotate */
  setInterval(() => {
    activate((current + 1) % slides.length);
  }, 7000);
}
