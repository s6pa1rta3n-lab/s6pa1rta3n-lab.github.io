# Swarm Public Site Copy v2 Rewrite — Page & Component Inventory

## 1. Observation

A complete, exhaustive structural and copy survey of all 8 page components in `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/pages/`, all UI components in `src/components/`, all data files in `src/data/`, types in `src/types/`, and corresponding test suites in `src/test/` was conducted.

### 1.1 Architecture & Page Component Topology

The application is a client-side React 19 Single Page Application structured with `HashRouter` in `src/App.tsx`:

| Route | Page Component | File Path | Primary Sub-components / Data Sources |
|---|---|---|---|
| `/` & `/pitch` | `PitchPage` | `src/pages/PitchPage.tsx` | `ArchitectureNexus`, `BonusMultipliers`, `JudgingCriteriaGrid`, `TerminalSimulator`, `devpostCriteria.ts` |
| `/strategy` | `StrategyPage` | `src/pages/StrategyPage.tsx` | `VCDeckViewer`, `RoadmapTimeline`, `SCFGrantView`, `BusinessPlanView`, `MarkdownDocViewer`, `strategyDocs.ts` |
| `/blog` | `BlogPage` | `src/pages/BlogPage.tsx` | `ArticleCard`, `ArticleModal`, `blogArticles.ts` |
| `/grants` | `GrantsPage` | `src/pages/GrantsPage.tsx` | `PayoutVerifier`, `GrantDossierCard`, `MilestonesTranches`, `TeaConstitutionViewer`, `grantsData.ts` |
| `/affiliates` | `AffiliatesPage` | `src/pages/AffiliatesPage.tsx` | `EarningsCalculator`, `TierMatrix`, `MarketingToolkit`, `affiliatesData.ts` |
| `/marketplace` | `MarketplacePage` | `src/pages/MarketplacePage.tsx` | `PricingTable`, `ServiceCard`, `DeployConfigDrawer`, `ServiceDetailModal`, `marketplaceData.ts` |
| `/portfolio` & `/proof-of-work` | `PortfolioPage` | `src/pages/PortfolioPage.tsx` | Dynamic filters, PR accordions, `swarm_portfolio.json`, `types/index.ts` |
| `*` (Catch-all) | `NotFoundPage` | `src/pages/NotFoundPage.tsx` | 404 error handler with return link to `/pitch` |

Layout Components:
- `src/components/layout/Navbar.tsx`: Header navigation bar with `NAV_ITEMS`, route pills, mobile dropdown, and live `TelemetryStatus` pill (`Swarm Engine: Online`).
- `src/components/layout/Footer.tsx`: Footer with brand statement, navigation links, and verified settlement proofs (`0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89` and `GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC`).
- `src/components/layout/Shell.tsx`: Top-level application shell hosting `ParticleCanvas`, `Navbar`, page outlet, and `Footer`.
- `src/components/common/ErrorBoundary.tsx`: Runtime exception boundary with diagnostic stack traces.
- `src/components/common/ParticleCanvas.tsx`: Interactive HTML5 canvas animation with accessibility support (`prefers-reduced-motion` and `IntersectionObserver`).

---

### 1.2 Exhaustive Page-by-Page Inventory

