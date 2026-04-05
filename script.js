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
// El video panorámico se muestra primero; el slideshow de fotos arranca después de 7s
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function activateSlide(idx) {
  slides.forEach(s => s.classList.remove('active'));
  slides[idx].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  activateSlide(currentSlide);
}

// Arranca las fotos después de que el video muestra 7 segundos
setTimeout(() => {
  activateSlide(0);
  setInterval(nextSlide, 5500);
}, 7000);

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
document.getElementById('lightbox-img')?.addEventListener('click', (e) => {
  e.stopPropagation();
});

// ===== LOGO → BASE64 (para PDF) =====
let logoBase64 = null;
window.addEventListener('load', () => {
  try {
    const img = document.getElementById('nav-logo-img');
    if (!img || !img.complete) return;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || 300;
    canvas.height = img.naturalHeight || 150;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    logoBase64 = canvas.toDataURL('image/jpeg', 0.85);
  } catch (e) {
    console.warn('Logo no disponible para PDF (CORS):', e.message);
  }
});

// ===== GENERAR PDF DE CONSULTA =====
const WA_NUMBER = '541162156858';

function generarPDF(datos) {
  try {
    const { jsPDF } = window.jspdf;
    if (!jsPDF) return null;

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const gold = [184, 147, 90];
    const dark = [13, 13, 13];
    const white = [255, 255, 255];

    // Fondo header
    doc.setFillColor(...dark);
    doc.rect(0, 0, 210, 45, 'F');

    // Logo si disponible
    if (logoBase64) {
      try { doc.addImage(logoBase64, 'JPEG', 8, 5, 55, 35); } catch(e) {}
    }

    // Nombre empresa en header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...gold);
    doc.text('LA BEATRIZ', logoBase64 ? 70 : 10, 20);
    doc.setFontSize(10);
    doc.setTextColor(...white);
    doc.text('Casas de Montaña — Uspallata, Mendoza', logoBase64 ? 70 : 10, 28);
    doc.setFontSize(8);
    doc.setTextColor(...gold);
    doc.text('Ruta Nacional 7 km 1141,5  ·  Cordillera de los Andes', logoBase64 ? 70 : 10, 36);

    // Título consulta
    doc.setFillColor(...gold);
    doc.rect(0, 45, 210, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...dark);
    doc.text('PRESUPUESTO DIGITAL — SOLICITUD DE RESERVA', 105, 52, { align: 'center' });

    // Datos
    let y = 68;
    doc.setTextColor(...dark);

    const campo = (label, valor) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(100, 80, 40);
      doc.text(label.toUpperCase(), 14, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(...dark);
      doc.text(valor || '—', 14, y + 6);
      y += 16;
    };

    // Separador
    const sep = () => {
      doc.setDrawColor(...gold);
      doc.setLineWidth(0.3);
      doc.line(14, y - 4, 196, y - 4);
    };

    campo('Cliente', datos.nombre);
    sep();
    campo('WhatsApp / Teléfono', datos.telefono);
    sep();
    campo('Propiedad solicitada', datos.casa || 'La Beatriz — Casas de Montaña');
    sep();
    campo('Cantidad de personas', datos.personas ? `${datos.personas} personas` : '—');
    sep();

    const fmtFecha = (d) => {
      if (!d) return '—';
      const [yy, mm, dd] = d.split('-');
      const meses = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      return `${dd} de ${meses[parseInt(mm,10)]} de ${yy}`;
    };

    campo('Fecha de llegada (check-in)', fmtFecha(datos.checkin));
    sep();

    let noches = '';
    if (datos.checkin && datos.checkout) {
      const diff = (new Date(datos.checkout) - new Date(datos.checkin)) / 86400000;
      if (diff > 0) noches = ` (${diff} noche${diff > 1 ? 's' : ''})`;
    }
    campo(`Fecha de salida (check-out)${noches}`, fmtFecha(datos.checkout));
    sep();

    if (datos.mensaje) {
      campo('Consulta / Comentario', datos.mensaje);
      sep();
    }

    // Amenities box
    y += 4;
    doc.setFillColor(248, 242, 228);
    doc.roundedRect(14, y, 182, 44, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...gold);
    doc.text('AMENITIES INCLUIDOS EN TODAS LAS CASAS', 105, y + 8, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...dark);
    const amenities = [
      '✓  WiFi Starlink de alta velocidad',
      '✓  Smart TV en Living y Dormitorio',
      '✓  2 Baños completos',
      '✓  Parrilla & Fogón privado',
      '✓  Cocina totalmente equipada — Arquitectura moderna en hormigón visto',
    ];
    amenities.forEach((a, i) => { doc.text(a, 20, y + 16 + i * 6); });

    // Footer
    doc.setFillColor(...dark);
    doc.rect(0, 275, 210, 22, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...gold);
    doc.text('📍 Ruta Nacional 7 km 1141,5 · Uspallata · Mendoza · Argentina', 105, 283, { align: 'center' });
    doc.setTextColor(180, 180, 180);
    doc.text('La Beatriz Casas de Montaña  ·  Donde el lujo se encuentra con la grandeza de los Andes', 105, 291, { align: 'center' });

    return doc;
  } catch (e) {
    console.warn('Error generando PDF:', e);
    return null;
  }
}

// ===== CONTACT FORM → PDF + WHATSAPP =====
function submitForm(e) {
  e.preventDefault();
  const nombre   = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const casa     = document.getElementById('casa').value;
  const personas = document.getElementById('personas').value;
  const checkin  = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const mensaje  = document.getElementById('mensaje').value.trim();

  const datos = { nombre, telefono, casa, personas, checkin, checkout, mensaje };

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

  // Generar y descargar PDF con logo
  const pdf = generarPDF(datos);
  if (pdf) {
    pdf.save(`Consulta_LaBeatriz_${nombre.replace(/\s+/g,'_') || 'Cliente'}.pdf`);
  }

  // Construir mensaje WhatsApp
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
    '📎 *Se adjunta presupuesto en PDF con detalle completo*',
    '🌐 *Web:* https://labeatriz.com.ar',
  ].join('\n');

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`;

  // Pequeña demora para que el PDF se descargue antes de abrir WA
  setTimeout(() => { window.open(waUrl, '_blank'); }, pdf ? 800 : 0);

  // Feedback visual
  const btn = document.getElementById('btn-submit');
  const success = document.getElementById('form-success');
  if (success) {
    success.style.display = 'block';
    success.textContent = pdf
      ? '✅ PDF descargado — Redirigiendo a WhatsApp para adjuntarlo...'
      : '✅ Redirigiendo a WhatsApp... ¡Gracias!';
  }
  if (btn) btn.disabled = true;

  setTimeout(() => {
    document.getElementById('contact-form').reset();
    if (btn) btn.disabled = false;
    if (success) success.style.display = 'none';
  }, 5000);
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
  '.casa-block, .propiedad-stat, .centro-card, .act-card, .destino-card, .ubi-item, .galeria-img, .season-img, .video-wrap, .casa-video-wrap'
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
