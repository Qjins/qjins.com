import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import { worksContract } from './src/lib/remark-works-contract.mjs';

// 페이지는 전부 프리렌더(정적), Keystatic 라우트만 Worker에서 서버 렌더.
// 로컬 dev = local 스토리지(파일 직접 저장), 배포 = GitHub 모드(본인 계정 로그인 필수).
export default defineConfig({
  site: 'https://qjins.com',
  output: 'static',
  adapter: cloudflare(),
  integrations: [react(), keystatic()],
  markdown: {
    remarkPlugins: [worksContract],
  },
});