#### Page 1: PitchPage (`src/pages/PitchPage.tsx`)
- **Key Headers & Text**:
  - Badge: `"All Things Agentic Hackathon Entry • Google Cloud & Devpost"` (`line 44`)
  - Title: `"Autonomous Software Labor Force on Google Cloud"` (`line 52`)
  - Subtitle: `"Outcome-based multi-agent engineering swarm that turns GitHub issues into verified Pull Requests. We replace slow, expensive manual triage with self-healing, zero-mock CI automation—slashing software development costs by over 90%."` (`lines 55–58`)
  - CTA 1: `"Explore Marketplace Micro-Services"` (`line 64`)
  - CTA 2: `"Verify Settlement Proofs"` (`line 71`)
  - Value Prop Banner: `"Outcome-Based Labor Arbitrage: Human Engineering: $150–$600/hr ($1,200–$4,800/day) vs Universal Bounty Swarm: $1.50–$10.00 compute per PR (90%+ Cost Arbitrage)"` (`lines 83–116`)
  - Live Benchmarks Card: `"Live Swarm Benchmarks"`:
    - `"Avg Resolution Time: 28.4 mins"`
    - `"Victory Audit Pass Rate: 99.8%"`
    - `"CI First-Pass Healing: 94.2%"`
    - `"Verified Production PRs: 195+"` (`lines 125–171`)
  - Google Cloud Deployment Proof Card: `"Production Verified on Google Cloud Run & Firestore"`, `"1-Click Local Reproducibility"`, `gcloud run deploy` command box (`lines 212–247`)
- **Sub-components & Directives**:
  - `JudgingCriteriaGrid.tsx`: 3 Stage-2 judging criteria (Innovation 40%, Architecture 30%, Demo 30%) with BYOF proof blocks and deep-dive accordions.
  - `TerminalSimulator.tsx`: 5-phase interactive autonomous execution lifecycle terminal (Intake Gateway, Context RAG, Sandbox Synthesis, Victory Audit, PR Delivery) with live Firestore state and cost comparison ($400 human engineer vs $4.10 cloud compute).
  - `ArchitectureNexus.tsx`: 5-layer interactive architecture inspector (Cognitive Nexus, Cloud Run Gateway, Reactive Stigmergy, Ephemeral Sandbox, Victory Audit Protocol) with Google Cloud service maps and security controls.
  - `BonusMultipliers.tsx`: Interactive Devpost score projector with 5 Stage-3 bonuses (Dev.to article +0.2, Social launch +0.2, Gemma 2 AST auditor +0.2, Veo video +0.2, Lyria audio +0.2).

#### Page 2: StrategyPage (`src/pages/StrategyPage.tsx`)
- **Key Headers & Text**:
  - Badge: `"Operations & Strategic Business Hub"` (`line 86`)
  - Title: `"Strategy & Operations Hub"` (`line 90`)
  - Subtitle: `"Master business plan, technical roadmap, grant applications, and investor pitch deck for Universal Bounty Swarm."` (`line 93`)
  - Telemetry Ribbon:
    - `"Total Addressable Market: $5.5T (Global Developer Labor)"`
    - `"Unit Economics: 90%+ (Gross Margin on Bounties)"`
    - `"Grant Capitalization: $150k (Stellar Community Fund)"`
    - `"Scale Horizon: 4 Phases (Multi-Tenant B2B SaaS)"`
    - `"Target Seed Capital: $3.5M ($22M Cap SAFE)"` (`lines 104–157`)
  - Tabs:
    - `b2b`: B2B Enterprise Copy & Pricing Showcase
    - `pitch`: VC Seed Pitch Deck (8 Slides)
    - `roadmap`: Multi-Tenant B2B SaaS Technical Roadmap (4 Phases)
    - `scf`: Stellar Community Fund (SCF) Grant Application ($150,000 in XLM)
    - `plan`: Strategic Business Plan & Monetization Models (3 Models, 4 Asks)
    - `markdown`: Raw & Rendered Markdown Inspector
  - B2B Showcase Section:
    - Hero: `"Scale Your Engineering Capacity, Not Your Payroll"` (`line 198`)
    - Subtitle: `"Deploy autonomous, zero-mock AI engineering nodes directly into your GitHub organization. Liquidate bugs, triage backlogs, and pass CI in minutes—at 90% lower cost than traditional staffing."` (`lines 201–204`)
    - Pricing Tiers:
      - Startup: `$299/mo` (`lines 222–248`)
      - Growth DAO: `$1,999/mo` (`lines 250–280`)
      - Enterprise Sovereign: `Custom ARR` (`lines 282–309`)
    - Enterprise 4-Week PoC Pilot Request Form (`lines 364–420`)

