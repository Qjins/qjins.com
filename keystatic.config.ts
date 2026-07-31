/**
 * 관리자 편집 UI (로컬 모드).
 * 실행: npm run cms → http://localhost:4321/keystatic
 * CMS 모드에서는 사이트 곳곳에 연필 아이콘이 떠서 해당 편집 화면으로 연결된다.
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

/** ko/en 한 쌍 텍스트 필드 */
const pair = (label: string, multiline = false) =>
  fields.object(
    {
      ko: fields.text({ label: 'ko', multiline }),
      en: fields.text({ label: 'en', multiline }),
    },
    { label }
  );

const aboutSchema = {
  hello: fields.text({ label: '인사말 (HTML 허용)', multiline: true }),
  sub: fields.text({ label: '인사말 둘째 줄', multiline: true }),
  education: fields.array(
    fields.object({
      school: fields.text({ label: '학교' }),
      degree: fields.text({ label: '학위·설명' }),
      period: fields.text({ label: '기간' }),
    }),
    { label: 'Education', itemLabel: (p) => p.fields.school.value }
  ),
  company: fields.text({ label: '회사' }),
  role: fields.text({ label: '직함' }),
  period: fields.text({ label: '재직 기간' }),
  summary: fields.text({ label: '경력 요약', multiline: true }),
  workProjects: fields.array(
    fields.object({
      name: fields.text({ label: '이름' }),
      tech: fields.text({ label: '기술' }),
      desc: fields.text({ label: '설명', multiline: true }),
    }),
    { label: '경력 프로젝트', itemLabel: (p) => p.fields.name.value }
  ),
  activities: fields.array(
    fields.object({
      name: fields.text({ label: '이름' }),
      detail: fields.text({ label: '설명', multiline: true }),
      period: fields.text({ label: '기간' }),
    }),
    { label: 'Activities', itemLabel: (p) => p.fields.name.value }
  ),
  skills: fields.array(
    fields.object({
      name: fields.text({ label: '이름' }),
      note: fields.text({ label: '부연' }),
    }),
    { label: 'Skills', itemLabel: (p) => p.fields.name.value }
  ),
  projects: fields.array(
    fields.object({
      name: fields.text({ label: '이름' }),
      desc: fields.text({ label: '설명' }),
      href: fields.text({ label: '링크 경로' }),
      status: fields.select({ label: '상태', options: [...statusOptions], defaultValue: 'wip' }),
    }),
    { label: 'Projects', itemLabel: (p) => p.fields.name.value }
  ),
  worksNote: fields.text({ label: 'works 안내 문구' }),
  coursework: fields.text({ label: '코스워크 한 줄', multiline: true }),
};

const useGitHub = !import.meta.env.DEV || import.meta.env.PUBLIC_KEYSTATIC_GITHUB;

export default config({
  storage: useGitHub
    ? { kind: 'github', repo: { owner: 'Qjins', name: 'qjins.com' } }
    : { kind: 'local' },
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
    ui: singleton({
      label: 'UI 문구 (홈·목록·공통)',
      path: 'src/data/ui',
      format: { data: 'json' },
      schema: {
        siteTitle: pair('브라우저 탭 제목'),
        siteDesc: pair('사이트 설명 (meta)'),
        introHtml: pair('홈 인사말 (HTML 허용)', true),
        servicesEmpty: pair('서비스 빈 상태 문구', true),
        worksDesc: pair('works 설명', true),
        notesDesc: pair('notes 설명', true),
        nowDesc: pair('now 설명'),
        aboutDesc: pair('about 설명'),
        aboutTeaser: pair('홈 about 티저 (HTML 허용)', true),
        aboutMore: pair('about 더 보기 링크'),
        blogDesc: pair('blog 설명', true),
        blogFail: pair('blog 실패 안내', true),
        lastUpdated: pair('마지막 수정 라벨'),
        pulseTitle: pair('펄스 제목'),
        pulseNoSignal: pair('펄스 무신호 문구'),
        koOnly: pair('한국어 원문 표시'),
      },
    }),
    aboutKo: singleton({
      label: 'About (한국어)',
      path: 'src/data/about.ko',
      format: { data: 'json' },
      schema: aboutSchema,
    }),
    aboutEn: singleton({
      label: 'About (English)',
      path: 'src/data/about.en',
      format: { data: 'json' },
      schema: aboutSchema,
    }),
    services: singleton({
      label: 'Services (홈 카드)',
      path: 'src/data/services',
      format: { data: 'json' },
      schema: {
        list: fields.array(
          fields.object({
            name: fields.text({ label: '이름' }),
            description: pair('설명', true),
            url: fields.url({ label: '서비스 URL' }),
            work: fields.text({ label: 'works 슬러그 (카드가 여기로 연결, 선택)' }),
            zone: fields.select({
              label: 'zone',
              options: [
                { label: 'app', value: 'app' },
                { label: 'lab', value: 'lab' },
                { label: 'api', value: 'api' },
              ],
              defaultValue: 'app',
            }),
            status: fields.select({ label: '상태', options: [...statusOptions], defaultValue: 'wip' }),
          }),
          { label: '서비스 목록', itemLabel: (p) => p.fields.name.value }
        ),
      },
    }),
  },
});
