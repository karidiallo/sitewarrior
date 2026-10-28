import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// This repository is deployed at https://sitewarrior.eu/ (domain root).
export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: Object.fromEntries(['en', 'pl', 'no', 'fr', 'de'].map(lang => [
        lang,
        resolve(process.cwd(), lang === 'en' ? 'index.html' : `${lang}/index.html`),
      ])),
    },
  },
});
