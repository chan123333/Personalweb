document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.card');

  if (filters.length && cards.length) {
    filters.forEach((filter) => {
      filter.addEventListener('click', () => {
        filters.forEach((f) => f.classList.remove('active'));
        filter.classList.add('active');

        const selected = filter.dataset.filter;
        cards.forEach((card) => {
          const category = card.dataset.category;
          const matches = selected === 'all' || category === selected;
          card.style.display = matches ? '' : 'none';
        });
      });
    });
  }

  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  const toast = document.createElement('div');
  toast.className = 'contact-toast';
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      toast.textContent = 'Please fill in your name, email, and message.';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2600);
      return;
    }

    if (!emailPattern.test(email)) {
      toast.textContent = 'Please enter a valid email address.';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2600);
      return;
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/christianpenaflorida3@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _captcha: false,
          _template: 'plain',
          _subject: 'New Portfolio Contact Message'
        })
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      toast.textContent = 'Message sent successfully!';
      toast.classList.add('show');
      contactForm.reset();
      setTimeout(() => toast.classList.remove('show'), 3000);
    } catch (error) {
      toast.textContent = 'Please try again later.';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  });
});
