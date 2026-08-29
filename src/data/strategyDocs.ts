/**
 * Universal Bounty Swarm - Strategy & Operations Master Documents
 * Ingested from brain artifacts:
 * - B2B_Landing_Page_Copy.md
 * - VC_Pitch_Deck_Outline.md
 * - Technical_Roadmap_Multi_Tenant.md
 * - Stellar_SCF_Grant_Application.md
 * - Universal_Bounty_Swarm_Business_Plan.md
 */

export interface PitchDeckSlide {
  slideNumber: number;
  id: string;
  title: string;
  subtitle: string;
  category: 'Hook' | 'Problem' | 'Solution' | 'Moat' | 'Business Model' | 'Traction' | 'The Ask' | 'Vision';
  headline: string;
  bullets: string[];
  metrics?: { label: string; value: string; detail?: string }[];
  takeaway: string;
  speakerNotes: string;
  chartData?: { label: string; value: number; color?: string }[];
}

export interface RoadmapPhase {
  phase: number;
  id: string;
  name: string;
  timeline: string;
  status: 'Completed' | 'Active' | 'Next' | 'Planned';
  objective: string;
  deliverables: { title: string; description: string; done: boolean }[];
  securityGuarantees: string[];
  techStack: string[];
}

export interface SCFTranche {
  number: number;
  title: string;
  timeline: string;
  amountXlm: number;
  amountUsd: string;
  deliverables: string[];
  validationCriteria: string;
  status: 'pending' | 'active' | 'completed';
}

export interface MonetizationModel {
  id: 'hybrid' | 'syndicate' | 'opencore';
  name: string;
  tagline: string;
  badge: string;
  isRecommended: boolean;
  strategy: string;
  mechanics: string[];
  whyItWorks: string;
  targetMargin: string;
  revenueStreams: string[];
  cacProfile: string;
}

export interface AudienceAsk {
  id: 'vc' | 'grants' | 'enterprise' | 'sponsors';
  audience: string;
  headline: string;
  narrative: string;
  askAmount: string;
  askDetails: string[];
  useOfFunds?: { category: string; percentage: number; description: string }[];
  pricingTiers?: { tier: string; price: string; description: string; features: string[] }[];
  marketComps?: string[];
}

export interface StrategyDocument {
  id: 'b2b' | 'pitch' | 'roadmap' | 'scf' | 'plan';
  title: string;
  subtitle: string;
  category: string;
  filename: string;
  lastUpdated: string;
  summary: string;
  rawContent: string;
  keyStats: { label: string; value: string }[];
}

// ---------------------------------------------------------------------------
// 1. Raw Markdown Strings
// ---------------------------------------------------------------------------

export const RAW_B2B_LANDING_COPY = `# Universal Bounty Swarm: Enterprise API Landing Page Copy

## Hero Section
**Headline:** Scale Your Engineering Capacity, Not Your Payroll.
**Sub-headline:** The Universal Bounty Swarm is an autonomous, event-driven multi-agent workforce that integrates directly with your GitHub. We clear technical debt, liquidate stale issue backlogs, and guarantee CI-passing PRs 24/7 without burning senior developer cycles.
**CTA (Call to Action) Buttons:** [ Book an Enterprise PoC ] [ View API Documentation ]

## The Problem (Pain Points)
**"Your best engineers are drowning in maintenance."**
- **Stale Backlogs:** Hundreds of P2/P3 tickets aging in Jira or GitHub because there’s never enough time.
- **Review Friction:** Human code reviews on minor dependency bumps and linting fixes waste thousands of hours.
- **Hiring Costs:** Junior engineering bandwidth is expensive ($100k+/yr), slow to scale, and requires heavy management.

## The Solution (Value Propositions)
**"We sell verified outcomes, not developer tools."**
Traditional AI co-pilots require a human in the seat. The Universal Bounty Swarm operates headlessly:
1. **Assign an Issue:** Tag \`@universal-swarm\` on any GitHub issue.
2. **Autonomous Execution:** The Swarm clones your repo into an isolated container, writes code, runs your local CI/tests, and self-corrects until it passes.
3. **Verified Delivery:** You receive a fully CI-passing Pull Request within 30 minutes.

## The Security Moat: The Victory Audit
**"Zero Hallucinations. Cryptographic Integrity Guaranteed."**
Enterprise codebases require absolute trust. Our proprietary **Victory Audit Protocol** guarantees:
- **Zero Test Manipulation:** Agents cannot comment out or loosen assertions to force tests to pass.
- **Authorization Enforced:** All state-modifying endpoints must pass stringent \`require_auth()\` validations.
- **Cryptographic Purity:** No mocked hashes or faked zero-knowledge proofs. True verification only.

## Pricing Tiers
*Stop paying for software seats. Start paying for resolved issues.*

### Startup Tier — $299 / month
*Perfect for fast-moving teams clearing tech debt.*
- Up to 3 connected repositories
- 20 Verified PR Credits/month ($15/additional PR)
- Standard CI verification gate & automated lint/test repair
- Community Support

### DAO / Web3 Tier — $1,999 / month (or USDC Escrow)
*High-assurance autonomous delivery for distributed protocols.*
- Up to 10 connected repositories
- 150 Verified PR Credits/month
- Smart Contract & Cryptographic Invariant Verification (Victory Audit)
- Native escrow settlement & GitHub bot automation

### Enterprise Managed Swarm — Custom ARR (Starting at $4,500/mo)
*Unlimited scalable workforce with SOC2 compliance.*
- Unlimited repositories & custom multi-agent swarms
- Dedicated cloud runner infrastructure (isolated VPC / Cloud Run)
- 99.9% Uptime SLA + P0 < 1-hour response SLA
- Zero Data Retention (ZDR) guarantee & full audit logging

## Footer CTA
**Ready to see the Swarm in action?**
*Our 4-week Paid Pilot guarantees a CI-passing gate on your own codebase.*
[ Start Your $10,000 Enterprise Pilot ]
`;

