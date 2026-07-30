---
title: The base path gotcha in Astro's glob loader
date: 2026-07-30
---

In Astro 5 content collections, `glob({ base: './src/content/works' })`
is relative to the project root — not to where `src/content.config.ts`
lives. I lost twenty minutes here.

The symptom is that the collection is just silently empty — no error at
all. A wrong path yields zero entries without complaint, so when a
collection comes back empty, suspect `base` before you suspect the schema.
