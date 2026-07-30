import { defineConfig } from 'astro/config';
import { worksContract } from './src/lib/remark-works-contract.mjs';

// 완전한 정적 사이트. Cloudflare Pages: build = `npm run build`, output = `dist`
export default defineConfig({
  site: 'https://qjins.com',
  output: 'static',
  markdown: {
    remarkPlugins: [worksContract],
  },
});