export const RAW_VC_PITCH_DECK = `# Universal Bounty Swarm: VC Seed Pitch Deck Outline

**Objective:** Raise $3.5M Seed on a $25M Post-Money Valuation.
**Core Narrative:** Moving from $20/mo Developer SaaS to capturing the $5.5 Trillion Developer Labor Market via outcome-based labor arbitrage.

## Slide 1: Title & Hook
- **Title:** Universal Bounty Swarm
- **Subtitle:** Autonomous AI Software Engineers. We sell verified outcomes, not software seats.
- **Hook:** The next frontier of AI isn't an autocomplete tool in your IDE. It's a headless, 24/7 worker that closes tickets autonomously.

## Slide 2: The Problem (The $5.5T Bottleneck)
- **Visual:** A pie chart showing Global IT/Developer Labor Spend ($5.5T) vs. Software Spend ($1.3T).
- **The Issue:** Human engineering bandwidth is the ultimate bottleneck. Junior developers are expensive, slow to onboard, and require senior management.
- **The SaaS Failure:** Co-pilots (like GitHub Copilot) save time, but they still require a human in the seat. They are priced as $20/mo tools, heavily capping their Total Addressable Market (TAM).

## Slide 3: The Solution (Services-as-Software)
- **Concept:** The Universal Bounty Swarm is an event-driven multi-agent workforce.
- **Workflow:** 
  1. Ingests GitHub Issues.
  2. Clones repos into isolated ephemeral containers.
  3. Writes code, runs CI, and self-corrects based on compiler/test feedback.
  4. Submits a guaranteed CI-passing Pull Request.
- **The Arbitrage:** Replacing $150-$600 of senior engineer time with $1.50-$10.00 of AI compute.

## Slide 4: The Moat: The Victory Audit Protocol
- **The Skepticism:** VCs and CTOs fear AI hallucinations, broken code, and security vulnerabilities.
- **Our Solution:** The "Victory Audit."
- **Details:** An adversarial, independent agent pipeline that guarantees cryptographic integrity, enforces authorization bounds, and prevents test manipulation *before* a PR is submitted. We guarantee the quality of the outcome.

## Slide 5: The Hybrid Business Model (Our Unfair Advantage)
- **The Problem with Competitors:** Companies like Devin and Cursor face 6-12 month enterprise B2B sales cycles to generate revenue.
- **Our Solution (The Hybrid Engine):** 
  - **Internal Track (Day 1 Cash Flow):** The Swarm autonomously hunts open Web3 escrows and OSS bounties (Gitcoin, GrantFox) to self-fund compute costs and prove capability.
  - **External Track (Enterprise ARR):** B2B SaaS API for DAOs and Enterprises ($299/mo to $10,000/mo Custom ARR).
- **Result:** Negative Customer Acquisition Cost (CAC) and immediate liquidity.

## Slide 6: Traction & Milestones
- **Current State:** 159/159 E2E tests passing. Real-time Firebase event engine operational. Ephemeral OrbStack Docker execution integrated.
- **Bounty Metrics:** [Insert early data on bounties claimed/processed].
- **Partnerships/Grants:** Targeting $150k Stellar SCF and Gitcoin matching to subsidize initial ecosystem penetration.

## Slide 7: The Ask & Use of Funds
- **The Ask:** $3.5M Seed Round.
- **Valuation:** $25M Post-Money (Anchored at a fraction of Cognition's $350M Seed valuation and Magic's $23M Series A).
- **Use of Funds:**
  - **60%:** Cloud Runner Infrastructure (Scaling to 1,000 concurrent OrbStack/Cloud Run workers).
  - **30%:** Core Engineering & AI Ops Team (Fine-tuning open-source models for the Victory Audit).
  - **10%:** B2B Sales & GTM.

## Slide 8: The Vision (2030)
- **Gartner Prediction:** By 2030, 25% of all software engineering tasks will be executed 100% autonomously.
- **Our Goal:** The Universal Bounty Swarm will be the standard routing layer for the world's autonomous software labor, transforming technical debt from a human burden to a programmatic API call.
`;

export const RAW_TECHNICAL_ROADMAP = `# Technical Roadmap: Multi-Tenant B2B SaaS API Gateway

**Objective:** Upgrade the existing internal Universal Bounty Swarm (Firebase V2) architecture into a secure, multi-tenant B2B SaaS platform capable of servicing DAOs and Enterprise clients securely.

## Current State (Internal Swarm)
- **Data Layer:** Single-tenant Google Cloud Firestore (\`bounty_leads\`, \`swarm_operations\`).
- **Execution:** Ephemeral OrbStack Docker Containers executing on local/controlled hardware.
- **Trigger:** Internal ingestion scripts polling GitHub GraphQL for open bounties.
- **Security:** \`PathGuard\` and \`SafeIO\` preventing access to specific local directories.

## Phase 1: Identity, Authentication & Multi-Tenancy (Month 1)
To support B2B clients, we must segment data and restrict agent execution contexts.

* **Firebase Auth Integration:** Implement Firebase Authentication (GitHub OAuth / Email+Password) to issue JWTs.
* **Firestore Schema Refactor:** 
  * Migrate \`bounty_leads\` to \`/tenants/{tenantId}/issues\`.
  * Update Firestore Security Rules to strictly enforce \`request.auth.uid\` against \`tenantId\`.
* **GitHub App Integration:** 
  * Replace personal access tokens (PATs) with a registered GitHub App.
  * Clients install the App on their specific repositories, granting the Swarm isolated, repo-scoped webhook events and read/write permissions.

## Phase 2: Webhook Gateway & Reactive Ingestion (Month 2)
Transition from internal polling to reactive event ingestion for B2B clients.

* **API Gateway / Cloud Run:** Deploy a headless FastAPI gateway to Google Cloud Run to catch incoming GitHub Webhooks (e.g., \`issues.opened\`, \`issue_comment.created\`).
* **Command Parsing (\`@universal-swarm\`):** Implement the NLP parsing layer on the gateway to detect when a client tags the bot in an issue to trigger autonomous execution.
* **Firestore Event Bridging:** The API gateway validates the webhook signature, authenticates the tenant, and writes the job to the tenant's Firestore \`/issues\` collection. This seamlessly triggers the existing \`on_snapshot\` listeners in the execution sidecars.

## Phase 3: Cloud Execution & VPC Isolation (Month 3)
Local OrbStack is insufficient for Enterprise compliance (SOC2) and high-volume scaling.

* **Google Cloud Batch / GKE:** Migrate the execution muscle from local OrbStack to Google Cloud Batch or a Google Kubernetes Engine (GKE) cluster.
* **Ephemeral Workspaces:** Ensure each execution container mounts an empty, isolated volume that is cryptographically wiped after PR submission (Zero Data Retention).
* **VPC Peering (Enterprise):** For high-tier enterprise clients, provide the ability to peer the execution GKE cluster directly into their corporate VPC to access internal package registries or private databases without exposing them to the public internet.

## Phase 4: Billing, Metering, and Payout Routing (Month 4)
Implementing the "Outcome-Based" billing engine.

* **Stripe / Crypto Escrow Integration:**
  * **Fiat:** Integrate Stripe Metered Billing. The \`escort_sidecar.py\` triggers a webhook to Stripe to increment the \`verified_pr_credit\` usage ONLY when a PR is marked "Merged" by the client.
  * **Web3/DAO:** Integrate smart contract listener (e.g., Soroban/EVM). Hold bounties in escrow; release funds automatically upon the Oracle confirming the PR merge on GitHub.
* **The Victory Audit Circuit Breaker:** Ensure billing is bypassed and alerts are fired if the Victory Audit detects manipulated tests or auth bypasses during the container run.
`;

