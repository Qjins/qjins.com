---
title: Delay patterns in UK rail (dissertation)
summary: MSc Data Science dissertation on temporal patterns of delays, cancellations and service reliability in UK rail. In progress
date: 2026-03-22
status: wip
---

## Background

What passengers actually feel is not the average delay. It is the
reliability of their hour and their operator. The topic: what patterns do
UK rail delays and cancellations show across time of day, period and
train operating company, and how far can public data alone take that
question?

## Design

Built on ORR public statistics, layered in order: descriptive statistics,
temporal trend analysis, cross-operator comparison, then an interactive
dashboard. All in R. Deliberately no causal inference or forecasting from
the start. First pin down the questions public data can answer honestly
(describing and comparing patterns), then decide whether supplementary
data like weather earns its place on top.

## Trial and error

(In progress: a record of where I am currently stuck)
Too early to declare failures; two decisions are being wrestled with now.
One is the resolution of public delay data. How much can aggregate
statistics really say about time-of-day patterns? The other is whether to
join weather data: it enriches the story but risks growing past the scope
of one dissertation. This section gets its real trial and error when the
dissertation is done.

## Outcome

In progress. Target outputs: analysis code in R, a reproducible data
pipeline, and a dashboard for exploring reliability by operator and time.
The plan is to put that dashboard on this site's lab subdomain when it is
done.
