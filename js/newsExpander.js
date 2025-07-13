// News Expander functionality
export function initializeNewsExpander() {
  // Use event delegation for dynamically loaded content
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("read-more-btn")) {
      handleReadMoreClick(event.target);
    }
  });
}

function handleReadMoreClick(button) {
  const newsCard = button.closest(".news-card");
  const content = button.getAttribute("data-content");

  if (!content || !newsCard) {
    return;
  }

  // Create modal overlay within the card
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "news-modal-overlay";
  modalOverlay.innerHTML = `
    <div class="news-modal-content">
      <div class="news-modal-header">
        <h3 class="news-modal-title">${
          newsCard.querySelector(".news-title").textContent
        }</h3>
        <button class="news-modal-close">×</button>
      </div>
      <div class="news-modal-body">
        ${content}
      </div>
    </div>
  `;

  // Add modal to the card
  newsCard.appendChild(modalOverlay);
  newsCard.classList.add("modal-active");

  // Handle close button
  const closeBtn = modalOverlay.querySelector(".news-modal-close");
  closeBtn.addEventListener("click", () => {
    modalOverlay.remove();
    newsCard.classList.remove("modal-active");
  });

  // Handle overlay click to close
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.remove();
      newsCard.classList.remove("modal-active");
    }
  });

  // Handle escape key
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      modalOverlay.remove();
      newsCard.classList.remove("modal-active");
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
}

// Alternative implementation for static content
export function initializeStaticNewsExpander() {
  const readMoreButtons = document.querySelectorAll(".read-more-btn");

  readMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const newsCard = this.closest(".news-card");
      const content = this.getAttribute("data-content");

      if (!content || !newsCard) {
        return;
      }

      // Create modal overlay within the card
      const modalOverlay = document.createElement("div");
      modalOverlay.className = "news-modal-overlay";
      modalOverlay.innerHTML = `
        <div class="news-modal-content">
          <div class="news-modal-header">
            <h3 class="news-modal-title">${
              newsCard.querySelector(".news-title").textContent
            }</h3>
            <button class="news-modal-close">×</button>
          </div>
          <div class="news-modal-body">
            ${content}
          </div>
        </div>
      `;

      // Add modal to the card
      newsCard.appendChild(modalOverlay);
      newsCard.classList.add("modal-active");

      // Handle close button
      const closeBtn = modalOverlay.querySelector(".news-modal-close");
      closeBtn.addEventListener("click", () => {
        modalOverlay.remove();
        newsCard.classList.remove("modal-active");
      });

      // Handle overlay click to close
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
          modalOverlay.remove();
          newsCard.classList.remove("modal-active");
        }
      });

      // Handle escape key
      const handleEscape = (e) => {
        if (e.key === "Escape") {
          modalOverlay.remove();
          newsCard.classList.remove("modal-active");
          document.removeEventListener("keydown", handleEscape);
        }
      };
      document.addEventListener("keydown", handleEscape);
    });
  });
}