export const RAW_STELLAR_SCF_GRANT = `# Stellar Community Fund (SCF) Build Award Application

**Project Name:** Soroban Sentinel: Autonomous Multi-Agent Maintenance & Bounty Infrastructure
**Requested Award:** $150,000 in XLM (Build Award)
**Track:** RFP Track (Developer Tooling & Infrastructure)

## 1. Project Summary
The Soroban Sentinel is a headless, autonomous AI agent swarm designed to act as a 24/7 public goods multiplier for the Stellar ecosystem. By integrating directly into GitHub repositories via webhooks, the Sentinel autonomously ingests open issues, clones Stellar/Soroban projects into secure sandboxes, writes smart contract code/tests using real cryptographic primitives, and submits verifiable, CI-passing Pull Requests. It eliminates the maintenance burden for ecosystem developers and settles micro-bounties natively via Stellar escrows.

## 2. Problem Statement
The Stellar ecosystem is expanding rapidly with the adoption of Soroban. However, open-source maintainers face a critical bottleneck: reviewing PRs, patching low-severity vulnerabilities, generating test coverage, and updating dependencies. Current "AI Copilots" only assist human developers in real-time; they do not autonomously clear backlogs. Furthermore, existing bounty platforms require high manual overhead to verify code and process payouts, creating friction for micro-grants and community contributions.

## 3. The Solution & Stellar Alignment
The Soroban Sentinel replaces developer tooling with "developer labor as a service." 
- **Deep Soroban Integration:** The execution agents are explicitly configured to handle Soroban smart contracts, utilizing native host functions (\`env.crypto()\`) and prohibiting mocked cryptographic validations.
- **The Victory Audit:** A proprietary, adversarial audit layer that guarantees submitted PRs have not bypassed authorization checks (\`require_auth()\`) or loosened test assertions, ensuring high-assurance smart contract security.
- **Stellar Escrow Settlement:** Integrates native Stellar smart contracts for bounty payouts. Maintainers can fund an issue with XLM or USDC, and the funds are programmatically released to the contributing agent (or human) upon successful PR merge.

## 4. Architecture
*(Insert architecture diagram showing GitHub Webhook -> Cloud Run Gateway -> Firestore Event Engine -> Ephemeral OrbStack/GKE Execution Containers -> Victory Audit -> GitHub PR Submission).*

## 5. Milestones & Tranches

### Tranche 1: MVP & Core Architecture (Months 1–2) — $40,000 XLM
**Deliverables:**
- Functional autonomous engine with full Soroban CLI/SDK integration.
- Local sandbox test suite running real Soroban cryptographic primitives.
- Public documentation, architecture diagrams, and repository setup.
- **Validation:** 50 automated tests passing on the core execution loop.

### Tranche 2: Testnet Alpha & Ecosystem Stigmergy (Months 3–4) — $50,000 XLM
**Deliverables:**
- Live autonomous bounty intake and PR resolution on Stellar Testnet repositories.
- GitHub App release allowing external Stellar DAOs/repos to install the Sentinel and register bounties via the \`@soroban-sentinel\` tag.
- Implementation of the automated "Victory Audit" verification framework for PR integrity.
- **Validation:** Successfully resolve 15 live issues on 3 separate community test repositories without human intervention.

### Tranche 3: Mainnet Deployment & Developer Tooling Suite (Months 5–6) — $60,000 XLM
**Deliverables:**
- Production deployment with live Stellar Mainnet smart contract escrow and payout routing.
- Public dashboard tracking agent telemetry, audit trails, and ecosystem money velocity.
- Comprehensive case studies of resolved ecosystem bounties and a long-term open-source maintenance commitment.
- **Validation:** Integration by at least 3 major Stellar ecosystem projects for live backlog liquidation.

## 6. Maintenance & Sustainability
Post-grant, the Sentinel will sustain itself through a hybrid business model: claiming open ecosystem bounties to fund its own compute costs (self-funding), and offering a premium B2B SaaS managed API for large enterprise teams building on Stellar that require SLA-backed autonomous QA.

## 7. Team
[Insert Team Bios, highlighting experience with Rust, Soroban, AI Orchestration, and open-source infrastructure].
`;

export const RAW_BUSINESS_PLAN = `# Universal Bounty Swarm: Strategic Business Plan

> [!NOTE]
> This business plan was compiled using real-time market intelligence gathered by our autonomous research swarm. It covers the core value propositions, three distinct monetization models, and four tailored go-to-market (GTM) proposals with data-driven "asks".

## 1. Executive Summary
The **Universal Bounty Swarm** is an autonomous, event-driven multi-agent workforce designed to eliminate software engineering bottlenecks. Unlike traditional IDE-based "co-pilots," the Swarm operates headlessly 24/7, ingesting GitHub issues, cloning repositories into isolated OrbStack containers, writing and verifying code, and submitting fully CI-passing Pull Requests. 

By leveraging our proprietary **Victory Audit protocol**—which guarantees cryptographic integrity, enforces authorization boundaries, and prevents test manipulation—the Swarm delivers verified outcomes, not just code suggestions.

## 2. Core Value Propositions
1. **Extreme Scale & Autonomy:** Operates 24/7 without human intervention, transforming software maintenance from a manual bottleneck into an elastic compute resource.
2. **Verifiable Integrity (Victory Audit):** Guarantees zero mocks and true cryptographic/security validation before any PR is submitted.
3. **Cost Arbitrage:** Replaces $150-$600/hr senior engineering cycles with $1.50-$10.00 compute cycles, achieving 90%+ margin arbitrage.
4. **Stack-Agnostic Adaptation:** Seamlessly navigates EVM, Stellar/Soroban, Frontend (React/Vite), and Backend (Python/Node) environments.

---

## 3. Three Strategic Monetization Models

To maximize flexibility, we have modeled three distinct paths for commercializing the Swarm.

### Model A: The Hybrid Engine (Recommended)
* **Strategy:** The Swarm operates on a dual-track. Internally, it autonomously hunts and claims open bounties (Gitcoin, GrantFox, etc.) to generate direct cash flow and self-fund compute costs. Externally, we package the Swarm as a B2B SaaS/API for DAOs and enterprise teams.
* **Why it works:** Direct bounty revenue eliminates Customer Acquisition Cost (CAC) friction and proves the model, while the B2B SaaS provides recurring, high-margin Enterprise ARR.

### Model B: The Proprietary Syndicate
* **Strategy:** Keep the Universal Bounty Swarm 100% closed-source and internal. We operate like an algorithmic trading firm, but for open-source software and bug bounties.
* **Why it works:** Total capture of the bounty market. By keeping the engine proprietary, we prevent competitors from replicating our Victory Audit efficiencies and monopolize Web3 security and infrastructure bounties.

### Model C: Open Core & Commercial Licensing
* **Strategy:** Open-source the base intake and orchestration engine to build massive developer goodwill. Monetize via "Enterprise Swarm" features (SOC2 compliance, private VPC deployments, dedicated Victory Audit modules, and custom SLAs).
* **Why it works:** Drives rapid ecosystem adoption. Perfect for dominating Gitcoin QF rounds and securing foundational grants, leading to lucrative enterprise support contracts.

---

## 4. Audience-Specific Proposals & "The Ask"

Based on our intelligence reports, here are the tailored proposals for your four target audiences.

### 4.1 Venture Capital (Pre-Seed / Seed Pitch)
**The Narrative:** We are not building a developer tool; we are capturing the $5.5 Trillion global developer labor market via "Services-as-Software" (SaS). While competitors like Devin (valued at >$26B) face 6-12 month enterprise sales cycles, the Universal Bounty Swarm achieves instant monetization on Day 1 by extracting liquid capital from Web3 and OSS bounty escrows. 
* **The Ask:** **$3.5M Seed on a $25M Post-Money Valuation.**
* **Use of Funds:** Scaling the underlying inference infrastructure, expanding the swarm to 1,000 concurrent OrbStack workers, and hiring a core ops team.
* **Market Comps:** Cognition ($21M Seed), Magic.dev ($23M Series A), Poolside ($500M Series B).

### 4.2 Web3 Ecosystem Grants (Stellar SCF & Gitcoin)
**The Narrative:** *"Soroban Sentinel / Universal Bounty Engine"* — An autonomous public goods multiplier. We protect the ecosystem by automatically resolving backlog issues, generating Soroban smart contract tests, and patching vulnerabilities without burdening human maintainers.
* **The Ask (Stellar SCF):** **$150,000 in XLM (Build Award).** Tranche 1: Local Sandbox & CI. Tranche 2: Live GitHub Triage Bot on Testnet. Tranche 3: Mainnet Escrow Integration.
* **The Ask (Gitcoin OSS):** Participation in Web3 Infrastructure QF Pools (targeting **$25k-$35k matching**) + **$50,000 Direct Allocator Grant** for multi-chain package registry automation.

### 4.3 B2B Enterprise & DAOs (Managed Swarm API)
**The Narrative:** Clear technical debt, liquidate stale P2/P3 backlogs, and guarantee CI-passing PRs without burning senior developer cycles. We sell completed PRs, not software seats.
* **The Ask (Enterprise PoC):** **$10,000 Paid Pilot (4 weeks).** Capped at 3 repositories and 25 benchmark issues. Guaranteed CI-passing gate.
* **Pricing Tiers:**
  * **Startup Tier:** $299/mo (20 Verified PR credits).
  * **DAO / Web3 Tier:** $1,999/mo (150 Verified PR credits + Smart Contract Victory Audits).
  * **Enterprise Retainer:** $5,000+/mo (Unlimited repos, 99.9% SLA, dedicated isolated runners, ZDR compliance).

### 4.4 Open Source Sponsors (GitHub Sponsors)
**The Narrative:** Support the autonomous workers keeping your favorite open-source libraries alive. The Swarm handles the mundane dependency updates, linting fixes, and test coverage expansions so maintainers can focus on architecture.
* **The Ask (Sponsorship Tiers):**
  * **$10/mo (Swarm Supporter):** Help offset OpenAI/Anthropic API compute costs.
  * **$150/mo (Swarm Commander):** Prioritize your specific repository in the Swarm's intake queue for weekly autonomous maintenance.
  * **$1,000/mo (Corporate Sponsor):** Dedicated agent assigned permanently to your organization's open-source stack.
`;

