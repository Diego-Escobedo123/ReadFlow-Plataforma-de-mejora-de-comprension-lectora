function toggleDarkMode() {
  const body = document.body;
  const icon = document.getElementById('darkModeIcon');
  body.classList.toggle('light-mode');
  if (body.classList.contains('light-mode')) {
    icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
  } else {
    icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
  }
}

// Navbar scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  nav.style.boxShadow = window.scrollY > 50
    ? '0 4px 30px rgba(0,0,0,0.5)'
    : 'none';
});

// Animaciones de scroll
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  const elementos = document.querySelectorAll(
    '.tech-card, .audience-card, .plan-card, .future-card, .purpose-card, .metric-box, .section-h2, .section-label, .section-p'
  );

  elementos.forEach((el, i) => {
    el.classList.add('animate-on-scroll');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
  });
});