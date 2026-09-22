import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kimerin.com',
  trailingSlash: 'never',
  build: { format: 'file' },
});
