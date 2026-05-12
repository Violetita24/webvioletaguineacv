import { getLocaleValue } from "./locales.js";
import { initLanguageMenu } from "./languageMenu.js";

let coverTypewriterRun = 0;

document.addEventListener("DOMContentLoaded", function () {
  initLanguageMenu({
    onLocaleChange: restartCoverTypewriter,
  });

  restartCoverTypewriter();
  initTopMenu();
});

function restartCoverTypewriter() {
  const coverDescription = document.getElementById("cover-desc");

  if (!coverDescription) return;

  const text = getLocaleValue("cover.description");
  const currentRun = (coverTypewriterRun += 1);
  let index = 0;

  coverDescription.textContent = "";

  function typeText() {
    if (currentRun !== coverTypewriterRun) return;

    if (index < text.length) {
      coverDescription.textContent += text.charAt(index);
      index += 1;
      setTimeout(typeText, 30);
    }
  }

  typeText();
}

function initTopMenu() {
  const toggle = document.querySelector(".top-toggle");
  const panel = document.querySelector(".top-panel");

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      panel.classList.toggle("is-open");
    });
  }
}
