/* =========================================================
   Nexus Finance — Landing Page (app.js)
   - Scroll suave para anclas
   - Animación reveal (fade-in) para secciones y mockups
   - Acción del botón "Contactar"
   ========================================================= */

(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* -------------------------
     1) Scroll suave a anclas
     ------------------------- */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Cerrar posibles menús móviles si existieran
        const nav = $('#nav');
        if (nav) nav.classList.remove('open');
      }
    });
  });

  // Si llega con hash en la URL, hacer scroll suave al cargar
  window.addEventListener('load', () => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  /* -------------------------------------------
     2) Animación de aparición (reveal on scroll)
     ------------------------------------------- */
  const revealTargets = [
    ...$$('.feature'),
    ...$$('.shot'),
    ...$$('.mock'),
    ...$$('.hero-content'),
    ...$$('.contact')
  ];

  // Estado inicial (invisible)
  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        const el = en.target;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        // una vez revelado, dejamos de observar
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => io.observe(el));

  /* --------------------------------
     3) Botón "Contactar" (CTA final)
     -------------------------------- */
  const contactBtn = document.querySelector('.contact .btn-primary');
  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Cambia este correo por el tuyo si deseas
      const mail = 'hello@nexustoolspr.com';
      const subject = encodeURIComponent('Consulta sobre Nexus Finance');
      const body = encodeURIComponent(
        'Hola,\n\nMe interesa Nexus Finance. ¿Podemos agendar una demo?\n\nGracias.'
      );
      window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
    });
  }

  /* --------------------------------------------------------
     4) (Opcional) Burger para menú móvil si agregas navegación
     - Si en el futuro agregas #burger y #nav, esto lo activa.
     -------------------------------------------------------- */
  const burger = $('#burger');
  const nav = $('#nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

})();
