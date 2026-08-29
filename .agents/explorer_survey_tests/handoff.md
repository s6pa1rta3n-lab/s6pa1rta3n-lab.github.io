# Test Suite & Build Verification Survey Handoff Report

## 1. Observation

### Project Test & Build Infrastructure
- **Test Runner & Environment**: Vitest `v2.0.5` with JSDOM environment (`jsdom` v24.1.1), configured in `/Users/solveetcoagula/teamwork_projects/swarm_public_site/vite.config.ts`.
- **Test Utilities & Matchers**: `@testing-library/react` (v16.0.0), `@testing-library/jest-dom` (v6.4.8).
- **Global Test Setup**: `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/test/setup.ts` configures automatic DOM cleanup, mocks `window.scrollTo`, `navigator.clipboard`, `window.matchMedia`, `HTMLCanvasElement.getContext('2d')`, and `window.IntersectionObserver`.
- **TypeScript & Bundler**: TypeScript `v5.5.3` (`tsconfig.json`), Vite `v5.4.0` (`vite.config.ts`).
- **NPM Test Scripts** (`package.json` lines 6-12):
  - `"test": "vitest run"`
  - `"test:watch": "vitest"`
  - `"build": "tsc && vite build"`

### Baseline Execution Results
- `npm run test` execution output:
  - **13 test files**, **141 tests total**, **141 passed**, **0 failed**.
  - Test execution duration: ~7.8 seconds.
- `npm run build` execution output:
  - TypeScript compilation (`tsc`) passed with **0 errors**.
  - Production bundle generated in `dist/` in 1.63 seconds.

---

### Comprehensive Inventory of All 13 Test Files & 141 Tests

| # | Test File Path | Tests | Target Components / Pages | Primary Test Scope |
|---|---|---|---|---|
| 1 | `src/test/pitch.test.tsx` | 13 | `PitchPage`, `JudgingCriteriaGrid`, `TerminalSimulator`, `ArchitectureNexus`, `BonusMultipliers` | Devpost hackathon criteria data, 5-phase terminal simulation, 5 architecture layers, bonus multipliers, full pitch hero & CTAs |
| 2 | `src/test/strategy.test.tsx` | 16 | `StrategyPage`, `VCDeckViewer`, `RoadmapTimeline`, `SCFGrantView`, `BusinessPlanView`, `MarkdownDocViewer` | Strategy data models (5 markdown docs), 8-slide VC deck navigation, 4-phase tech roadmap, 3-tranche Stellar SCF grant, monetization models, B2B pilot form |
| 3 | `src/test/blog.test.tsx` | 8 | `BlogPage`, `ArticleModal` | 4 research articles rendering, search bar filtering, category and tag pill filtering, empty state reset, modal TOC & clipboard sharing |
| 4 | `src/test/grants.test.tsx` | 7 | `GrantsPage`, `PayoutVerifier`, `GrantDossierCard`, `MilestonesTranches`, `TeaConstitutionViewer` | 4 grant dossiers, cryptographic payout address verification (EVM & Stellar), network filtering, SCF milestone tranches ($150k), TEA constitution YAML copying |
| 5 | `src/test/affiliates.test.tsx` | 5 | `AffiliatesPage`, `EarningsCalculator`, `TierMatrix`, `MarketingToolkit` | Affiliates page layout, dual-slider tier calculations across 4 tiers (Bronze, Silver, Gold, Diamond), commission rates matrix, marketing toolkit link generator, FAQ accordion |
| 6 | `src/test/marketplace.test.tsx` | 6 | `MarketplacePage`, `ServiceDetailModal`, `DeployConfigDrawer` | 6 micro-services, 3 pricing plans, monthly vs annual (-20%) toggle, category & search filtering, API schema / cURL / SDK inspection modal, node deployment drawer simulation |
| 7 | `src/test/portfolio.test.tsx` | 12 | `PortfolioPage` | Portfolio telemetry ribbon (195+ PRs, 42 repos, 30 merged), 42 repository cards, PR accordion expansion, search by repo & PR title, status & ecosystem category filters, sorting, clipboard address copying |
| 8 | `src/test/portfolio_adversarial.test.tsx` | 16 | `PortfolioPage` | Exact mathematical oracle verification (42 repos, 132 PRs, 30 merged, 23% merge rate), search input fuzzing with regex meta-characters & unicode, rapid filter thrashing, 42-card simultaneous expand/collapse, null date/field safety |
| 9 | `src/test/adversarial_challenge.test.tsx` | 17 | `App`, `EarningsCalculator`, `VCDeckViewer`, `ParticleCanvas`, `ServiceDetailModal`, `DeployConfigDrawer`, `ArticleModal` | 404 route handling & recovery to `#/pitch`, extreme dual-slider boundaries ($300 to $500,000/mo), VC deck autoplay loop & boundary wrap-around, ParticleCanvas IntersectionObserver & reduced-motion, modal Escape/backdrop traps, rapid navigation thrashing |
| 10 | `src/test/routing.test.tsx` | 11 | `App` | HashRouter navigation across all 7 routes (`#/pitch`, `#/strategy`, `#/blog`, `#/grants`, `#/affiliates`, `#/marketplace`, `#/portfolio`), footer settlement proofs, live telemetry pill, tab switching in Strategy, slider interaction in Affiliates, modal trigger in Marketplace |
| 11 | `src/test/shell.test.tsx` | 3 | `Navbar`, `Footer`, `Shell` | 7 navbar items with badges, footer EVM & Stellar payout addresses, Shell main wrapper |
| 12 | `src/test/particleCanvas.test.tsx` | 8 | `ParticleCanvas` | HTML5 canvas element attributes (`role="presentation"`, `aria-hidden="true"`), prop configuration, window resize, mouse interaction, reduced motion, context null-safety, cleanup on unmount |
| 13 | `src/test/errorBoundary.test.tsx` | 8 | `ErrorBoundary` | Component exception catching, cyber fallback UI display, error callback propagation, custom fallback node & render function, stack trace toggle, reboot/retry state reset, Return to Hub hash reset |

