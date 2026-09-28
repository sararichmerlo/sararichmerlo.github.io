# Queen City Crossroads — Website Specification (V1)
**Target Host:** GitHub Pages (Static HTML5 / Vanilla CSS3 / Plain JavaScript ES6+)  
**Domain:** `https://queencitycrossroads.com`  
**Primary Contact:** `queencitycrossroads@gmail.com`  

---

## 1. Technical Stack & Core Platform Requirements

### 1.1 Architectural Guiding Principles
* **Zero External Framework Dependencies:** Pure semantic HTML5, modern vanilla CSS3, and plain ES6+ JavaScript. No React, Vue, Tailwind, Bootstrap, jQuery, or third-party CSS reset frameworks.
* **Baseline-First Platform Alignment:** Leverage modern CSS features natively supported across WebKit (Safari on macOS/iOS), Blink (Chrome/Edge), and Gecko (Firefox):
  * CSS Grid, Flexbox, Container Queries (`@container`), Logical Properties (`margin-inline`, `padding-block`).
  * Modern Color Functions (`hsl()`, `oklch()`) and CSS Custom Properties (`var(--...)`).
  * Native HTML interactive primitives (`<details>`, `<summary>`, `<dialog>`).
* **Mobile-First & Touch Optimization:** Mobile viewport layout defined as baseline; fluid typography scaled via `clamp()`; layout expanded smoothly across Tablet/iPad (optimized for Safari WebKit rendering) and Desktop up to High-DPI / Retina display modes across macOS, Windows, and Linux.
* **Graceful Degradation:** Core structure, typography, iconography, and copy must function 100% cleanly with JavaScript disabled. Interactive enhancements (RSS parsing, modal lightbox popups) degrade gracefully without breaking visual presentation.
* **Accessibility & WCAG Compliance:** Targeted at WCAG 2.1 Level AA / AAA standards:
  * Minimum contrast ratio of **7:1** for normal body text and **4.5:1** for large text/ui components.
  * Native visible focus indicators (`:focus-visible`) styled in high-contrast Terracotta / Ochre.
  * Screen-reader semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<aside>`).
  * Explicit `aria-expanded` and `aria-controls` bindings for interactive controls.
  * Touch target sizes adhering to a minimum of **44×44px**.

---

## 2. Visual Identity & Design System

### 2.1 Brand Color Palette ("Regal & Warm Historic")

| Palette Tokens | Role | HEX / Color Code | WCAG Usage / Target |
| :--- | :--- | :--- | :--- |
| **`--color-canvas`** | Primary Page Background | `#F9F6F0` *(Warm Parchment)* | High contrast base canvas |
| **`--color-text-primary`** | Main Typography & Structural Lines | `#1F2923` *(Deep Crown Charcoal)* | AAA contrast ratio against Parchment (13.8:1) |
| **`--color-brand-primary`** | Primary Accents & Key Headings | `#2D5A43` *(Charlotte Queen Green)* | AAA contrast ratio against Parchment (7.2:1) |
| **`--color-brand-secondary`** | Call to Action (CTA) & Focus Ring | `#C86446` *(Historic Terracotta)* | AA contrast for buttons and accent blocks |
| **`--color-accent-detail`** | Structural Borders & Pattern Strokes | `#D4A359` *(Warm Ochre / Brass)* | Accent highlights, pattern vectors, rules |
| **`--color-canvas-alt`** | Secondary Panel Canvas | `#EFECE6` *(Muted Stone Parchment)* | Structural section depth separation |

### 2.2 Background Pattern Architecture (Panel 1 Hero)
* **Concept:** Scattered, low-opacity vector graphics representing local Charlotte historic icons.
* **SVG Vector Assets Included in Pattern:**
  1. *Queen City Crown:* Minimalist 5-point civic crown vector silhouette.
  2. *Trade & Tryon Crossroads:* Clean intersecting vector line geometry with central compass dot.
  3. *Oak Canopy / Leaf:* Minimalist geometric oak leaf outline (symbolizing the "City of Trees").
  4. *Streetcar Lines:* Parallel double-line track segments with subtle cross-ties.
* **Implementation:** Rendered via an inline SVG `<defs>` pattern or CSS `background-image` data URI with SVG opacity locked between `0.04` and `0.07` (`fill="var(--color-brand-primary)"`), ensuring no visual interference with readability.

### 2.3 Visual Divider Architecture
* Panel transitions leverage SVG wave vectors (`svg.undulating-divider`) with `fill` matching adjacent section canvas variables (`var(--color-canvas)` vs. `var(--color-brand-primary)` vs. `var(--color-canvas-alt)`), mirroring the organic section separations seen in *The Friday Habit*.

---

## 3. Site Navigation & Header

