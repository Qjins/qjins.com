# qjins.com 작업 기록

사이트가 어떻게 지금 모습이 됐는지의 기록. 상세 이력은 git log 참조.

## 2026-07-30 — v1 구축과 배포 (하루에 전부)

### 디자인

- 새 아이콘 후보 4종(펄스 Q, 모스 Q, 산점도 q, 분포 q) → 탈출점 Q 계열 → 모깎이·넉아웃 갭 버전 →
  힉스필드(Recraft V4.1 vector) 구도 기반 재작도까지 갔다가 **전부 리젝, 원본 qj 리게처 로고로 확정**
- 팔레트는 원본 로고에서 파생: 페트롤(구조) · 코랄(신호) · 차콜(그림자 전용) · 종이. 다크모드 변형 포함
- 타이포: Pretendard Variable(본문) + IBM Plex Mono(데이터 보이스 — 날짜·라벨·숫자)
- 시그니처: "오늘의 펄스" — 로고와 같은 오프셋(판 어긋남) 스타일 파형, 푸터에 스파크라인 에코

### 사이트

- Astro 5 정적 사이트. 구조: 홈(펄스·about 티저·services·channels·recent) / works / notes / blog / now / about
- **works 4섹션 계약** — "무슨 문제였나 / 어떤 접근을 골랐나 / 뭐가 안 됐나 / 결국 어떻게 됐나".
  remark 플러그인이 섹션 누락 시 빌드를 실패시키고, 실패 섹션을 코랄 강조 박스로 래핑 (ko/en 각각)
- **한/영 이중 언어** — `/`=ko, `/en/`=en. 콘텐츠는 ko/·en/ 폴더, UI 문자열은 src/lib/i18n.ts,
  영어 번역 없는 글은 en 목록에 원문 노출
- **blog 탭** — 티스토리(qjin.tistory.com) RSS를 빌드 타임에 읽어 목록 생성. 매일 리빌드로 자동 최신화
- **about** — 구조화 페이지(Education/Experience/Activities/Skills/Projects/Channels), 라인 아이콘,
  카드 그리드, 채널 아이콘 칩. 데이터는 About.astro 안의 ko/en 객체
- 다크모드: prefers-color-scheme + 세션 한정 토글(localStorage 없음). JS는 토글 몇 줄이 전부

### 배포·자동화

- GitHub: https://github.com/Qjins/qjins.com (public) — gh CLI 인증
- Cloudflare Workers 정적 에셋 배포 (wrangler.jsonc, Worker 이름 `qjins`) → https://qjins.com
  push마다 자동 배포. workers.dev 임시 주소·프리뷰 URL은 설정으로 비활성화
- **펄스 파이프라인**: GitHub Actions가 매일 06:17 KST에 GraphQL 컨트리뷰션 캘린더를 읽어
  pulse.json 커밋 → push가 리빌드 트리거 → 사이트가 매일 갱신. 실패 시 기존 데이터 유지
- Web Analytics: Cloudflare RUM 자동 주입 (토큰·수동 스니펫 불필요, 수동 추가 시 이중 집계 주의)
- 파비콘: 원본 로고를 정사각 viewBox(658×658)로 재구성 — 비율 유지

### 콘텐츠

- works 3편: QRA(live) / 영국 철도 회복 분석(IJC437, archived) / 철도 지연 학위논문(wip)
  — QRA 실패 섹션은 저장소 HANDOFF.md의 실기록 기반
- 첫 서비스 등록: QRA (qra.qjins.com) — services.ts 배열에 항목 하나로 홈 카드 생성
- note 1편, now, about (프로필 상세는 docs/PROFILE.md — 로컬 전용)

### 기술 교훈

- 빌드 타임 파일 읽기는 `process.cwd()` 기준으로 — `import.meta.url` 상대경로는 번들 청크로 옮겨져 깨짐 (CI에서 발견)
- 마스크 기반 SVG는 Quick Look 등에서 안 먹힘 — 로고류는 순수 패스로 기하 계산
- 넉아웃 여백은 그림자 오프셋보다 넓어야 종이가 보임
- 티스토리 RSS는 이중 이스케이프 — 디코딩 2회 필요
- Astro dev 서버가 컴포넌트 통째 교체 후 스코프 스타일을 놓칠 수 있음 — 서버 재시작으로 해결,
  인라인 SVG는 크기 속성을 자체 보유하게 할 것
- Cloudflare 새 대시보드는 Git 연결을 Workers 경로로 안내 — wrangler.jsonc(assets)로 대응

### 남은 것

- works 철도 회복 편의 "뭐가 안 됐나" 초안 검토 (본인 확인 대기)
- eBook 캡처 도구·퍼즐 게임 등이 완성되면 works/services 추가
- 펄스 데이터 소스 교체·확장은 scripts/update-pulse.mjs의 교체 지점 주석 참조

## 2026-07-30 후속 (같은 날 저녁)

### 콘텐츠·문체
- 글쓰기 4칙 확정, 전면 적용: 섹션 제목을 배경/설계/시행착오/결과로 교체(빌드 계약 포함),
  긴 대시(—)·곱은따옴표(“”)·교훈 포장 클리셰 전량 제거
- 이후 사이트에 들어가는 모든 글은 반영 전 사용자 승인 필수
- 홈 강조: Qjin 코랄 볼드, "이것저것"은 works 링크, "딸깍 한 번" 코랄
- 홈 인사말·about 등 다수 카피를 사용자 취향으로 반복 다듬음 (가볍게, 담백하게)

### 기능
- 크롬 공룡: Chromium BSD 스프라이트(라이선스 동봉), 절반 크기·18초 주기,
  getPointAtLength로 펄스 파형 지형을 그대로 타고 이동, 딸깍 점프(잘림 해결)
- 사이트 전 텍스트 데이터화: ui.json / about.ko|en.json / services.json
  (코드에 하드코딩된 카피 없음)
- Keystatic CMS 로컬 모드: npm run cms → /keystatic.
  CMS 모드에서는 실제 페이지에 연필이 떠서 해당 편집 화면을 새 탭으로 연다.
  원래 탭이 미리보기 역할(저장 시 핫 리로드 자동 반영)
- 프로덕션 빌드에는 CMS·연필 코드가 전혀 포함되지 않음(검증 완료)

### 보안 요구 (사용자 지시, 필수)
CMS를 배포 버전(호스팅 모드)으로 확장할 때는 **반드시 본인 계정만 접근
가능한 로그인**을 먼저 구현한다. 인증 없는 호스팅 CMS 배포 금지.
권장 경로: Keystatic GitHub 모드(GitHub App, 저장소 쓰기 권한이 곧 접근 통제).
