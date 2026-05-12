import { getCurrentLocale, getLocaleValue } from "../../locales.js";

export function renderFooter() {
  if (document.body.dataset.page === "home") return;
  if (document.querySelector(".site-footer")) return;

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="site-footer-inner">
      <div class="site-footer-brand" data-footer-brand></div>
      <div class="site-footer-built" data-footer-built></div>
    </div>
  `;

  document.body.appendChild(footer);
  syncFooterText();
}

export function syncFooterText() {
  const brand = document.querySelector("[data-footer-brand]");
  const built = document.querySelector("[data-footer-built]");
  const locale = getCurrentLocale();

  if (brand) brand.textContent = getLocaleValue("common.footerBrand", locale) || "";
  if (built) built.innerHTML = getLocaleValue("common.footerBuilt", locale) || "";
}