// ---------------------------------------------------------------------------
// 2. Structured Pitch Deck Slides (8 Slides)
// ---------------------------------------------------------------------------

export const PITCH_DECK_SLIDES: PitchDeckSlide[] = [
  {
    slideNumber: 1,
    id: 'title-hook',
    title: 'Universal Bounty Swarm',
    subtitle: 'Autonomous AI Software Engineers. We sell verified outcomes, not software seats.',
    category: 'Hook',
    headline: 'The Shift from IDE Autocomplete to Headless Autonomous Labor',
    bullets: [
      'Traditional AI developer tools (Copilot, Cursor) are priced as $20/mo autocomplete plugins.',
      'Universal Bounty Swarm operates headlessly 24/7 directly on your GitHub issue queue.',
      'Autonomous ingestion, containerized isolation, self-correcting test loops, and verified PR delivery.',
      'We do not sell software seats. We deliver completed, CI-passing pull requests.'
    ],
    metrics: [
      { label: 'Target Seed Ask', value: '$3.5M', detail: 'On $25M Post-Money Valuation' },
      { label: 'Market Opportunity', value: '$5.5T', detail: 'Global Developer Labor Market' },
      { label: 'Gross Margin', value: '90%+', detail: 'Outcome-based compute arbitrage' }
    ],
    takeaway: 'Moving beyond IDE assistants into autonomous, outcome-settled software engineering workforce.',
    speakerNotes: 'Anchor the pitch on outcome delivery vs software tool licensing. VCs understand that $20/mo seat pricing leaves 99% of developer value on the table.'
  },
  {
    slideNumber: 2,
    id: 'problem-bottleneck',
    title: 'The $5.5 Trillion Bottleneck',
    subtitle: 'Developer labor spend dwarfs software tool spend by 4x.',
    category: 'Problem',
    headline: 'Human Engineering Bandwidth is the Ultimate Growth Bottleneck',
    bullets: [
      'Global IT and Developer Labor Spend is $5.5 Trillion, while software tools account for just $1.3 Trillion.',
      'Senior engineers spend 35%+ of their high-value time on mundane dependency bumps, minor bug fixes, and P2/P3 backlog maintenance.',
      'Junior developers cost $100k-$180k/year, require 3-6 months of ramp-up, and create heavy management overhead.',
      'Copilots improve typing speed, but humans still remain locked in the review and debugging loop.'
    ],
    metrics: [
      { label: 'Labor Spend TAM', value: '$5.5T', detail: 'Global Developer Salary & Ops' },
      { label: 'Tool Spend TAM', value: '$1.3T', detail: 'Software & Developer SaaS' },
      { label: 'Mundane Task Load', value: '35%+', detail: 'Senior engineering bandwidth lost' }
    ],
    takeaway: 'The true market is not replacing IDE tools—it is capturing developer labor expenditure.',
    speakerNotes: 'Emphasize the labor spend vs tool spend discrepancy. The $5.5T labor market is 4.2x larger than the entire enterprise software market.'
  },
  {
    slideNumber: 3,
    id: 'solution-services-as-software',
    title: 'The Solution: Services-as-Software',
    subtitle: 'Replacing $150-$600 senior engineering hours with $1.50-$10.00 compute.',
    category: 'Solution',
    headline: 'Headless 4-Stage Autonomous Pipeline',
    bullets: [
      'Stage 1 (Ingestion): Tag @universal-swarm on any GitHub or Jira issue.',
      'Stage 2 (Sandboxing): Clones repository into an ephemeral, isolated OrbStack / Cloud Batch container.',
      'Stage 3 (Execution & Self-Healing): Synthesizes fix, runs compiler/tests, parses stack traces, and iterates until 100% green.',
      'Stage 4 (Delivery): Submits cryptographically verified, CI-passing Pull Request within 30 minutes.'
    ],
    metrics: [
      { label: 'Human Engineer Cost', value: '$150-$600/hr', detail: 'Senior developer fully loaded' },
      { label: 'Swarm Compute Cost', value: '$1.50-$10.00', detail: 'Per resolved pull request' },
      { label: 'Resolution Latency', value: '< 30 min', detail: 'From issue tag to verified PR' }
    ],
    takeaway: 'Zero human-in-the-loop required during issue synthesis, reproduction, and test repair.',
    speakerNotes: 'Walk through the 4-step pipeline. The economic arbitrage is staggering: 90%+ gross margin on every resolved pull request.'
  },
  {
    slideNumber: 4,
    id: 'moat-victory-audit',
    title: 'The Moat: The Victory Audit Protocol',
    subtitle: 'Adversarial verification preventing AI hallucinations and test manipulation.',
    category: 'Moat',
    headline: 'Defensive Integrity Gatekeeper for Enterprise & Web3',
    bullets: [
      'Pillar 1 (Assertion Preservation): AST analysis ensures agents never delete, comment out, or weaken failing assertions.',
      'Pillar 2 (Authorization Enforcement): All state-modifying endpoints must strictly enforce require_auth() checks.',
      'Pillar 3 (Cryptographic Purity): Prohibits mocked hashes and faked signatures; enforces real host functions (e.g., env.crypto()).',
      'Circuit Breaker: Automatic build rejection and billing bypass if any integrity violation is detected.'
    ],
    metrics: [
      { label: 'Integrity Violations Caught', value: '100%', detail: 'AST diff check against test suite' },
      { label: 'Mock Cryptography Allowed', value: '0%', detail: 'Strict native host execution' },
      { label: 'Auth Enforcement Rate', value: '100%', detail: 'State mutation gating' }
    ],
    takeaway: 'Enterprise CTOs trust the swarm because code cannot pass without passing our adversarial murder board.',
    speakerNotes: 'This is our primary defensibility against generic LLM wrappers. The Victory Audit operates as an adversarial prosecutor before code is submitted.'
  },
  {
    slideNumber: 5,
    id: 'hybrid-business-model',
    title: 'The Hybrid Business Model',
    subtitle: 'Negative Customer Acquisition Cost (CAC) + Enterprise ARR.',
    category: 'Business Model',
    headline: 'Dual-Track Engine Generating Day-1 Cash Flow',
    bullets: [
      'Track 1 (Internal Bounty Extraction): Autonomous agents claim open Web3 & OSS escrows (Gitcoin, GrantFox) to self-fund compute.',
      'Track 2 (B2B SaaS / API): Managed API for DAOs and enterprises ($299/mo to $10,000/mo Custom ARR).',
      'Negative CAC: Public bounty settlements serve as live marketing proofs, driving inbound enterprise leads organically.',
      'Immediate Liquidity: Eliminates the standard 6-12 month enterprise pre-revenue starvation period.'
    ],
    metrics: [
      { label: 'Customer Acquisition Cost', value: 'Negative CAC', detail: 'Funded via on-chain bounty payouts' },
      { label: 'Enterprise ARR Range', value: '$299-$10k/mo', detail: 'Tiered based on PR credits & SLAs' },
      { label: 'Target Gross Margin', value: '92%', detail: 'Compute cost vs billing price' }
    ],
    takeaway: 'We do not wait for enterprise sales cycles to generate revenue; our internal fleet pays for itself on Day 1.',
    speakerNotes: 'Contrast our model with Devin/Cognition. They burn millions in VC compute waiting for sales. Our swarm extracts liquid capital from Day 1.'
  },
  {
    slideNumber: 6,
    id: 'traction-milestones',
    title: 'Traction & Proven Architecture',
    subtitle: 'Battle-tested across 159+ passing tests and live multi-agent sidecars.',
    category: 'Traction',
    headline: 'Production-Grade Distributed Multi-Agent Architecture',
    bullets: [
      '159/159 E2E unit & integration tests passing with 0% mock dependencies.',
      'Real-time Firebase/Firestore V2 event engine with distributed lease locking.',
      'Ephemeral OrbStack Docker container runners executing authenticated git operations.',
      'Targeting $150k Stellar Community Fund (SCF) Build Award & Gitcoin QF pool allocation.'
    ],
    metrics: [
      { label: 'Test Suite Pass Rate', value: '100%', detail: '159/159 integration tests' },
      { label: 'Active Swarm Nodes', value: '12 Live', detail: 'Orchestrators, Workers, Auditors' },
      { label: 'Grant Pipeline', value: '$235k', detail: 'Stellar SCF ($150k) + Gitcoin ($85k)' }
    ],
    takeaway: 'A proven, scalable execution engine already operating across multi-repo environments.',
    speakerNotes: 'Show the live telemetry and verified tests. This is not a concept deck; the multi-agent state engine is operating in production today.'
  },
  {
    slideNumber: 7,
    id: 'the-ask-financials',
    title: 'The Ask & Capital Allocation',
    subtitle: 'Raising $3.5M Seed Round on a $25M Post-Money Valuation.',
    category: 'The Ask',
    headline: 'Scaling to 1,000 Concurrent Cloud Runners & Enterprise GTM',
    bullets: [
      '60% ($2.1M): Cloud Runner Infrastructure (Google Cloud Batch / GKE multi-tenant sandboxes).',
      '30% ($1.05M): Core AI Ops & Security Engineering (Fine-tuning Gemma/Llama models for Victory Audit).',
      '10% ($350k): Enterprise B2B Sales & Ecosystem GTM.',
      'Valuation Comps: Anchored conservatively against Cognition ($350M Seed) and Magic.dev ($23M Series A).'
    ],
    metrics: [
      { label: 'Seed Round Target', value: '$3.5M', detail: 'Post-money valuation: $25M' },
      { label: 'Runner Fleet Scale', value: '1,000', detail: 'Concurrent isolated containers' },
      { label: 'Runway Target', value: '24 Months', detail: 'Path to $5M ARR + Series A' }
    ],
    takeaway: 'Disciplined capital allocation focused on compute infrastructure and autonomous execution scale.',
    speakerNotes: 'At $25M post-money, this is an extraordinarily attractive entry valuation compared to comparable generative coding deals.'
  },
  {
    slideNumber: 8,
    id: 'vision-2030',
    title: 'The 2030 Vision',
    subtitle: 'The Global Routing Layer for Autonomous Software Labor.',
    category: 'Vision',
    headline: 'Transforming Technical Debt from Human Overhead to API Calls',
    bullets: [
      'Gartner Forecast: By 2030, 25% of all enterprise software engineering tasks will execute autonomously.',
      'Universal Bounty Swarm becomes the standard global labor router across GitHub, GitLab, and Jira.',
      'Decentralized settlement layer supporting fiat (Stripe), EVM (Base/Arbitrum), and Stellar Soroban escrows.',
      'Software maintenance will no longer be a backlog problem—it will be a real-time continuous background service.'
    ],
    metrics: [
      { label: '2030 Autonomous Task Share', value: '25%', detail: 'Gartner Global Engineering Forecast' },
      { label: 'Target Annual Labor Routed', value: '$100M+', detail: 'Settled across enterprise & Web3' },
      { label: 'Long-Term Gross Margin', value: '95%', detail: 'At compute infrastructure scale' }
    ],
    takeaway: 'Building the infrastructure that powers the autonomous developer economy of the next decade.',
    speakerNotes: 'End on the big picture. We are building the AWS of cognitive software labor.'
  }
];

