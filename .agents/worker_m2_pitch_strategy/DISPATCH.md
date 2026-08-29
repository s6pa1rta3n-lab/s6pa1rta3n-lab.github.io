# Milestone 2 Task Assignment: Pitch & Strategy Pages Copy Rewrite

## Scope & File Ownership
You exclusively own:
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/pages/PitchPage.tsx`
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/components/pitch/*` (`ArchitectureNexus.tsx`, `BonusMultipliers.tsx`, `JudgingCriteriaGrid.tsx`, `TerminalSimulator.tsx`)
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/pages/StrategyPage.tsx`
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/components/strategy/*` (`BusinessPlanView.tsx`, `MarkdownDocViewer.tsx`, `RoadmapTimeline.tsx`, `SCFGrantView.tsx`, `VCDeckViewer.tsx`)
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/components/layout/Navbar.tsx`
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/components/layout/Footer.tsx`

## Inputs & Guidelines
- Read `/Users/solveetcoagula/teamwork_projects/swarm_public_site/.agents/ORIGINAL_REQUEST.md`
- Read `/Users/solveetcoagula/teamwork_projects/swarm_public_site/.agents/spec_miner_survey_1/handoff.md`
- Read `/Users/solveetcoagula/teamwork_projects/swarm_public_site/.agents/explorer_survey_pages/handoff.md`
- Use the updated `src/data/strategyDocs.ts` and `src/data/devpostCriteria.ts`.

## Copy Rewrite Directives
1. **Tone & Lexicon**:
   - Hero Headline: "Replace Your $150k Dev Team For a Fraction of the Cost" (or "Replace your $150k dev team for a fraction of the cost").
   - Hero Subtitle: "The Universal Bounty Swarm is a 24/7 AI workforce that writes code, fixes bugs, and ships features faster than humans ever could."
   - Replace jargon with plain English: "An AI team that writes code, fixes bugs, and verifies its own work 24/7."
   - Frame value props around cost savings and ROI: "Stop Burning Cash on Routine Engineering. Replace $150–$600/hr Human Engineering with $0.02–$5.00 Autonomous AI Compute (90%+ Cost Savings)."
   - Live benchmarks: Avg resolution time under 30s to 30 min, 195+ automated pull requests, 90%+ payroll savings.
2. **Strategy Page & Components**:
   - Telemetry Ribbon: $500B+ TAM, 90%+ Cost Savings, $50,000 in XLM Stellar Grant, 4 Phases Roadmap, Seed Round.
   - B2B Pricing section in `StrategyPage.tsx`:
     - Startup Tier: $299/mo (20 verified PRs, 3 connected repos, standard audit).
     - Growth DAO / Web3: $1,999/mo (150 verified PRs, 10 connected repos, smart contract audit).
     - Enterprise Sovereign: Custom Plan (unlimited repos, dedicated sandboxes, 24/7 SLA).
   - `VCDeckViewer.tsx`: Render 6 slides cleanly with dynamic length handling.
   - `RoadmapTimeline.tsx`: Render 4 phases cleanly matching `ROADMAP_PHASES`.
   - `SCFGrantView.tsx`: Render $50k XLM grant narrative and milestone tranches with official Stellar address `GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC`.
   - `BusinessPlanView.tsx`: Plain English dual monetization (B2B SaaS + Autonomous Open-Source Bounty Hunting).
   - `MarkdownDocViewer.tsx`: Clean viewer of the 5 v2 raw documents.
3. **Navbar & Footer**:
   - Keep navigation items and badges crisp and direct.
   - Preserve official EVM (`0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89`) and Stellar (`GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC`) addresses in Footer.
4. **Architecture & Visual Theme**:
   - DO NOT alter React routing, component tree hierarchy, or visual theme (`bg-obsidian-950`, `text-cyber-cyan`, Lucide icons).
5. **Build Verification**:
   - Run `npm run build` to verify 0 TypeScript compiler errors.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Output
Write your report to `/Users/solveetcoagula/teamwork_projects/swarm_public_site/.agents/worker_m2_pitch_strategy/handoff.md`.
Report back via send_message when done.
