import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "src/pages/about.html"),
        skills: resolve(__dirname, "src/pages/skills.html"),
        formacion: resolve(__dirname, "src/pages/formacion.html"),
        experiencia: resolve(__dirname, "src/pages/experiencia.html"),
        contacto: resolve(__dirname, "src/pages/contacto.html"),
      },
    },
  },
});