#### Page 3: BlogPage (`src/pages/BlogPage.tsx`)
- **Key Headers & Text**:
  - Badge: `"Research & Engineering Dispatches"` (`line 58`)
  - Title: `"Research Blog"` (`line 62`)
  - Subtitle: `"Deep dives into multi-agent stigmergy, zero-mock AST verification, decentralized escrow settlement, and high-frequency MEV keepers."` (`lines 65–67`)
  - Dynamic Filters: Search input (`Search engineering dispatches...`), Category selector pills (`All`, `Architecture & Stigmergy`, `Security & Verification`, `Smart Contracts & Web3`, `DeFi & MEV Infrastructure`), Tag filters.
  - 4 Technical Dispatches (`src/data/blogArticles.ts`):
    1. `"Decentralized Multi-Agent Coordination via Firebase Firestore Stigmergy"` (`firebase-stigmergy-architecture`)
    2. `"Why Zero-Mock Forensic Victory Audits Are Mandatory for Autonomous Software Labor"` (`zero-mock-victory-audits`)
    3. `"Building Instant Soroban Smart Contract Escrows for Open Source Bounties"` (`stellar-soroban-escrow`)
    4. `"Autonomous Protocol Keepers: Zero-Loss MEV Protection on Base and Arbitrum"` (`mev-protected-keepers`)
  - Reader Modal (`ArticleModal.tsx`): Displays reading time, author, date, key executive takeaways box, table of contents, rendered markdown body, and share button.

#### Page 4: GrantsPage (`src/pages/GrantsPage.tsx`)
- **Key Headers & Text**:
  - Badge: `"Multi-Chain Public Goods & Grant Funding"` (`line 23`)
  - Title: `"Grants & Settlement Proofs"` (`line 27`)
  - Subtitle: `"Verified grant proposals, milestone deliverables, governance constitutions, and cryptographic payout verification for Universal Bounty Swarm."` (`lines 30–33`)
  - Ecosystem filter tabs: `All`, `Stellar`, `Base`, `Octant`, `Gitcoin`.
  - 4 Grant Programs (`src/data/grantsData.ts`):
    1. `"Stellar Community Fund (SCF)"` ($150,000 XLM)
    2. `"Octant Atlas v2 Public Goods"` (45 ETH Matching Pool)
    3. `"TEA Protocol Proof of Contribution"` ($40,000 TEA Allocation)
    4. `"Gitcoin Grants Round 22 (GG22)"` ($25,000 USDC Matching)
- **Sub-components**:
  - `PayoutVerifier.tsx`: Cryptographic settlement verification card with network selector tabs and verified organization addresses:
    - EVM: `0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89`
    - Stellar: `GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC`
  - `MilestonesTranches.tsx`: 3-phase milestone deliverable breakdown for Stellar SCF.
  - `TeaConstitutionViewer.tsx`: YAML viewer for `tea.yaml` governance configuration with copy button.

#### Page 5: AffiliatesPage (`src/pages/AffiliatesPage.tsx`)
- **Key Headers & Text**:
  - Badge: `"Creator & Partner Revenue-Share Program"` (`line 20`)
  - Title: `"Affiliate & Creator Program"` (`line 24`)
  - Subtitle: `"Earn up to 25% recurring lifetime commission on referred SaaS subscriptions and 15% on settled open-source bounty payouts. Real-time on-chain payouts and instant creator toolkits."` (`lines 27–30`)
