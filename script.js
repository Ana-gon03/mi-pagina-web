/* ══════════════════════════════════════════════
   PORTAFOLIO — Ana Guadalupe Ortiz González
   script.js (versión mejorada)
   ESCOM · IPN · Tópicos Selectos en Criptografía
══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ══════════════════════════════════════════
       1. MENÚ HAMBURGUESA (móvil)
    ══════════════════════════════════════════ */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const expanded = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', expanded);
            navToggle.textContent = expanded ? '✕' : '☰';
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.textContent = '☰';
            });
        });
    }

    /* ══════════════════════════════════════════
       2. ENLACE ACTIVO EN NAV AL HACER SCROLL
    ══════════════════════════════════════════ */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    function setActiveNavLink() {
        let currentId = '';
        const scrollY = window.scrollY + 80; // compensar altura del nav
        sections.forEach(section => {
            if (section.offsetTop <= scrollY && section.offsetTop + section.offsetHeight > scrollY) {
                currentId = section.getAttribute('id');
            }
        });

        navAnchors.forEach(a => {
            a.style.color = '';
            if (a.getAttribute('href') === `#${currentId}`) {
                a.style.color = 'var(--lila-oscuro)';
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink, { passive: true });
    setActiveNavLink();

    /* ══════════════════════════════════════════
       3. ANIMACIÓN REVEAL AL HACER SCROLL
    ══════════════════════════════════════════ */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ══════════════════════════════════════════
       4. BARRAS DE HABILIDADES ANIMADAS
    ══════════════════════════════════════════ */
    const skillFills = document.querySelectorAll('.skill-fill');

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.dataset.width;
                entry.target.style.width = targetWidth + '%';
                barObserver.unobserve(entry.target); // anima solo una vez
            }
        });
    }, { threshold: 0.3 }); // umbral más bajo para que se active antes

    skillFills.forEach(fill => barObserver.observe(fill));

    /* ══════════════════════════════════════════
       5. BOTÓN SCROLL TOP
    ══════════════════════════════════════════ */
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ══════════════════════════════════════════
       6. EFECTO TYPEWRITER EN EL HERO
    ══════════════════════════════════════════ */
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        // Solo si no se ha ejecutado antes (evita duplicados al recargar con pushState)
        if (!tagline.classList.contains('typewriter-done')) {
            tagline.textContent = '';
            let i = 0;
            function typeWriter() {
                if (i < originalText.length) {
                    tagline.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 25);
                } else {
                    tagline.classList.add('typewriter-done');
                }
            }
            setTimeout(typeWriter, 400);
        }
    }

    /* ══════════════════════════════════════════
       7. FORMULARIO DE CONTACTO (si se usa envío simulado)
          Si usas Formspree, el código de éxito puede ser opcional.
    ══════════════════════════════════════════ */
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm && contactForm.getAttribute('action')?.includes('formspree')) {
        // Si es Formspree, dejamos que haga su trabajo y mostramos mensaje si hay éxito
        // Pero también podemos capturar con fetch para no recargar la página.
        // Aquí optamos por la simulación si no se usa Formspree.
    } else if (contactForm) {
        // Simulación de envío (para pruebas locales)
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            if (!nombre || !email || !mensaje) {
                alert('Por favor completa todos los campos 💜');
                return;
            }

            const sendBtn = contactForm.querySelector('.btn-send');
            sendBtn.textContent = 'Enviando...';
            sendBtn.disabled = true;

            setTimeout(() => {
                sendBtn.textContent = 'Enviar mensaje ✦';
                sendBtn.disabled = false;
                contactForm.reset();

                if (formSuccess) {
                    formSuccess.classList.add('visible');
                    setTimeout(() => formSuccess.classList.remove('visible'), 4000);
                }
            }, 1200);
        });
    }

    /* ══════════════════════════════════════════
       8. AÑO DINÁMICO EN EL FOOTER
    ══════════════════════════════════════════ */
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const year = new Date().getFullYear();
        footerYear.textContent = footerYear.textContent.replace('2025', year);
    }

    /* ══════════════════════════════════════════
       9. ANIMACIÓN INICIAL DEL HERO (ya no necesaria porque usamos typewriter)
          Pero mantenemos la entrada suave de los otros elementos.
    ══════════════════════════════════════════ */
    const heroElements = document.querySelectorAll(
        '.hero-eyebrow, .hero-name, .hero-badges, .hero-btns, .hero-photo-frame'
    );

    heroElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;

        requestAnimationFrame(() => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            }, 100 + i * 120);
        });
    });

    // Función para reproducir video al hacer clic en la tarjeta
document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    const playBtn = wrapper.querySelector('.video-play-btn');
    const poster = wrapper.querySelector('.video-poster');
    const video = wrapper.querySelector('.video-player');
    const videoSrc = wrapper.dataset.video;

    function playVideo() {
        poster.style.display = 'none';
        playBtn.style.display = 'none';
        video.style.display = 'block';
        video.play().catch(e => console.log('Error al reproducir:', e));
    }

    // Al hacer clic en el botón o en el wrapper
    wrapper.addEventListener('click', playVideo);
});

}); // Fin DOMContentLoaded