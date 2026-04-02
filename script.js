// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('nav-hamburger');
const navLinksList = document.getElementById('nav-links-list');
hamburger.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
  hamburger.classList.toggle('open');
});
navLinksList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksList.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ===== HERO SLIDESHOW =====
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}
setInterval(nextSlide, 5500);

// ===== GALLERY THUMB SWITCH =====
function setMain(mainId, src, thumb) {
  const mainImg = document.getElementById(mainId);
  if (!mainImg) return;
  mainImg.style.opacity = '0';
  setTimeout(() => {
    mainImg.src = src;
    mainImg.style.opacity = '1';
  }, 200);
  const gallery = thumb.closest('.casa-gallery');
  gallery.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}
document.querySelectorAll('.gallery-main-img').forEach(img => {
  img.style.transition = 'opacity .2s ease';
});

// ===== LIGHTBOX =====
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  lbImg.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
// Prevent closing when clicking the image itself
document.getElementById('lightbox-img')?.addEventListener('click', (e) => {
  e.stopPropagation();
});

// ===== CONTACT FORM → WHATSAPP =====
const WA_NUMBER = '541162156858'; // +54 11 6215 6858

function submitForm(e) {
  e.preventDefault();
  const nombre   = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const casa     = document.getElementById('casa').value;
  const personas = document.getElementById('personas').value;
  const checkin  = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const mensaje  = document.getElementById('mensaje').value.trim();

  // Formatear fechas legibles
  const fmtFecha = (d) => {
    if (!d) return '–';
    const [y, m, day] = d.split('-');
    return `${day}/${m}/${y}`;
  };

  // Calcular noches
  let noches = '';
  if (checkin && checkout) {
    const diff = (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24);
    if (diff > 0) noches = ` (${diff} noche${diff > 1 ? 's' : ''})`;
  }

  // Construir mensaje de WhatsApp bien formateado (Presupuesto Digital)
  const waMsg = [
    '🏔️ *PRESUPUESTO DIGITAL — LA BEATRIZ Casas de Montaña*',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━',
    `👤 *Cliente:* ${nombre || '–'}`,
    `📱 *WhatsApp:* ${telefono || '–'}`,
    '',
    `🏠 *Propiedad:* ${casa || 'La Beatriz — Casas de Montaña'}`,
    `👥 *Capacidad:* ${personas || '5'} personas`,
    `📅 *Check-in:* ${fmtFecha(checkin)}`,
    `📅 *Check-out:* ${fmtFecha(checkout)}${noches}`,
    '',
    '⭐ *AMENITIES INCLUIDOS:*',
    '• WiFi Starlink de alta velocidad',
    '• Smart TV en cada ambiente (Living y Dormitorio)',
    '• 2 Baños completos',
    '• Parrilla y Fogón privado',
    '• Cocina totalmente equipada',
    '',
    `💬 *Consulta:* ${mensaje || 'Me interesa consultar disponibilidad.'}`,
    '━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '📍 *Ubicación:* Ruta Nacional 7 km 1141,5 · Uspallata · Mendoza',
    '🌐 *Web:* https://labeatriz.com.ar',
  ].join('\n');

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`;

  // Abrir WhatsApp
  window.open(waUrl, '_blank');

  // Feedback visual en el formulario
  const btn = document.getElementById('btn-submit');
  const success = document.getElementById('form-success');
  if (success) {
    success.style.display = 'block';
    success.textContent = '✅ Redirigiendo a WhatsApp... ¡Gracias!';
  }
  if (btn) btn.disabled = true;

  setTimeout(() => {
    document.getElementById('contact-form').reset();
    if (btn) btn.disabled = false;
    if (success) success.style.display = 'none';
  }, 4000);
}

// ===== INTERSECTION OBSERVER — fade-in on scroll =====
const observerOptions = { threshold: 0.10 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const animTargets = document.querySelectorAll(
  '.casa-block, .propiedad-stat, .centro-card, .act-card, .destino-card, .ubi-item, .galeria-img, .season-img, .video-wrap'
);
animTargets.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity .6s ease ${(i % 8) * 0.07}s, transform .6s ease ${(i % 8) * 0.07}s`;
  observer.observe(el);
});

const styleTag = document.createElement('style');
styleTag.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(styleTag);
