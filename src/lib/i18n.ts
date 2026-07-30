export type Lang = 'ko' | 'en';
export const LANGS: Lang[] = ['ko', 'en'];

const dict = {
  siteTitle: {
    ko: 'qjins — 데이터로 뭔가 만드는 1인 스튜디오',
    en: 'qjins — a one-person studio making things with data',
  },
  siteDesc: {
    ko: '데이터로 뭔가 만드는 1인 스튜디오',
    en: 'A one-person studio making things with data',
  },
  introHtml: {
    ko: '안녕하세요, 데이터로 뭔가 만드는 <strong class="name">Qjin</strong>입니다.<br />영국에서 데이터 사이언스를 공부하면서, 틈틈이 이것저것 만듭니다.',
    en: 'Hi, I\'m <strong class="name">Qjin</strong> — I make things with data.<br />I\'m studying data science in the UK and building things on the side.',
  },
  servicesEmpty: {
    ko: '아직 없음 — 첫 서비스가 lab에서 만들어지는 중입니다. 완성되면 여기에 걸립니다.',
    en: 'Nothing yet — the first service is brewing in the lab. It hangs here when it ships.',
  },
  worksDesc: {
    ko: '만든 것들. 스크린샷 갤러리가 아니라 의사결정 기록 — 뭐가 안 됐는지까지 적습니다.',
    en: "Things I've made. Decision records, not a screenshot gallery — including what didn't work.",
  },
  notesDesc: {
    ko: '짧은 기록. 삽질 로그, 라이브러리 함정, 3줄 메모.',
    en: 'Short notes. Debugging logs, library gotchas, three-line memos.',
  },
  nowDesc: { ko: '요즘 하는 일', en: 'What I am up to now' },
  aboutDesc: { ko: '만드는 사람 소개', en: 'About the person behind the studio' },
  aboutTeaser: {
    ko: '수백만 건의 도서관 데이터를 정리하던 개발자, 지금은 영국 철도가 왜 늦는지 데이터로 따져보고 있습니다.',
    en: 'Four years taming millions of library records; now digging into why UK trains run late.',
  },
  aboutMore: { ko: '자세한 소개', en: 'more about me' },
  blogDesc: {
    ko: '티스토리(괴발일기)에 쓰는 글. 제목을 누르면 원문으로 이동합니다.',
    en: 'Posts from my Tistory blog, written in Korean. Titles link to the original.',
  },
  blogFail: {
    ko: '목록을 불러오지 못했습니다. 티스토리에서 직접 볼 수 있습니다:',
    en: "Couldn't load the feed. You can read directly on Tistory:",
  },
  lastUpdated: { ko: '마지막 수정', en: 'last updated' },
  pulseTitle: { ko: '오늘의 펄스', en: "Today's pulse" },
  pulseNoSignal: { ko: 'NO SIGNAL · pulse.json 없음', en: 'NO SIGNAL · missing pulse.json' },
  koOnly: { ko: '', en: 'ko' },
} as const;

export type StringKey = keyof typeof dict;
export const t = (lang: Lang, key: StringKey): string => dict[key][lang];

/** 해당 로케일의 경로. ko는 그대로, en은 /en 접두 */
export const localePath = (lang: Lang, path: string): string =>
  lang === 'ko' ? path : path === '/' ? '/en/' : `/en${path}`;

/** 현재 경로를 반대 로케일 경로로 */
export function switchPath(path: string): string {
  if (path.startsWith('/en/') || path === '/en') return path.replace(/^\/en\/?/, '/') || '/';
  return path === '/' ? '/en/' : `/en${path}`;
}

export const langOfPath = (path: string): Lang => (path === '/en' || path.startsWith('/en/') ? 'en' : 'ko');
