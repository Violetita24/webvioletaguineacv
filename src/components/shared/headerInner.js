export function renderHeaderInner() {
  renderLocaleSwitch();
  renderInteriorHeader();
}

function renderLocaleSwitch() {
  if (document.querySelector(".site-locale-switch")) return;

  const locale = document.createElement("div");
  locale.className = "site-locale-switch";
  locale.innerHTML = `
    <button
      id="language-toggle"
      type="button"
      class="site-locale-trigger"
      aria-haspopup="menu"
      aria-expanded="false"
      aria-label="Seleccionar idioma"
    >
      <img src="/assets/icon-world.svg"
           alt=""
           class="site-locale-icon"
           aria-hidden="true">

      <span class="site-locale-divider" aria-hidden="true">|</span>

      <span id="language-current-label"
            class="site-locale-current">
        Spain
      </span>
    </button>

    <div id="language-menu"
         class="site-locale-menu hidden"
         role="menu"></div>
  `;

  document.body.prepend(locale);
}

function renderInteriorHeader() {
  if (document.body.dataset.page === "home") return;

  const headerInner = document.querySelector(".app-header-inner");

  if (!headerInner) return;
  if (headerInner.querySelector(".app-header-title")) return;

  headerInner.innerHTML = `
    <div class="app-header-title" data-i18n="common.headerTitle">
      PERFIL · PORTFOLIO CV
    </div>
    <div class="app-header-sub">VIOLETA</div>
  `;
}
