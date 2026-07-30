/**
 * 홈 "오늘의 펄스" 데이터 생성기 — GitHub 최근 30일 일별 활동(잔디) 수.
 * GitHub Actions가 매일 실행해 src/data/pulse.json을 갱신하고,
 * 커밋이 push되면 Cloudflare가 자동으로 리빌드한다.
 *
 * 데이터 소스: GitHub GraphQL contributionsCollection (프로필 잔디와 동일).
 * 인증: GITHUB_TOKEN 환경변수 (Actions에서는 기본 제공, 로컬에서는
 *       `GITHUB_TOKEN=$(gh auth token) npm run pulse` 로 실행).
 * 실패 시: pulse.json을 건드리지 않고 exit 1 — 사이트는 어제 데이터를 유지한다.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const LOGIN = 'Qjins';
const DAYS = 30;

async function fetchDailyContributions() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN이 없습니다. 로컬: GITHUB_TOKEN=$(gh auth token) npm run pulse');

  const to = new Date();
  const from = new Date(to.getTime() - (DAYS + 1) * 86400000);
  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar { weeks { contributionDays { date contributionCount } } }
        }
      }
    }`;

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      authorization: `bearer ${token}`,
      'content-type': 'application/json',
      'user-agent': 'qjins-pulse',
    },
    body: JSON.stringify({ query, variables: { login: LOGIN, from: from.toISOString(), to: to.toISOString() } }),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(`GraphQL: ${JSON.stringify(json.errors)}`);

  const days = json.data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap((w) => w.contributionDays)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-DAYS);
  return days.map((d) => d.contributionCount);
}

try {
  const pulse = {
    updated: new Date().toISOString().slice(0, 10),
    label: `github contributions, last ${DAYS}d`,
    values: await fetchDailyContributions(),
  };
  const out = fileURLToPath(new URL('../src/data/pulse.json', import.meta.url));
  writeFileSync(out, JSON.stringify(pulse, null, 2) + '\n');
  console.log(`pulse.json updated (${pulse.updated}):`, pulse.values.join(','));
} catch (err) {
  console.error('pulse 갱신 실패 — 기존 pulse.json 유지:', err.message);
  process.exit(1);
}
