'use strict';

// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// Mobile Navigation Toggle
const burger = document.getElementById('burger');
const navMenu = document.getElementById('nav-menu');

burger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav);

// Typing Effect for Role
const roles = [
  'Java Full Stack Developer',
  'Backend Engineer',
  'Software Developer',
  'Java Specialist'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedRoleSpan = document.getElementById('typed-role');

function typeRole() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedRoleSpan.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedRoleSpan.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 40 : 90;

  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 2000; // Pause at full text
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 400; // Pause before starting next text
  }

  setTimeout(typeRole, typingSpeed);
}

typeRole();

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      
      // Animate score bars and skill bars if inside revealed element
      const scoreFills = entry.target.querySelectorAll('.score-fill, .sb-fill');
      scoreFills.forEach(fill => {
        const width = fill.getAttribute('data-w');
        if (width) {
          fill.style.width = `${width}%`;
        }
      });

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// Form Submission
const contactForm = document.getElementById('contact-form');
const cfSuccess = document.getElementById('cf-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.cf-submit');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    cfSuccess.style.display = 'block';
    contactForm.reset();
    setTimeout(() => {
      cfSuccess.style.display = 'none';
    }, 4000);
  }, 1200);
});

// Back to top
const backTopBtn = document.getElementById('back-top');
backTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
