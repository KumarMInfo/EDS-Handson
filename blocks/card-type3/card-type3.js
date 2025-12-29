export default function decorate(block) {
  const cards = [...block.children];

  cards.forEach((card) => {
    card.classList.add('card-type3-item');

    /* Find CTA text */
    const cta = card.querySelector('div:last-child p');

    if (cta) {
      card.classList.add('is-clickable');
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'link');

      /* Click entire card */
      card.addEventListener('click', () => {
        // If later you replace CTA text with <a>, this will auto-work
        const link = card.querySelector('a');
        if (link) link.click();
      });

      /* Keyboard support */
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    }

    /* Hover / focus states */
    card.addEventListener('mouseenter', () => {
      card.classList.add('is-hovered');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('is-hovered');
    });

    card.addEventListener('focus', () => {
      card.classList.add('is-hovered');
    });

    card.addEventListener('blur', () => {
      card.classList.remove('is-hovered');
    });
  });
}