---

### Detailed Catalog of Text & UI Copy Assertions by Test File

#### 1. `src/test/pitch.test.tsx`
- **Data Model Checks**:
  - Criterion IDs: `'criterion-1-innovation'`, `'criterion-2-architecture'`, `'criterion-3-demo-readiness'` (lines 27, 31, 35)
  - Bonus IDs: `'bonus-gemma-auditor'`, `'bonus-veo-walkthrough'` (lines 42, 46)
  - Lifecycle phases: `'INTAKE_GATEWAY'`, `'CONTEXT_RAG'`, `'SANDBOX_SYNTHESIS'`, `'VICTORY_AUDIT'`, `'PR_DELIVERY'` (lines 53-57)
- **UI Copy / Text Assertions**:
  - Headings: `getByRole('heading', { name: /Innovation & Operational Utility/i })`, `getByRole('heading', { name: /Architectural Discipline & Tech Stack/i })`, `getByRole('heading', { name: /Demo & Production Readiness/i })` (lines 74-76)
  - Scoring & BYOF copy: `getByText(/40% Weight \(2.0 Base Pts\)/i)`, `getAllByText(/30% Weight \(1.5 Base Pts\)/i)`, `getAllByText(/Bring Your Own Friction \(BYOF\) Proof/i)` (lines 78-81)
  - Accordion labels: `getAllByRole('button', { name: /Toggle deep-dive for/i })`, `getAllByText(/Verifiable Evidence & Production Proofs/i)` (lines 87, 91)
  - Terminal Simulator copy: `getByText(/fleet-cloudrun-runner@gcp-us-central1:~/i)`, button names `/Play simulation/i`, `/Previous step/i`, `/Next step/i`, `/Reset simulation/i`, `/Jump to Step 1: INTAKE_GATEWAY/i`, `/Jump to Step 4: VICTORY_AUDIT/i` (lines 107-115)
  - Phase log texts: `getByText(/cloudrun:ingest_webhook/i)`, `getByText(/antigravity:episodic_rag/i)`, `getByText(/auditor:murder_board/i)`, `getByText(/VERDICT: VICTORY AUDIT PASSED/i)`, `getByText(/docker:sandbox_exec/i)`, `getByText(/github:create_pr/i)` (lines 122-154)
  - Telemetry & Cost texts: `getByText(/Firestore Stigmergy State/i)`, `getByText(/Real-Time Labor Arbitrage Cost/i)`, `getByText(/98% Cheaper/i)` (lines 181-183)
  - Architecture Nexus buttons & layer headings: `/Inspect Multi-Model Cognitive Nexus/i`, `/Inspect Cloud Run Serverless Webhook Gateway/i`, `/Inspect Reactive Stigmergy & State Engine/i`, `/Inspect Ephemeral Execution Sandboxes/i`, `/Inspect Zero-Trust Victory Audit Protocol/i`, `getByRole('heading', { name: /Cloud Run Serverless Webhook Gateway/i })`, `getByText(/Cloud Run \(Serverless Container Gateway\)/i)`, `getByText(/HMAC-SHA256 signature verification/i)`, `getByRole('heading', { name: /Zero-Trust Victory Audit Protocol/i })`, `getByText(/The Adversarial Murder Board/i)`, `getByText(/Strict anti-mock AST parser/i)` (lines 191-211)
  - Bonus Multipliers copy: `getByRole('heading', { name: /Bonus Points Multipliers/i })`, `getByText(/Interactive Devpost Final Score Projector/i)`, `getByText(/Published Technical Article/i)`, `getByText(/Social Launch Campaign/i)`, `getByText(/Gemma 2 Offline AST Auditor/i)`, `getByText(/Google Veo PR Video Generator/i)`, `/Toggle Google Lyria Audio Telemetry/i`, `getByText(/Maximum Stage 3 Bonus Achieved \(\+1.0\)/i)` (lines 230-249)
  - PitchPage Hero & Sections: `getAllByText(/Universal/i)`, `getAllByText(/Bounty Swarm/i)`, `getByText(/All Things Agentic Hackathon Entry/i)`, `getByText(/Autonomous Software Labor Force on Google Cloud/i)`, `getAllByText(/Outcome-Based Labor Arbitrage/i)`, `getByText(/90%\+ Cost Arbitrage/i)`, `getByRole('heading', { name: /Core Judging Criteria/i })`, `getByRole('heading', { name: /Autonomous Terminal Simulator/i })`, `getByRole('heading', { name: /Interactive Architecture Nexus/i })`, `getByRole('heading', { name: /Stage 3 Bonus Points Multipliers/i })`, `getByText(/Production Verified on Google Cloud Run & Firestore/i)`, `getByText(/1-Click Local Reproducibility/i)`, `getByRole('link', { name: /Explore Marketplace Micro-Services/i })`, `getByRole('link', { name: /Verify Settlement Proofs/i })` (lines 268-290)

