// Data Loader - fetches content from JSON file
export function initializeDataLoader() {
  loadPageContent();
}

async function loadPageContent() {
  try {
    const response = await fetch("./data/content.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Load content based on current page
    const currentPage = getCurrentPage();

    switch (currentPage) {
      case "home":
        loadHomeContent(data);
        break;
      case "news":
        loadNewsContent(data);
        break;
      case "contact":
        loadContactContent(data);
        break;
    }
  } catch (error) {
    console.error("Error loading content:", error);
    // Fallback to default content
    loadFallbackContent();
  }
}

function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes("news.html")) return "news";
  if (path.includes("contact.html")) return "contact";
  return "home";
}

function loadHomeContent(data) {
  // Load hero content
  const heroTitle = document.getElementById("hero-title");
  const heroDescription = document.getElementById("hero-description");
  const playNowBtn = document.getElementById("play-now-btn");

  if (heroTitle && data.hero) {
    heroTitle.textContent = data.hero.title;
  }
  if (heroDescription && data.hero) {
    heroDescription.textContent = data.hero.description;
  }
  if (playNowBtn && data.hero) {
    playNowBtn.textContent = data.hero.buttonText;
  }

  // Load features
  const featuresGrid = document.getElementById("features-grid");
  if (featuresGrid && data.features) {
    featuresGrid.innerHTML = data.features
      .map(
        (feature) => `
            <div class="feature-card">
                <div class="feature-header">
                    <div class="feature-icon">${feature.icon}</div>
                    <h3 class="feature-title">${feature.title}</h3>
                </div>
                <div class="feature-body">
                    <p class="feature-description">${feature.description}</p>
                </div>
            </div>
        `
      )
      .join("");
  }

  // Load how to play content
  const howToPlayContent = document.getElementById("how-to-play-content");
  if (howToPlayContent && data.howToPlay) {
    howToPlayContent.innerHTML = `
            <div class="how-to-play-intro">
                <p class="how-to-intro-text">Master the art of plant care through strategic puzzle solving. Follow these essential steps to become a gardening expert!</p>
            </div>
            <div class="how-to-play-steps">
                ${data.howToPlay
                  .map(
                    (item, index) => `
                    <div class="how-to-step" data-step="${index + 1}">
                        <div class="step-header">
                            <div class="step-number">${index + 1}</div>
                            <h3 class="how-to-title">${item.title}</h3>
                        </div>
                        <div class="step-content">
                            <p class="how-to-description">${
                              item.description
                            }</p>
                            <div class="step-actions">
                                ${item.steps
                                  .map(
                                    (step, stepIndex) => `
                                    <div class="step-action">
                                        <span class="action-icon">${
                                          stepIndex === 0
                                            ? "🎯"
                                            : stepIndex === 1
                                            ? "💧"
                                            : stepIndex === 2
                                            ? "🌱"
                                            : "🏆"
                                        }</span>
                                        <span class="action-text">${step}</span>
                                    </div>
                                  `
                                  )
                                  .join("")}
                            </div>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
            <div class="how-to-play-tip">
                <div class="tip-icon">💡</div>
                <div class="tip-content">
                    <h4>Pro Tip</h4>
                    <p>Start with basic levels to understand water physics, then gradually tackle more complex plant arrangements!</p>
                </div>
            </div>
        `;
  }

  // Load track features
  const trackFeatures = document.getElementById("track-features");
  if (trackFeatures && data.track) {
    trackFeatures.innerHTML = data.track.features
      .map(
        (feature) => `
            <div class="track-feature">
                <div class="track-feature-icon">${feature.icon}</div>
                <div class="track-feature-text">${feature.text}</div>
            </div>
        `
      )
      .join("");
  }

  // Load reviews
  const reviewsGrid = document.getElementById("reviews-grid");
  if (reviewsGrid && data.reviews) {
    reviewsGrid.innerHTML = `
      <div class="reviews-section-inner" style="display: flex; flex-direction: column; align-items: center; width: 100%;">
        <div class="reviews-intro" style="text-align: center; max-width: 700px; margin: 0 auto 2.5rem auto;">
          <p class="reviews-intro-text">Discover what players say about their experience with Sprinkle Plants Puzzle Game. Real feedback from real gardeners!</p>
        </div>
        <div class="reviews-columns" style="display: flex; justify-content: center; gap: 2.5rem; width: 100%; max-width: 950px; margin-bottom: 2.5rem;">
          <div class="reviews-column" style="flex: 1; display: flex; flex-direction: column; gap: 1.5rem;">
            ${data.reviews
              .slice(0, 3)
              .map(
                (review, index) => `
                  <div class="review-compact" data-review="${
                    index + 1
                  }" style="display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: var(--bg-primary); border-radius: 8px; box-shadow: var(--shadow-sm);">
                    <div class="review-avatar-compact" style="width: 40px; height: 40px; background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-white); font-weight: 600; font-size: 14px; flex-shrink: 0;">${review.name.charAt(
                      0
                    )}</div>
                    <div class="review-content-compact" style="flex: 1;">
                      <div class="review-header-compact" style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                        <h4 class="review-name-compact" style="margin: 0; font-size: 16px; font-weight: 600; color: var(--text-primary);">${
                          review.name
                        }</h4>
                        <div class="review-rating-compact" style="color: var(--accent-color); font-size: 12px;">★★★★★</div>
                      </div>
                      <div class="review-text-compact" style="color: var(--text-secondary); line-height: 1.4; font-size: 14px; font-style: italic;">"${
                        review.text
                      }"</div>
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>
          <div class="reviews-column" style="flex: 1; display: flex; flex-direction: column; gap: 1.5rem;">
            ${data.reviews
              .slice(3, 6)
              .map(
                (review, index) => `
                  <div class="review-compact" data-review="${
                    index + 4
                  }" style="display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: var(--bg-primary); border-radius: 8px; box-shadow: var(--shadow-sm);">
                    <div class="review-avatar-compact" style="width: 40px; height: 40px; background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-white); font-weight: 600; font-size: 14px; flex-shrink: 0;">${review.name.charAt(
                      0
                    )}</div>
                    <div class="review-content-compact" style="flex: 1;">
                      <div class="review-header-compact" style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                        <h4 class="review-name-compact" style="margin: 0; font-size: 16px; font-weight: 600; color: var(--text-primary);">${
                          review.name
                        }</h4>
                        <div class="review-rating-compact" style="color: var(--accent-color); font-size: 12px;">★★★★★</div>
                      </div>
                      <div class="review-text-compact" style="color: var(--text-secondary); line-height: 1.4; font-size: 14px; font-style: italic;">"${
                        review.text
                      }"</div>
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="reviews-tip" style="margin-top: 0; width: 100%; max-width: 700px; text-align: center;">
          <div class="tip-icon">⭐</div>
          <div class="tip-content">
            <h4>Join the Community</h4>
            <p>Share your own experience and tips with fellow plant puzzle enthusiasts!</p>
          </div>
        </div>
      </div>
    `;
  }
}

function loadNewsContent(data) {
  const updatesGrid = document.getElementById("updates-grid");
  if (updatesGrid && data.gameUpdates) {
    updatesGrid.innerHTML = data.gameUpdates
      .map(
        (update) => `
        <div class="news-card">
          <div class="news-image">
            ${
              update.image
                ? `<img src="${update.image}" alt="Game Update" class="news-image-photo" style="width:100%;height:auto;object-fit:cover;border-radius:12px;" />`
                : ""
            }
          </div>
          <div class="news-content">
            <span class="news-category">Game Update</span>
            <h3 class="news-title">${update.title}</h3>
            <p class="news-description">${update.description}</p>
            <div class="news-date">${update.date}</div>
            <button class="read-more-btn" data-content="${update.fullContent}">
              Read More
              <span class="read-more-icon">▼</span>
            </button>
            <div class="news-expanded"></div>
          </div>
        </div>
      `
      )
      .join("");
  }

  const diariesGrid = document.getElementById("diaries-grid");
  if (diariesGrid && data.trailDiaries) {
    diariesGrid.innerHTML = data.trailDiaries
      .map(
        (diary) => `
        <div class="news-card">
          <div class="news-image">
            ${
              diary.image
                ? `<img src="${diary.image}" alt="Plant Diary" class="news-image-photo" style="width:100%;height:auto;object-fit:cover;border-radius:12px;" />`
                : ""
            }
          </div>
          <div class="news-content">
            <span class="news-category diaries">Plant Diary</span>
            <h3 class="news-title">${diary.title}</h3>
            <p class="news-description">${diary.description}</p>
            <div class="news-date">${diary.date}</div>
            <button class="read-more-btn" data-content="${diary.fullContent}">
              Read More
              <span class="read-more-icon">▼</span>
            </button>
            <div class="news-expanded"></div>
          </div>
        </div>
      `
      )
      .join("");
  }
}

function loadContactContent(data) {
  // Load contact information
  const contactInfo = document.getElementById("contact-info");
  if (contactInfo && data.contact) {
    contactInfo.innerHTML = `
      <div class="contact-grid">
        <div class="contact-card">
          <div class="contact-icon">📧</div>
          <h3 class="contact-title">Email</h3>
          <p class="contact-value">${data.contact.email}</p>
        </div>
        <div class="contact-card">
          <div class="contact-icon">📞</div>
          <h3 class="contact-title">Phone</h3>
          <p class="contact-value">${data.contact.phone}</p>
        </div>
        <div class="contact-card">
          <div class="contact-icon">📍</div>
          <h3 class="contact-title">Address</h3>
          <p class="contact-value">${data.contact.address}</p>
        </div>
      </div>
    `;
  }
}

function loadFallbackContent() {
  // Fallback content if JSON fails to load
  console.log("Loading fallback content...");

  // Set default content for key elements
  const elements = {
    "hero-title": "Sprinkle Plants Puzzle Game",
    "hero-description":
      "Rotate the board to the perfect place to water the plant so that it can grow successfully. It also trains your brain flexibility. Would you like to try it?",
    "play-now-btn": "Play Now",
    "features-title": "Game Features",
    "how-to-play-title": "How to Play",
    "track-title": "Explore Diverse Plants",
    "track-description":
      "Experience various challenging environments from delicate seedlings to mature trees.",
    "reviews-title": "Player Reviews",
  };

  Object.entries(elements).forEach(([id, text]) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  });
}
