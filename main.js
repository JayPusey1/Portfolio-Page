'use strict';

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const targetId = anchor.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    event.preventDefault();
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Nav shadow on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (!nav) return;

  if (window.pageYOffset > 50) {
    nav.style.background = 'rgba(255, 255, 255, 0.98)';
    nav.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
  } else {
    nav.style.background = 'rgba(255, 255, 255, 0.95)';
    nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  }
});

// Typing effect
function typeWriter(element, text, speed) {
  if (!element) return;

  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i += 1;
      setTimeout(type, speed);
    } else {
      element.classList.add('typing-text');
    }
  }

  type();
}

window.addEventListener('load', () => {
  const typingElement = document.querySelector('#typing-hero');
  if (typingElement) {
    typeWriter(typingElement, "Hi, I'm Jay Pusey", 90);
  }
});

// Progress bar animation
const currentlyWorkingSection = document.querySelector('#currently-working');

if ('IntersectionObserver' in window && currentlyWorkingSection) {
  const progressObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('#xern-progress');
        if (progressBar) {
          setTimeout(() => {
            progressBar.classList.add('animate');
          }, 400);
        }
      }
    });
  }, { threshold: 0.5 });

  progressObserver.observe(currentlyWorkingSection);
}

// Skills "bounce" animation
const skillsSection = document.querySelector('#skills');

if ('IntersectionObserver' in window && skillsSection) {
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillItems = entry.target.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.transform = 'scale(1.05)';
            setTimeout(() => {
              item.style.transform = 'scale(1)';
            }, 200);
          }, index * 80);
        });
      }
    });
  }, { threshold: 0.3 });

  skillObserver.observe(skillsSection);
}

// Section reveal animations
if ('IntersectionObserver' in window) {
  const mainObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';

        const cards = section.querySelectorAll(
          '.project-card, .skill-category, .education-item, .contact-item, .current-work-card'
        );

        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 120);
        });

        mainObserver.unobserve(section);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    const cards = section.querySelectorAll(
      '.project-card, .skill-category, .education-item, .contact-item, .current-work-card'
    );
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    mainObserver.observe(section);
  });

  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
  }
}

// Carousel logic
const carouselStates = {
  xern: { currentSlide: 0, totalSlides: 3 },
  bux: { currentSlide: 0, totalSlides: 3 },
  moneymate: { currentSlide: 0, totalSlides: 3 }
};

function changeSlide(project, direction) {
  const state = carouselStates[project];
  const carousel = document.querySelector(`[data-project="${project}"]`);
  if (!state || !carousel) return;

  const slides = carousel.querySelector('.carousel-slides');
  const indicators = carousel.querySelectorAll('.carousel-indicator');

  state.currentSlide += direction;
  if (state.currentSlide >= state.totalSlides) state.currentSlide = 0;
  if (state.currentSlide < 0) state.currentSlide = state.totalSlides - 1;

  slides.style.transform = `translateX(-${state.currentSlide * 100}%)`;

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === state.currentSlide);
  });
}

function goToSlide(project, slideIndex) {
  const state = carouselStates[project];
  const carousel = document.querySelector(`[data-project="${project}"]`);
  if (!state || !carousel) return;

  const slides = carousel.querySelector('.carousel-slides');
  const indicators = carousel.querySelectorAll('.carousel-indicator');

  state.currentSlide = slideIndex;
  slides.style.transform = `translateX(-${state.currentSlide * 100}%)`;

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === state.currentSlide);
  });
}

// expose for inline onclick
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;

// Auto-play carousels
function autoPlayCarousels() {
  Object.keys(carouselStates).forEach(project => {
    const carousel = document.querySelector(`[data-project="${project}"]`);
    if (carousel && !carousel.matches(':hover')) {
      changeSlide(project, 1);
    }
  });
}

setInterval(autoPlayCarousels, 4000);

// Fallback for missing images
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carousel-slide img');

  slides.forEach(img => {
    img.addEventListener('error', () => {
      const slide = img.parentElement;
      const projectContainer = img.closest('[data-project]');
      if (!slide || !projectContainer) return;

      const projectKey = projectContainer.dataset.project;
      const projectIcons = {
        xern: '🏋️',
        bux: '🛒',
        moneymate: '💰'
      };

      slide.classList.add('fallback');
      slide.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;flex-direction:column;height:100%;color:#fff;font-size:3rem;">
          ${projectIcons[projectKey] || '📱'}
          <span style="font-size:0.8rem;margin-top:1rem;opacity:0.8;">Screenshots Coming Soon</span>
        </div>
      `;
    });
  });
});
