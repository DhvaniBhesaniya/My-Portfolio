/**
 * Navigation Management
 * Handles smooth scrolling and active link highlighting
 */
const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

/**
 * Remove active class from all navigation links
 */
function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

/**
 * Initialize navigation click handlers
 */
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
      });

      removeActive();
      link.parentElement.classList.add('active');
    }
  });
});

/**
 * Handle scroll events for active navigation and reveal animations
 */
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  // Update active navigation based on scroll position
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  // Show/hide back to top button
  if (backToTop) {
    backToTop.style.display = (window.scrollY > 500) ? "flex" : "none";
  }

  // Reveal elements on scroll
  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active-reveal');
    }
  });
});

/**
 * Initialize reveal animations for sections
 */
const revealElements = document.querySelectorAll('.home-container, .about-container, .solar-system-container, .journey-container, .projects-container, .services-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

/**
 * Create and configure back to top button
 */
let backToTop;
function initBackToTop() {
  backToTop = document.createElement('div');
  backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  backToTop.id = "back-to-top";
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);

  backToTop.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 40px;
    background: var(--accent-color);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1000;
    transition: transform 0.3s ease;
    box-shadow: 0 2px 10px var(--shadow);
  `;

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  backToTop.addEventListener('mouseenter', () => {
    if (backToTop) backToTop.style.transform = 'scale(1.2)';
  });

  backToTop.addEventListener('mouseleave', () => {
    if (backToTop) backToTop.style.transform = 'scale(1)';
  });
}

/**
 * Add hover effects to cards
 */
const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px) scale(1.05)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

/**
 * Typing Animation Effect
 * Creates a typewriter effect for the job title
 */
let typingElement;
let words = ["Web & Backend Developer", "Node.js Developer", "Rust Developer", "Full-Stack Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function initTypingEffect() {
  typingElement = document.querySelector('#typing-text');
  if (typingElement) {
    type();
  }
}

function type() {
  if (!typingElement) return;

  const currentWord = words[wordIndex];
  let displayedText = currentWord.substring(0, charIndex);

  typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, typingSpeed / 2);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(type, 1000);
  }
}

/**
 * Loading Screen Animation
 * Handles the initial page loading animation sequence
 */
document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  /**
   * Show element with animation after delay
   * @param {HTMLElement} element - Element to show
   * @param {number} delay - Delay in milliseconds
   */
  function showElement(element, delay = 0) {
    if (!element) return;
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  // Animate loading screen elements in sequence
  if (loadingText) showElement(loadingText, 0);
  if (mainIcon) showElement(mainIcon, 800);
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx * 400);
  });
  if (designerText) showElement(designerText, 2800);

  // Hide loading screen after animation completes
  setTimeout(() => {
    if (loadingScreen) {
      // Use CSS transition for slide-up effect
      loadingScreen.classList.add('slide-up-exit');

      // Wait for transition to finish before removing from DOM
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 800); // 800ms matches the CSS transition time
    }
    if (mainPage) {
      mainPage.classList.add("visible");
    }
  }, 4000);

  // Initialize other features after DOM is ready
  initBackToTop();
  initTypingEffect();
});

/**
 * Contact Form Handling
 */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // Form will submit to formsubmit.co
    // No need for preventDefault as we're using native form submission
    console.log('Form submitted');
  });
}

/**
 * Theme Toggle Functionality
 * Handles dark/light theme switching with localStorage persistence
 */
(function () {
  'use strict';

  const THEME_KEY = 'theme';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';
  let toggleInitialized = false;

  /**
   * Apply theme to document
   */
  function applyTheme(theme) {
    const htmlElement = document.documentElement;
    if (theme === LIGHT_THEME) {
      htmlElement.setAttribute('data-theme', LIGHT_THEME);
    } else {
      htmlElement.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  /**
   * Get current theme
   */
  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') === LIGHT_THEME
      ? LIGHT_THEME
      : DARK_THEME;
  }

  /**
   * Update theme icon
   */
  function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;

    // Icon Logic: 
    // If Dark (Default) -> Show Sun (to switch to Light)
    // If Light -> Show Moon (to switch to Dark)

    if (theme === DARK_THEME) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }

  /**
   * Toggle theme
   */
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    applyTheme(newTheme);
    updateThemeIcon(newTheme);
  }

  /**
   * Initialize theme on page load
   */
  function initTheme() {
    // Default to DARK_THEME if not saved
    const savedTheme = localStorage.getItem(THEME_KEY) || DARK_THEME;
    applyTheme(savedTheme);
  }

  /**
   * Setup theme toggle button
   */
  function setupThemeToggle() {
    if (toggleInitialized) return;

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    if (!themeToggle || !themeIcon) {
      // Retry if elements not found yet
      setTimeout(setupThemeToggle, 50);
      return;
    }

    // Update icon based on current theme
    const currentTheme = getCurrentTheme();
    updateThemeIcon(currentTheme);

    // Add click event listener
    themeToggle.addEventListener('click', toggleTheme);

    toggleInitialized = true;
  }

  // Initialize theme immediately to prevent flash
  initTheme();

  // Setup toggle when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupThemeToggle);
  } else {
    setupThemeToggle();
  }
  /* ============================================
     EMAILJS CONTACT FORM
     ============================================ */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerText;
      btn.innerText = 'Sending...';
      btn.disabled = true;

      // These IDs are from your EmailJS dashboard
      const serviceID = 'service_7580yj9';
      const templateID = 'template_kfi7w35';

      emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
          btn.innerText = 'Message Sent!';
          btn.style.backgroundColor = '#4ade80'; // Green success color
          btn.style.color = '#fff';
          contactForm.reset();

          // Reset button after 3 seconds
          setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = '';
            btn.style.color = '';
          }, 3000);
        }, (err) => {
          btn.innerText = 'Failed to Send';
          btn.disabled = false;
          alert(JSON.stringify(err));
        });
    });
  }

})();
