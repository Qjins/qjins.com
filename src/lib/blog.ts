/**
 * 티스토리(qjin.tistory.com) RSS를 빌드 타임에 읽어 /blog 목록을 만든다.
 * 사이트가 펄스 커밋으로 매일 리빌드되므로 목록도 매일 자동 갱신된다.
 * 피드를 못 불러와도 빌드는 깨지지 않는다 (ok: false → 페이지에서 fallback 안내).
 */
export interface BlogPost {
  title: string;
  link: string;
  date: string;
  excerpt: string;
}

export const BLOG_URL = 'https://qjin.tistory.com';
const FEED = `${BLOG_URL}/rss`;

const decode = (s: string) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');

function field(chunk: string, tag: string): string {
  const m = chunk.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return m?.[1].trim() ?? '';
}

export async function loadBlog(): Promise<{ ok: boolean; posts: BlogPost[] }> {
  try {
    const res = await fetch(FEED, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`RSS ${res.status}`);
    const xml = await res.text();
    const posts = xml
      .split('<item>')
      .slice(1)
      .map((chunk) => {
        const parsed = new Date(field(chunk, 'pubDate'));
        return {
          title: decode(field(chunk, 'title')),
          link: field(chunk, 'link'),
          date: isNaN(+parsed) ? '' : parsed.toISOString().slice(0, 10),
          // RSS description은 이중 이스케이프(&amp;nbsp; 등) — 태그 제거 후 한 번 더 디코드
          excerpt: decode(
            decode(field(chunk, 'description')).replace(/<[^>]+>/g, ' ')
          )
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 140),
        };
      })
      .filter((p) => p.title && p.link);
    return { ok: posts.length > 0, posts };
  } catch {
    return { ok: false, posts: [] };
  }
}
