# Integrated review record — 2026-11-01

## Review range

Branch `review/from-8248237` starts from fork `main` at
`77b4962f216ad123d18dce04e3d810bc76091d72` and adds documentation consolidation.
Review against `4259eda6c524b90da846c3acb0ab957642ddd427`, the parent of
`8248237eecb096084131e62900fa3953274b74d6`, to include that first documentation
commit and every subsequent integrated change:

```sh
git log --oneline 8248237^..review/from-8248237
git diff 8248237^...review/from-8248237
```

Comparing against fork `main` would show only this documentation cleanup. Upstream
`origin/main` matched the parent above when checked on 2026-11-01; the fixed SHA
keeps the review range stable if upstream later moves. This branch preserves the
existing commits and merge history.

## First stack: fork PRs #1–#7

The original documentation, architecture and five implementation tickets merged
into `561223cfede2b2739cac52aacf39ad34f01b5220`. The
[original implementation record](P1-IMPLEMENTATION.md) owns that stack's commit
map and evidence.

## Second stack: fork PRs #8–#13

All six PRs below merged into fork `main`, ending at `77b4962`. These are fork
integration results, not proof of upstream deployment or issue acceptance.

| Upstream issue | Fork PR | Result |
| --- | --- | --- |
| #8 Sources | [#8](https://github.com/shaoyuwa/hanyingyilan.github.io/pull/8) | 23 policies reference 11 sources; proposal status, dates and verification limits are visible without JavaScript |
| #13 Accessibility | [#9](https://github.com/shaoyuwa/hanyingyilan.github.io/pull/9) | Native modal containment/restoration, skip link, scoped game keyboard handling and focus checks |
| #5 Performance | [#10](https://github.com/shaoyuwa/hanyingyilan.github.io/pull/10) | Removed 12 eager alternate-image requests; measured approximately 1 MB less initial transfer in controlled local runs |
| #3 Search Console | [#11](https://github.com/shaoyuwa/hanyingyilan.github.io/pull/11) | Authorized property list inspected; target access unavailable; owner verification and measurement handoff prepared |
| #17 Analytics | [#12](https://github.com/shaoyuwa/hanyingyilan.github.io/pull/12) | Dated provider comparison and removal plan; account/configuration selection and deployment pending |
| #18 Crawlability | [#13](https://github.com/shaoyuwa/hanyingyilan.github.io/pull/13) | Non-JavaScript HTTP checker and official crawler guidance; existing crawler policy preserved |

## Recorded verification

Integrated implementation commit: `4bf55880148326e400ce0d833324bb8e9f439a4a`.
The following checks were recorded on that implementation tree before fork
merge commits and this documentation cleanup; they were not rerun by editing docs:

- Generated-output freshness, content/HTML validation, public-script syntax and
  whitespace checks passed; 24 Node tests and 21 Chromium Playwright tests passed.
- Eight local HTTP paths returned 200; root/index/query each contained all 23
  policies and 11 sources. Preview noindex and production canonical were retained.
- Jekyll 3.10.0 safe build produced exactly the 28 publishing-manifest files,
  excluding sources and contributor documents. This is local compatibility
  evidence, not an assertion about a hosted Pages build or deployment.
- Browser checks covered no JavaScript/blocked scripts, source citations,
  categories, filters, details, deep links, stamps, calculator boundaries/rapid
  updates, sharing fallbacks, comparison/media/game interactions, unavailable
  canvas/storage, reduced motion, keyboard use, themes, large text, mobile/desktop
  layouts and CSS zoom. Screenshots were inspected, including the 320px dark,
  large-text dialog. Native browser zoom, actual screen readers and other browser
  engines remain untested.
- Versions: Node 25.4.0, npm 11.7.0, Playwright 1.64.1, Chromium 156.0.8078.4,
  Ruby 4.0.7, Jekyll 3.10.0.

Independent review found two issues: two remaining undated view counts and an
asynchronous dialog replacement race. Both were fixed on their earliest affected
branches and merged forward without force pushes. The dialog regression failed
before the fix and passed afterward; follow-up review found no remaining important
issues. Performance timings are noisy shared-workstation measurements, not field
Core Web Vitals or Lighthouse scores; see [PERFORMANCE.md](PERFORMANCE.md).

## Remaining owner acceptance

External acceptance remains pending: complete factual source verification,
production deployment, target Search Console/Bing access and indexing inspection,
owner-selected analytics account/public configuration, live third-party media and
field performance. No tracking code or invented verification tokens were added.
See [CONTENT.md](CONTENT.md), [SEARCH-CONSOLE.md](SEARCH-CONSOLE.md),
[ANALYTICS.md](ANALYTICS.md) and [CRAWLABILITY.md](CRAWLABILITY.md).

## Branch cleanup

On 2026-11-01, six local second-stack branches and thirteen fork remote branches
(seven `integrate/*` and six second-stack branches) were deleted after confirming
their tips were ancestors of fork `main` and their fork PRs were merged. Their
commits remain reachable through the merged history.

Seven fork branches still back open upstream PRs #21–#27 and were retained:
`docs/repository-guide-seo-audit`, `arch/p1-proposal`, `p1/11-validation-build`,
`p1/01-static-content`, `p1/02-canonical`, `p1/04-crawlers`, `p1/12-calculator`.
Their upstream reviews remain separate from the new aggregate review branch.
Neither remote's `main` nor Pages settings were changed by cleanup.
