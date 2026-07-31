/**
 * 관리자 편집 UI (로컬 모드).
 * 실행: npm run cms → http://localhost:4321/keystatic
 * 저장하면 파일로 떨어지므로, 확인 후 git push만 하면 배포된다.
 */
import { config, collection, singleton, fields } from '@keystatic/core';

const statusOptions = [
  { label: 'live', value: 'live' },
  { label: 'wip', value: 'wip' },
  { label: 'archived', value: 'archived' },
] as const;

const workSchema = {
  title: fields.slug({ name: { label: '제목' } }),
  summary: fields.text({ label: '한 줄 요약', multiline: true }),
  date: fields.date({ label: '날짜' }),
  status: fields.select({ label: '상태', options: [...statusOptions], defaultValue: 'wip' }),
  url: fields.url({ label: '링크 (선택)' }),
  content: fields.markdoc({
    label: '본문 (배경/설계/시행착오/결과 네 H2 필수)',
    extension: 'md',
  }),
};

const noteSchema = {
  title: fields.slug({ name: { label: '제목' } }),
  date: fields.date({ label: '날짜' }),
  content: fields.markdoc({ label: '본문', extension: 'md' }),
};

const nowSingleton = (path: `src/content/now/${string}`, label: string) =>
  singleton({
    label,
    path,
    format: { contentField: 'content' },
    schema: { content: fields.markdoc({ label: '본문', extension: 'md' }) },
  });

export default config({
  storage: { kind: 'local' },
  ui: { brand: { name: 'qjins.com' } },
  collections: {
    worksKo: collection({
      label: 'Works (한국어)',
      slugField: 'title',
      path: 'src/content/works/ko/*',
      format: { contentField: 'content' },
      schema: workSchema,
    }),
    worksEn: collection({
      label: 'Works (English)',
      slugField: 'title',
      path: 'src/content/works/en/*',
      format: { contentField: 'content' },
      schema: workSchema,
    }),
    notesKo: collection({
      label: 'Notes (한국어)',
      slugField: 'title',
      path: 'src/content/notes/ko/*',
      format: { contentField: 'content' },
      schema: noteSchema,
    }),
    notesEn: collection({
      label: 'Notes (English)',
      slugField: 'title',
      path: 'src/content/notes/en/*',
      format: { contentField: 'content' },
      schema: noteSchema,
    }),
  },
  singletons: {
    nowKo: nowSingleton('src/content/now/ko', 'Now (한국어)'),
    nowEn: nowSingleton('src/content/now/en', 'Now (English)'),
  },
});
