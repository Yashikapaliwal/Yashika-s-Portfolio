/* =========================================================
   Yashika — Portfolio Interactions
   ========================================================= */

// ---------- Animated stat counters ----------
(function () {
  const nums = document.querySelectorAll('.stat__num[data-count-to]');
  if (!nums.length) return;

  function animateCount(el) {
    const target = parseInt(el.dataset.countTo, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  nums.forEach(el => statIo.observe(el));
})();

// ---------- Site-wide constellation background ----------
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w, h, dots;

  function sizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function makeDots() {
    const count = Math.max(28, Math.min(70, Math.floor((w * h) / 28000)));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
    }));
  }

  sizeCanvas();
  makeDots();

  window.addEventListener('resize', () => { sizeCanvas(); makeDots(); }, { passive: true });

  function tick() {
    ctx.clearRect(0, 0, w, h);

    dots.forEach(d => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;
    });

    const linkDist = 140;
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < linkDist) {
          ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / linkDist) * 0.12})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
    }

    dots.forEach(d => {
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.beginPath();
      ctx.arc(d.x, d.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!reduceMotion) requestAnimationFrame(tick);
  }

  tick();
})();

// ---------- Nav scroll state ----------
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

function closeMenu() {
  navLinks.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
function toggleMenu() {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

navToggle.addEventListener('click', toggleMenu);
navLinks.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', closeMenu);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// ---------- Smooth anchor scroll (offset for fixed nav) ----------
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---------- Hero rotating word ----------
const heroSwap = document.getElementById('hero-swap');
if (heroSwap) {
  const words = ['the web.', 'products.', 'experiences.', 'ideas.'];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % words.length;
    heroSwap.style.opacity = '0';
    setTimeout(() => {
      heroSwap.textContent = words[i];
      heroSwap.style.opacity = '1';
    }, 250);
  }, 2600);
  heroSwap.style.transition = 'opacity .25s ease';
}

// ---------- Scroll-reveal for sections ----------
const revealTargets = document.querySelectorAll(
  '.skill-card, .project-card, .timeline__item, .testimonial, .about__grid, .section__heading'
);
revealTargets.forEach(el => { el.style.opacity = '0'; });

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.setProperty('--d', (i % 4));
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealTargets.forEach(el => io.observe(el));

// ---------- Cursor glow (desktop pointer only) ----------
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow && matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', e => {
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  }, { passive: true });
} else if (cursorGlow) {
  cursorGlow.style.display = 'none';
}

// ---------- Back to top ----------
const toTop = document.getElementById('to-top');
const onScrollToTop = () => toTop.classList.toggle('is-visible', window.scrollY > 600);
window.addEventListener('scroll', onScrollToTop, { passive: true });
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
