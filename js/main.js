/**
 * Zion Direct Care - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initContactForm();
  initVideoFallback();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if just "#"
      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Contact form handling
 */
function initContactForm() {
  const form = document.getElementById('contact-form');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!data.name || !data.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    // For now, show a message (replace with actual form submission later)
    // You can integrate with Firebase, Formspree, or other form services

    alert('Thank you for your message! We will get back to you soon.\n\nFor immediate assistance, please call (435) 632-3690.');
    form.reset();

    // TODO: Replace with actual form submission
    // Example with Formspree:
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   body: formData,
    //   headers: { 'Accept': 'application/json' }
    // }).then(response => {
    //   if (response.ok) {
    //     alert('Thank you! We will be in touch soon.');
    //     form.reset();
    //   }
    // });
  });
}

/**
 * Video background fallback for mobile
 */
function initVideoFallback() {
  const video = document.querySelector('.hero-video');

  if (!video) return;

  // On mobile devices, some browsers don't autoplay video
  // This ensures the poster image is shown as fallback
  video.addEventListener('error', function() {
    console.log('Video failed to load, poster image will be displayed');
  });

  // Pause video when not visible (performance optimization)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().catch(() => {
          // Autoplay was prevented, poster will show
        });
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.25 });

  observer.observe(video);
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
