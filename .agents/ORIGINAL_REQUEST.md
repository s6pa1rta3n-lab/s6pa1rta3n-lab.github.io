# Original User Request

## Initial Request — 2026-08-29T01:45:42-04:00

> Goal: Rewrite the copy across the entire static site for "v2" with a direct, non-technical, performance-and-ROI focused tone.

Working directory: ~/teamwork_projects/swarm_public_site

## Verification Resources
- Read the 5 new `_v2.md` artifacts I just generated in `/Users/solveetcoagula/.gemini/antigravity/brain/987e6355-2488-4eee-9ca8-e3d2ff4d8cdd/`.

## Requirements

### R1. Complete Copy Overhaul
Rewrite the textual copy across all major page components in `src/pages/` (Pitch, Strategy, Blog, Grants, Affiliates, Marketplace, and Portfolio if needed). 
- **Tone Rules**: Prioritize performance over fluffy wording. Direct communication. Non-technical layman's terms. Frame everything around cost savings and ROI (e.g., "Replace a $150k dev team with a $50/mo subscription").
- Remove excessive jargon like "Stigmergic agents", "LLM context windows", or "ZK-Proof execution". Replace them with plain English: "An AI team that writes code, fixes bugs, and verifies its own work 24/7."

### R2. Maintain Existing Architecture
- Do not change the overall React routing, component architecture, or the visual theme (`bg-obsidian-950`, `text-cyber-cyan`, Lucide icons). Just rewrite the text inside the components.
- Ensure the data mappings in `PortfolioPage.tsx` and the other components remain intact.

### R3. Quality & Tests
- Run `npm run test` and `npm run build` after making the changes to ensure no syntax errors were introduced and that the existing component integration tests still pass (update any text assertions in the tests if they fail due to the copy changes).
- Ensure zero TypeScript compiler errors.

Execute the rewrite, fix any failing tests, and leave the repository in a clean, working state ready for deployment.
