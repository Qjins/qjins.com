---
title: Seoul air quality dashboard
summary: A static dashboard comparing fine-dust levels across Seoul districts over time, built on the city's open data API
date: 2026-03-15
status: archived
---

## What was the problem

Answering "is it okay to go outside right now?" took three taps in an app.
All I wanted was one thing — my neighborhood and the next one over, fine-dust
levels compared on a single screen over time. Existing apps show the current
number in huge type and bury the trend.

## What approach I took

Poll the Seoul open data API once an hour, bake the result into static JSON,
and have the client draw nothing but SVG charts from that JSON.
I considered running a server, but an always-on server for a service with
exactly one user was overkill — "static files plus periodic refresh" stays
inside the free tier. No chart library either: you don't need 30kB to draw
a few lines.

## What didn't work

Hour-by-hour comparison was the whole point, but the API only returns
"the most recent measurement". I started accumulating history myself, but
every time polling hiccupped it left holes, and a trend line drawn over
holes actively misleads. Three weeks in, while bolting on gap interpolation,
I admitted this had turned into a data engineering project, not a dashboard.

## How it turned out

I cut scope to "current value + 24 hours", shipped it, and used it happily
for two months. Long-term trends were sacrificed, but I earned the lesson
that polling-based collection is half missing-data design. The next
collection project starts with queues and retries.