### 3.1 Header Layout & Behavior
* **Structure:** Sticky top navigation bar (`<header>` wrapper containing `<nav aria-label="Main Navigation">`).
* **Visual Styling:** Inspired by *The Collective Podcast*:
  * High-contrast fixed height bar with background glassmorphic effect (`background: rgba(249, 246, 240, 0.95); backdrop-filter: blur(8px);`).
  * **Logo:** Text-and-symbol lockup containing the Queen City Crown icon next to uppercase, condensed serif typography: **QUEEN CITY CROSSROADS**.
  * **Nav Links Typography:** Condensed, bold, uppercase tracking (`letter-spacing: 0.08em; font-weight: 700; text-transform: uppercase; font-size: 0.95rem;`).
  * **Color Mapping:** Navigation text color strictly matches logo mark (`var(--color-brand-primary)`).

### 3.2 Navigation Menu Items
1. **Listen:** Dropdown menu button (`<button aria-expanded="false">Listen</button>`).
   * **V1 Default State:** Hidden via CSS (`display: none` or `hidden` attribute) for launch while podcast taping is completed.
   * **V1 Code Structure:** Full semantic dropdown markup pre-built in HTML/CSS with icon-and-text links for:
     * *Apple Podcasts* (Apple logo SVG + "Apple Podcasts")
     * *Spotify* (Spotify logo SVG + "Spotify")
     * *Pocket Casts* (Pocket Casts logo SVG + "Pocket Casts")
     * *Amazon Music / Overcast / RSS Feed*
2. **About:** Anchor link (`<a href="#about">About</a>`) targeting the `#about` section.
3. **The Team:** Anchor link (`<a href="#team">The Team</a>`) targeting the `#team` section.
4. **Contact (CTA):** Styled as a prominent button element using `--color-brand-secondary` (Terracotta) background, warm parchment text, rounded corners, and hover depth transform.
   * **Href Target:** `mailto:queencitycrossroads@gmail.com`

---

## 4. Main Section Specifications

+-----------------------------------------------------------------------+
|  HEADER / NAV: Logo (Queen City Crossroads) | Listen  About  Team  [CONTACT CTA]  |
+-----------------------------------------------------------------------+
|  PANEL 1: LISTEN (HERO)                                               |
|  - Scattered Charlotte SVG Pattern Background (Crown, Crossroads, Oak)|
|  - Hero Tagline: "Americans at the crossroads of history..."           |
|  - Responsive SoundCloud Embed Player Container                      |
|  - Platform Icon Button Row (Hidden in CSS by default for V1)          |
+-----------------------------------------------------------------------+

+-----------------------------------------------------------------------+
|  PANEL 2: ABOUT                                                       |
|  - Full Narrative Statement Card                                      |
|  +-----------------------------------------------------------------+  |
|  | Sub-Panel 2A: "The Problem" (Light Parchment Canvas)            |  |
|  +-----------------------------------------------------------------+  |
|  ~~~~~~ Wave Transition ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  |
|  +-----------------------------------------------------------------+  |
|  | Sub-Panel 2B: "The Solution" (Charlotte Queen Green Canvas)     |  |
|  +-----------------------------------------------------------------+  |
|  ~~~~~~ Wave Transition ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  |
|  +-----------------------------------------------------------------+  |
|  | Sub-Panel 2C: "Instructional Materials" (Muted Stone Canvas)    |  |
|  |   - Primary Source Document Gallery Grid (2x2 / Responsive)     |  |
|  |   - Native HTML <dialog> Lightbox Inspection View              |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
~~~~~~ Undulating Wave Divider 2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
+-----------------------------------------------------------------------+
|  PANEL 3: THE TEAM                                                    |
|  - Director / Founder Spotlight Card (Sara Rich)                      |
|  - 4x Team Member Cards (Native HTML <details> / <summary> Accordion)  |
|  - Candid Team Photo Grid (Exactly 2 Horizontal Pictures)             |
+-----------------------------------------------------------------------+
~~~~~~ Undulating Wave Divider 3 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
+-----------------------------------------------------------------------+
|  FAT FOOTER                                                           |
|  - Recent Episodes RSS Feed Section (Dynamic Vanilla JS Parse)         |
|  - Footer Navigation Links (Listen, About, The Team, Contact)         |
|  - Copyright & @roggmatz / roggmatz.com Attribution Line              |
+-----------------------------------------------------------------------+
```

### 4.1 Panel 1: Listen (Hero)
* **ID:** `#listen`
* **Background:** `--color-canvas` with scattered Charlotte SVG background pattern.
* **Content Stack:**
  1. **Primary Tagline (H1):**
     > *"Americans at the crossroads of history and the choices they make when they get there."*
  2. **Sub-Tagline:**
     > *"Exploring major historical events through explicit words in one place: Charlotte, North Carolina."*
  3. **Audio Player Widget Container:**
     * Custom responsive wrapper (`div.soundcloud-player-container`).
     * Standard SoundCloud `<iframe>` embed code formatted to span 100% container width with responsive max-width constraint (960px) and styled border radius.
  4. **Platform Subscription Row:**
     * Wrapper (`div.platform-links-wrapper`) with utility CSS class `.v1-hidden { display: none; }` to enable seamless unhiding when distribution feed goes live.

