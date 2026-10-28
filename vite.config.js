import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// This repository is deployed at https://sitewarrior.eu/ (domain root).
export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: Object.fromEntries(['en', 'pl', 'no', 'fr', 'de'].flatMap(lang => {
        const prefix = lang === 'en' ? '' : `${lang}/`;
        return [
          [lang, resolve(process.cwd(), `${prefix}index.html`)],
          [`${lang}-privacy`, resolve(process.cwd(), `${prefix}privacy/index.html`)],
          [`${lang}-terms`, resolve(process.cwd(), `${prefix}terms/index.html`)],
        ];
      })),
    },
  },
});
