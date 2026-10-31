# Architecture

This document describes the maintained source and generated static site. It does
not establish deployment. Historical design rationale is in the
[architecture decision](ARCHITECTURE-PROPOSAL.md); integration evidence is in the
[review record](P1-NEXT-STACK.md).

## Maintained sources and generated output

[`scripts/build.mjs`](../scripts/build.mjs) validates inputs and writes the committed
outputs below. [CONTRIBUTING](CONTRIBUTING.md#local-work) owns tool versions and commands.

| Maintained source | Responsibility / generated output |
| --- | --- |
| `content/policies.json` | `PIL` category metadata, `WHO` filter controls, `PL` policy records → overview HTML and `assets/js/policies.js` |
| `content/sources.json`, `src/sources.mjs` | Source registry validation and shared citation rendering → HTML registry and `POLICY_CITATIONS` |
| `content/site.json` | Production root → canonical, Open Graph, sharing configuration and crawler URLs |
| `content/publishing.json` | Explicit public-file inventory and excluded contributor paths → `_config.yml` |
| `src/index.template.html` | Page markup and build tokens → `index.html` |
| `src/site.css` | Styles → `assets/site.css` |
| `src/app.js` | Core browser behavior → `assets/js/app.js` |
| `src/optional.js` | Optional browser behavior → `assets/js/optional.js` |
| `src/calculator.mjs` | Proposal rates, provenance, limits and pure calculation → `assets/js/calculator.js`, rate tokens and initial total |

The generator also emits `robots.txt` and `sitemap.xml`. Images, local video and
the three preview pages are maintained public files, not generated outputs.
The manifest, rather than this map, is the exhaustive public-file list.

## Readable content and enhancement

All 23 policies, details and citations appear in initial HTML under unique
`policy-<id>` anchors and six native `six-<category>` targets. A single text H1
names 韓瑩. The overview remains visible if JavaScript is disabled or fails.

Category panels and persona cards use the same generated data and intentionally
repeat selected content without duplicating overview IDs. The defaults are `intl`
and `parent`. “All” selects the four exposed filters, matching 19 records rather
than all 23. `shop`, `clean` and `safe` remain unexposed legacy keys (#14).

`src/sources.mjs` renders the same citations for static and enhanced views. Source
publication, source review and complete policy review are separate fields; missing
evidence stays visible. Generation needs no network fetch and does not refresh dates.
See [CONTENT](CONTENT.md) for editorial maintenance.

## Runtime boundaries

Scripts load in order: generated policy/configuration data, calculator, core,
then optional code. Core owns categories, details, filters, comparison, calculator
rendering, sharing controls, theme, large text and deep links. Optional code owns
portrait effects, decorative letters, stamps, audio, roaming cat, canvas export
and the game. Core calls optional hooks with guards; a missing optional script or
unavailable Canvas leaves core content and controls usable. Canvas actions show a
visible failure message. Initial category fragments replay the stamp after optional
initialization. Optional features are not comprehensively isolated from one another.

The image dialog uses native modal inertness, focus containment and opener
restoration; asynchronous image generation keeps the newest result. Game keyboard
input is scoped to its native button. The calculator cancels obsolete animation
frames and announces settled totals through a dedicated live region.

`calculateBenefits(counts, months)` returns birth, nutrition, annual, total and
rise values, rejecting invalid inputs. [CONTENT](CONTENT.md#calculator-and-numerical-assumptions)
owns scenario meaning and rate maintenance; [CONTRIBUTING](CONTRIBUTING.md#browser-smoke-checks)
owns numerical regression checks.

## State and external resources

Filter/category/calculator state stays in memory. Large text uses localStorage
with exceptions handled. No analytics integration is installed; the
[analytics decision](ANALYTICS.md) records pending owner choices.

Fonts and Facebook players are external. Local video has native controls, a poster
and direct player fallback links. Alternate photos load on selection; the
[performance experiment](PERFORMANCE.md) records measured impact and remaining costs.
The countdown updates on load; election-specific maintenance is in
[CONTENT](CONTENT.md#election-copy-sharing-and-dates).

## Publishing and crawlers

The build classifies every tracked file as public, excluded or the generated
`_config.yml`, rejecting unknown paths. Legacy Jekyll excludes contributor sources,
docs, tooling and test outputs using that generated configuration. No `.nojekyll`
or Pages setting change is required. Local Python serving does not apply exclusions.

Robots permits crawling and the sitemap lists only the clean homepage. Preview
pages retain `noindex`, redirect to the homepage and provide fallback links; they
remain crawlable so their exclusion directive can be read. Category shares retain
`#six-*`; canonical metadata is not an HTTP redirect. See
[CRAWLABILITY](CRAWLABILITY.md) for HTTP and owner checks and
[CONTRIBUTING](CONTRIBUTING.md#release-and-rollback) for publication verification.
