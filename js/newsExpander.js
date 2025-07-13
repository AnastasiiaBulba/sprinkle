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
  const expandedContent = button.nextElementSibling;
  const icon = button.querySelector(".read-more-icon");

  if (
    !expandedContent ||
    !expandedContent.classList.contains("news-expanded")
  ) {
    return;
  }

  const isExpanded = button.classList.contains("expanded");

  if (isExpanded) {
    // Collapse content
    button.classList.remove("expanded");
    button.innerHTML = 'Read More <span class="read-more-icon">▼</span>';
    expandedContent.classList.remove("show");
    expandedContent.innerHTML = "";
  } else {
    // Expand content
    button.classList.add("expanded");
    button.innerHTML = 'Read Less <span class="read-more-icon">▲</span>';

    // Get content from data attribute
    const content = button.getAttribute("data-content");
    if (content) {
      expandedContent.innerHTML = content;
      expandedContent.classList.add("show");
    }
  }
}

// Alternative implementation for static content
export function initializeStaticNewsExpander() {
  const readMoreButtons = document.querySelectorAll(".read-more-btn");

  readMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const expandedContent = this.nextElementSibling;
      const icon = this.querySelector(".read-more-icon");

      if (
        !expandedContent ||
        !expandedContent.classList.contains("news-expanded")
      ) {
        return;
      }

      const isExpanded = this.classList.contains("expanded");

      if (isExpanded) {
        // Collapse content
        this.classList.remove("expanded");
        this.innerHTML = 'Read More <span class="read-more-icon">▼</span>';
        expandedContent.classList.remove("show");
        expandedContent.innerHTML = "";
      } else {
        // Expand content
        this.classList.add("expanded");
        this.innerHTML = 'Read Less <span class="read-more-icon">▲</span>';

        // Get content from data attribute
        const content = this.getAttribute("data-content");
        if (content) {
          expandedContent.innerHTML = content;
          expandedContent.classList.add("show");
        }
      }
    });
  });
}
