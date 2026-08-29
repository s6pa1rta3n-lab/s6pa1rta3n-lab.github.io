import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { StrategyPage } from '../pages/StrategyPage';
import { VCDeckViewer } from '../components/strategy/VCDeckViewer';
import { RoadmapTimeline } from '../components/strategy/RoadmapTimeline';
import { SCFGrantView } from '../components/strategy/SCFGrantView';
import { BusinessPlanView } from '../components/strategy/BusinessPlanView';
import { MarkdownDocViewer } from '../components/strategy/MarkdownDocViewer';
import { 
  STRATEGY_DOCUMENTS, 
  PITCH_DECK_SLIDES, 
  ROADMAP_PHASES, 
  STELLAR_SCF_GRANT_DATA, 
  MONETIZATION_MODELS, 
  AUDIENCE_ASKS 
} from '../data/strategyDocs';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe('Strategy & Operations Master Suite (Milestone 2)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ---------------------------------------------------------------------------
  // 1. Data Integrity & Verification
  // ---------------------------------------------------------------------------
  describe('Strategy Data Models (strategyDocs.ts)', () => {
    it('contains all 5 authoritative strategy documents with non-empty raw markdown', () => {
      expect(STRATEGY_DOCUMENTS).toHaveLength(5);
      const docIds = STRATEGY_DOCUMENTS.map((d) => d.id);
      expect(docIds).toEqual(['b2b', 'pitch', 'roadmap', 'scf', 'plan']);

      STRATEGY_DOCUMENTS.forEach((doc) => {
        expect(doc.title.length).toBeGreaterThan(5);
        expect(doc.summary.length).toBeGreaterThan(10);
        expect(doc.rawContent.length).toBeGreaterThan(100);
        expect(doc.filename.endsWith('.md')).toBe(true);
      });
    });

    it('contains 8 structured pitch deck slides with complete data', () => {
      expect(PITCH_DECK_SLIDES).toHaveLength(8);
      PITCH_DECK_SLIDES.forEach((slide, idx) => {
        expect(slide.slideNumber).toBe(idx + 1);
        expect(slide.title).toBeDefined();
        expect(slide.category).toBeDefined();
        expect(slide.bullets.length).toBeGreaterThan(0);
        expect(slide.takeaway.length).toBeGreaterThan(5);
        expect(slide.speakerNotes.length).toBeGreaterThan(5);
      });
    });

    it('contains 4 structured roadmap phases', () => {
      expect(ROADMAP_PHASES).toHaveLength(4);
      ROADMAP_PHASES.forEach((phase, idx) => {
        expect(phase.phase).toBe(idx + 1);
        expect(phase.deliverables.length).toBeGreaterThan(0);
        expect(phase.securityGuarantees.length).toBeGreaterThan(0);
        expect(phase.techStack.length).toBeGreaterThan(0);
      });
    });

    it('verifies Stellar SCF grant tranches total exactly 150,000 XLM', () => {
      const grant = STELLAR_SCF_GRANT_DATA;
      expect(grant.totalAmountXlm).toBe(150000);
      expect(grant.tranches).toHaveLength(3);
      
      const sumXlm = grant.tranches.reduce((acc, t) => acc + t.amountXlm, 0);
      expect(sumXlm).toBe(150000);
      expect(grant.tranches[0].amountXlm).toBe(40000);
      expect(grant.tranches[1].amountXlm).toBe(50000);
      expect(grant.tranches[2].amountXlm).toBe(60000);
      expect(grant.payoutAddress).toBe('GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC');
    });

    it('contains 3 distinct monetization models and 4 audience proposals', () => {
      expect(MONETIZATION_MODELS).toHaveLength(3);
      const hybridModel = MONETIZATION_MODELS.find((m) => m.id === 'hybrid');
      expect(hybridModel?.isRecommended).toBe(true);
      expect(hybridModel?.targetMargin).toContain('90%');

      expect(AUDIENCE_ASKS).toHaveLength(4);
      const askIds = AUDIENCE_ASKS.map((a) => a.id);
      expect(askIds).toEqual(['vc', 'grants', 'enterprise', 'sponsors']);
    });
  });

  // ---------------------------------------------------------------------------
  // 2. VCDeckViewer Component
  // ---------------------------------------------------------------------------
  describe('VCDeckViewer Component', () => {
    it('renders Slide 1 by default with title and hook', () => {
      render(<VCDeckViewer />);
      expect(screen.getAllByText(/Universal Bounty Swarm/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Autonomous AI Software Engineers/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Slide 1 of 8/i)).toBeInTheDocument();
      expect(screen.getByText(/1 \/ 8/i)).toBeInTheDocument();
    });

    it('navigates sequentially using Next and Previous buttons', () => {
      render(<VCDeckViewer />);
      const nextButtons = screen.getAllByRole('button', { name: /Next Slide/i });
      const prevButtons = screen.getAllByRole('button', { name: /Previous Slide/i });

      // Click Next -> Slide 2 (Problem)
      fireEvent.click(nextButtons[0]);
      expect(screen.getByText(/Slide 2 of 8/i)).toBeInTheDocument();
      expect(screen.getAllByText(/\$5.5 Trillion Bottleneck/i).length).toBeGreaterThan(0);

      // Click Next -> Slide 3 (Solution)
      fireEvent.click(nextButtons[0]);
      expect(screen.getByText(/Slide 3 of 8/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Services-as-Software/i).length).toBeGreaterThan(0);

      // Click Prev -> Slide 2
      fireEvent.click(prevButtons[0]);
      expect(screen.getByText(/Slide 2 of 8/i)).toBeInTheDocument();
    });

    it('navigates directly to Slide 7 (The Ask) and Slide 8 via slide selector buttons', () => {
      render(<VCDeckViewer />);
      const slide7Btn = screen.getByRole('button', { name: /SLIDE 7/i });
      fireEvent.click(slide7Btn);

      expect(screen.getByText(/Slide 7 of 8/i)).toBeInTheDocument();
      expect(screen.getAllByText(/The Ask & Capital Allocation/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/60% \(\$2.10M\)/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Cloud Runner Infrastructure/i).length).toBeGreaterThan(0);

      const slide8Btn = screen.getByRole('button', { name: /SLIDE 8/i });
      fireEvent.click(slide8Btn);
      expect(screen.getByText(/Slide 8 of 8/i)).toBeInTheDocument();
      expect(screen.getAllByText(/The 2030 Vision/i).length).toBeGreaterThan(0);
    });

    it('toggles speaker notes visibility', () => {
      render(<VCDeckViewer />);
      const toggleNotesBtn = screen.getByRole('button', { name: /Notes Shown/i });
      expect(screen.getByText(/Presenter Talking Points & Speaker Notes/i)).toBeInTheDocument();

      fireEvent.click(toggleNotesBtn);
      expect(screen.queryByText(/Presenter Talking Points & Speaker Notes/i)).not.toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 3. RoadmapTimeline Component
  // ---------------------------------------------------------------------------
  describe('RoadmapTimeline Component', () => {
    it('renders Phase 1 by default with deliverables and security guarantees', () => {
      render(<RoadmapTimeline />);
      expect(screen.getByText(/Technical Roadmap: Multi-Tenant B2B SaaS Platform/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Identity, Authentication & Multi-Tenancy/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Firebase Auth JWT Integration/i)).toBeInTheDocument();
      expect(screen.getByText(/Tenant-Isolated Firestore Schema/i)).toBeInTheDocument();
      expect(screen.getByText(/PathGuard & SafeIO local filesystem containment/i)).toBeInTheDocument();
    });

    it('switches between all 4 phases correctly', () => {
      render(<RoadmapTimeline />);

      // Switch to Phase 2 (Webhook Gateway)
      const phase2Btn = screen.getByRole('button', { name: /PHASE 02/i });
      fireEvent.click(phase2Btn);
      expect(screen.getAllByText(/Webhook Gateway & Reactive Ingestion/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Headless FastAPI Gateway on Cloud Run/i)).toBeInTheDocument();
      expect(screen.getByText(/Timing-safe HMAC-SHA256 signature verification/i)).toBeInTheDocument();

      // Switch to Phase 3 (Cloud Execution)
      const phase3Btn = screen.getByRole('button', { name: /PHASE 03/i });
      fireEvent.click(phase3Btn);
      expect(screen.getAllByText(/Cloud Execution & VPC Isolation/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Google Cloud Batch \/ GKE Container Runners/i)).toBeInTheDocument();
      expect(screen.getByText(/Zero Data Retention \(ZDR\) Workspaces/i)).toBeInTheDocument();

      // Switch to Phase 4 (Billing & Escrow)
      const phase4Btn = screen.getByRole('button', { name: /PHASE 04/i });
      fireEvent.click(phase4Btn);
      expect(screen.getAllByText(/Billing, Metering & Escrow Routing/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Stripe Metered Billing Integration/i)).toBeInTheDocument();
      expect(screen.getByText(/Stellar Soroban & EVM Smart Contract Escrows/i)).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. SCFGrantView Component
  // ---------------------------------------------------------------------------
  describe('SCFGrantView Component', () => {
    it('renders $150,000 XLM requested award and Soroban Sentinel details', () => {
      render(<SCFGrantView />);
      expect(screen.getByText(/Soroban Sentinel: Stellar Community Fund/i)).toBeInTheDocument();
      expect(screen.getByText(/\$150,000 in XLM/i)).toBeInTheDocument();
      expect(screen.getByText(/GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC/i)).toBeInTheDocument();
    });

    it('switches between all 3 tranches and validates deliverables', () => {
      render(<SCFGrantView />);

      // Default is Tranche 1 ($40,000 XLM)
      expect(screen.getAllByText(/MVP & Core Architecture/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/40,000 XLM/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/50 automated tests passing on the core execution loop/i)).toBeInTheDocument();

      // Click Tranche 2 ($50,000 XLM)
      const tranche2Btn = screen.getByRole('button', { name: /TRANCHE 2/i });
      fireEvent.click(tranche2Btn);
      expect(screen.getAllByText(/Testnet Alpha & Ecosystem Stigmergy/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/50,000 XLM/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Successfully resolve 15 live issues on 3 separate community test repositories/i)).toBeInTheDocument();

      // Click Tranche 3 ($60,000 XLM)
      const tranche3Btn = screen.getByRole('button', { name: /TRANCHE 3/i });
      fireEvent.click(tranche3Btn);
      expect(screen.getAllByText(/Mainnet Deployment & Tooling Suite/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/60,000 XLM/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Integration by at least 3 major Stellar ecosystem projects/i)).toBeInTheDocument();
    });

    it('copies the verified Stellar payout address', async () => {
      render(<SCFGrantView />);
      const copyBtn = screen.getByRole('button', { name: /Copy Stellar Address/i });
      fireEvent.click(copyBtn);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
          'GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC'
        );
        expect(screen.getByText(/Address Copied!/i)).toBeInTheDocument();
      });
    });
  });

  // ---------------------------------------------------------------------------
  // 5. BusinessPlanView Component
  // ---------------------------------------------------------------------------
  describe('BusinessPlanView Component', () => {
    it('renders 3 monetization models and switches between them', () => {
      render(<BusinessPlanView />);
      expect(screen.getByText(/Strategic Business Plan & Monetization Architecture/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Model A: The Hybrid Engine/i).length).toBeGreaterThan(0);

      // Click Model B (Proprietary Syndicate)
      const syndicateBtn = screen.getByRole('button', { name: /Model B: The Proprietary Syndicate/i });
      fireEvent.click(syndicateBtn);
      expect(screen.getAllByText(/100% Closed-Source Algorithmic Bounty Trading Firm/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Deploy 1,000\+ cloud workers targeting all global Web3 escrows/i)).toBeInTheDocument();

      // Click Model C (Open Core)
      const opencoreBtn = screen.getByRole('button', { name: /Model C: Open Core & Commercial Licensing/i });
      fireEvent.click(opencoreBtn);
      expect(screen.getAllByText(/Public Orchestrator \+ Enterprise Compliance Gating/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Open-source core GitHub webhook runner/i)).toBeInTheDocument();
    });

    it('switches between all 4 audience asks (VC, Grants, Enterprise, Sponsors)', () => {
      render(<BusinessPlanView />);

      // Default is VC ask ($3.5M)
      expect(screen.getByText(/\$3.5M Seed on a \$25M Post-Money Valuation/i)).toBeInTheDocument();
      expect(screen.getByText(/\$3,500,000 USD/i)).toBeInTheDocument();

      // Click Grants tab
      const grantsTab = screen.getByRole('tab', { name: /Web3 Ecosystem Grants/i });
      fireEvent.click(grantsTab);
      expect(screen.getByText(/\$150k Stellar SCF \+ \$35k Gitcoin Matching/i)).toBeInTheDocument();
      expect(screen.getByText(/\$235,000 Total Allocation/i)).toBeInTheDocument();

      // Click Enterprise tab
      const enterpriseTab = screen.getByRole('tab', { name: /B2B Enterprise/i });
      fireEvent.click(enterpriseTab);
      expect(screen.getByText(/\$10,000 Paid 4-Week PoC Pilot/i)).toBeInTheDocument();
      expect(screen.getByText(/Startup Tier/i)).toBeInTheDocument();
      expect(screen.getByText(/\$299 \/ month/i)).toBeInTheDocument();

      // Click Sponsors tab
      const sponsorsTab = screen.getByRole('tab', { name: /Open Source Sponsors/i });
      fireEvent.click(sponsorsTab);
      expect(screen.getByText(/Multi-Tiered Community Sponsorships/i)).toBeInTheDocument();
      expect(screen.getByText(/Swarm Commander/i)).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 6. MarkdownDocViewer Component
  // ---------------------------------------------------------------------------
  describe('MarkdownDocViewer Component', () => {
    it('renders rendered markdown by default and switches between documents', () => {
      render(<MarkdownDocViewer initialDocId="b2b" />);
      expect(screen.getAllByText(/B2B Enterprise Landing Page Copy/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Scale Your Engineering Capacity, Not Your Payroll/i).length).toBeGreaterThan(0);

      // Switch to Pitch Deck markdown
      const pitchDocBtn = screen.getByRole('button', { name: /^PITCH$/i });
      fireEvent.click(pitchDocBtn);
      expect(screen.getAllByText(/VC Seed Pitch Deck Outline/i).length).toBeGreaterThan(0);

      // Switch to Tech Roadmap markdown
      const roadmapDocBtn = screen.getByRole('button', { name: /^ROADMAP$/i });
      fireEvent.click(roadmapDocBtn);
      expect(screen.getAllByText(/Technical Roadmap: Multi-Tenant B2B SaaS API/i).length).toBeGreaterThan(0);

      // Switch to SCF Grant markdown
      const scfDocBtn = screen.getByRole('button', { name: /^SCF$/i });
      fireEvent.click(scfDocBtn);
      expect(screen.getAllByText(/Stellar Community Fund \(SCF\) Grant Application/i).length).toBeGreaterThan(0);

      // Switch to Business Plan markdown
      const planDocBtn = screen.getByRole('button', { name: /^PLAN$/i });
      fireEvent.click(planDocBtn);
      expect(screen.getAllByText(/Universal Bounty Swarm: Strategic Business Plan/i).length).toBeGreaterThan(0);
    });

    it('toggles between Rendered view and Raw Markdown view', () => {
      render(<MarkdownDocViewer initialDocId="b2b" />);
      const rawBtn = screen.getByRole('button', { name: /Raw Markdown/i });
      fireEvent.click(rawBtn);

      expect(screen.getByText(/Raw Source: B2B_Landing_Page_Copy.md/i)).toBeInTheDocument();
      expect(screen.getByText(/# Universal Bounty Swarm: Enterprise API Landing Page Copy/i)).toBeInTheDocument();

      const renderedBtn = screen.getByRole('button', { name: /Rendered/i });
      fireEvent.click(renderedBtn);
      expect(screen.getAllByText(/Scale Your Engineering Capacity, Not Your Payroll/i).length).toBeGreaterThan(0);
    });

    it('filters text with search query input', () => {
      render(<MarkdownDocViewer initialDocId="b2b" />);
      const searchInput = screen.getByPlaceholderText(/Search document.../i);
      fireEvent.change(searchInput, { target: { value: 'Victory Audit' } });

      const highlights = screen.getAllByText(/Victory Audit/i);
      expect(highlights.length).toBeGreaterThan(0);
    });

    it('handles copy markdown button click', async () => {
      render(<MarkdownDocViewer initialDocId="b2b" />);
      const copyBtn = screen.getByRole('button', { name: /^Copy$/i });
      fireEvent.click(copyBtn);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
        expect(screen.getByText(/Copied!/i)).toBeInTheDocument();
      });
    });
  });

  // ---------------------------------------------------------------------------
  // 7. StrategyPage Master Page Integration
  // ---------------------------------------------------------------------------
  describe('StrategyPage Component', () => {
    it('renders master telemetry metrics ribbon', () => {
      render(
        <MemoryRouter initialEntries={['/strategy']}>
          <StrategyPage />
        </MemoryRouter>
      );

      expect(screen.getAllByText(/\$5.5T/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Global Developer Labor/i)).toBeInTheDocument();
      expect(screen.getAllByText(/90%\+/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/\$150k/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/4 Phases/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/\$3.5M/i).length).toBeGreaterThan(0);
    });

    it('switches across all 5 master tabs and markdown inspector tab', () => {
      render(
        <MemoryRouter initialEntries={['/strategy']}>
          <StrategyPage />
        </MemoryRouter>
      );

      // Default is B2B Showcase
      expect(screen.getAllByText(/Scale Your Engineering Capacity/i).length).toBeGreaterThan(0);

      // Tab 2: VC Pitch Deck
      const pitchTab = screen.getByRole('tab', { name: /VC Pitch Deck/i });
      fireEvent.click(pitchTab);
      expect(screen.getByText(/VC Pitch Deck Master Summary/i)).toBeInTheDocument();

      // Tab 3: Tech Roadmap
      const roadmapTab = screen.getByRole('tab', { name: /Tech Roadmap/i });
      fireEvent.click(roadmapTab);
      expect(screen.getByText(/Technical Roadmap: Multi-Tenant B2B SaaS Platform/i)).toBeInTheDocument();

      // Tab 4: Stellar SCF Grant
      const scfTab = screen.getByRole('tab', { name: /Stellar SCF Grant/i });
      fireEvent.click(scfTab);
      expect(screen.getByText(/Soroban Sentinel: Stellar Community Fund/i)).toBeInTheDocument();

      // Tab 5: Business Plan
      const planTab = screen.getByRole('tab', { name: /Business Plan/i });
      fireEvent.click(planTab);
      expect(screen.getByText(/Strategic Business Plan & Monetization Architecture/i)).toBeInTheDocument();

      // Tab 6: Markdown Inspector
      const markdownTab = screen.getByRole('tab', { name: /Markdown Inspector/i });
      fireEvent.click(markdownTab);
      expect(screen.getAllByText(/Inspect All 5 Markdown Artifacts/i).length).toBeGreaterThan(0);
    });

    it('handles Enterprise Pilot form submission', async () => {
      render(
        <MemoryRouter initialEntries={['/strategy']}>
          <StrategyPage />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/cto@company.com/i);
      const submitBtn = screen.getByRole('button', { name: /Request PoC Call/i });

      fireEvent.change(emailInput, { target: { value: 'lead@enterprise.xyz' } });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(/Thank you! Your Enterprise PoC request has been registered/i)).toBeInTheDocument();
      });
    });

    it('copies executive brief on button click', async () => {
      render(
        <MemoryRouter initialEntries={['/strategy']}>
          <StrategyPage />
        </MemoryRouter>
      );

      const copyBriefBtn = screen.getByRole('button', { name: /Copy Executive Brief/i });
      fireEvent.click(copyBriefBtn);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
        expect(screen.getByText(/Executive Summary Copied!/i)).toBeInTheDocument();
      });
    });
  });
});
