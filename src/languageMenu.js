import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  getLocaleMeta,
  getLocaleSwitchOptions,
  getLocaleValue,
  setCurrentLocale,
} from "./locales.js";

export function initLanguageMenu({ onLocaleChange = () => {} } = {}) {
  const languageToggle = document.getElementById("language-toggle");
  const languageMenu = document.getElementById("language-menu");
  const languageCurrentLabel = document.getElementById(
    "language-current-label"
  );
  const initialLocale = getInitialLocale();

  renderLanguageMenu(languageMenu);
  applyLocale(initialLocale);
  syncLanguageMenu(initialLocale, languageMenu, languageCurrentLabel, languageToggle);

  if (!languageToggle || !languageMenu) {
    return initialLocale;
  }

  languageToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleLanguageMenu(languageMenu, languageToggle);
  });

  languageMenu.addEventListener("click", function (event) {
    event.stopPropagation();
    const option = event.target.closest("[data-locale-option]");
    if (!option) return;

    const nextLocale = option.dataset.localeOption;
    applyLocale(nextLocale);
    syncLanguageMenu(nextLocale, languageMenu, languageCurrentLabel, languageToggle);
    closeLanguageMenu(languageMenu, languageToggle);
    onLocaleChange(nextLocale);
  });

  document.addEventListener("click", function (event) {
    if (
      !languageMenu.contains(event.target) &&
      !languageToggle.contains(event.target)
    ) {
      closeLanguageMenu(languageMenu, languageToggle);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLanguageMenu(languageMenu, languageToggle);
    }
  });

  return initialLocale;
}

export function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    const key = element.getAttribute("data-i18n");
    const type = element.getAttribute("data-i18n-type") || "textContent";
    const translation = getLocaleValue(key);

    if (!translation) return;

    if (type === "innerHTML") {
      element.innerHTML = translation;
      return;
    }

    element.textContent = translation;
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
    const translation = getLocaleValue(element.getAttribute("data-i18n-aria-label"));
    if (translation) {
      element.setAttribute("aria-label", translation);
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach(function (element) {
    const translation = getLocaleValue(element.getAttribute("data-i18n-alt"));
    if (translation) {
      element.setAttribute("alt", translation);
    }
  });

  const pageKey = document.body.dataset.page;
  const pageTitle = pageKey ? getLocaleValue(`document.${pageKey}`) : "";
  if (pageTitle) {
    document.title = pageTitle;
  }
}

function applyLocale(locale) {
  setCurrentLocale(locale);
  document.documentElement.lang = locale;
  persistLocale(locale);
  translatePage();
}

function renderLanguageMenu(menu) {
  if (!menu) return;

  const fragment = document.createDocumentFragment();

  getLocaleSwitchOptions().forEach(function ({ locale, label }) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "site-locale-option";
    button.setAttribute("role", "menuitemradio");
    button.setAttribute("aria-checked", "false");
    button.dataset.localeOption = locale;
    button.textContent = label;
    fragment.appendChild(button);
  });

  menu.replaceChildren(fragment);
}

function syncLanguageMenu(currentLocale, menu, currentLabel, toggleButton) {
  const localeMeta = getLocaleMeta(currentLocale);

  if (menu) {
    menu.setAttribute("aria-label", localeMeta.switchMenuLabel);
    menu.querySelectorAll("[data-locale-option]").forEach(function (button) {
      const isActive = button.dataset.localeOption === currentLocale;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-checked", String(isActive));
    });
  }

  if (currentLabel) {
    currentLabel.textContent = localeMeta.label;
  }

  if (toggleButton) {
    toggleButton.setAttribute(
      "aria-label",
      `${localeMeta.currentLanguagePrefix}: ${localeMeta.label}. ${localeMeta.switchTriggerLabel}`
    );
  }
}

function toggleLanguageMenu(menu, toggleButton) {
  const isOpen = !menu.classList.contains("hidden");
  menu.classList.toggle("hidden", isOpen);
  toggleButton.setAttribute("aria-expanded", String(!isOpen));
}

function closeLanguageMenu(menu, toggleButton) {
  if (!menu || !toggleButton) return;

  menu.classList.add("hidden");
  toggleButton.setAttribute("aria-expanded", "false");
}

function getInitialLocale() {
  const urlLocale = new URLSearchParams(window.location.search).get("lang");
  const savedLocale = readPersistedLocale();
  const htmlLocale = document.documentElement.lang;

  return [urlLocale, savedLocale, htmlLocale, DEFAULT_LOCALE].find(isSupportedLocale);
}

function isSupportedLocale(locale) {
  return locale === "es" || locale === "en";
}

function persistLocale(locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch (_) {}
}

function readPersistedLocale() {
  try {
    return window.localStorage.getItem(LOCALE_STORAGE_KEY) || "";
  } catch (_) {
    return "";
  }
}
