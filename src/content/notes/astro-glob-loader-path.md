---
title: Astro glob 로더의 base 경로 함정
date: 2026-07-30
---

Astro 5 콘텐츠 컬렉션의 `glob({ base: './src/content/works' })`는
프로젝트 루트 기준 상대경로다. `src/content.config.ts` 파일 위치 기준이
아니다. 여기서 20분 날렸다.

증상은 "컬렉션이 그냥 빈 배열"이라 에러도 안 난다는 것.
경로가 틀려도 조용히 0건이니, 컬렉션이 비면 스키마보다 base부터 의심할 것.
