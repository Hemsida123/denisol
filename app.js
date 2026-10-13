const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() { toggle?.setAttribute('aria-expanded', 'false'); toggle?.setAttribute('aria-label', 'Öppna menyn'); nav?.classList.remove('is-open'); }
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Stäng menyn' : 'Öppna menyn');
  nav.classList.toggle('is-open', open);
});
nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
const desktop = window.matchMedia('(min-width: 1101px)');
desktop.addEventListener('change', closeMenu);
const details = [...document.querySelectorAll('.service-detail')];
const servicePhoto = document.querySelector('.service-photo');
details.forEach(detail => detail.addEventListener('toggle', () => {
  if (!detail.open || !servicePhoto) return;
  details.forEach(other => { if (other !== detail) other.open = false; });
  const width = Number(detail.dataset.width);
  servicePhoto.srcset = `${detail.dataset.imageSmall} ${width === 1600 ? 800 : 600}w, ${detail.dataset.image} ${width}w`;
  servicePhoto.src = detail.dataset.image;
  servicePhoto.alt = detail.dataset.alt;
  document.querySelector('#service-caption').textContent = detail.dataset.label;
}));
const recoButton = document.querySelector('#load-reco');
recoButton?.addEventListener('click', () => {
  const frame = document.createElement('iframe');
  frame.title = 'Kundomdömen om Denisol från Reco';
  frame.src = 'https://widget.reco.se/v2/widget/4028439?mode=HORIZONTAL_QUOTE';
  frame.loading = 'lazy';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.className = 'reco-frame';
  document.querySelector('#reco-container').append(frame);
  recoButton.textContent = 'Reco-widget visas nedan';
  recoButton.disabled = true;
  // The adjacent direct link remains available if a browser blocks third-party frames.
});