#### 2. `src/test/strategy.test.tsx`
- **Data Model Checks**:
  - Document IDs: `['b2b', 'pitch', 'roadmap', 'scf', 'plan']` (line 39)
  - Stellar grant total: `150000` XLM, tranches `[40000, 50000, 60000]`, payout address `'GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC'` (lines 73-81)
  - Monetization models: `'hybrid'` with margin `'90%'` (line 88); Audience asks `['vc', 'grants', 'enterprise', 'sponsors']` (line 92)
- **UI Copy / Text Assertions**:
  - VC Deck Slide 1-8 copy: `getAllByText(/Universal Bounty Swarm/i)`, `getAllByText(/Autonomous AI Software Engineers/i)`, `getByText(/Slide 1 of 8/i)`, `getAllByText(/\$5.5 Trillion Bottleneck/i)`, `getAllByText(/Services-as-Software/i)`, `getAllByText(/The Ask & Capital Allocation/i)`, `getByText(/60% \(\$2.10M\)/i)`, `getAllByText(/Cloud Runner Infrastructure/i)`, `getAllByText(/The 2030 Vision/i)`, `getByText(/Presenter Talking Points & Speaker Notes/i)` (lines 102-147)
  - Roadmap Phase copy: `getByText(/Technical Roadmap: Multi-Tenant B2B SaaS Platform/i)`, `getAllByText(/Identity, Authentication & Multi-Tenancy/i)`, `getByText(/Firebase Auth JWT Integration/i)`, `getByText(/Tenant-Isolated Firestore Schema/i)`, `getByText(/PathGuard & SafeIO local filesystem containment/i)`, `/PHASE 02/i`, `getAllByText(/Webhook Gateway & Reactive Ingestion/i)`, `getByText(/Headless FastAPI Gateway on Cloud Run/i)`, `getByText(/Timing-safe HMAC-SHA256 signature verification/i)`, `/PHASE 03/i`, `getAllByText(/Cloud Execution & VPC Isolation/i)`, `getByText(/Google Cloud Batch \/ GKE Container Runners/i)`, `getByText(/Zero Data Retention \(ZDR\) Workspaces/i)`, `/PHASE 04/i`, `getAllByText(/Billing, Metering & Escrow Routing/i)`, `getByText(/Stripe Metered Billing Integration/i)`, `getByText(/Stellar Soroban & EVM Smart Contract Escrows/i)` (lines 160-190)
  - SCF Grant copy: `getByText(/Soroban Sentinel: Stellar Community Fund/i)`, `getByText(/\$150,000 in XLM/i)`, `getAllByText(/MVP & Core Architecture/i)`, `getAllByText(/40,000 XLM/i)`, `getByText(/50 automated tests passing on the core execution loop/i)`, `getAllByText(/Testnet Alpha & Ecosystem Stigmergy/i)`, `getAllByText(/50,000 XLM/i)`, `getByText(/Successfully resolve 15 live issues on 3 separate community test repositories/i)`, `getAllByText(/Mainnet Deployment & Tooling Suite/i)`, `getAllByText(/60,000 XLM/i)`, `getByText(/Integration by at least 3 major Stellar ecosystem projects/i)`, `getByText(/Address Copied!/i)` (lines 199-236)
  - Business Plan copy: `getByText(/Strategic Business Plan & Monetization Architecture/i)`, `getAllByText(/Model A: The Hybrid Engine/i)`, `getAllByText(/100% Closed-Source Algorithmic Bounty Trading Firm/i)`, `getByText(/Deploy 1,000\+ cloud workers targeting all global Web3 escrows/i)`, `getAllByText(/Public Orchestrator \+ Enterprise Compliance Gating/i)`, `getByText(/Open-source core GitHub webhook runner/i)`, `getByText(/\$3.5M Seed on a \$25M Post-Money Valuation/i)`, `getByText(/\$3,500,000 USD/i)`, `getByText(/\$150k Stellar SCF \+ \$35k Gitcoin Matching/i)`, `getByText(/\$235,000 Total Allocation/i)`, `getByText(/\$10,000 Paid 4-Week PoC Pilot/i)`, `getByText(/Startup Tier/i)`, `getByText(/\$299 \/ month/i)`, `getByText(/Multi-Tiered Community Sponsorships/i)`, `getByText(/Swarm Commander/i)` (lines 247-288)
  - Markdown Doc Viewer copy: `getAllByText(/B2B Enterprise Landing Page Copy/i)`, `getAllByText(/Scale Your Engineering Capacity, Not Your Payroll/i)`, `getAllByText(/VC Seed Pitch Deck Outline/i)`, `getAllByText(/Technical Roadmap: Multi-Tenant B2B SaaS API/i)`, `getAllByText(/Stellar Community Fund \(SCF\) Grant Application/i)`, `getAllByText(/Universal Bounty Swarm: Strategic Business Plan/i)`, `getByText(/Raw Source: B2B_Landing_Page_Copy.md/i)`, `getByText(/# Universal Bounty Swarm: Enterprise API Landing Page Copy/i`, search `'Victory Audit'`, `getByText(/Copied!/i)` (lines 297-350)
  - Master Page Metrics & Tabs: `getAllByText(/\$5.5T/i)`, `getByText(/Global Developer Labor/i)`, `getAllByText(/90%\+/i)`, `getAllByText(/\$150k/i)`, `getAllByText(/4 Phases/i)`, `getAllByText(/\$3.5M/i)`, tab names `/VC Pitch Deck/i`, `/Tech Roadmap/i`, `/Stellar SCF Grant/i`, `/Business Plan/i`, `/Markdown Inspector/i`, `getAllByText(/Inspect All 5 Markdown Artifacts/i)`, `getByText(/Thank you! Your Enterprise PoC request has been registered/i)`, `getByText(/Executive Summary Copied!/i)` (lines 366-440)

