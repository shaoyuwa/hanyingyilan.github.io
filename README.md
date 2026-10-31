# 韓瑩政見一覽

A Traditional Chinese (`zh-Hant`) policy information site for the 2026 宜蘭市長
election, published at [hanyingyilan.github.io](https://hanyingyilan.github.io/).
The page identifies its publisher as 韓瑩市長候選人辦公室. It presents six policy
categories, filtering, a cleaning-service comparison, a proposal benefit
calculator, videos, citations and optional interactive features.

Production serves committed static files. Development uses a Node.js generator;
see [local preview and development commands](docs/CONTRIBUTING.md#local-work).
Edit maintained sources, then regenerate their public outputs.

## Documentation map

Each topic has one maintained home. Other documents link to it instead of copying
its instructions, values or status. Dated evidence describes its recorded revision,
not necessarily the current checkout or deployed site.

| Document | Owns |
| --- | --- |
| [Architecture](docs/ARCHITECTURE.md) | Source/output map, runtime boundaries and publishing design |
| [Principles](docs/PRINCIPLES.md) | Engineering and editorial decision rules |
| [Content](docs/CONTENT.md) | Policy/source/rate/media maintenance and factual-review limits |
| [Contributing](docs/CONTRIBUTING.md) | Setup, validation, release and rollback procedures |
| [Roadmap](docs/ROADMAP.md) | Issue inventory, priorities and dependencies; issues own acceptance/status |
| [Search Console](docs/SEARCH-CONSOLE.md) | Owner access, verification and search-measurement handoff |
| [Analytics](docs/ANALYTICS.md) | Dated provider comparison, collection requirements and shutdown procedure |
| [Crawlability](docs/CRAWLABILITY.md) | HTTP coverage checker, crawler controls and AI-search observation handoff |
| [Performance](docs/PERFORMANCE.md) | Reproducible experiment, raw reports and measurement limits |
| [Integrated review](docs/P1-NEXT-STACK.md) | Inclusive review range, merged fork stack and recorded integration evidence |
| [Original implementation](docs/P1-IMPLEMENTATION.md) | First P1 stack's commits and historical validation |
| [Architecture decision](docs/ARCHITECTURE-PROPOSAL.md) | Original alternatives, decision and deferred contracts |
| [Original plan](docs/superpowers/plans/2026-11-01-p1-stack.md) | Historical five-ticket sequence and outcome links |
| [SEO audit](docs/SEO-AUDIT.md) | Evidence from baseline `4259eda`, inspected 2026-11-01 |
| [Agent guidance](AGENTS.md) | Automated-contributor entry point and execution rules |

Start with Architecture and Principles; use the task-specific guide next. Keep
current instructions separate from historical evidence when updating documents.

## Repository and deployment

Maintained code/data live in `src/` and `content/`; generated output is committed at
the root and under `assets/`. Images and `v/` contain public media. The
[architecture map](docs/ARCHITECTURE.md#maintained-sources-and-generated-output)
identifies each source and its output.

The production Pages source was observed as legacy `main:/` on 2026-11-01.
Fork integration does not establish upstream deployment. Review progress and
remaining owner acceptance are recorded in the
[integrated review](docs/P1-NEXT-STACK.md); follow the
[release procedure](docs/CONTRIBUTING.md#release-and-rollback) before publishing.
