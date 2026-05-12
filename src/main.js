import { getLocaleValue } from "./locales.js";
import { renderHeaderInner } from "./components/shared/headerInner.js";
import { renderFooter, syncFooterText } from "./components/shared/footer.js";
import { initLanguageMenu } from "./languageMenu.js";

let coverTypewriterRun = 0;

document.addEventListener("DOMContentLoaded", function () {
  renderHeaderInner();
  renderFooter();

  initLanguageMenu({
    onLocaleChange: function () {
      restartCoverTypewriter();
      syncFooterText();
    },
  });

  restartCoverTypewriter();
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