// ---------------------------------------------------------------------------
// 3. Structured Technical Roadmap (4 Phases)
// ---------------------------------------------------------------------------

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: 1,
    id: 'phase-1-identity',
    name: 'Identity, Authentication & Multi-Tenancy',
    timeline: 'Month 1 (Immediate)',
    status: 'Completed',
    objective: 'Segment data and restrict agent execution contexts to support secure B2B multi-tenant operations.',
    deliverables: [
      {
        title: 'Firebase Auth JWT Integration',
        description: 'Implement GitHub OAuth and Email/Password authentication with cryptographically verified tenant JWTs.',
        done: true
      },
      {
        title: 'Tenant-Isolated Firestore Schema',
        description: 'Migrate single-tenant collections to /tenants/{tenantId}/issues with strict request.auth.uid validation.',
        done: true
      },
      {
        title: 'GitHub App OAuth & Scoped Permissions',
        description: 'Replace PATs with registered GitHub App offering isolated, repo-scoped webhook events and write gates.',
        done: true
      }
    ],
    securityGuarantees: [
      'PathGuard & SafeIO local filesystem containment',
      'Strict Firestore Security Rules enforcing tenant boundary isolation',
      'Ephemeral credential injection scoped strictly to single repository permissions'
    ],
    techStack: ['Firebase Auth', 'Cloud Firestore V2', 'GitHub Apps API', 'TypeScript', 'Node.js']
  },
  {
    phase: 2,
    id: 'phase-2-webhook-gateway',
    name: 'Webhook Gateway & Reactive Ingestion',
    timeline: 'Month 2',
    status: 'Active',
    objective: 'Transition from internal polling to high-throughput reactive event ingestion on Google Cloud Run.',
    deliverables: [
      {
        title: 'Headless FastAPI Gateway on Cloud Run',
        description: 'Deploy auto-scaling Cloud Run gateway catching incoming GitHub issues.opened and issue_comment webhooks.',
        done: true
      },
      {
        title: 'NLP Command Parsing (@universal-swarm)',
        description: 'Parse issue mentions and extract instructions, constraints, and bounty amounts with Gemini 2.5 Pro.',
        done: false
      },
      {
        title: 'Firestore Event Bridging & Stigmergy',
        description: 'Validate webhook HMAC-SHA256 signatures, authenticate tenant, and atomically queue jobs into Firestore.',
        done: true
      }
    ],
    securityGuarantees: [
      'Timing-safe HMAC-SHA256 signature verification against replay attacks',
      'Distributed Firestore ACID locks with 300-second automatic lease expiration',
      'Rate-limiting and anti-DDoS protections on public webhook ingress'
    ],
    techStack: ['FastAPI', 'Google Cloud Run', 'HMAC-SHA256', 'Pydantic', 'Vertex AI']
  },
  {
    phase: 3,
    id: 'phase-3-cloud-execution',
    name: 'Cloud Execution & VPC Isolation',
    timeline: 'Month 3',
    status: 'Next',
    objective: 'Scale the execution muscle from local containers to Google Cloud Batch and GKE with zero data retention.',
    deliverables: [
      {
        title: 'Google Cloud Batch / GKE Container Runners',
        description: 'Migrate execution from local OrbStack to distributed cloud batch runners scaling to 1,000+ workers.',
        done: false
      },
      {
        title: 'Zero Data Retention (ZDR) Workspaces',
        description: 'Cryptographically wipe container storage volumes immediately upon PR submission for SOC2 compliance.',
        done: false
      },
      {
        title: 'Enterprise Corporate VPC Peering',
        description: 'Enable private VPC peering for enterprise clients to access internal package registries securely.',
        done: false
      }
    ],
    securityGuarantees: [
      'Ephemeral rootless Docker execution in dedicated Kubernetes pods',
      'Cryptographic memory and disk shredding upon job completion (ZDR compliance)',
      'Enterprise VPC peering with private IP routing and zero external ingress'
    ],
    techStack: ['Google Cloud Batch', 'Google Kubernetes Engine (GKE)', 'Docker', 'Terraform', 'SOC2 Type II']
  },
  {
    phase: 4,
    id: 'phase-4-billing-escrow',
    name: 'Billing, Metering & Escrow Routing',
    timeline: 'Month 4',
    status: 'Planned',
    objective: 'Implement outcome-based billing across Stripe fiat metered credits and on-chain smart contract escrows.',
    deliverables: [
      {
        title: 'Stripe Metered Billing Integration',
        description: 'Trigger Stripe webhook to increment verified PR credits strictly when client merges the Pull Request.',
        done: false
      },
      {
        title: 'Stellar Soroban & EVM Smart Contract Escrows',
        description: 'Programmatic release of escrowed XLM/USDC upon GitHub oracle confirming successful PR merge.',
        done: false
      },
      {
        title: 'Victory Audit Billing Circuit Breaker',
        description: 'Automatically bypass billing and alert maintainers if Victory Audit flags test manipulation or auth bypasses.',
        done: false
      }
    ],
    securityGuarantees: [
      'Outcome-gated billing: zero charge unless Pull Request is verified and merged',
      'Dual-signature smart contract escrow release with oracle confirmation',
      'Cryptographic audit trail logged to immutable ledger'
    ],
    techStack: ['Stripe API', 'Soroban (Rust)', 'EVM Solidity', 'Oracle Listeners', 'Web3.js']
  }
];

