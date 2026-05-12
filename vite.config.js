import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "src/components/index/about.html"),
        skills: resolve(__dirname, "src/components/index/skills.html"),
        formacion: resolve(__dirname, "src/components/index/formacion.html"),
        experiencia: resolve(__dirname, "src/components/index/experiencia.html"),
        contacto: resolve(__dirname, "src/components/index/contacto.html"),
      },
    },
  },
});