### 4.2 Panel 2: About
* **ID:** `#about`
* **Structure:** Unified panel split into three distinct sequential sub-panels separated by undulating SVG shapes.
* **Opening Section Narrative:**
  > *"Queen City Crossroads is about Americans at the crossroads of history and the choices they make when they get there. We share real peoples’ explicit words as they navigate major historical events — like emancipation, world wars, school integration — and explore how they unfolded in one place: Charlotte, North Carolina. Through this work, our goal is to inspire our listeners to make courageous choices today that benefit the common good."*

#### Sub-Panel 2A: The Problem
* **Canvas:** Warm Parchment (`--color-canvas`).
* **Header:** "The Problem"
* **Copy Presentation:** Two distinct structured visual callout cards (no raw bullet points):
  * **Card 1: "Common Local Myths"**
    * *Myth 1:* Charlotte has no history.
    * *Myth 2:* No one in Charlotte is from Charlotte.
    * *Myth 3:* For one group to win, another has to lose.
  * **Card 2: "How History Is Traditionally Taught"**
    * Nationwide scope that ignores local events happening right here in our city.
    * Historically marginalized voices missing or reduced to isolated sidebars.
    * Zero explicit connections to our present day choices.

#### Sub-Panel 2B: The Solution
* **Canvas:** Dark Queen Green (`--color-brand-primary`) with inverse Parchment typography (`--color-canvas`).
* **Header:** "The Solution"
* **Copy Presentation:** Elevated 3-column feature grid with custom minimal vector line icons:
  * **Feature 1 (Icon: Speech / Primary Sources):** Puts explicit words from Charlotte’s history into direct conversation with contemporary Charlotteans today.
  * **Feature 2 (Icon: Diverse Unity / Mosaic):** Includes diverse voices by design to ensure a deeper, complete understanding of our shared past.
  * **Feature 3 (Icon: Crossroads / Synergy):** Challenges zero-sum thinking. It’s about joining forces — no matter your background — to create a city where we all thrive.

#### Sub-Panel 2C: Instructional Materials (Primary Source Document Gallery)
* **Canvas:** Muted Stone (`--color-canvas-alt`).
* **Header:** "Instructional Materials & Historical Archives"
* **ID:** `#about-instructional`
* **Section Intro:** Explains how the production team references authentic local archival documents, newspapers, personal letters, and municipal records when scripting each episode.
* **Document Gallery Layout:**
  * Responsive 2×2 grid on desktop, scaling to a single-column stack on mobile viewports (`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`).
  * **Document Card Structure (`<figure class="doc-card">`):**
    * *Thumbnail Container:* Styled border frame with `--color-accent-detail` (Warm Brass) accent outline and hover scale effect.
    * *Image:* `<img src="placeholder-doc-1.jpg" alt="Description of historical document" loading="lazy">`
    * *Caption (`<figcaption>`):* Document title, estimated date/era, and brief historical context (e.g., *"1865 Emancipation Proclamation Local Ledger Entry"* or *"1970 School Integration Court Transcript"*).
    * *Interactive Trigger:* "Examine Document" button configured to open a native HTML **`<dialog class="doc-modal">`** element for full-screen inspection.
* **Graceful Degradation:** If JS is disabled, the images open directly in a new browser tab via standard standard anchor tags (`<a href="placeholder-doc-1.jpg" target="_blank">`).

### 4.3 Panel 3: The Team
* **ID:** `#team`
* **Canvas:** `--color-canvas`.
* **Header:** "The Team Behind Queen City Crossroads"

#### Section Layout
1. **Featured Founder & Director Spotlight Card:**
   * Prominent full-width layout dedicated to **Sara Rich** (Founder & Director).
   * Elevated visual hierarchy: Larger headshot placeholder with Ochre brass border accent, prominent title badge, short executive summary, and expanded background text.
