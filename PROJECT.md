# Project: Swarm Public Site Copy v2 Rewrite

## Architecture
- **Framework**: React 19 SPA with TypeScript, Tailwind CSS, Lucide icons, and HashRouter in `src/App.tsx`.
- **Data Layer**: Static TypeScript data files in `src/data/` (`strategyDocs.ts`, `devpostCriteria.ts`, `blogArticles.ts`, `grantsData.ts`, `affiliatesData.ts`, `marketplaceData.ts`, `swarm_portfolio.json`).
- **Presentation Layer**: Page components in `src/pages/` and feature/layout components in `src/components/`.
- **Test Infrastructure**: Vitest v2.0.5, React Testing Library v16.0.0, JSDOM, 13 test suites (141 tests).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | V2 Core Value Prop & Hero Copy | Plain-English headline ("Replace your $150k dev team for a fraction of the cost") & ROI subtitle across Pitch & Strategy | M1, M2 | Survey / B2B_Landing_Page_Copy_v2.md |
| 2 | Strategy Data & 5 Raw V2 Markdown Docs | Ingestion of 5 verbatim v2 documents into `strategyDocs.ts` + 6-slide VC deck + 4-phase roadmap + $50k XLM SCF grant | M1 | Survey / 5 V2 Artifacts |
| 3 | Devpost Criteria & Architecture Nexus Plain Copy | Plain-English layer titles ("The AI Brain", "Task Gateway", "Shared Memory", "Secure Sandbox", "Quality Auditor") and ROI scoring | M1, M2 | Survey / spec_miner_survey_1 |
| 4 | Blog Articles ROI Reorientation | Dispatches updated with focus on production speed, zero-mock reliability, and cost reduction | M1, M3 | Survey / blogArticles.ts |
| 5 | Marketplace & Affiliates Data Rewrite | Micro-service descriptions and affiliate partner benefits centered on 90% client cost savings and recurring commissions | M1, M3 | Survey / marketplaceData.ts, affiliatesData.ts |
| 6 | Pitch Page & Sub-components Copy Rewrite | Hero, Economic Arbitrage banner, live benchmarks, terminal simulator, and bonus projector updated with v2 copy | M2 | Survey / PitchPage.tsx & pitch/* |
| 7 | Strategy Page & Viewer Components Copy Rewrite | Telemetry ribbon, B2B pricing tiers, VCDeckViewer, RoadmapTimeline, SCFGrantView, BusinessPlanView updated | M2 | Survey / StrategyPage.tsx & strategy/* |
| 8 | Blog, Grants, Affiliates, Marketplace, Portfolio Page Copy | Page headers, subtitles, card descriptions updated with plain-English ROI copy while keeping all data mappings intact | M3 | Survey / src/pages/* |
| 9 | Cryptographic Address & Data Invariant Preservation | Retain official EVM (`0xF46C9F6d...`) & Stellar (`GCL6OXAMLD...`) addresses and 42-repo / 195+ PR portfolio mappings | M1, M2, M3 | Survey / ORIGINAL_REQUEST.md (R2) |
| 10 | Test Suite Synchronization | Synchronize test matchers across all 13 test files in `src/test/` to reflect v2 copy while keeping 141 tests passing | M4 | Survey / explorer_survey_tests |
| 11 | Zero TypeScript Compiler Errors & Clean Build | Ensure `npm run build` (`tsc && vite build`) succeeds with 0 errors | M4 | Survey / ORIGINAL_REQUEST.md (R3) |
| 12 | Forensic Victory Audit & Gate Verification | Independent audit for authentic logic, zero mock injections, no bypassed assertions, and full requirement compliance | M5 | Survey / Global Rules |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Strategy & Data Layer V2 Ingestion | `src/data/strategyDocs.ts`, `devpostCriteria.ts`, `blogArticles.ts`, `affiliatesData.ts`, `marketplaceData.ts`, `grantsData.ts` | Survey complete | DONE |
| 2 | Pitch & Strategy Pages Copy Rewrite | `src/pages/PitchPage.tsx`, `src/components/pitch/*`, `src/pages/StrategyPage.tsx`, `src/components/strategy/*`, `src/components/layout/*` | M1 | DONE |
| 3 | Secondary Pages Copy Rewrite | `src/pages/BlogPage.tsx`, `src/pages/GrantsPage.tsx`, `src/pages/AffiliatesPage.tsx`, `src/pages/MarketplacePage.tsx`, `src/pages/PortfolioPage.tsx`, `src/pages/NotFoundPage.tsx` | M1, M2 | DONE |
| 4 | Test Suite Synchronization & Build Verification | `src/test/*.test.tsx`, `npm run test`, `npm run build` | M2, M3 | DONE |
| 5 | Adversarial Victory Audit & Final Gate | Independent verification via `teamwork_preview_auditor`, `teamwork_preview_challenger`, `teamwork_preview_reviewer` | M4 | DONE |

## Interface Contracts
### Data Layer ↔ Page Components
- `src/data/strategyDocs.ts`: Exports `RAW_B2B_LANDING_COPY`, `RAW_VC_PITCH_DECK`, `RAW_TECHNICAL_ROADMAP`, `RAW_STELLAR_SCF_GRANT`, `RAW_BUSINESS_PLAN`, `STRATEGY_DOCUMENTS`, `PITCH_DECK_SLIDES`, `ROADMAP_PHASES`, `STELLAR_SCF_GRANT_DATA`, `MONETIZATION_MODELS`, `AUDIENCE_ASKS`.
- `src/data/devpostCriteria.ts`: Exports `CORE_JUDGING_CRITERIA`, `BONUS_MULTIPLIERS_DATA`, `TERMINAL_SIMULATION_STEPS`, `ARCHITECTURE_LAYERS`.
- `src/data/blogArticles.ts`: Exports `BLOG_ARTICLES`, `BLOG_CATEGORIES`, `BLOG_TAGS`.
- `src/data/marketplaceData.ts`: Exports `MARKETPLACE_SERVICES`, `PRICING_PLANS`.
- `src/data/affiliatesData.ts`: Exports `AFFILIATE_TIERS`, `MARKETING_TOOLKIT_ASSETS`, `FAQ_ITEMS`.
- `src/data/grantsData.ts`: Exports `GRANT_PROGRAMS`, `OFFICIAL_PAYOUT_ADDRESSES`.
- `src/data/swarm_portfolio.json`: Preserves keys `repository`, `html_url`, `total_prs`, `merged_prs`, `prs`.

## Code Layout
- `src/data/`: Static data files and markdown content.
- `src/pages/`: Page level components for routing.
- `src/components/pitch/`: Sub-components for PitchPage.
- `src/components/strategy/`: Sub-components for StrategyPage.
- `src/components/layout/`: Global Navbar, Footer, Shell.
- `src/components/common/`: Shared UI components (ParticleCanvas, ErrorBoundary).
- `src/test/`: Vitest test suites.
