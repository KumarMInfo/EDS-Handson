export default function decorate(block) {
  const nav = block.querySelector('ul');
  if (!nav) return;

  // Create hamburger button
  const toggle = document.createElement('button');
  toggle.className = 'navbar-toggle';
  toggle.setAttribute('aria-label', 'Toggle navigation');
  toggle.textContent = '☰';

  block.prepend(toggle);

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close menu on link click (mobile)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}
