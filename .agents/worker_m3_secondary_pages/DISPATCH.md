# Milestone 3 Task Assignment: Secondary Pages Copy Rewrite

## Scope & File Ownership
You exclusively own:
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/pages/BlogPage.tsx`
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/components/blog/*` (`ArticleCard.tsx`, `ArticleModal.tsx`)
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/pages/GrantsPage.tsx`
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/components/grants/*` (`PayoutVerifier.tsx`, `GrantDossierCard.tsx`, `MilestonesTranches.tsx`, `TeaConstitutionViewer.tsx`)
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/pages/AffiliatesPage.tsx`
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/components/affiliates/*` (`EarningsCalculator.tsx`, `TierMatrix.tsx`, `MarketingToolkit.tsx`)
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/pages/MarketplacePage.tsx`
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/components/marketplace/*` (`PricingTable.tsx`, `ServiceCard.tsx`, `DeployConfigDrawer.tsx`, `ServiceDetailModal.tsx`)
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/pages/PortfolioPage.tsx`
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/pages/NotFoundPage.tsx`

## Inputs & Guidelines
- Read `/Users/solveetcoagula/teamwork_projects/swarm_public_site/.agents/ORIGINAL_REQUEST.md`
- Read `/Users/solveetcoagula/teamwork_projects/swarm_public_site/.agents/spec_miner_survey_1/handoff.md`
- Read `/Users/solveetcoagula/teamwork_projects/swarm_public_site/.agents/explorer_survey_pages/handoff.md`
- Read `/Users/solveetcoagula/teamwork_projects/swarm_public_site/.agents/worker_m1_data/handoff.md`

## Copy Rewrite Directives
1. **Blog Page & Modal (`BlogPage.tsx`, `ArticleCard.tsx`, `ArticleModal.tsx`)**:
   - Header: "Engineering & Research Dispatches"
   - Subtitle: "Practical blueprints on building autonomous AI teams, eliminating AI coding errors, and scaling software maintenance."
   - Retain search, category, and tag filters, modal reader, and takeaway highlights.
2. **Grants Page & Components (`GrantsPage.tsx`, `GrantDossierCard.tsx`, `PayoutVerifier.tsx`, `MilestonesTranches.tsx`)**:
   - Header: "Grants & Ecosystem Funding"
   - Subtitle: "How Universal Bounty Swarm delivers high-velocity public goods maintenance and automated milestone fulfillment across leading Web3 networks."
   - Payout addresses MUST remain exact:
     - EVM: `0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89`
     - Stellar: `GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC`
3. **Affiliates Page & Components (`AffiliatesPage.tsx`, `EarningsCalculator.tsx`, `TierMatrix.tsx`, `MarketingToolkit.tsx`)**:
   - Header: "Partner & Affiliate Program"
   - Subtitle: "Earn up to 25% recurring monthly revenue by referring startups, DAOs, and engineering teams looking to slash development costs."
   - Highlight client value: "Help your network save up to 90% on engineering maintenance while earning recurring commission."
   - Keep dynamic calculator calculations and 4 tiers intact (`Bronze Scout`, `Silver Hunter`, `Gold Commander`, `Diamond Syndicate`).
4. **Marketplace Page & Components (`MarketplacePage.tsx`, `PricingTable.tsx`, `ServiceCard.tsx`, `DeployConfigDrawer.tsx`, `ServiceDetailModal.tsx`)**:
   - Header: "Swarm AI Worker Marketplace"
   - Subtitle: "Hire specialized AI workers for your codebase. Deploy bug fixers, automated security auditors, and maintenance bots in minutes."
   - Emphasize speed, cost-savings, and verified PR delivery.
5. **Portfolio Page (`PortfolioPage.tsx`)**:
   - Header: "Verified Track Record & Proof of Work"
   - Subtitle: "Real results, not concepts. Explore 195+ automated pull requests successfully delivered across 42 open-source and Web3 repositories."
   - CRITICAL: Keep all data mappings for `swarm_portfolio.json` intact (all 42 projects, categories, filters, sorting, expand/collapse accordions, and metric aggregations).
6. **NotFoundPage (`NotFoundPage.tsx`)**:
   - Crisp 404 message and clear link back to `/pitch`.
7. **Test Assertions**:
   - Run `npm test` and update any text/matcher assertions in `src/test/blog.test.tsx`, `src/test/grants.test.tsx`, `src/test/affiliates.test.tsx`, `src/test/marketplace.test.tsx`, `src/test/portfolio.test.tsx`, `src/test/routing.test.tsx`, or `src/test/adversarial_challenge.test.tsx` if needed to maintain 100% test pass rate.
8. **Build Verification**:
   - Ensure `npm run build` succeeds with zero TypeScript errors.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Output
Write your report to `/Users/solveetcoagula/teamwork_projects/swarm_public_site/.agents/worker_m3_secondary_pages/handoff.md`.
Report back via send_message when done.
