---
title: Paper digest pipeline
summary: A pipeline that filters new arXiv papers by interest, summarizes them, and emails me a digest every morning
date: 2026-06-20
status: wip
---

## What was the problem

Subscribe to arXiv RSS and hundreds of papers pour in daily. I open the
three or four with catchy titles, then find out weeks later that I missed
the ones closest to my actual topic. The goal: filter by my interests,
summarize shorter than the abstract, one email every morning.

## What approach I took

A GitHub Actions cron scrapes the arXiv API daily, embedding similarity does
the first-pass filter, an LLM writes three-line summaries, and the result
goes out by email. The constraint was running entirely inside the Actions
free tier with no dedicated server. I dropped the vector-DB option — my
interest profile is a handful of documents, so brute-force cosine
similarity is plenty.

## What didn't work

Picking the similarity threshold is harder than it looks. Set it low and
thirty papers a day come through (so I stop reading); set it high and a
whole week passes with zero. Right now I've retreated to "top 5, always",
but the real fix is learning the threshold from read/ignore feedback.
That feedback loop needs persistent state, which shakes the "no server"
constraint. This is where I'm stuck, deliberately.

## How it turned out

Still in progress. The morning email arrives every day, and my felt hit
rate is 2 out of 5. The moment the feedback loop lands, this likely becomes
the first subdomain service on this site (app.qjins.com).
