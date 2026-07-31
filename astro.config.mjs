import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import { worksContract } from './src/lib/remark-works-contract.mjs';

// 완전한 정적 사이트. 배포: npm run build → dist/ (Cloudflare Workers 정적 에셋)
// 관리자 편집 UI(Keystatic)는 로컬 dev 전용: npm run cms → /keystatic
const CMS = !!process.env.KEYSTATIC;

export default defineConfig({
  site: 'https://qjins.com',
  output: 'static',
  integrations: CMS ? [react(), keystatic()] : [],
  markdown: {
    remarkPlugins: [worksContract],
  },
});