- **Sub-components**:
  - `EarningsCalculator.tsx`: Dual-slider revenue share projector (Teams Referred 1–100, Average Monthly Spend $300–$5,000) with dynamic tier calculation (`Bronze Scout` 10%, `Silver Hunter` 15%, `Gold Commander` 20%, `Diamond Syndicate` 25%).
  - `TierMatrix.tsx`: 4-tier commission matrix cards showing SaaS commission, bounty resolution bonus, perks checklist, and payout frequency.
  - `MarketingToolkit.tsx`: Creator kit with vanity link generator (`https://swarm.dev/r/YOUR_TAG`), category tabs (`Social Copy`, `Email Pitch`, `Badges & Markdown`, `Pitch Script`), and copyable marketing snippets.
  - FAQ Accordion (`affiliateFaqs` in `affiliatesData.ts`): 4 questions covering payment methods, cookie attribution (90 days), bounty referrals, and thresholds.

#### Page 6: MarketplacePage (`src/pages/MarketplacePage.tsx`)
- **Key Headers & Text**:
  - Badge: `"Autonomous Micro-Services & API Marketplace"` (`line 69`)
  - Title: `"Swarm Marketplace"` (`line 72`)
  - Subtitle: `"Deploy modular, production-ready autonomous swarm agents into your engineering pipeline. Available as managed cloud workers or drop-in REST & WebSocket APIs."` (`lines 75–76`)
  - Search & Billing Switcher: Monthly vs Annual (20% discount).
  - 6 Micro-Services (`src/data/marketplaceData.ts`):
    1. `"Universal Victory Auditor"` ($499/mo / $399/mo annual)
    2. `"Autonomous CI/CD Fixer"` ($399/mo / $299/mo annual)
    3. `"MEV-Protected DeFi Keeper"` ($799/mo / $649/mo annual)
    4. `"Universal Bounty Hunter"` ($999/mo / $799/mo annual)
    5. `"Intelligence Spec Miner"` ($299/mo / $249/mo annual)
    6. `"Cloud Run Webhook Gateway"` ($199/mo / $149/mo annual)
- **Sub-components**:
  - `PricingTable.tsx`: 3 tiered subscription plans (`Startup Swarm` $299/mo, `DAO / Protocol Growth` $1,999/mo, `Enterprise Sovereign` $4,500/mo).
  - `ServiceDetailModal.tsx`: API schema inspector with tabs for JSON Schema, cURL snippet, TypeScript SDK snippet, and Python SDK snippet.
  - `DeployConfigDrawer.tsx`: Interactive deployment drawer with repository input, webhook token, and live simulation runner.

#### Page 7: PortfolioPage (`src/pages/PortfolioPage.tsx`)
- **Key Headers & Text**:
  - Badges: `"Proof of Work & Verifiable Track Record"`, `"100% Cryptographic Verification"` (`lines 235–242`)
  - Title: `"Proof of Work & Ecosystem Contributions"` (`line 246`)
  - Subtitle: `"Live multi-agent ledger of 195+ Pull Requests delivered across 42 open-source ecosystem repositories. Every contribution is engineered with genuine cryptographic primitives, verifiable unit test suites, and zero mock data—delivering continuous labor arbitrage across Web3 and developer infrastructure."` (`lines 249–254`)
  - Aggregate Metric Ribbon:
    - `"Total PRs: 195+ (132 in dataset)"`
    - `"Repositories: 42 Active Repos"`
    - `"Merged PRs: 30 (23% Merge Rate)"`
    - `"Ecosystems: 6+ 100% Zero-Mock"` (`lines 259–328`)
  - Category Filter Pills: `All`, `Stellar / Soroban`, `DeFi & Payments`, `Developer Tools & Infra`, `Bitcoin & L2`.
  - Status Tabs: `All`, `Merged Only (14)`, `Active Pipeline`.
  - Sort Options: `Most PRs`, `Most Merged`, `Repository Name (A-Z)`.
  - 42 Repository Case Study Cards (`src/data/swarm_portfolio.json`):
    - Top Repos: `ADG-VITV/RepoRaid` (23 PRs), `Stellar-IndigoPay/Stellar-IndigoPay` (15 PRs), `StellarCheckMate/Checkmate-Escrow` (11 PRs), `Bitcoindefi/runa` (9 PRs), `AbleeGod/stellar-drips-protocol` (5 PRs), etc.
    - Each card includes: repository link, category badge, total PR badge, merged PR badge, merge acceptance progress bar, expandable PR accordion with status pills (`MERGED`, `OPEN`, `CLOSED`), created dates, and direct links to GitHub PRs.
  - Settlement Card: Verified EVM & Stellar payout boxes.

