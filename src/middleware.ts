import { defineMiddleware } from 'astro:middleware';

/**
 * Keystatic 편집 화면(/keystatic)에 "사이트로 돌아가기" 플로팅 버튼을 주입한다.
 * Keystatic UI는 우리가 소유한 마크업이 아니라서 응답 HTML에 끼워 넣는 방식.
 */
const BACK_BUTTON = `<a href="/" title="사이트로 돌아가기" style="position:fixed;right:16px;bottom:16px;z-index:99999;display:inline-flex;align-items:center;gap:7px;padding:9px 16px;border-radius:999px;background:#103241;color:#fff;font:600 13px/1 -apple-system,BlinkMacSystemFont,sans-serif;text-decoration:none;box-shadow:0 2px 10px rgba(0,0,0,.3)">&#8617; qjins.com</a>`;

export const onRequest = defineMiddleware(async (context, next) => {
  const res = await next();
  if (
    context.url.pathname.startsWith('/keystatic') &&
    res.headers.get('content-type')?.includes('text/html')
  ) {
    const html = await res.text();
    const headers = new Headers(res.headers);
    headers.delete('content-length');
    const out = html.includes('</body>')
      ? html.replace('</body>', `${BACK_BUTTON}</body>`)
      : html + BACK_BUTTON;
    return new Response(out, { status: res.status, headers });
  }
  return res;
});
