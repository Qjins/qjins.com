---
title: Delay patterns in UK rail (dissertation)
summary: MSc Data Science dissertation on temporal patterns of delays, cancellations and service reliability in UK rail — in progress
date: 2026-03-22
status: wip
---

## What was the problem

What passengers actually feel is not the average delay — it's the
reliability of their hour, their operator. The topic: what patterns do UK
rail delays and cancellations show across time of day, period and train
operating company, and how far can public data alone take that question?

## What approach I took

Built on ORR public statistics, layered in order: descriptive statistics →
temporal trend analysis → cross-operator comparison → an interactive
dashboard. All in R. Deliberately no causal inference or forecasting from
the start — first pin down the questions public data can answer honestly
(describing and comparing patterns), then decide whether supplementary data
like weather earns its place on top.

## What didn't work

(In progress — a record of where I'm currently stuck)
Too early to declare failures; two decisions are being wrestled with now.
One is the resolution of public delay data — how much can aggregate
statistics really say about time-of-day patterns? The other is whether to
join weather data: it enriches the story but risks growing past the scope
of one dissertation. This section gets its real failure stories when the
dissertation is done.

## How it turned out

In progress. Target outputs: analysis code in R, a reproducible data
pipeline, and a dashboard for exploring reliability by operator and time.
The plan is to put that dashboard on this site's lab subdomain when it's
done.
