# Original P1 implementation record — 2026-11-01

Historical scope: the first five implementation tickets and fork PRs #1–#7,
ending at `561223c`. This is evidence about those revisions, not current setup
instructions or current branch status. The [integrated review](P1-NEXT-STACK.md)
owns the later stack and inclusive review range; [CONTRIBUTING](CONTRIBUTING.md)
owns repeatable validation procedures.

## Original implementation points

| Source issue | Original branch | Parent branch | Implementation commit | Result at that stage |
| --- | --- | --- | --- | --- |
| #11 | `p1/11-validation-build` | `arch/p1-proposal` | `cf17633` | Deterministic build, CI and negative validation |
| #1 | `p1/01-static-content` | `p1/11-validation-build` | `6d09a47` | Complete initial overview and independent optional script |
| #2 | `p1/02-canonical` | `p1/01-static-content` | `3c32f92` | Shared canonical/Open Graph/sharing root |
| #4 | `p1/04-crawlers` | `p1/02-canonical` | `db463da` | Crawler artifacts, public manifest and Pages exclusions |
| #12 | `p1/12-calculator` | `p1/04-crawlers` | `852fb79` | Shared proposal rates, pure calculation and settled results |

Architecture clarification `77556cd` preceded #1. Final review fixes accumulated
at `d0a784c`; the original branch tips alone were not independent final-acceptance
snapshots. [The architecture decision](ARCHITECTURE-PROPOSAL.md) records the tradeoffs.

## First local validation

Recorded environment: macOS, Node 25.4.0, Playwright 1.64.1 Chromium. Freshness,
native tests and whitespace checks passed; the integrated browser suite passed
14 tests in 24.6 seconds. Checks covered content parity, HTML/script validation,
resources/fragments, publishing classification, deterministic generation and
negative fixtures in temporary copies.

Browser coverage included core/optional/Canvas failure, categories and fragments,
filters, calculator boundaries and rapid updates, comparison, sharing fallbacks,
theme/text sizing, media/game controls, blocked storage/third parties, mobile and
desktop layouts and CSS zoom. Screenshots stayed in ignored local test output.
These checks did not independently verify political claims or external services.

At this stage Jekyll was unavailable and #13 modal/game accessibility gaps remained.
Those limitations were subsequently addressed in the integration below and the
[later review stack](P1-NEXT-STACK.md#second-stack-fork-prs-813), respectively.
Real screen readers, native browser zoom and other engines were not checked.
Earlier source inspections are preserved once in [CONTENT](CONTENT.md#historical-source-inspections--2026-11-01).

## Fork integration verification

The original range `4259eda..d0a784c` received independent review with no substantive
blocker. Integration backported HTML validation and temporary freshness fixtures to
#11, plus Canvas fallback, deep-link stamps and H1 specificity to #1. It escaped a
literal `<` found by the stricter validator and removed extracted-script EOF
whitespace. The initial deep-link stamp failed at 0/6, then passed at 1/6 after repair.
No upstream review comments or threads existed when checked during that integration.

Pre-merge integrated code `f85aa0d` had the same product tree as `d0a784c` except EOF
whitespace. On macOS with Node 25.4.0, npm 11.7.0, Playwright 1.64.1 and Chromium
156.0.8078.4, 19 native and 14 browser tests passed. Earlier stage counts were #11:
10/6, #1: 11/11, #2: 13/12 and #4: 15/12 (native/browser). Freshness, syntax,
content, numerical boundaries and commit-range whitespace were checked.

A local Jekyll 3.10.0 `build --safe` with Ruby 4.0.7 then produced exactly the 28
manifest paths, with no contributor/source files. This resolved the earlier local
tooling gap, not hosted Pages acceptance; platform and plugins can differ.

Fork PRs #1–#7 merged in order into `561223cfede2b2739cac52aacf39ad34f01b5220`.
Integration preserved the production canonical and Pages settings. Implementation,
fork merge, production deployment and owner acceptance remain separate events.