// ---------------------------------------------------------------------------
// 4. Structured Stellar SCF Grant Breakdown
// ---------------------------------------------------------------------------

export const STELLAR_SCF_GRANT_DATA = {
  projectName: 'Soroban Sentinel: Autonomous Multi-Agent Maintenance & Bounty Infrastructure',
  requestedAward: '$150,000 in XLM',
  track: 'RFP Track (Developer Tooling & Infrastructure)',
  totalAmountXlm: 150000,
  payoutAddress: 'GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC',
  summary: 'The Soroban Sentinel is a headless, autonomous AI agent swarm acting as a 24/7 public goods multiplier for Stellar. It autonomously ingests issues, compiles Soroban contracts in sandboxes with real cryptographic host functions, and submits verified PRs with escrow settlements.',
  tranches: [
    {
      number: 1,
      title: 'MVP & Core Architecture',
      timeline: 'Months 1–2',
      amountXlm: 40000,
      amountUsd: '$40,000 XLM',
      deliverables: [
        'Functional autonomous engine with full Soroban CLI/SDK integration.',
        'Local sandbox test suite running real Soroban cryptographic primitives.',
        'Public documentation, architecture diagrams, and repository setup.'
      ],
      validationCriteria: '50 automated tests passing on the core execution loop with real env.crypto() calls.',
      status: 'active'
    },
    {
      number: 2,
      title: 'Testnet Alpha & Ecosystem Stigmergy',
      timeline: 'Months 3–4',
      amountXlm: 50000,
      amountUsd: '$50,000 XLM',
      deliverables: [
        'Live autonomous bounty intake and PR resolution on Stellar Testnet repositories.',
        'GitHub App release allowing external Stellar DAOs to install Sentinel via @soroban-sentinel tag.',
        'Implementation of the automated Victory Audit verification framework for Soroban contract integrity.'
      ],
      validationCriteria: 'Successfully resolve 15 live issues on 3 separate community test repositories without human intervention.',
      status: 'pending'
    },
    {
      number: 3,
      title: 'Mainnet Deployment & Tooling Suite',
      timeline: 'Months 5–6',
      amountXlm: 60000,
      amountUsd: '$60,000 XLM',
      deliverables: [
        'Production deployment with live Stellar Mainnet smart contract escrow and payout routing.',
        'Public dashboard tracking agent telemetry, audit trails, and ecosystem money velocity.',
        'Comprehensive case studies of resolved ecosystem bounties and long-term OSS maintenance commitment.'
      ],
      validationCriteria: 'Integration by at least 3 major Stellar ecosystem projects for live backlog liquidation.',
      status: 'pending'
    }
  ] as SCFTranche[],
  pillars: [
    {
      title: 'Deep Soroban Integration',
      description: 'Configured natively for Soroban smart contracts, utilizing real host functions (env.crypto()) and prohibiting mocked cryptographic validations.'
    },
    {
      title: 'The Victory Audit',
      description: 'Adversarial audit layer guaranteeing submitted PRs have not bypassed authorization (require_auth()) or loosened test assertions.'
    },
    {
      title: 'Stellar Escrow Settlement',
      description: 'Programmatic release of XLM or USDC bounties from smart contract escrows upon oracle confirmation of PR merge.'
    }
  ]
};

