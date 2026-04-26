import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves the site at /tripletex-component-library/
export default defineConfig({
  plugins: [react()],
  base: "/tripletex-component-library/",
});
