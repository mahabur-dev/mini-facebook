export const swaggerThemeCss = `
  html[data-swagger-theme="light"] {
    color-scheme: light;
    --swagger-bg: #ffffff;
    --swagger-panel: #ffffff;
    --swagger-text: #1f2937;
    --swagger-muted: #6b7280;
    --swagger-line: #e5e7eb;
    --swagger-accent: #0f766e;
    --swagger-code-bg: #111827;
  }

  html[data-swagger-theme="dark"] {
    color-scheme: dark;
    --swagger-bg: #0f1419;
    --swagger-panel: #151b22;
    --swagger-text: #f3f4f6;
    --swagger-muted: #a7b0bd;
    --swagger-line: #27313d;
    --swagger-accent: #5eead4;
    --swagger-code-bg: #020617;
  }

  html:not([data-swagger-theme]) {
    color-scheme: dark;
    --swagger-bg: #0f1419;
    --swagger-panel: #151b22;
    --swagger-text: #f3f4f6;
    --swagger-muted: #a7b0bd;
    --swagger-line: #27313d;
    --swagger-accent: #5eead4;
    --swagger-code-bg: #020617;
  }

  body,
  .swagger-ui {
    background: var(--swagger-bg);
    color: var(--swagger-text);
    font-family: "Segoe UI", sans-serif;
  }

  .swagger-ui .topbar {
    background: var(--swagger-panel);
    border-bottom: 1px solid var(--swagger-line);
    box-shadow: none;
  }

  .swagger-ui .topbar .wrapper {
    align-items: center;
    display: flex;
    gap: 1rem;
  }

  .swagger-theme-toggle {
    align-items: center;
    background: transparent;
    border: 0;
    color: var(--swagger-text);
    cursor: pointer;
    display: inline-flex;
    font-size: 13px;
    font-weight: 700;
    gap: 0.5rem;
    margin-left: auto;
    padding: 0.5rem 0;
    transition: color 160ms ease;
  }

  .swagger-theme-toggle:hover {
    color: var(--swagger-accent);
  }

  .swagger-theme-toggle__icon {
    background: var(--swagger-accent);
    border-radius: 999px;
    display: inline-block;
    height: 0.75rem;
    width: 0.75rem;
  }

  .swagger-ui .info,
  .swagger-ui .scheme-container,
  .swagger-ui .opblock,
  .swagger-ui .model-box,
  .swagger-ui section.models {
    background: var(--swagger-panel);
    border-color: transparent;
    border-radius: 0;
    box-shadow: none;
  }

  .swagger-ui .wrapper {
    max-width: 1420px;
  }

  .swagger-ui .info {
    margin: 2rem 0;
    padding: 0;
  }

  .swagger-ui .scheme-container {
    border-bottom: 1px solid var(--swagger-line);
    border-top: 1px solid var(--swagger-line);
    margin: 0 0 1.5rem;
    padding: 1rem 0;
  }

  .swagger-ui .opblock {
    margin: 0 0 0.75rem;
  }

  .swagger-ui .opblock-tag {
    border-bottom-color: var(--swagger-line) !important;
    padding: 1.25rem 0 0.75rem;
  }

  .swagger-ui .info .title,
  .swagger-ui .info p,
  .swagger-ui .opblock-tag,
  .swagger-ui .opblock .opblock-summary-path,
  .swagger-ui .opblock .opblock-summary-description,
  .swagger-ui .parameter__name,
  .swagger-ui .parameter__type,
  .swagger-ui table thead tr td,
  .swagger-ui table thead tr th,
  .swagger-ui .response-col_status,
  .swagger-ui .response-col_description,
  .swagger-ui .model-title,
  .swagger-ui .model,
  .swagger-ui .model-toggle,
  .swagger-ui .prop-type,
  .swagger-ui .tab li,
  .swagger-ui label,
  .swagger-ui p,
  .swagger-ui h1,
  .swagger-ui h2,
  .swagger-ui h3,
  .swagger-ui h4,
  .swagger-ui h5 {
    color: var(--swagger-text) !important;
  }

  .swagger-ui .info .title small,
  .swagger-ui .parameter__in,
  .swagger-ui .opblock-description-wrapper p,
  .swagger-ui .markdown p {
    color: var(--swagger-muted) !important;
  }

  .swagger-ui .btn,
  .swagger-ui .authorize,
  .swagger-ui .try-out__btn,
  .swagger-ui .execute {
    border-color: var(--swagger-accent) !important;
    border-radius: 4px;
    color: var(--swagger-accent) !important;
  }

  .swagger-ui .execute {
    background: var(--swagger-accent) !important;
    color: #06211e !important;
  }

  .swagger-ui input,
  .swagger-ui textarea,
  .swagger-ui select {
    background: var(--swagger-panel) !important;
    border-color: var(--swagger-line) !important;
    border-radius: 4px;
    color: var(--swagger-text) !important;
  }

  .swagger-ui code,
  .swagger-ui pre,
  .swagger-ui .microlight {
    background: var(--swagger-code-bg) !important;
    border-radius: 4px;
    color: #e5eef9 !important;
  }
`;

export const swaggerThemeScript = `
  (function () {
    var storageKey = "swagger-theme";
    var root = document.documentElement;

    function getPreferredTheme() {
      var savedTheme = window.localStorage.getItem(storageKey);

      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }

      return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }

    function applyTheme(theme) {
      root.setAttribute("data-swagger-theme", theme);

      var label = document.querySelector("[data-swagger-theme-label]");
      if (label) {
        label.textContent = theme === "dark" ? "Dark" : "Light";
      }

      var button = document.querySelector("[data-swagger-theme-toggle]");
      if (button) {
        var nextTheme = theme === "dark" ? "light" : "dark";

        button.setAttribute("aria-label", "Switch to " + nextTheme + " theme");
        button.setAttribute("title", "Switch to " + nextTheme + " theme");
      }
    }

    function createThemeToggle() {
      if (document.querySelector("[data-swagger-theme-toggle]")) {
        return;
      }

      var topbarWrapper = document.querySelector(".swagger-ui .topbar .wrapper");
      if (!topbarWrapper) {
        window.setTimeout(createThemeToggle, 100);
        return;
      }

      var button = document.createElement("button");
      button.type = "button";
      button.className = "swagger-theme-toggle";
      button.setAttribute("data-swagger-theme-toggle", "true");
      button.innerHTML =
        '<span class="swagger-theme-toggle__icon" aria-hidden="true"></span>' +
        "<span>Theme: </span>" +
        "<span data-swagger-theme-label></span>";

      button.addEventListener("click", function () {
        var currentTheme = root.getAttribute("data-swagger-theme");
        var nextTheme = currentTheme === "dark" ? "light" : "dark";

        window.localStorage.setItem(storageKey, nextTheme);
        applyTheme(nextTheme);
      });

      topbarWrapper.appendChild(button);
      applyTheme(root.getAttribute("data-swagger-theme") || getPreferredTheme());
    }

    applyTheme(getPreferredTheme());
    createThemeToggle();
  })();
`;