#### Page 8: NotFoundPage (`src/pages/NotFoundPage.tsx`)
- **Key Headers & Text**:
  - Title: `"404 • Route Not Found"` (`line 13`)
  - Subtitle: `"The requested Swarm sector does not exist or has been re-indexed. Return to the primary command center."` (`line 17`)
  - Return Link: `"Return to Pitch & Simulator"` (`line 27`)

---

### 1.3 Data Mapping Invariants (Must Be Strictly Preserved)

1. **`src/data/swarm_portfolio.json` Data Model & Schema**:
   - `PortfolioProject`: `{ repository: string, html_url: string, total_prs: number, merged_prs: number, prs: PortfolioPR[] }`
   - `PortfolioPR`: `{ title: string, state: 'open' | 'closed', url: string, created_at: string, closed_at: string | null, is_merged: boolean }`
   - Preserved mappings in `PortfolioPage.tsx`:
     - `getRepositoryCategory(repo: string)`: maps keywords (`stellar`, `soroban`, `adamantine`, `revy`, `lynxx`, `runa`, `reporaid`, `chi`, `twenty`, etc.) to `PortfolioCategory` enum.
     - `getCategoryBadgeStyle(category)`: maps category to CSS styles.
     - Aggregate calculation: `totalProjects`, `totalPrs`, `mergedPrs`, `openPrs`, `closedUnmergedPrs`, `mergeRatePercent`, `repositoriesWithMerges`.
     - Card rendering and accordion expansion: `expandedRepos: Set<string>`.

2. **Official Cryptographic Settlement Addresses**:
   - EVM (Base / Arbitrum / Polygon / ETH): `0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89`
   - Stellar / Soroban: `GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC`
   - These addresses are referenced across `Navbar.tsx`, `Footer.tsx`, `GrantsPage.tsx`, `PayoutVerifier.tsx`, `TeaConstitutionViewer.tsx`, `PortfolioPage.tsx`, `strategyDocs.ts`, `marketplaceData.ts`, and test assertions. They must remain verbatim.

3. **Devpost Judging Criteria Model (`devpostCriteria.ts`)**:
   - `CORE_JUDGING_CRITERIA`: 3 criteria with weights 40%, 30%, 30% (Innovation, Architecture, Demo Readiness).
   - `BONUS_MULTIPLIERS_DATA`: 5 multipliers (Gemma 2, Veo, Lyria, Dev.to, Social).
   - `TERMINAL_SIMULATION_STEPS`: 5 phases (`INTAKE_GATEWAY`, `CONTEXT_RAG`, `SANDBOX_SYNTHESIS`, `VICTORY_AUDIT`, `PR_DELIVERY`).
   - `ARCHITECTURE_LAYERS`: 5 layers (Cognitive, Gateway, State, Sandbox, Auditor).

4. **Strategy Document IDs & Structure (`strategyDocs.ts`)**:
   - Document IDs: `b2b`, `pitch`, `roadmap`, `scf`, `plan`.
   - `PITCH_DECK_SLIDES`: 8 slides with `slideNumber`, `title`, `category`, `bullets`, `takeaway`, `speakerNotes`.
   - `ROADMAP_PHASES`: 4 phases with `phase`, `phaseTitle`, `duration`, `deliverables`, `securityGuarantees`, `techStack`.
   - `STELLAR_SCF_GRANT_DATA`: 3 tranches ($40,000, $50,000, $60,000 XLM totaling $150,000 XLM).
   - `MONETIZATION_MODELS`: 3 models (`hybrid`, `syndicate`, `open-core`).
   - `AUDIENCE_ASKS`: 4 asks (`vc`, `grants`, `enterprise`, `sponsors`).

