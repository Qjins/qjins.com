# qjins.com

데이터로 뭔가 만드는 1인 스튜디오의 허브. Astro 정적 사이트, Cloudflare Pages 배포.

```bash
npm install     # 의존성 설치
npm run dev     # 개발 서버 (localhost:4321)
npm run build   # dist/ 에 정적 빌드
```

## 언어 구조 (한/영)

- URL: `/`(한국어) · `/en/`(영어). 헤더의 EN/KO로 전환.
- 콘텐츠는 로케일 폴더로 나뉜다: `works/ko/`, `works/en/`, `notes/ko/`, `notes/en/`, `now/ko.md`, `now/en.md`
- **번역은 선택.** 한국어로만 쓰면 영어 목록에도 그 글이 그대로 노출된다(`· ko` 표시).
  영어 번역을 추가하려면 `en/` 폴더에 **같은 파일명**으로 만들면 자동으로 교체된다.
- UI 문자열은 `src/lib/i18n.ts` 한 곳에서 관리.

## 새 프로젝트(works) 추가하는 법

`src/content/works/ko/` 에 md 파일 하나를 만들면 끝. (영어 번역은 `en/`에 같은 파일명)

```markdown
---
title: 프로젝트 이름
summary: 한 줄 요약
date: 2026-08-01
status: wip        # live | wip | archived
url: https://...   # 선택
---

## 무슨 문제였나
## 어떤 접근을 골랐나
## 뭐가 안 됐나
## 결국 어떻게 됐나
```

**네 개의 H2 섹션은 계약입니다.** 하나라도 빠지면(특히 "뭐가 안 됐나")
빌드가 실패합니다. 영어 문서는 `What was the problem / What approach I took /
What didn't work / How it turned out` 네 섹션. 검증: `src/lib/remark-works-contract.mjs`.

## 새 노트 추가하는 법

`src/content/notes/ko/` 에 md 파일 하나. frontmatter는 `title`, `date` 두 개면 끝.
`/now` 페이지는 `src/content/now/ko.md`(영어는 `en.md`)를 수정하면 되고,
마지막 수정 날짜는 git 이력에서 자동으로 읽습니다.

## 서비스 목록에 항목 추가하는 법

`src/config/services.ts` 의 배열에 항목 하나를 추가하면 홈에 카드가 생깁니다.

```ts
{ name: 'pulse', description: '…', url: 'https://pulse.qjins.com', zone: 'app', status: 'live' }
```

서브도메인 규칙: `app.`(실서비스) / `lab.`(실험·데모) / `api.`(공용 API).

## 홈 시각화(펄스)의 데이터 소스 교체하는 법

- 데이터: `src/data/pulse.json` — `{ updated, label, values: number[] }`
- 생성기: `scripts/update-pulse.mjs` — 파일 안의 **"교체 지점"** 주석 블록에서
  `generateValues()`를 실제 소스(GitHub API 등)로 바꾸면 됩니다.
- 갱신: `.github/workflows/pulse.yml` 이 매일 06:17 KST에 실행해 커밋 →
  push가 Cloudflare Pages 리빌드를 트리거 → 사이트가 매일 새 파형으로 갱신.
- `pulse.json` 이 없거나 깨져도 홈은 죽지 않고 `NO SIGNAL` 플랫 라인을 그립니다
  (`src/lib/pulse.ts` 의 fallback).

## Cloudflare 배포 설정

새 대시보드는 Git 연결 시 **Workers** 경로("Create a Worker")로 안내한다.
`wrangler.jsonc` 가 있어서 그대로 진행하면 된다:

1. Cloudflare 대시보드 → Workers & Pages → Create → 저장소 `Qjins/qjins.com` 연결
2. Project name: `qjins` (wrangler.jsonc의 name과 일치해야 함)
3. Build command: `npm run build` / Deploy command: `npx wrangler deploy` (기본값)
4. 이후 `git push` 할 때마다 자동 배포

구형 **Pages** 경로로 만들 경우: Framework preset **Astro**,
build `npm run build`, output `dist`. (이때 wrangler.jsonc는 무시됨)

Web Analytics(쿠키 없음)는 **자동 주입**으로 켜져 있다
(대시보드 > Web Analytics > qjins.com > RUM "Enable").
HTML에 수동 스니펫을 추가하면 이중 집계되니 넣지 말 것.

## 커스텀 도메인 연결 절차

1. Worker(또는 Pages 프로젝트) → Settings → Domains & Routes → Custom domain → `qjins.com` 추가 (`www`도 원하면 함께)
2. 도메인 네임서버가 Cloudflare면 CNAME 레코드가 자동 생성됨 —
   아니면 안내되는 CNAME(`<project>.pages.dev`)을 DNS에 직접 추가
3. SSL은 자동 발급. 전파까지 보통 몇 분
4. 서브도메인 서비스를 붙일 땐 각 서비스에서 `app.qjins.com` 등을
   같은 방식으로 Custom domain으로 추가하면 됨