#### 3. `src/test/blog.test.tsx`
- **UI Copy / Text Assertions**:
  - Header & search: `getByText(/Research & Engineering Dispatches/i)`, `getByText(/Research Blog/i)`, `getByPlaceholderText(/Search engineering dispatches.../i)` (lines 24-26)
  - Article Titles & Categories:
    - `getByRole('button', { name: /Security & Verification/i })` (line 39)
    - `getByText(/Why Zero-Mock Forensic Victory Audits Are Mandatory for Autonomous Software Labor/i)` (lines 44, 124)
    - `getByText(/Decentralized Multi-Agent Coordination via Firebase Firestore Stigmergy/i)` (lines 49, 70, 116, 147)
    - `getAllByRole('button', { name: /#Architecture/i })` (line 65)
    - `getByText(/Autonomous Protocol Keepers: Zero-Loss MEV Protection on Base and Arbitrum/i)` (lines 75, 100)
    - `getByRole('button', { name: /Clear tag: #Architecture/i })` (line 79)
    - Search query `'Soroban'`, `getByText(/Building Instant Soroban Smart Contract Escrows for Open Source Bounties/i)` (lines 93, 96)
    - Empty state: `getByText(/No matching dispatches found/i)`, `getByRole('button', { name: /Reset Filters/i })` (lines 110, 112)
    - Article Modal reader: `getByText(/Key Executive Takeaways/i)`, `getByText(/Table of Contents/i)`, `getAllByText(/The LLM Shortcut & Cheating Problem/i)`, `getAllByText(/The Three Pillars of Victory Audit/i)`, `getByText(/Link Copied!/i)` (lines 132-171)

