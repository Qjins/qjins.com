/**
 * 홈 "오늘의 펄스" 데이터 생성기.
 * GitHub Actions가 매일 실행해 src/data/pulse.json을 갱신하고,
 * 커밋이 push되면 Cloudflare Pages가 자동으로 리빌드한다.
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │ 지금은 더미(랜덤워크) 데이터입니다.                              │
 * │ 실제 소스로 교체하려면 아래 generateValues()만 바꾸면 됩니다.     │
 * │ 예: GitHub API에서 최근 30일 커밋 수 가져오기                    │
 * │   const res = await fetch(                                   │
 * │     'https://api.github.com/search/commits?q=author:USER...' │
 * │   );                                                         │
 * │ label도 데이터 설명에 맞게 바꿔주세요.                           │
 * └─────────────────────────────────────────────────────────────┘
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const DAYS = 30;

function generateValues() {
  // ── 교체 지점: 여기서부터 ──
  const values = [];
  let v = 5;
  for (let i = 0; i < DAYS; i++) {
    v = Math.max(0, v + Math.round((Math.random() - 0.45) * 4));
    values.push(v);
  }
  return values;
  // ── 교체 지점: 여기까지 ──
}

const pulse = {
  updated: new Date().toISOString().slice(0, 10),
  label: `placeholder, last ${DAYS}d`, // 교체 예: 'commits, last 30d'
  values: generateValues(),
};

const out = fileURLToPath(new URL('../src/data/pulse.json', import.meta.url));
writeFileSync(out, JSON.stringify(pulse, null, 2) + '\n');
console.log(`pulse.json updated (${pulse.updated}):`, pulse.values.join(','));
