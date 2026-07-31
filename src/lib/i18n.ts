import ui from '../data/ui.json';

export type Lang = 'ko' | 'en';
export const LANGS: Lang[] = ['ko', 'en'];

const dict = ui;

export type StringKey = keyof typeof dict;
export const t = (lang: Lang, key: StringKey): string => (dict[key] as Partial<Record<Lang, string>>)[lang] ?? '';

/** 해당 로케일의 경로. ko는 그대로, en은 /en 접두 */
export const localePath = (lang: Lang, path: string): string =>
  lang === 'ko' ? path : path === '/' ? '/en/' : `/en${path}`;

/** 현재 경로를 반대 로케일 경로로 */
export function switchPath(path: string): string {
  if (path.startsWith('/en/') || path === '/en') return path.replace(/^\/en\/?/, '/') || '/';
  return path === '/' ? '/en/' : `/en${path}`;
}

export const langOfPath = (path: string): Lang => (path === '/en' || path.startsWith('/en/') ? 'en' : 'ko');
