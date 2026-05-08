document.addEventListener("DOMContentLoaded", function () {
  const coverDescription = document.getElementById("cover-desc");

  if (coverDescription) {
    const text =
      "Busco una empresa donde realizar mis prácticas de FCT, aportar como desarrolladora junior y seguir aprendiendo en proyectos reales. Abierta a modalidad presencial, híbrida o telemática.";

    let index = 0;

    function typeText() {
      if (index < text.length) {
        coverDescription.textContent += text.charAt(index);
        index += 1;
        setTimeout(typeText, 30);
      }
    }

    typeText();
  }

  const toggle = document.querySelector(".top-toggle");
  const panel = document.querySelector(".top-panel");

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      panel.classList.toggle("is-open");
    });
  }
});
