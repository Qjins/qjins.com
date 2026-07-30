/** 인라인 SVG 아이콘 — 외부 의존성 없음. 크기는 SVG 속성에 내장. */
const S = 'width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';

export const icons: Record<string, string> = {
  user: `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5"/></svg>`,
  services: `<svg viewBox="0 0 24 24" ${S}><path d="M12 2 21 7v10l-9 5-9-5V7Z"/><path d="M3 7l9 5 9-5M12 12v10"/></svg>`,
  recent: `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  education: `<svg viewBox="0 0 24 24" ${S}><path d="M12 4 2.5 8.5 12 13l9.5-4.5Z"/><path d="M6 10.8V16c0 0 2.4 2 6 2s6-2 6-2v-5.2"/><path d="M21.5 8.5V14"/></svg>`,
  experience: `<svg viewBox="0 0 24 24" ${S}><rect x="3" y="8" width="18" height="11" rx="2"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>`,
  activities: `<svg viewBox="0 0 24 24" ${S}><path d="M5 21V4"/><path d="M5 5h11l-2.5 3.5L16 12H5"/></svg>`,
  skills: `<svg viewBox="0 0 24 24" ${S}><path d="M4 7h16M4 12h16M4 17h16"/><circle cx="14" cy="7" r="2.2" fill="var(--paper)"/><circle cx="8" cy="12" r="2.2" fill="var(--paper)"/><circle cx="16" cy="17" r="2.2" fill="var(--paper)"/></svg>`,
  projects: `<svg viewBox="0 0 24 24" ${S}><path d="M3 8a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>`,
  channels: `<svg viewBox="0 0 24 24" ${S}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  github: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path fill-rule="evenodd" d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>`,
  blog: `<svg viewBox="0 0 24 24" ${S}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" ${S}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
};

/** 채널 링크 — 홈과 about이 공유 */
export const channelLinks = [
  { label: 'GitHub', href: 'https://github.com/Qjins', icon: 'github' },
  { label: 'Blog', href: 'https://qjin.tistory.com', icon: 'blog' },
  { label: 'Mail', href: 'mailto:qjink126@gmail.com', icon: 'mail' },
];
