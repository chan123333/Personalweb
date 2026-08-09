document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    document.body.classList.add('page-loaded');
  });
});
