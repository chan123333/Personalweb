// Marks that JS is available so CSS can safely hide the page before fading it in.
// (Runs inline in <head>, before CSS paints, so there's no flash of visible content.)
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const TRANSITION_MS = 0;

  // Fade the page in once it's ready
  requestAnimationFrame(() => {
    document.body.classList.add('page-loaded');
  });

  // Intercept clicks on internal .html links and fade out before navigating
  const links = document.querySelectorAll('a[href]');

  links.forEach((link) => {
    const href = link.getAttribute('href');
    const isInternalPage =
      href && href.endsWith('.html') && link.target !== '_blank';

    if (!isInternalPage) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.remove('page-loaded');
      document.body.classList.add('page-leaving');

      setTimeout(() => {
        window.location.href = href;
      }, TRANSITION_MS);
    });
  });
});
