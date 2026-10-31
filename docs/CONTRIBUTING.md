# Development, validation, and release

## Local work

Inspect `git status`, preserve unrelated work and use a review branch. To preview
committed static output, only Python 3 is needed:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open <http://127.0.0.1:8000/>; stop with Ctrl-C. Use HTTP instead of `file://`.
This server exposes repository files and does not apply Pages exclusions.

For source development, use the Node.js range in [`package.json`](../package.json)
(currently 22.22+ within 22.x, or 24.8+). CI uses Node 22. Install the locked
development dependencies and generate output:

```sh
npm ci
npm run build
```

Edit the [maintained sources](ARCHITECTURE.md#maintained-sources-and-generated-output)
and commit generated files with their inputs. Production needs no Node runtime.
Pinned Playwright and HTML-validate are development-only dependencies.

## Validation by change type

For every change, inspect the diff and run `git diff --check`.

| Change | Required validation |
| --- | --- |
| Documentation only | Resolve relative links and heading anchors; verify referenced files, symbols, commands and claims against source; preserve historical scope/dates |
| Data, markup, styles, scripts or generation | Run freshness/native checks below and the browser checks relevant to the diff |
| Calculator | Also check zero/default/maximum, individual age groups, month boundaries, invalid inputs and rapid updates |
| URLs, crawler or publishing configuration | Also follow [HTTP checks](CRAWLABILITY.md#reproducible-checks) and the release-output checks below |
| Performance | Use the conditions and reproduction procedure in [PERFORMANCE](PERFORMANCE.md#reproduce) |

Do not install a test framework solely for prose. For implementation changes:

```sh
npm run check
npm test
npx playwright install chromium
npm run test:e2e
```

Freshness checks reject stale output. Native tests cover data/source validation,
HTML nesting, script syntax, unique IDs, resources/fragments, URLs, publishing,
numerical boundaries and HTTP-content assertions. Negative tests use temporary
fixtures, including stale generated files; repeated generation checks determinism.
The browser suite starts its own Python server. CI runs freshness, native tests
and Chromium checks through [the workflow](../.github/workflows/check.yml).

## Browser smoke checks

Run checks relevant to the diff; record revision, browser/device, failures and
unperformed checks. External fonts/players need network access; test core behavior
with them blocked as well as live media where available.

| Area | Check |
| --- | --- |
| Startup/failure | Heading and complete overview remain readable with no JS, core/data blocked, optional script blocked or Canvas unavailable; normal startup has no uncaught application errors |
| Categories/details | All six open; details expand/collapse; direct `#six-welfare` and initial stamp work |
| Filters | Multi-select, clear and select-all match [documented semantics](ARCHITECTURE.md#readable-content-and-enhancement) |
| Calculator | Default 95,200; all zero 0; maximum 723,200; months 0/24; counts stay within limits; rapid updates settle on the last result and announcement |
| Comparison | Three stops and both states show matching text and graphic |
| Sharing | Clipboard success/failure, LINE URL, image dialog, latest asynchronous image, save and unsupported-share fallback |
| Accessibility | Keyboard names/focus, modal containment/close/return, skip navigation, large text, theme and reduced motion |
| Responsive | 320px, common mobile width, desktop and native 200% browser zoom |
| Media | Photos load on selection, local video/poster and embedded-player fallback links |
| Optional features | Game open/close/restart; game input does not intercept unrelated controls |

Calculator totals are regression expectations for the proposal model, not benefit
advice. Recalculate them when reviewed source assumptions change. Chromium tests
include CSS zoom; this does not replace native browser zoom, actual screen readers
or other-engine checks. Historical coverage and unperformed checks belong in the
[review record](P1-NEXT-STACK.md), not an assertion that every release passed.

## Release and rollback

1. Review the exact diff and relevant evidence. Keep factual changes, documentation
   and broad refactors easy to assess separately. Commit to the review branch and
   record the revision and checks actually run.
2. Integrate through the maintainers' review process. The observed production Pages
   source is `main:/`; merging upstream there may publish. Fork merge status is not
   deployment evidence. Do not change Pages settings incidentally.
3. For publishing changes, compare a Pages-compatible Jekyll build's `_site` file
   set with `content/publishing.json`. Check excluded source/docs and all public
   assets. The manifest must classify new tracked files; Python serving cannot
   verify Jekyll exclusions. Record the Jekyll/Ruby versions and any unavailable check.
4. Check the actual Pages build/deployment, then live status codes, assets, fragment
   links, metadata and crawler output. Fetch an excluded source/doc path and an
   unknown path as well as `/`, `/index.html`, query variants and previews. Preview
   `noindex` must remain crawlable. Record release time separately from factual review.
5. Have the authorized owner complete [Search Console](SEARCH-CONSOLE.md) and any
   relevant [crawler-service observations](CRAWLABILITY.md#owner-and-observation-work-still-pending).
   Source checks do not establish Google-selected canonical or indexing.
6. Roll back by reverting the offending commit through the same review/release
   process and verifying the resulting deployment. Do not rewrite shared history
   or assume a local reset changes the live site.

Maintainer roles, media permissions and post-election ownership remain tracked in
[#16](https://github.com/Hanyingyilan/hanyingyilan.github.io/issues/16).
