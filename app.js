/**
 * Queen City Crossroads — Main Application Logic (V1)
 * Plain JavaScript (ES6+), Zero Frameworks
 */

// Configuration Object
const CONFIG = {
  rssFeedUrl: "", // Set RSS feed URL when live (e.g., "https://anchor.fm/s/...")
  maxRecentEpisodes: 5
};

/**
 * Module 1: Client-Side RSS Feed Parser
 * Gracefully parses podcast RSS feed via AllOrigins CORS proxy.
 * If no feed is configured or if network fails, cleanly hides the footer column.
 */
async function initRecentEpisodes() {
  const container = document.getElementById("footer-recent-episodes");
  if (!container || !CONFIG.rssFeedUrl) {
    if (container) {
      container.style.display = "none";
    }
    return;
  }

  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(CONFIG.rssFeedUrl)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");
    const items = Array.from(xml.querySelectorAll("item")).slice(0, CONFIG.maxRecentEpisodes);

    if (items.length === 0) {
      container.style.display = "none";
      return;
    }

    const listHtml = items.map(item => {
      const title = item.querySelector("title")?.textContent || "Untitled Episode";
      const link = item.querySelector("link")?.textContent || "#listen";
      const rawDate = item.querySelector("pubDate")?.textContent;
      const pubDate = rawDate ? new Date(rawDate).toLocaleDateString() : "";
      return `<li class="footer-episode-item"><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a> ${pubDate ? `<span class="ep-date">(${pubDate})</span>` : ""}</li>`;
    }).join("");

    container.innerHTML = `
      <h3 class="footer-col-title">Recent Episodes</h3>
      <ul class="footer-episodes-list" role="list">${listHtml}</ul>
    `;
  } catch (err) {
    console.warn("RSS Feed parsing unconfigured or failed; hiding recent episodes panel.", err);
    if (container) {
      container.style.display = "none";
    }
  }
}

/**
 * Module 2: Document Inspection Lightbox (<dialog>)
 * Connects buttons with [data-doc-modal] to native <dialog> elements.
 * Supports backdrop clicks, explicit close buttons, and native ESC key.
 */
function initDocumentModals() {
  const triggers = document.querySelectorAll("[data-doc-modal]");
  triggers.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-doc-modal");
      const modal = document.getElementById(targetId);
      if (modal && typeof modal.showModal === "function") {
        modal.showModal();
      }
    });
  });

  // Explicit close buttons inside dialogs
  const closeButtons = document.querySelectorAll("[data-modal-close]");
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest("dialog");
      if (modal && typeof modal.close === "function") {
        modal.close();
      }
    });
  });

  // Click outside dialog body (on ::backdrop) to close
  const dialogs = document.querySelectorAll("dialog.doc-modal");
  dialogs.forEach(dialog => {
    dialog.addEventListener("click", event => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  });
}

/**
 * Module 3: Navigation Dropdown & Accessibility Controls
 * Handles toggle state and keyboard events for the Listen dropdown.
 */
function initNavigationDropdown() {
  const toggleBtn = document.querySelector(".nav-dropdown-toggle");
  const menu = document.getElementById("listen-dropdown-menu");

  if (!toggleBtn || !menu) return;

  function closeMenu() {
    toggleBtn.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  }

  function openMenu() {
    toggleBtn.setAttribute("aria-expanded", "true");
    menu.classList.add("is-open");
  }

  toggleBtn.addEventListener("click", event => {
    event.stopPropagation();
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking outside
  document.addEventListener("click", event => {
    if (!toggleBtn.contains(event.target) && !menu.contains(event.target)) {
      closeMenu();
    }
  });

  // Close when pressing Escape
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

// Lifecycle Registration
document.addEventListener("DOMContentLoaded", () => {
  initRecentEpisodes();
  initDocumentModals();
  initNavigationDropdown();
});


/**
 * Module: Color Theme Switch
 * Default follows the operating system (CSS `color-scheme: light dark`).
 * Choosing Light or Dark sets <html data-theme> and persists to localStorage;
 * the switch shows only Light and Dark; with no saved choice the pressed
 * icon reflects the system theme. The pre-paint script in <head> restores the
 * saved choice before first render.
 */
function initThemeSwitch() {
  const STORAGE_KEY = "qcc-theme";
  const root = document.documentElement;
  const group = document.querySelector(".theme-switch");
  if (!group) return;

  const options = Array.from(group.querySelectorAll("[data-theme-value]"));
  const themeColors = { light: "#F9F6F0", dark: "#0E110D" };
  const metas = Array.from(document.querySelectorAll('meta[name="theme-color"]'));
  const defaultMetas = metas.map(m => m.content);
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  const read = () => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v === "light" || v === "dark" ? v : null;
    } catch { return null; }
  };

  // choice: "light" | "dark" (explicit) or null (follow the system).
  // The pressed button always shows the theme currently in effect.
  function apply(choice) {
    if (choice) root.dataset.theme = choice; else delete root.dataset.theme;
    const effective = choice ?? (systemDark.matches ? "dark" : "light");
    options.forEach(btn => {
      btn.setAttribute("aria-pressed", String(btn.dataset.themeValue === effective));
    });
    // Keep the browser UI color in step with a forced theme
    metas.forEach((m, i) => { m.content = choice ? themeColors[choice] : defaultMetas[i]; });
  }

  options.forEach(btn => btn.addEventListener("click", () => {
    const choice = btn.dataset.themeValue;
    try { localStorage.setItem(STORAGE_KEY, choice); } catch { /* storage unavailable: lasts this visit */ }
    apply(choice);
  }));

  // While following the system, track live OS changes
  systemDark.addEventListener("change", () => { if (!read() && !root.dataset.theme) apply(null); });

  apply(read());
  group.hidden = false;
}

document.addEventListener("DOMContentLoaded", initThemeSwitch);
