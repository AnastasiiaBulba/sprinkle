// Modal functionality
export function initializeModal() {
  const modal = document.getElementById("success-modal");
  const modalClose = document.getElementById("modal-close");
  const modalOk = document.getElementById("modal-ok");

  if (!modal) return;

  // Close modal functions
  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  // Event listeners
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modalOk) {
    modalOk.addEventListener("click", closeModal);
  }

  // Close modal when clicking outside
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // Make modal globally accessible
  window.showSuccessModal = openModal;
  window.closeSuccessModal = closeModal;
}

// Utility function to show success modal from other scripts
export function showSuccessModal(
  message = "Thank you! We will contact you soon."
) {
  const modal = document.getElementById("success-modal");
  const modalBody = modal?.querySelector(".modal-body p");

  if (modal && modalBody) {
    modalBody.textContent = message;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }
}