5. **Affiliates Model (`affiliatesData.ts`)**:
   - 4 Tiers: `bronze-scout` (1–9 teams, 10% SaaS / 5% bounty), `silver-hunter` (10–24 teams, 15% SaaS / 7.5% bounty), `gold-commander` (25–49 teams, 20% SaaS / 10% bounty), `diamond-syndicate` (50+ teams, 25% SaaS / 15% bounty).
   - `MarketingAsset`: categories `Social Copy`, `Email Pitch`, `Badges & Markdown`, `Pitch Script`.

6. **Marketplace Model (`marketplaceData.ts`)**:
   - 6 Services: `victory-auditor`, `ci-fixer`, `protocol-keeper`, `bounty-hunter`, `spec-miner`, `webhook-relay`.
   - 3 Plans: `startup` ($299/mo), `growth-dao` ($1,999/mo), `enterprise` ($4,500/mo).

---

## 2. Logic Chain

1. **Premise 1 (Master Goal & Copy Mandate)**: The v2 rewrite requires transforming all copy across the static public site from dense academic/technical jargon into direct, performance-and-ROI focused, layman-accessible language.
   - *Example Transformation*: Instead of `"Stigmergic agents coordinating via immutable AST vector graph state"`, use `"An autonomous AI engineering team that ingests GitHub issues, writes tested code, and fixes bugs 24/7 at 90% lower cost than human payroll."`
   - *Cost Anchor*: Replace a $150k+/yr junior-to-mid developer with a low-cost subscription ($50–$299/mo or $1.50–$10 compute per PR).

2. **Premise 2 (Ground-Truth Copy Alignment)**: The 5 reference files in the brain directory provide the canonical text for the core strategy documents:
   - `B2B_Landing_Page_Copy_v2.md`: Headline `"Replace your $150k dev team for a fraction of the cost."` Value Prop: `"Stop Burning Cash on Routine Engineering. You don't need a senior engineer to fix typos, resolve dependency conflicts, or build standard forms."`
   - `Stellar_SCF_Grant_Application_v2.md`: Award requested: $50,000 in XLM (or $150k total across milestones). Track record: 195+ automated pull requests across 42 projects (OphirPay, Stellar-IndigoPay, GuildPass).
   - `Technical_Roadmap_Multi_Tenant_v2.md`: 4 Phases (Phase 1: Establish AI Workforce, Phase 2: Open Marketplace, Phase 3: Autonomous Expansion, Phase 4: Full Enterprise Automation).
   - `Universal_Bounty_Swarm_Business_Plan_v2.md`: 10x faster shipping times, 90% reduction in routine engineering payroll.
   - `VC_Pitch_Deck_Outline_v2.md`: 70% budget on routine engineering payroll eliminated. $500B+ TAM.

3. **Premise 3 (Zero Architectural Breakage)**:
   - No route alterations (`HashRouter` routes `/pitch`, `/strategy`, `/blog`, `/grants`, `/affiliates`, `/marketplace`, `/portfolio`, `/proof-of-work`, `*`).
   - Visual theme (`bg-obsidian-950`, `text-cyber-cyan`, `text-cyber-volt`, Lucide icons) remains completely intact.
   - Data structures in `swarm_portfolio.json` and `PortfolioPage.tsx` must not have keys renamed or deleted, ensuring filtering, sorting, and aggregate metrics continue functioning seamlessly.

4. **Premise 4 (Test Suite Synchronization)**:
   - Test suites in `src/test/` contain exact string assertions (e.g. `getByText`, `getByRole`).
   - When rewriting copy in page components and data files, the corresponding test files must be updated simultaneously so that `npm test` passes with 100% success and zero TypeScript errors (`npm run build`).

---

## 3. Caveats