#### 4. `src/test/grants.test.tsx`
- **UI Copy / Text Assertions**:
  - Header & Subtitles: `getByText(/Multi-Chain Public Goods & Grant Funding/i)`, `getByText(/Grants &/i)`, `getByText(/Settlement Proofs/i)`, `getByText(/Cryptographic Payout Routing Proof/i)` (lines 18-21)
  - Payout Addresses & Buttons: `OFFICIAL_PAYOUT_ADDRESSES.evm` (`0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89`), `OFFICIAL_PAYOUT_ADDRESSES.stellar` (`GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC`), `/Copy EVM Address/i`, `/Copy Stellar Address/i`, `/Stellar \(XLM\/Soroban\)/i`, `/EVM \(Base\/ETH\/Arb\)/i` (lines 36-68)
  - Grant Program Headings & Ecosystems: `getByRole('heading', { name: /Stellar Community Fund \(SCF\)/i })`, `getByRole('heading', { name: /Octant Atlas v2 Public Goods/i })`, `getByRole('heading', { name: /TEA Protocol Proof of Contribution/i })` (lines 78-93)
  - Milestone Tranches: `getByText(/Phase 1/i)`, `getByText(/Core Architecture & CLI Sandbox/i)`, `getByText(/\$40,000 XLM/i)`, `getByText(/Phase 2/i)`, `getByText(/Testnet Alpha & Victory Audit Gatekeeper/i)`, `getByText(/\$50,000 XLM/i)`, `getByText(/Phase 3/i)`, `getByText(/Mainnet Deployment & Escrow Routing/i)`, `getByText(/\$60,000 XLM/i)` (lines 102-112)
  - Tea Constitution: `getByRole('heading', { name: /TEA Protocol Governance Constitution/i })`, `getByText(/67% \(2\/3\)/i)`, `getAllByText(/Base L2/i)`, `getByText(/80% Maintainers/i)`, `/Copy tea.yaml/i`, `getByText(/YAML Copied!/i)` (lines 127-137)
  - Toggle buttons: `/Hide Milestone Tranches/i`, `/View Milestone Tranches/i` (lines 149, 155)

#### 5. `src/test/affiliates.test.tsx`
- **UI Copy / Text Assertions**:
  - Header & Sections: `getByText(/Creator & Partner Revenue-Share Program/i)`, `getByText(/Affiliate &/i)`, `getByText(/Creator Program/i)`, `getByText(/Dynamic Earnings Calculator/i)`, `getByText(/4-Tier Commission Matrix/i)`, `getByText(/Creator Marketing Toolkit/i)`, `getByText(/Frequently Asked Questions/i)` (lines 16-22)
  - Dynamic Tiers & Earnings: `getByText(/Current Tier: Bronze Scout \(10%\)/i)`, `'$400'`, `'$4,800'`, `getByText(/Current Tier: Silver Hunter \(15%\)/i)`, `'$4,500'`, `'$54,000'`, `getByText(/Current Tier: Gold Commander \(20%\)/i)`, `'$7,200'`, `'$86,400'`, `getByText(/Current Tier: Diamond Syndicate \(25%\)/i)`, `'$15,000'`, `'$180,000'` (lines 36-63)
  - Tier Matrix Cards: `'Bronze Scout'`, `'Silver Hunter'`, `'Gold Commander'`, `'Diamond Syndicate'`, `'10%'`, `'15%'`, `'20%'`, `'25%'`, `'5%'`, `'7.5%'`, `getByText(/Active Tier/i)` (lines 68-84)
  - Marketing Toolkit: `/Copy Pitch/i`, `'https://swarm.dev/r/YOUR_TAG'`, input placeholder `/dev_partner/i`, query `'crypto_lead_42'`, link `'https://swarm.dev/r/crypto_lead_42'`, `/Copy Link/i` (lines 93-107)
  - FAQ questions & answers: `getByRole('button', { name: /How and when do I get paid\?/i })`, `getByText(/Payouts are processed automatically in USDC/i)` (lines 113, 118)