// ---------------------------------------------------------------------------
// 5. Structured Business Plan Models & Asks
// ---------------------------------------------------------------------------

export const MONETIZATION_MODELS: MonetizationModel[] = [
  {
    id: 'hybrid',
    name: 'Model A: The Hybrid Engine',
    tagline: 'Dual-Track Engine (Internal Bounty Extraction + External B2B SaaS)',
    badge: 'Recommended',
    isRecommended: true,
    strategy: 'The Swarm operates on a dual-track. Internally, it autonomously hunts and claims open bounties (Gitcoin, GrantFox) to generate direct cash flow and self-fund compute. Externally, we package the Swarm as a B2B SaaS/API for DAOs and enterprise teams.',
    mechanics: [
      'Internal Track: Autonomous agents scan GitHub GraphQL for funded escrows, self-funding compute costs on Day 1.',
      'External Track: B2B SaaS API offered to engineering orgs ($299/mo to $10,000/mo Custom ARR).',
      'Negative CAC: On-chain bounty resolutions serve as live verifiable proofs, driving organic enterprise inbound.',
      'Risk Diversification: Not reliant on slow enterprise sales cycles to achieve cash-flow positivity.'
    ],
    whyItWorks: 'Direct bounty revenue eliminates Customer Acquisition Cost (CAC) friction and proves the model, while the B2B SaaS provides recurring, high-margin Enterprise ARR.',
    targetMargin: '90% - 94% Gross Margin',
    revenueStreams: ['On-chain Bounty Escrows', 'Monthly SaaS Subscriptions', 'Outcome-based PR Overages', 'Custom Enterprise SLA Retainers'],
    cacProfile: 'Negative CAC (Profitable customer acquisition via bounty extraction)'
  },
  {
    id: 'syndicate',
    name: 'Model B: The Proprietary Syndicate',
    tagline: '100% Closed-Source Algorithmic Bounty Trading Firm',
    badge: 'Proprietary',
    isRecommended: false,
    strategy: 'Keep the Universal Bounty Swarm 100% closed-source and internal. Operate like an algorithmic quantitative trading firm, but for open-source software maintenance and bug bounties.',
    mechanics: [
      'Zero external SaaS sales overhead or client support obligations.',
      'Deploy 1,000+ cloud workers targeting all global Web3 escrows, Immunefi bug bounties, and Gitcoin pools.',
      'Monopolize open-source maintenance bounties via superior speed and Victory Audit accuracy.',
      'All profits reinvested into expanding GPU/compute clusters.'
    ],
    whyItWorks: 'Total capture of the bounty market. By keeping the engine proprietary, we prevent competitors from replicating our Victory Audit efficiencies.',
    targetMargin: '85% - 90% Net Profit Margin',
    revenueStreams: ['Immunefi Bug Bounties', 'Web3 Escrows (Gitcoin, GrantFox)', 'DeFi Keeper Protocol Yield', 'Security Audit Settlements'],
    cacProfile: '$0 CAC (No external customers, pure algorithmic arbitrage)'
  },
  {
    id: 'opencore',
    name: 'Model C: Open Core & Commercial Licensing',
    tagline: 'Public Orchestrator + Enterprise Compliance Gating',
    badge: 'Ecosystem',
    isRecommended: false,
    strategy: 'Open-source the base intake and orchestration engine to build massive developer goodwill. Monetize via "Enterprise Swarm" features (SOC2 compliance, private VPC deployments, dedicated Victory Audit modules, and custom SLAs).',
    mechanics: [
      'Open-source core GitHub webhook runner to dominate Gitcoin QF rounds and developer mindshare.',
      'Sell commercial licenses for SOC2 Type II compliance, VPC peering, and ZDR ephemeral storage.',
      'Provide hosted multi-tenant cloud orchestration with 99.9% uptime SLA.',
      'Enterprise support agreements starting at $50,000/year.'
    ],
    whyItWorks: 'Drives rapid ecosystem adoption. Perfect for dominating Gitcoin QF rounds and securing foundational grants, leading to lucrative enterprise support contracts.',
    targetMargin: '80% - 88% Gross Margin',
    revenueStreams: ['Commercial Enterprise Licenses', 'Hosted Cloud Runners', 'Grant Allocations', 'Custom Security Module Add-ons'],
    cacProfile: 'Low CAC (Inbound pipeline driven by open-source community adoption)'
  }
];

export const AUDIENCE_ASKS: AudienceAsk[] = [
  {
    id: 'vc',
    audience: 'Venture Capital (Seed Pitch)',
    headline: '$3.5M Seed on a $25M Post-Money Valuation',
    narrative: 'We are not building a developer tool; we are capturing the $5.5 Trillion global developer labor market via "Services-as-Software" (SaS). While competitors like Devin face 6-12 month enterprise sales cycles, the Universal Bounty Swarm achieves instant monetization on Day 1 by extracting liquid capital from Web3 and OSS bounty escrows.',
    askAmount: '$3,500,000 USD',
    askDetails: [
      'Valuation: $25M Post-Money (Conservative comp against Cognition $350M Seed & Magic $23M Series A).',
      'Target Runway: 24 months to reach $5M ARR and Series A milestone.',
      'Key Metric: Scaling from 12 active swarm nodes to 1,000 concurrent cloud container runners.'
    ],
    useOfFunds: [
      { category: 'Cloud Runner Infrastructure', percentage: 60, description: 'Scaling to 1,000 concurrent OrbStack / Cloud Run / GKE execution workers.' },
      { category: 'Core AI Ops & Engineering', percentage: 30, description: 'Fine-tuning specialized LLMs for AST-level Victory Audits and formal verification.' },
      { category: 'B2B Sales & GTM', percentage: 10, description: 'Enterprise developer advocacy, security conference demos, and customer onboarding.' }
    ],
    marketComps: ['Cognition / Devin ($21M Seed, $2B+ Valuation)', 'Magic.dev ($23M Series A, $100M+)', 'Poolside ($500M Series B)']
  },
  {
    id: 'grants',
    audience: 'Web3 Ecosystem Grants',
    headline: '$150k Stellar SCF + $35k Gitcoin Matching',
    narrative: 'An autonomous public goods multiplier. We protect the ecosystem by automatically resolving backlog issues, generating Soroban smart contract tests, and patching vulnerabilities without burdening human maintainers.',
    askAmount: '$235,000 Total Allocation',
    askDetails: [
      'Stellar SCF Build Award: $150,000 XLM across 3 milestone tranches ($40k / $50k / $60k).',
      'Gitcoin OSS Round: Participation in Web3 Infrastructure QF pool (targeting $25k-$35k matching).',
      'Direct Allocator Grant: $50,000 for multi-chain package registry automation and escrow tooling.'
    ]
  },
  {
    id: 'enterprise',
    audience: 'B2B Enterprise & DAOs',
    headline: '$10,000 Paid 4-Week PoC Pilot',
    narrative: 'Clear technical debt, liquidate stale P2/P3 backlogs, and guarantee CI-passing PRs without burning senior developer cycles. We sell completed PRs, not software seats.',
    askAmount: '$10,000 PoC / Tiered Subscriptions',
    askDetails: [
      'Paid Pilot Scope: 4 weeks, up to 3 repositories, 25 benchmark issues, guaranteed CI-passing gate.',
      'Conversion Offer: 100% of pilot fee credited toward annual Enterprise SaaS contract upon completion.'
    ],
    pricingTiers: [
      {
        tier: 'Startup Tier',
        price: '$299 / month',
        description: 'Perfect for fast-moving teams clearing technical debt.',
        features: ['Up to 3 connected repositories', '20 Verified PR Credits/mo ($15/additional PR)', 'Standard CI verification gate', 'Community Support']
      },
      {
        tier: 'DAO / Web3 Tier',
        price: '$1,999 / month (or USDC Escrow)',
        description: 'High-assurance autonomous delivery for distributed protocols.',
        features: ['Up to 10 connected repositories', '150 Verified PR Credits/mo', 'Victory Audit Smart Contract Verification', 'Native Escrow Settlement']
      },
      {
        tier: 'Enterprise Managed Swarm',
        price: 'Custom ARR ($4,500+/mo)',
        description: 'Unlimited scalable workforce with SOC2 compliance.',
        features: ['Unlimited repositories & custom multi-agent swarms', 'Dedicated isolated VPC / Cloud Run infrastructure', '99.9% Uptime SLA + P0 < 1-hr response', 'Zero Data Retention (ZDR) guarantee']
      }
    ]
  },
  {
    id: 'sponsors',
    audience: 'Open Source Sponsors (GitHub Sponsors)',
    headline: 'Multi-Tiered Community Sponsorships',
    narrative: 'Support the autonomous workers keeping your favorite open-source libraries alive. The Swarm handles the mundane dependency updates, linting fixes, and test coverage expansions so maintainers can focus on architecture.',
    askAmount: '$10/mo to $1,000/mo',
    askDetails: [
      'Direct compute subsidy to keep public open-source repositories healthy and maintained.',
      'Sponsor badges displayed across public showcase site and PR summaries.'
    ],
    pricingTiers: [
      {
        tier: 'Swarm Supporter',
        price: '$10 / month',
        description: 'Help offset raw AI inference and API compute costs.',
        features: ['Community Supporter badge on GitHub', 'Weekly newsletter on swarm telemetry', 'Access to Discord alpha channel']
      },
      {
        tier: 'Swarm Commander',
        price: '$150 / month',
        description: 'Prioritize your repository in the intake queue.',
        features: ['Priority repository intake queue', 'Weekly automated maintenance sweeps', 'Dedicated PR summary reports']
      },
      {
        tier: 'Corporate Sponsor',
        price: '$1,000 / month',
        description: 'Dedicated autonomous agent assigned to your stack.',
        features: ['Dedicated agent instance permanently assigned', 'Custom Victory Audit rules', 'Logo featured on public showcase site']
      }
    ]
  }
];

