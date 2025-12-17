export default function decorate(block) {
  const rows = [...block.children];

  const videoPath = rows[0].querySelector('p')?.textContent?.trim();
  if (!videoPath) return;

  // Clean block
  block.textContent = '';

  /* VIDEO WRAPPER */
  const videoWrapper = document.createElement('div');
  videoWrapper.style.position = 'relative';

  const video = document.createElement('video');
  video.src = videoPath.replace(/\\/g, '/'); // Windows path fix
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;

  videoWrapper.appendChild(video);

  /* PAUSE BUTTON */
  const control = document.createElement('button');
  control.className = 'video-control';
  control.textContent = '❚❚';

  control.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      control.textContent = '❚❚';
    } else {
      video.pause();
      control.textContent = '▶';
    }
  });

  videoWrapper.appendChild(control);

  /* CONTENT */
  const content = document.createElement('div');
  content.append(rows[1], rows[2], rows[3]);

  block.append(videoWrapper, content);
}
