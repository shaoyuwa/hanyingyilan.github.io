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

## Aggregate review follow-up — 2026-11-01

The inclusive range `4259eda..1d5c4cc` received a fresh source review and an
independent read-only review. These covered maintained code against the original
embedded implementation, generation and publishing boundaries, calculator and
citation contracts, dialog behavior, HTTP checks, performance methodology and
tests. No substantive introduced code defects were identified. Existing lifecycle,
content-verification and optional-feature limitations remain in their owning guides
and issues; extraction of legacy code was not treated as new behavior.

All 16 tracked Markdown documents were reviewed. Consolidation in `1d5c4cc` assigns
one maintained home per topic and preserves dated evidence. This follow-up separates
the README's maintained guides from historical records and places documentation
maintenance in CONTRIBUTING. Runtime-version requirements now link to executable
configuration instead of maintaining a second version range in prose.

Fresh checks on the `1d5c4cc` product tree passed: `npm run check`, all 24 native
tests, all 21 Chromium tests, and the eight-path local HTTP checker (23 policies
and 11 sources on each homepage variant). The environment was macOS, Node 25.4.0
and npm 11.7.0 with locked Playwright dependencies. Subsequent edits in this review
are documentation only; their relative paths, heading anchors and whitespace were
checked before commit. Browser screenshots were generated by the suite; this
follow-up does not claim a separate manual visual audit.

Jekyll was unavailable in this environment, so its publication build was not rerun.
The earlier Jekyll result above remains evidence only for its recorded tree.
No fresh provider-price, factual-source, live-player, indexing, field-performance
or production-deployment verification was performed. Fork `main` already contains
the implementation history, so the aggregate PR into that branch contains the
documentation changes; the fixed inclusive review range above remains the code
review scope.

## Media organization follow-up — 2026-11-01

Review-scope correction — 2026-11-01: the aggregate review above assessed introduced
runtime defects but missed media naming and repository organization. Root-level
images named `p4.jpg` through `p14.jpg` and the abbreviated `v/pu.*` paths were
maintainability findings even though they predated the review range. The subsequent
media-layout cleanup moves these files into the
[public media layout](ARCHITECTURE.md#public-media-layout), updates active references,
and preserves historical reports. The earlier “no substantive introduced code
defects” result is not an endorsement of the original asset organization.

All 17 media files were moved without changing their bytes. Active templates,
preview metadata, browser code, the publication manifest and performance tooling
now reference the descriptive paths. The old root-level and `v/` media URLs are
retired by this change; there are no compatibility aliases. Direct links to those
assets need updating when this reaches production.

Fresh validation passed: generated-output checks, 24 native tests, 21 Chromium
tests (including loading and decoding all 12 alternate photos), and a Jekyll 3.10.0
safe build with exactly the 28 manifest files. All 17 media responses from that
local Jekyll output matched the originals byte-for-byte with correct MIME types;
the eight-path HTTP checker passed and local video metadata loaded in Chromium.
The desktop hero screenshot was inspected. The Jekyll installation was found in
temporary tooling outside PATH; this resolves the preceding follow-up's local
tool availability limitation, without establishing a hosted deployment.

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