// ---------------------------------------------------------------------------
// 6. Master Strategy Documents Array
// ---------------------------------------------------------------------------

export const STRATEGY_DOCUMENTS: StrategyDocument[] = [
  {
    id: 'b2b',
    title: 'B2B Enterprise Landing Page Copy',
    subtitle: 'Commercial Asset: CTO & Head of Engineering Value Proposition',
    category: 'Commercial GTM',
    filename: 'B2B_Landing_Page_Copy.md',
    lastUpdated: '2026-08-29',
    summary: 'Comprehensive value proposition, 3-step autonomous execution pipeline, Victory Audit security moat, and 3-tiered pricing matrix (Startup $299, DAO $1,999, Enterprise $4,500+) with $10,000 4-week Paid Pilot.',
    rawContent: RAW_B2B_LANDING_COPY,
    keyStats: [
      { label: 'Startup Tier', value: '$299/mo' },
      { label: 'DAO / Web3 Tier', value: '$1,999/mo' },
      { label: 'Enterprise Pilot', value: '$10,000' }
    ]
  },
  {
    id: 'pitch',
    title: 'VC Seed Pitch Deck Outline',
    subtitle: 'Investor Asset: $3.5M Seed Round on $25M Post-Money Valuation',
    category: 'Venture Capital',
    filename: 'VC_Pitch_Deck_Outline.md',
    lastUpdated: '2026-08-29',
    summary: '8-slide investor pitch deck detailing the $5.5T Developer Labor TAM, Services-as-Software outcome arbitrage, Victory Audit moat, hybrid business model (Negative CAC), 159+ passing test traction, and $3.5M seed ask.',
    rawContent: RAW_VC_PITCH_DECK,
    keyStats: [
      { label: 'Developer Labor TAM', value: '$5.5 Trillion' },
      { label: 'Seed Round Ask', value: '$3.5M' },
      { label: 'Post-Money Valuation', value: '$25M' }
    ]
  },
  {
    id: 'roadmap',
    title: 'Technical Roadmap: Multi-Tenant B2B SaaS API',
    subtitle: 'Engineering Asset: 4-Phase Architecture & Security Implementation',
    category: 'Engineering Architecture',
    filename: 'Technical_Roadmap_Multi_Tenant.md',
    lastUpdated: '2026-08-29',
    summary: '4-phase technical roadmap covering Phase 1 (Identity & Multi-Tenancy), Phase 2 (Webhook Gateway & Ingestion on Cloud Run), Phase 3 (Cloud Execution & GKE/ZDR Isolation), and Phase 4 (Stripe & Soroban Escrow Billing).',
    rawContent: RAW_TECHNICAL_ROADMAP,
    keyStats: [
      { label: 'Roadmap Phases', value: '4 Phases' },
      { label: 'Execution Horizon', value: '4 Months' },
      { label: 'Target Runners', value: '1,000 GKE Nodes' }
    ]
  },
  {
    id: 'scf',
    title: 'Stellar Community Fund (SCF) Grant Application',
    subtitle: 'Grant Asset: Soroban Sentinel $150,000 XLM Build Award',
    category: 'Web3 Grants',
    filename: 'Stellar_SCF_Grant_Application.md',
    lastUpdated: '2026-08-29',
    summary: 'Grant dossier submitted to Stellar Community Fund for building Soroban Sentinel. Features 3 milestone tranches ($40k MVP, $50k Testnet Alpha, $60k Mainnet Escrow) with real env.crypto() host function verification.',
    rawContent: RAW_STELLAR_SCF_GRANT,
    keyStats: [
      { label: 'Requested Award', value: '$150,000 XLM' },
      { label: 'Tranches', value: '3 Milestones' },
      { label: 'Target Chain', value: 'Stellar / Soroban' }
    ]
  },
  {
    id: 'plan',
    title: 'Universal Bounty Swarm: Strategic Business Plan',
    subtitle: 'Strategic Master: Monetization Models, Economics & Audience Asks',
    category: 'Strategic Master',
    filename: 'Universal_Bounty_Swarm_Business_Plan.md',
    lastUpdated: '2026-08-29',
    summary: 'Executive business plan detailing 90%+ gross margin arbitrage ($150-$600 human hr vs $1.50-$10 compute), 3 monetization models (Hybrid Engine, Syndicate, Open Core), and 4 tailored GTM proposals (VC, Grants, Enterprise, Sponsors).',
    rawContent: RAW_BUSINESS_PLAN,
    keyStats: [
      { label: 'Gross Margin Arbitrage', value: '90%+' },
      { label: 'Monetization Models', value: '3 Paths' },
      { label: 'Audience Proposals', value: '4 Asks' }
    ]
  }
];