- **No Caveats on Survey Completeness**: All 8 pages, all 23 components, all 7 data files, all types, and all 14 test files were directly viewed and verified line-by-line.
- **Assumptions on Strategy Document Alignment**: The strategy viewer components (`StrategyPage.tsx`, `MarkdownDocViewer.tsx`, `strategyDocs.ts`) store both raw markdown and structured objects (e.g. `PITCH_DECK_SLIDES`, `ROADMAP_PHASES`). Both the raw markdown string and the structured fields should be updated to maintain consistency.
- **Stellar SCF Amount Note**: `Stellar_SCF_Grant_Application_v2.md` mentions $50,000 in XLM while `strategyDocs.ts` and `grantsData.ts` structured data models model 3 tranches ($40k, $50k, $60k = $150,000 XLM). The implementation agent can either maintain $150k or scale to $50k tranches as specified in the grant application.

---

## 4. Conclusion

The codebase is exceptionally well-structured, modular, and fully documented. The copy transformation for v2 can be executed smoothly across the 8 pages and data files without altering component architectures, breaking data mappings, or modifying the visual design system.

### Recommended Implementation Roadmap for Swarm Copy v2
1. **Update Ground-Truth Data Files**:
   - `src/data/strategyDocs.ts` (Update all 5 strategy docs and structured slide/phase arrays to v2 copy from brain files).
   - `src/data/devpostCriteria.ts` (Streamline judging criteria and architecture descriptions to focus on ROI, labor arbitrage, and performance).
   - `src/data/blogArticles.ts` (Refine article abstracts, takeaways, and body copy to lead with business utility and reliability).
   - `src/data/affiliatesData.ts` (Sharpen marketing copy, pitch scripts, and social hooks for high-converting ROI messaging).
   - `src/data/marketplaceData.ts` (Ensure service descriptions and taglines emphasize cost savings and speed).
2. **Update UI Page Components**:
   - `Navbar.tsx` & `Footer.tsx` (Direct value statements and clear labels).
   - `PitchPage.tsx` (Hero copy, value prop banner, benchmarks).
   - `StrategyPage.tsx` (B2B pricing and feature value propositions).
   - `BlogPage.tsx` & `ArticleModal.tsx` (Header subtitles and takeaway highlights).
   - `GrantsPage.tsx` (Impact metrics and public goods framing).
   - `AffiliatesPage.tsx` (Value propositions for creators and agencies).
   - `MarketplacePage.tsx` (Micro-service taglines and plan value descriptions).
   - `PortfolioPage.tsx` (Hero subtitle and metric descriptions, preserving all JSON mappings).
   - `NotFoundPage.tsx` (Crisp 404 message and navigation link).
3. **Synchronize Test Assertions**:
   - Update string matchers in `pitch.test.tsx`, `strategy.test.tsx`, `blog.test.tsx`, `affiliates.test.tsx`, `marketplace.test.tsx`, `grants.test.tsx`, `portfolio.test.tsx`, `routing.test.tsx`, and `adversarial_challenge.test.tsx`.
4. **Verification**:
   - Run `npm test` and `npm run build` to confirm 0 test failures and 0 TypeScript compile errors.

---

## 5. Verification Method

To independently verify the findings in this inventory report:

1. **Verify Page & Component Inventory**:
   ```bash
   ls -la /Users/solveetcoagula/teamwork_projects/swarm_public_site/src/pages/
   ls -la /Users/solveetcoagula/teamwork_projects/swarm_public_site/src/components/
   ls -la /Users/solveetcoagula/teamwork_projects/swarm_public_site/src/data/
   ```
2. **Verify Test Suite Status**:
   ```bash
   cd /Users/solveetcoagula/teamwork_projects/swarm_public_site
   npm test
   ```
3. **Verify Static TypeScript Build**:
   ```bash
   cd /Users/solveetcoagula/teamwork_projects/swarm_public_site
   npm run build
   ```
4. **Invalidation Conditions**:
   - If any page component is added or deleted from `src/pages/`.
   - If keys in `src/data/swarm_portfolio.json` are renamed or removed.
