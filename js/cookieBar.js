// Cookie Bar functionality
export function initializeCookieBar() {
  const cookieBar = document.getElementById("cookie-bar");
  const acceptButton = document.getElementById("accept-cookies");

  if (!cookieBar || !acceptButton) return;

  // Check if user has already accepted cookies
  const cookiesAccepted = localStorage.getItem("trafficTrapCookiesAccepted");

  if (!cookiesAccepted) {
    // Show cookie bar after a short delay
    setTimeout(() => {
      cookieBar.classList.add("show");
    }, 1000);
  }

  // Handle accept button click
  acceptButton.addEventListener("click", function () {
    localStorage.setItem("trafficTrapCookiesAccepted", "true");
    cookieBar.classList.remove("show");

    // Add success animation
    this.textContent = "Accepted!";
    this.style.backgroundColor = "var(--success-color)";

    setTimeout(() => {
      this.textContent = "Accept";
      this.style.backgroundColor = "";
    }, 2000);
  });

  // Handle escape key to hide cookie bar
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && cookieBar.classList.contains("show")) {
      cookieBar.classList.remove("show");
    }
  });
}