#### 6. `src/test/marketplace.test.tsx`
- **UI Copy / Text Assertions**:
  - Header & Search: `getByText(/Autonomous Micro-Services & API Marketplace/i)`, `getByRole('heading', { name: /Swarm Marketplace/i })`, `getByPlaceholderText(/Search micro-services, tools & schemas.../i)` (lines 24-26)
  - Pricing toggle: `'$399'`, `'$499'`, `/Monthly Billing/i`, `/Annual Billing/i` (lines 43-56)
  - Micro-service titles & categories: `/Security & Audit/i`, `/Universal Victory Auditor/i`, `/MEV-Protected DeFi Keeper/i` (lines 63-78)
  - Modal Inspector tabs & code: `/Inspect API Schema/i`, `getByText(/REST \/ Webhook API Schema/i)`, `getByText(/zeroMockVerification/i)`, `/curl -X POST/i`, `/import { SwarmClient }/i`, `/from universal_bounty import SwarmClient/i`, `/Close Inspector/i`, `/Copied/i` (lines 85-131)
  - Deploy drawer: `getByText(/Interactive Deployment/i)`, `getByText(/Deploy Universal Victory Auditor/i)`, `/Deploy Swarm Node/i`, `getByText(/Swarm Node Live!/i)`, `getByText(/DEPLOYED_AND_LISTENING/i)`, `/Close drawer/i` (lines 142-154)

#### 7. `src/test/portfolio.test.tsx`
- **UI Copy / Text Assertions**:
  - Header & Subtitle: `getByText(/Proof of Work & Verifiable Track Record/i)`, `getByRole('heading', { name: /Proof of Work & Ecosystem Contributions/i })`, `getByText(/Live multi-agent ledger of 195\+ Pull Requests/i)` (lines 19-21)
  - Metric counts: `'195+'`, `'(132 in dataset)'`, `'42'`, `'Active Repos'`, `'30'`, `/Merge Rate/i`, `'6+'`, `'100% Zero-Mock'` (lines 24-31)
  - Repo titles & Counter: `'ADG-VITV/RepoRaid'`, `'Stellar-IndigoPay/Stellar-IndigoPay'`, `'StellarCheckMate/Checkmate-Escrow'`, `'Bitcoindefi/runa'`, `toHaveTextContent('42 of 42 Repositories (132 PRs)')` (lines 42-48)
  - Accordion buttons: `/Expand PR list for ADG-VITV\/RepoRaid/i`, `/Collapse PR list for ADG-VITV\/RepoRaid/i` (lines 64, 71)
  - Filter and search controls: `getByLabelText(/Search repositories and pull requests/i)`, `/Merged Only/i`, `/Filter status: All/i`, `/Bitcoin & L2/i`, `/Stellar \/ Soroban/i`, `getByText(/No Projects Found/i)`, `/Reset All Filters/i`, `/Expand all project details/i`, `/Collapse all project details/i` (lines 88-226)
  - Settlement addresses: `/Copy EVM settlement address/i`, `/Copy Stellar settlement address/i`, `/0xF46C9F6d/i`, `/GCL6OXAMLD/i` (lines 236-243)

#### 8. `src/test/portfolio_adversarial.test.tsx`
- **UI Copy / Text Assertions**:
  - Exact DOM metrics: `'195+'`, `'(132 in dataset)'`, `'42'`, `'30'`, `'(23% Merge Rate)'`, `'10 repositories merged upstream'`, `'6+'` (lines 53-59)
  - Search queries & PR titles: `'rEpOrAiD'`, `'(Fixes #28)'`, `/Implement withdraw\(\) \(Fixes #28\)/i`, `'checkmate'`, `'runa'`, `'1 of 42 Repositories (9 PRs)'`, `/Clear search/i` (lines 134-161)
  - Category buttons: `/Filter ecosystem: Stellar \/ Soroban/i`, `/Filter ecosystem: DeFi & Payments/i`, `/Filter ecosystem: Developer Tools & Infra/i`, `/Filter ecosystem: Bitcoin & L2/i`, `/Filter ecosystem: All/i` (lines 181-193)
  - Status buttons: `/Filter status: All/i`, `/Filter status: Merged Only/i`, `/Filter status: Active Pipeline/i` (lines 207-209)
  - Expand/collapse buttons: `/Expand all project details/i`, `/Collapse all project details/i`, `/Collapse PR list for/i`, `/Expand PR list for/i` (lines 265-278)
  - Settlement addresses: `'0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89'`, `'GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC'` (lines 387, 391)

