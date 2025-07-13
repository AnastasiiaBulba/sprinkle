// Mobile Menu functionality
export function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const nav = document.querySelector(".nav");
  const hamburgerLines = document.querySelectorAll(".hamburger-line");

  if (!mobileMenuToggle || !nav) return;

  // Helper function to get current page
  function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes("news.html")) return "news";
    if (path.includes("contact.html")) return "contact";
    return "home";
  }

  let isMenuOpen = false;

  mobileMenuToggle.addEventListener("click", function () {
    isMenuOpen = !isMenuOpen;

    // Toggle menu visibility
    if (isMenuOpen) {
      // Create backdrop
      const backdrop = document.createElement("div");
      backdrop.className = "mobile-menu-backdrop";
      document.body.appendChild(backdrop);

      nav.style.display = "flex";
      nav.style.position = "absolute";
      nav.style.top = "100%";
      nav.style.left = "0";
      nav.style.right = "0";
      nav.style.backgroundColor = "var(--bg-primary)";
      nav.style.boxShadow = "var(--shadow-lg)";
      nav.style.flexDirection = "column";
      nav.style.padding = "var(--spacing-lg)";
      nav.style.gap = "var(--spacing-md)";
      nav.style.zIndex = "1001";

      // Animate hamburger to X
      hamburgerLines[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      hamburgerLines[1].style.opacity = "0";
      hamburgerLines[2].style.transform = "rotate(-45deg) translate(7px, -6px)";

      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Ensure correct active navigation state
      setTimeout(() => {
        const currentPage = getCurrentPage();
        const navLinks = document.querySelectorAll(".nav-link");

        // Clear all active states
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // Set only one active link
        let activeLink = null;
        switch (currentPage) {
          case "home":
            activeLink = document.getElementById("nav-home");
            break;
          case "news":
            activeLink = document.getElementById("nav-news");
            break;
          case "contact":
            activeLink = document.getElementById("nav-contact");
            break;
        }

        if (activeLink) {
          activeLink.classList.add("active");
        }
      }, 10);
    } else {
      // Remove backdrop
      const backdrop = document.querySelector(".mobile-menu-backdrop");
      if (backdrop) {
        backdrop.remove();
      }

      nav.style.display = "";
      nav.style.position = "";
      nav.style.top = "";
      nav.style.left = "";
      nav.style.right = "";
      nav.style.backgroundColor = "";
      nav.style.boxShadow = "";
      nav.style.flexDirection = "";
      nav.style.padding = "";
      nav.style.gap = "";
      nav.style.zIndex = "";

      // Reset hamburger
      hamburgerLines[0].style.transform = "";
      hamburgerLines[1].style.opacity = "";
      hamburgerLines[2].style.transform = "";

      // Restore body scroll
      document.body.style.overflow = "";
    }
  });

  // Close menu when clicking outside or on nav links
  document.addEventListener("click", function (e) {
    if (
      isMenuOpen &&
      !mobileMenuToggle.contains(e.target) &&
      !nav.contains(e.target)
    ) {
      mobileMenuToggle.click();
    }

    // Close menu when clicking on backdrop
    if (isMenuOpen && e.target.classList.contains("mobile-menu-backdrop")) {
      mobileMenuToggle.click();
    }

    // Close menu when clicking on nav links (for smooth scrolling)
    if (isMenuOpen && e.target.classList.contains("nav-link")) {
      setTimeout(() => {
        mobileMenuToggle.click();
      }, 100); // Small delay to allow smooth scrolling to start
    }
  });

  // Close menu when pressing Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isMenuOpen) {
      mobileMenuToggle.click();
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && isMenuOpen) {
      mobileMenuToggle.click();
    }
  });
}
