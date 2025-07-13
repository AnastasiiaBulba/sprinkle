// Main JavaScript file - imports all other scripts
import { initializeCookieBar } from "./cookieBar.js";
import { initializeMobileMenu } from "./mobileMenu.js";
import { initializeDataLoader } from "./dataLoader.js";
import { initializeFormValidation } from "./formValidation.js";
import { initializeNewsExpander } from "./newsExpander.js";
import { initializeModal } from "./modal.js";

async function loadPartial(id, url) {
  const container = document.getElementById(id);
  if (!container) {
    console.warn(`Container with id "${id}" not found`);
    return;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const html = await res.text();
    container.innerHTML = html;
    console.log(`Successfully loaded partial: ${url}`);

    // Set active navigation after loading header
    if (id === "header") {
      setActiveNavigation();
    }
  } catch (error) {
    console.error(`Error loading partial ${url}:`, error);
    // Fallback content
    if (id === "header") {
      container.innerHTML = `
        <div id="cookie-bar" class="cookie-bar">
          <div class="cookie-content">
            <p>We use cookies to enhance your gaming experience. By continuing to use this site, you consent to our use of cookies.</p>
            <div class="cookie-buttons">
              <button id="accept-cookies" class="btn-primary">Accept</button>
              <a href="./cookie-policy.html" class="btn-secondary">Learn More</a>
            </div>
          </div>
        </div>
        <header id="header" class="header">
          <div class="container">
            <div class="header-content">
              <div class="logo">
                <a href="./" class="logo-link">
                  <span class="logo-text">Domain.com</span>
                </a>
              </div>
              <nav class="nav">
                <ul class="nav-list">
                  <li class="nav-item"><a href="./" class="nav-link" id="nav-home">Home</a></li>
                  <li class="nav-item"><a href="#game" class="nav-link" id="nav-game">Try it Soon</a></li>
                  <li class="nav-item"><a href="#how-to-play" class="nav-link" id="nav-how-to-play">How to Play</a></li>
                  <li class="nav-item"><a href="./news.html" class="nav-link" id="nav-news">News</a></li>
                  <li class="nav-item"><a href="./contact.html" class="nav-link" id="nav-contact">Contact</a></li>
                </ul>
              </nav>
              <button class="mobile-menu-toggle" id="mobile-menu-toggle">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
              </button>
            </div>
          </div>
        </header>
      `;
      setActiveNavigation();
    } else if (id === "footer") {
      container.innerHTML = `
        <footer id="footer" class="footer">
          <div class="container">
            <div class="footer-content">
              <div class="footer-section">
                <h3 class="footer-title">Contact Us</h3>
                <div class="contact-info">
                  <p class="contact-item" id="footer-email">Email: letter@domain.com</p>
                  <p class="contact-item" id="footer-phone">Phone: +61 3 9123 4567</p>
                  <p class="contact-item" id="footer-address">Address: 456 Garden Avenue, Melbourne VIC 3000, Australia</p>
                </div>
              </div>
              <div class="footer-section">
                <h3 class="footer-title">Legal</h3>
                <ul class="footer-links">
                  <li><a href="./cookie-policy.html" class="footer-link">Cookie Policy</a></li>
                  <li><a href="./privacy-policy.html" class="footer-link">Privacy Policy</a></li>
                  <li><a href="./terms-of-service.html" class="footer-link">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div class="footer-bottom">
              <p class="copyright">&copy; <span id="current-year">2025</span> Domain.com. All rights reserved.</p>
            </div>
          </div>
        </footer>
      `;
    }
  }
}

function setActiveNavigation() {
  const currentPage = getCurrentPage();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  switch (currentPage) {
    case "home":
      const homeLink = document.getElementById("nav-home");
      if (homeLink) homeLink.classList.add("active");
      break;
    case "news":
      const newsLink = document.getElementById("nav-news");
      if (newsLink) newsLink.classList.add("active");
      break;
    case "contact":
      const contactLink = document.getElementById("nav-contact");
      if (contactLink) contactLink.classList.add("active");
      break;
  }
}

function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes("news.html")) return "news";
  if (path.includes("contact.html")) return "contact";
  return "home";
}

// Fix header anchor links on non-home pages
function fixHeaderLinksForNonHome() {
  const isHome =
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("index.html");
  if (!isHome) {
    const navGame = document.getElementById("nav-game");
    const navHowToPlay = document.getElementById("nav-how-to-play");
    if (navGame) navGame.setAttribute("href", "./#game");
    if (navHowToPlay) navHowToPlay.setAttribute("href", "./#how-to-play");
  }
}

// Initialize all modules when DOM is loaded
document.addEventListener("DOMContentLoaded", async function () {
  // Set current year in footer
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  await loadPartial("header", "./sprinkle_partials/header.html");
  fixHeaderLinksForNonHome();
  await loadPartial("footer", "./sprinkle_partials/footer.html");
  if (window.location.pathname.includes("contact.html")) {
    await loadPartial("contact-info", "./sprinkle_partials/contact-info.html");
  }

  // Initialize all modules
  initializeCookieBar();
  initializeMobileMenu();
  initializeDataLoader();
  initializeFormValidation();
  initializeNewsExpander();
  initializeModal();

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add loading animation for buttons
  document
    .querySelectorAll(".btn-primary, .btn-secondary")
    .forEach((button) => {
      button.addEventListener("click", function () {
        if (!this.classList.contains("loading")) {
          this.classList.add("loading");
          setTimeout(() => {
            this.classList.remove("loading");
          }, 1000);
        }
      });
    });

  // Add hover effects for cards
  document
    .querySelectorAll(".feature-card, .review-card, .contact-card, .news-card")
    .forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-4px)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });

  console.log("Sprinkle Plants Puzzle Game website initialized successfully!");
});