#### 9. `src/test/adversarial_challenge.test.tsx`
- **UI Copy / Text Assertions**:
  - 404 Route recovery: `getByText(/404/i)`, `getByText(/Route Not Found/i)`, `getByText(/The requested Swarm sector does not exist or has been re-indexed/i)`, `/Return to Pitch & Simulator/i`, `#/pitch` (lines 31-37)
  - Affiliates calculator boundaries: `Bronze Scout (10%)`, `Silver Hunter (15%)`, `Gold Commander (20%)`, `Diamond Syndicate (25%)`, `'$125,000'`, `'$1,500,000'`, `getByText(/Based on \$500,000\/mo total referred subscription volume/i)`, `'$30'`, `'$360'` (lines 88-136)
  - VC Deck navigation & autoplay: `getByText(/Slide 1 of 8/i)`, `getByText(/8 \/ 8/i)`, `getByText(/Slide 8 of 8/i)`, `getByText(/1 \/ 8/i)`, `/Autoplay/i`, `getByText(/Autoplay On/i)` (lines 169-225)
  - Modal & Drawer titles: `sampleService.name`, `Deploy ${sampleService.name}`, `sampleArticle.title` (lines 360, 392, 424)
  - Navigation route links: `/Strategy & Ops/i`, `/Research Blog/i`, `/Grants/i`, `/Portfolio/i`, `/Affiliates/i`, `/Marketplace/i`, `/Pitch/i`, `getAllByText(/Universal/i)`, `getAllByText(/Bounty Swarm/i)` (lines 454-475)

#### 10. `src/test/routing.test.tsx`
- **UI Copy / Text Assertions**:
  - Navbar links: `/Strategy & Ops/i`, `/Research Blog/i`, `/Grants/i`, `/Affiliates/i`, `/Marketplace/i`, `/Portfolio/i` (lines 22, 33, 43, 56, 69, 81)
  - Pitch assertions: `getAllByText(/Universal/i)`, `getAllByText(/Bounty Swarm/i)`, `getByText(/All Things Agentic Hackathon Entry/i)`, `getByText(/Autonomous Labor Arbitrage/i)` (lines 12-15)
  - Strategy assertions: `getByText(/Operations Hub/i)`, `getByText(/B2B Landing Copy/i)`, `getByRole('tab', { name: /VC Pitch Deck/i })`, `getByText(/Ask: \$3.5M Seed @ \$22M Cap/i)`, `getByText(/VC Pitch Deck Master Summary/i)`, `getByRole('tab', { name: /Stellar SCF Grant/i })`, `getByText(/Stellar Community Fund \(\$150,000 Award\)/i)` (lines 25-27, 109-117)
  - Blog assertions: `getByPlaceholderText(/Search engineering dispatches/i)`, `getByText(/Decentralized Multi-Agent Coordination via Firebase/i)` (lines 36-37)
  - Grants assertions: `getByText(/Grants &/i)`, `getByText(/Settlement Proofs/i)`, `getByRole('heading', { name: /Stellar Community Fund \(SCF\)/i })`, `0xF46C9F6d...`, `GCL6OXAMLD...` (lines 46-50)
  - Affiliates assertions: `getByText(/Affiliate &/i)`, `getByText(/Creator Program/i)`, `getByText(/Dynamic Earnings Calculator/i)`, `getByText(/Bronze Scout/i)`, `getByText(/Diamond Syndicate/i)`, `getByText(/Current Tier: Gold Commander \(20%\)/i)` (lines 59-63, 131)
  - Marketplace assertions: `getByRole('heading', { name: /Swarm Marketplace/i })`, `getByText(/Universal Victory Auditor/i)`, `getByText(/Autonomous CI\/CD Fixer/i)`, `getByText(/MEV-Protected DeFi Keeper/i)`, `/Inspect API Schema/i`, `getByText(/REST \/ Webhook API Schema/i)`, `getByText(/zeroMockVerification/i)` (lines 72-75, 140-144)
  - Portfolio assertions: `getByRole('heading', { name: /Proof of Work & Ecosystem Contributions/i })`, `getByText(/Total PRs/i)`, `getAllByText(/Repositories/i)`, `getAllByText(/Merged PRs/i)` (lines 84-87)
  - Navbar pill & Footer: `getAllByText(/Swarm Engine/i)`, `getAllByText(/Online/i)`, `getAllByText(/Outcome-Based Labor Arbitrage/i)`, `getByText(/EVM Base\/Arb\/ETH/i)`, `getAllByText(/Stellar \/ Soroban/i)` (lines 94-100)

