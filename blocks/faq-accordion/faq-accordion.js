export default function decorate(block) {
  block.classList.add('faq-accordion');

  const items = [...block.children];

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all
      items.forEach((el) => el.classList.remove('active'));

      // Open clicked
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}
