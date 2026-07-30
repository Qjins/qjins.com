import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

type Works = CollectionEntry<'works'>;
type Notes = CollectionEntry<'notes'>;

export const slugOf = (e: { id: string }) => e.id.replace(/^(ko|en)\//, '');
export const langOf = (e: { id: string }): Lang => (e.id.startsWith('en/') ? 'en' : 'ko');

const byDateDesc = <T extends { data: { date: Date } }>(list: T[]) =>
  [...list].sort((a, b) => +b.data.date - +a.data.date);

/**
 * 로케일별 목록.
 * ko: ko/ 원문 전부.
 * en: en/ 번역본 우선, 번역 없는 글은 ko 원문이 그대로 노출된다(숨기지 않음).
 */
async function localized<T extends Works | Notes>(collection: 'works' | 'notes', lang: Lang): Promise<T[]> {
  const all = (await getCollection(collection)) as T[];
  const ko = all.filter((e) => langOf(e) === 'ko');
  if (lang === 'ko') return byDateDesc(ko);
  const merged = new Map(ko.map((e) => [slugOf(e), e]));
  for (const e of all) if (langOf(e) === 'en') merged.set(slugOf(e), e);
  return byDateDesc([...merged.values()]);
}

export const getWorks = (lang: Lang) => localized<Works>('works', lang);
export const getNotes = (lang: Lang) => localized<Notes>('notes', lang);
