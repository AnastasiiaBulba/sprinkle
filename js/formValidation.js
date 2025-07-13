// Form Validation functionality
export function initializeFormValidation() {
  const contactForm = document.getElementById("contact-form-element");

  if (!contactForm) return;

  const formInputs = contactForm.querySelectorAll("input, textarea");

  // Real-time validation
  formInputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => clearFieldError(input));
  });

  // Form submission
  contactForm.addEventListener("submit", handleFormSubmit);
}

function validateField(field) {
  const fieldType = field.type;
  const fieldValue = field.value.trim();
  const errorElement = document.getElementById(`${field.id}-error`);

  // Clear previous validation states
  field.classList.remove("error", "success");

  // Validation rules
  let isValid = true;
  let errorMessage = "";

  switch (fieldType) {
    case "text":
      if (fieldValue === "") {
        isValid = false;
        errorMessage = "This field is required";
      } else if (!/^[a-zA-Z\s]+$/.test(fieldValue)) {
        isValid = false;
        errorMessage = "Please enter only letters and spaces";
      }
      break;

    case "tel":
      if (fieldValue === "") {
        isValid = false;
        errorMessage = "Phone number is required";
      } else if (!/^[\d\s\+\-\(\)]+$/.test(fieldValue)) {
        isValid = false;
        errorMessage = "Please enter a valid phone number";
      } else if (fieldValue.replace(/\D/g, "").length < 10) {
        isValid = false;
        errorMessage = "Phone number must be at least 10 digits";
      }
      break;

    case "email":
      if (fieldValue === "") {
        isValid = false;
        errorMessage = "Email is required";
      } else if (!isValidEmail(fieldValue)) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
      break;

    case "textarea":
      if (fieldValue === "") {
        isValid = false;
        errorMessage = "Message is required";
      } else if (fieldValue.length < 10) {
        isValid = false;
        errorMessage = "Message must be at least 10 characters long";
      }
      break;
  }

  // Apply validation result
  if (isValid) {
    field.classList.add("success");
    if (errorElement) {
      errorElement.textContent = "";
    }
  } else {
    field.classList.add("error");
    if (errorElement) {
      errorElement.textContent = errorMessage;
    }
  }

  return isValid;
}

function clearFieldError(field) {
  field.classList.remove("error", "success");
  const errorElement = document.getElementById(`${field.id}-error`);
  if (errorElement) {
    errorElement.textContent = "";
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateForm(form) {
  const formInputs = form.querySelectorAll("input, textarea");
  let isFormValid = true;

  formInputs.forEach((input) => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });

  return isFormValid;
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const submitButton = form.querySelector(".form-submit");

  if (!validateForm(form)) {
    // Shake animation for invalid form
    form.style.animation = "shake 0.5s ease-in-out";
    setTimeout(() => {
      form.style.animation = "";
    }, 500);
    return;
  }

  // Show loading state
  submitButton.classList.add("loading");
  submitButton.disabled = true;

  // Simulate form submission
  try {
    await simulateFormSubmission();

    // Show success state
    submitButton.classList.remove("loading");
    submitButton.classList.add("success");
    submitButton.textContent = "Message Sent!";

    // Reset form immediately
    form.reset();
    submitButton.classList.remove("success");
    submitButton.textContent = "Send Message";
    submitButton.disabled = false;

    // Clear all validation states
    form.querySelectorAll("input, textarea").forEach((input) => {
      input.classList.remove("error", "success");
      const errorElement = document.getElementById(`${input.id}-error`);
      if (errorElement) {
        errorElement.textContent = "";
      }
    });

    // Show success modal in English
    if (typeof showSuccessModal === "function") {
      showSuccessModal(
        "Your request has been sent successfully! We will contact you soon."
      );
    }
  } catch (error) {
    // Show error state
    submitButton.classList.remove("loading");
    submitButton.textContent = "Error! Try Again";
    submitButton.style.backgroundColor = "var(--error-color)";

    setTimeout(() => {
      submitButton.textContent = "Send Message";
      submitButton.style.backgroundColor = "";
      submitButton.disabled = false;
    }, 3000);
  }
}

function simulateFormSubmission() {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        resolve();
      } else {
        reject(new Error("Network error"));
      }
    }, 1500);
  });
}

// Add shake animation CSS
const shakeAnimation = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
`;

// Inject CSS if not already present
if (!document.querySelector("#shake-animation")) {
  const style = document.createElement("style");
  style.id = "shake-animation";
  style.textContent = shakeAnimation;
  document.head.appendChild(style);
}