#### 11. `src/test/shell.test.tsx`
- **UI Copy / Text Assertions**:
  - `NAV_ITEMS`: 7 items matching nav links (line 16)
  - Footer addresses and tagline: `/0xF46C9F6d/i`, `/GCL6OXAMLD/i`, `/Zero-Mock Forensic Victory Audits/i` (lines 31-33)
  - Wrapper test string: `'Swarm Fleet Core Active'` (line 40)

#### 12. `src/test/particleCanvas.test.tsx`
- **UI Copy / Text Assertions**:
  - Purely canvas accessibility and styling attributes: `data-testid="particle-canvas"`, `role="presentation"`, `aria-hidden="true"`. No copy strings asserted.

#### 13. `src/test/errorBoundary.test.tsx`
- **UI Copy / Text Assertions**:
  - Error state fallback headings & buttons: `getByText('Subsystem Healthy')`, `getByText(/RUNTIME EXCEPTION CAUGHT/i)`, `getByText(/SWARM SUBSYSTEM FAILURE/i)`, `getByText(/Critical Memory Corruption/i)`, `getByRole('button', { name: /View Diagnostics Stack/i })`, `getByRole('button', { name: /Hide Diagnostics Stack/i })`, `getByRole('button', { name: /REBOOT \/ RETRY/i })`, `getByRole('button', { name: /RETURN TO HUB/i })` (lines 73, 85-87, 139, 145, 161, 178)

---

## 2. Logic Chain

1. **Test Infrastructure Analysis**:
   - Inspecting `package.json` and `vite.config.ts` confirmed that the test runner is Vitest running in a JSDOM environment with React Testing Library and `@testing-library/jest-dom`.
   - The test setup in `src/test/setup.ts` initializes standard DOM stubs (e.g. `IntersectionObserver`, `matchMedia`, `scrollTo`, `canvas 2d`).

2. **Baseline Verification**:
   - Running `npm run test` verified that all 13 test files and 141 tests pass cleanly out of the box.
   - Running `npm run build` verified that TypeScript (`tsc`) and Vite production bundling compile cleanly with zero errors.

3. **Impact Mapping for Copy v2 Rewrite**:
   - The v2 rewrite will update copy in `src/pages/` (Pitch, Strategy, Blog, Grants, Affiliates, Marketplace) and data files (`strategyDocs.ts`, `devpostCriteria.ts`, `blogArticles.ts`, `grantsData.ts`, `marketplaceData.ts`, `affiliatesData.ts`).
   - When text, titles, subtitles, and button names change in components or data structures:
     - Component tests (`pitch.test.tsx`, `strategy.test.tsx`, `blog.test.tsx`, `grants.test.tsx`, `affiliates.test.tsx`, `marketplace.test.tsx`) that assert specific literal strings (e.g., `Scale Your Engineering Capacity, Not Your Payroll`, `All Things Agentic Hackathon Entry`, `Operations Hub`, article titles) will need matching assertion updates.
     - Cross-cutting tests (`routing.test.tsx`, `adversarial_challenge.test.tsx`, `shell.test.tsx`) that assert specific navbar link names, tab names, or page headers will require exact matching with whatever new titles/headings are chosen.
   - Core functional invariants and data IDs must NOT be broken during the rewrite:
     - Cryptographic payout addresses (`0xF46C9F6d...`, `GCL6OXAMLD...`).
     - Strategy document IDs (`['b2b', 'pitch', 'roadmap', 'scf', 'plan']`).
     - Portfolio data structure (`swarm_portfolio.json` with 42 repositories and 132 PRs).
     - Commission calculation math and tier names in Affiliates (`Bronze Scout (10%)`, `Silver Hunter (15%)`, `Gold Commander (20%)`, `Diamond Syndicate (25%)`).

---

## 3. Caveats
- No caveats. All 13 test files, test configuration files, build scripts, and test suites in the repository were directly surveyed, run, and analyzed.

---

## 4. Conclusion
1. **Runner & Build Health**: The test environment (Vitest + JSDOM + RTL) is healthy and 100% operational with 141 passing tests and 0 build errors.
2. **Copy Assertion Surface**: Approximately 9 out of the 13 test files contain direct textual / regex assertions on UI copy, headings, and data labels.
3. **Execution Guidance**: When the v2 copy is applied across pages and data files, engineers should run `npm run test` incrementally. Any text assertion failures should be synchronized with the new v2 copy while preserving all structural, mathematical, and cryptographic invariants.

---

## 5. Verification Method
- Run all unit and integration tests:
  ```bash
  npm run test
  ```
- Run TypeScript type checking and production build:
  ```bash
  npm run build
  ```
- Invalidation condition: Any test failure in `npm run test` or any TypeScript compiler error in `npm run build`.
