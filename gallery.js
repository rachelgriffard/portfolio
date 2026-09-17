const gallery = document.getElementById('gallery');
const images = Array.from(gallery.children);
for (let i = images.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [images[i], images[j]] = [images[j], images[i]];
}
images.forEach(img => gallery.appendChild(img));
gallery.classList.add('ready');

document.fonts.ready.then(() => {
  const first = document.getElementById('firstName');
  const last = document.getElementById('lastName');

  first.style.transform = 'none';
  last.style.transform = 'none';

  const w1 = first.getBoundingClientRect().width;
  const w2 = last.getBoundingClientRect().width;
  const target = Math.max(w1, w2);

  const firstFontSize = parseFloat(getComputedStyle(first).fontSize);
  first.style.fontSize = `${firstFontSize * (target / w1)}px`;
  last.style.transform = `scaleX(${target / w2})`;
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('lightboxClose');
const prevBtn = document.getElementById('lightboxPrev');
const nextBtn = document.getElementById('lightboxNext');
let currentIndex = -1;

function galleryImages() {
  return Array.from(gallery.querySelectorAll('img'));
}

function openLightbox(index) {
  const imgs = galleryImages();
  currentIndex = (index + imgs.length) % imgs.length;
  lightboxImg.src = imgs[currentIndex].src;
  lightboxImg.alt = imgs[currentIndex].alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

function showRelative(delta) {
  if (currentIndex === -1) return;
  openLightbox(currentIndex + delta);
}

gallery.addEventListener('click', (e) => {
  const img = e.target.closest('img');
  if (!img) return;
  openLightbox(galleryImages().indexOf(img));
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => showRelative(-1));
nextBtn.addEventListener('click', () => showRelative(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showRelative(-1);
  if (e.key === 'ArrowRight') showRelative(1);
});
