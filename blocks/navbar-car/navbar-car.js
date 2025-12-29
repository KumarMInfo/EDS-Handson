export default function decorate(block) {
  // Make nav items focusable (accessibility)
  block.querySelectorAll('li').forEach((item) => {
    item.setAttribute('tabindex', '0');
  });

  // Optional: active state on click
  block.querySelectorAll('li').forEach((item) => {
    item.addEventListener('click', () => {
      block.querySelectorAll('li').forEach((el) => el.classList.remove('active'));
      item.classList.add('active');
    });
  });
}