2. **Team Member Accordion Grid (4 Team Members):**
   * Built using native, accessible HTML **`<details>`** and **`<summary>`** elements for progressive bio expansion with zero JS required.
   * **Card Structure:**
     ```html
     <details class="team-card">
       <summary class="team-card-header">
         <img src="placeholder-headshot.jpg" alt="Headshot of [Name]" class="team-photo" />
         <div class="team-meta">
           <h3 class="team-name">[First & Last Name]</h3>
           <p class="team-title">[Project Role / Title]</p>
           <span class="bio-toggle-btn">Read Full Bio</span>
         </div>
       </summary>
       <div class="team-bio-content">
         <p>[Paragraph 1 of bio text...]</p>
         <p>[Paragraph 2 of bio text...]</p>
       </div>
     </details>
     ```
3. **Candid Team Photo Grid:**
   * Header: "Behind the Scenes"
   * Layout: Strictly two horizontal rectangular image slots side-by-side (`grid-template-columns: 1fr 1fr` on desktop, stacking vertically on mobile with `gap: 1.5rem`) displaying candid team collaboration and production moments.

---

## 5. Fat Footer Architecture

* **Visual Style:** Dark Queen Green background (`--color-brand-primary`) with warm parchment text (`--color-canvas`), inspired by *Freakonomics*.
* **Layout Grid:** 4-column desktop footer stacking vertically on mobile.

### 5.1 Column Specifications
1. **Column 1: Recent Episodes (Dynamic RSS Parse)**
   * Header: "Recent Episodes"
   * ID: `#footer-recent-episodes`
   * **Behavior:** Managed via JavaScript (`app.js`). Parses configured podcast RSS feed URL.
   * **Fallback State:** If no RSS feed URL is configured or fetch fails, the entire column container is set to `display: none` via JS, preventing empty layout gaps.
2. **Column 2: Listen**
   * Header: "Listen"
   * Anchors back to Panel 1 (`#listen`) with secondary publisher icons/links once live.
3. **Column 3: About**
   * Header: "About"
   * Sub-links:
     * "The Problem" (`#about-problem`)
     * "The Solution" (`#about-solution`)
     * "Instructional Materials" (`#about-instructional`)
4. **Column 4: Contact**
   * Header: "Contact"
   * Direct mailto link (`mailto:queencitycrossroads@gmail.com`) formatted cleanly with project email address and response expectation note.

### 5.2 Footer Bottom Bar
* **Copyright Line:** `© 2026 Queen City Crossroads. All Rights Reserved.`
* **Attribution Requirement:**
  ```html
  <p class="footer-attribution">
    Website design & development attributed to 
    <a href="[https://roggmatz.com](https://roggmatz.com)" target="_blank" rel="noopener noreferrer">@roggmatz</a>.
  </p>
  ```

---

## 6. JavaScript Architecture (`app.js`)

### 6.1 Script Execution Principles
* **Vanilla ES6+:** Zero dependencies or runtime build requirements.
* **Module / Defer Loading:** Included with `defer` attribute on standard HTML index page.

### 6.2 Primary Functional Modules

```javascript
// Config Object
const CONFIG = {
  rssFeedUrl: "", // Set RSS feed URL when live (e.g., "[https://anchor.fm/s/](https://anchor.fm/s/)...")
  maxRecentEpisodes: 5
};

// Module 1: Client-Side RSS Feed Parser
async function initRecentEpisodes() {
  const container = document.getElementById("footer-recent-episodes");
  if (!container || !CONFIG.rssFeedUrl) {
    if (container) container.style.display = "none";
    return;
  }
  
  try {
    const response = await fetch(`[https://api.allorigins.win/get?url=$](https://api.allorigins.win/get?url=$){encodeURIComponent(CONFIG.rssFeedUrl)}`);
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
      const pubDate = new Date(item.querySelector("pubDate")?.textContent).toLocaleDateString();
      return `<li><a href="${link}" target="_blank" rel="noopener">${title}</a> <span class="ep-date">(${pubDate})</span></li>`;
    }).join("");

    container.innerHTML = `<h3>Recent Episodes</h3><ul>${listHtml}</ul>`;
  } catch (err) {
    console.warn("RSS Feed parsing unconfigured or failed; hiding recent episodes panel.", err);
    container.style.display = "none";
  }
}

// Module 2: Document Inspection Lightbox (<dialog>)
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
}

document.addEventListener("DOMContentLoaded", () => {
  initRecentEpisodes();
  initDocumentModals();
});
```

---

## 7. Deliverable Summary Checklist for Coding Turn

When fed into the coding conversation, this specification instructs the AI generator to produce:
1. `index.html`: Complete, single-file semantic HTML structure with all aria attributes, SVGs, primary document gallery grid, native `<dialog>` document modals, and inline `<defs>` icons.
2. `styles.css`: Complete vanilla CSS3 stylesheet featuring custom properties, fluid typography, WCAG focus states, container queries, 2-column candid team photo layout, and undulating wave SVG transitions.
3. `app.js`: Clean ES6 module for lightweight RSS parsing, dynamic footer rendering, and accessible document modal controls.
```
