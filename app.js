// Burger menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Año dinámico
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Scroll suave para anclas (mejor UX)
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    const id = href && href.startsWith('#') ? href.slice(1) : null;
    const el = id ? document.getElementById(id) : null;
    if (el) {
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      nav?.classList.remove('open');
    }
  });
});

// Formulario de contacto (demo)
const cForm = document.getElementById('contactForm');
if (cForm) {
  cForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const n = document.getElementById('cName')?.value?.trim();
    const em = document.getElementById('cEmail')?.value?.trim();
    const msg = document.getElementById('cMsg')?.value?.trim();
    if (!n || !em || !msg) return alert('Completa todos los campos.');
    alert('Gracias por tu mensaje. Te responderemos pronto.');
    cForm.reset();
  });
}
