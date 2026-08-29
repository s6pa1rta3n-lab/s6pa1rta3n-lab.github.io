# Milestone 1 Task Assignment: Data Layer V2 Ingestion

## Scope & File Ownership
You exclusively own:
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/data/strategyDocs.ts`
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/data/devpostCriteria.ts`
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/data/blogArticles.ts`
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/data/affiliatesData.ts`
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/data/marketplaceData.ts`
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/src/data/grantsData.ts`

## Input Specifications & Sources
Read:
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/.agents/ORIGINAL_REQUEST.md`
- `/Users/solveetcoagula/teamwork_projects/swarm_public_site/.agents/spec_miner_survey_1/handoff.md`
- The 5 v2 reference files in `/Users/solveetcoagula/.gemini/antigravity/brain/987e6355-2488-4eee-9ca8-e3d2ff4d8cdd/`:
  - `B2B_Landing_Page_Copy_v2.md`
  - `Stellar_SCF_Grant_Application_v2.md`
  - `Technical_Roadmap_Multi_Tenant_v2.md`
  - `Universal_Bounty_Swarm_Business_Plan_v2.md`
  - `VC_Pitch_Deck_Outline_v2.md`

## Specific Tasks
1. Ingest the verbatim contents of the 5 v2 reference documents into `RAW_B2B_LANDING_COPY`, `RAW_VC_PITCH_DECK`, `RAW_TECHNICAL_ROADMAP`, `RAW_SCF_GRANT_APPLICATION`, `RAW_BUSINESS_PLAN` in `src/data/strategyDocs.ts`.
2. Update the structured arrays in `src/data/strategyDocs.ts`:
   - `PITCH_DECK_SLIDES`: 6 concise slides matching `VC_Pitch_Deck_Outline_v2.md`.
   - `ROADMAP_PHASES`: 4 concrete phases matching `Technical_Roadmap_Multi_Tenant_v2.md`.
   - `STELLAR_SCF_GRANT_DATA`: $50,000 in XLM (or aligned tranches) matching `Stellar_SCF_Grant_Application_v2.md`.
   - `MONETIZATION_MODELS` and `AUDIENCE_ASKS`: Plain English ROI & cost-savings framing.
3. Update `src/data/devpostCriteria.ts`:
   - Replace complex jargon with plain English layer names and descriptions (e.g. "The AI Brain", "Task Gateway", "Shared Memory", "Secure Sandbox", "Quality Auditor").
   - Emphasize ROI, labor arbitrage, and performance in judging criteria and bonus data.
4. Update `src/data/blogArticles.ts`:
   - Reorient headlines, summaries, and executive takeaways around business utility, zero-mock reliability, and cost savings.
5. Update `src/data/affiliatesData.ts` and `src/data/marketplaceData.ts`:
   - Highlight client cost savings (90% lower payroll) and recurring commissions.
6. Update `src/data/grantsData.ts`:
   - Align grant narratives with v2 public goods and compute funding, preserving official payout addresses (`0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89` and `GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC`).
7. Verify with `npm run build` that there are no TypeScript syntax or type errors in the data layer.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Output
Write your completed report to `/Users/solveetcoagula/teamwork_projects/swarm_public_site/.agents/worker_m1_data/handoff.md`.
Report back via send_message when done.
