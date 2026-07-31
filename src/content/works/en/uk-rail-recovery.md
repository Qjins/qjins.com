---
title: The uneven recovery of UK rail
summary: What the national recovery of post-COVID rail demand hides at the regional and station level (IJC437, University of Sheffield)
date: 2026-07-27
status: archived
url: https://github.com/Qjins/IJC437-UK-Rail-Recovery
---

## Background

In 2025 the national passenger index for GB rail hit 100.8 (2019 = 100).
Read that number alone and the story ends with "back to pre-COVID
levels". But did it really come back? The question was whether one
national aggregate was hiding very different recoveries across 11 regions
and 2,554 stations.

## Design

Official ORR statistics only: regional passenger journeys (1996–2025),
the national series, and station-level usage estimates. On top of a
2019 = 100 index, I measured each region against a counterfactual, its
own 2010–2019 linear trend extended forward, because "back to 2019" and
"back on trajectory" are entirely different questions. Regions were
grouped with k-means (k = 2, chosen by silhouette width), all in R
(tidyverse, readODS, cluster). No forecasting models, deliberately: the
question was "how uneven is it now", not "what happens next". A companion
coursework (IJC445) turned the same material into a composite
visualisation.

## Trial and error

(Draft, inferred from repository traces; to be corrected with the real
story)
Government ODS files mix footnotes into data cells, so a large share of
the cleaning script went to stripping footnotes and validating
completeness rather than analysis. The first design judged recovery from
the national series alone, which ended the story at 100.8. Only after
splitting journeys into within-region (+6%) and inter-regional (−9.8%)
did the real question, the quality of the recovery, become askable. With
just 11 regions, k-means could not statistically justify anything finer
than k = 2.

## Outcome

The national index says recovered (100.8), but only 3 of 11 regions
exceed their 2019 level (North East +17.4, South West +6.7, London +5.1).
Against pre-pandemic trends the whole country sits 17.5% short, and only
43.1% of stations have recovered. Even London pairs an above-baseline
aggregate with a median station at 88.5, recovery concentrated in a few
big hubs (the Elizabeth line effect). The national average says recovery;
the distribution tells another story.
