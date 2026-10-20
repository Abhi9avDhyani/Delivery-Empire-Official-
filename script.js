const topbar = document.querySelector('.topbar');
const progress = document.querySelector('.scroll-progress i');
const glow = document.querySelector('.cursor-glow');
const heroVisual = document.querySelector('.hero-visual');
const menu = document.querySelector('.menu');
const mobileNav = document.querySelector('.mobile-nav');
const missionButtons = [...document.querySelectorAll('.mission')];
const missionImage = document.querySelector('#mission-image');
const missionLabel = document.querySelector('#mission-label');
const missionTitle = document.querySelector('#mission-title');
const missionBody = document.querySelector('#mission-body');
const expandButton = document.querySelector('.expand-shot');
const modal = document.querySelector('.image-modal');
const modalImage = modal.querySelector('img');
const closeModal = modal.querySelector('.modal-close');

const updateScroll = () => {
  const maximum = document.documentElement.scrollHeight - window.innerHeight;
  const value = maximum > 0 ? (window.scrollY / maximum) * 100 : 0;
  progress.style.width = `${value}%`;
  topbar.classList.toggle('scrolled', window.scrollY > 24);
};

window.addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

window.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
  if (window.innerWidth > 850 && event.clientY < window.innerHeight) {
    const x = (event.clientX / window.innerWidth - 0.5) * 1.1;
    const y = (event.clientY / window.innerHeight - 0.5) * 0.7;
    heroVisual.style.transform = `translate(${x}%, ${y}%) scale(1.02)`;
  }
});

menu.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
  menu.querySelector('span').textContent = isOpen ? 'CLOSE' : 'MENU';
});

mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.querySelector('span').textContent = 'MENU';
}));

const selectMission = (button) => {
  missionButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
  });
  missionImage.classList.add('changing');
  window.setTimeout(() => {
    missionImage.src = button.dataset.image;
    missionImage.alt = `Delivery Empire gameplay: ${button.querySelector('b').textContent.toLowerCase()}`;
    missionLabel.textContent = button.dataset.label;
    missionTitle.innerHTML = button.dataset.title;
    missionBody.textContent = button.dataset.body;
    expandButton.dataset.modalImage = button.dataset.image;
    expandButton.dataset.modalAlt = missionImage.alt;
    missionImage.classList.remove('changing');
  }, 150);
};

missionButtons.forEach((button) => button.addEventListener('click', () => selectMission(button)));

const openImage = (image, alt) => {
  modalImage.src = image;
  modalImage.alt = alt;
  modal.showModal();
};

document.querySelectorAll('[data-modal-image]').forEach((button) => {
  button.addEventListener('click', () => openImage(button.dataset.modalImage, button.dataset.modalAlt));
});

closeModal.addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.16 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
