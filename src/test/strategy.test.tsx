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

    it('contains 6 structured pitch deck slides with complete data', () => {
      expect(PITCH_DECK_SLIDES).toHaveLength(6);
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

    it('verifies Stellar SCF grant tranches total exactly 50,000 XLM', () => {
      const grant = STELLAR_SCF_GRANT_DATA;
      expect(grant.totalAmountXlm).toBe(50000);
      expect(grant.tranches).toHaveLength(3);
      
      const sumXlm = grant.tranches.reduce((acc, t) => acc + t.amountXlm, 0);
      expect(sumXlm).toBe(50000);
      expect(grant.tranches[0].amountXlm).toBe(15000);
      expect(grant.tranches[1].amountXlm).toBe(15000);
      expect(grant.tranches[2].amountXlm).toBe(20000);
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
      expect(screen.getAllByText(/The Problem/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Software Development is Too Slow/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Slide 1 of 6/i)).toBeInTheDocument();
      expect(screen.getByText(/1 \/ 6/i)).toBeInTheDocument();
    });

    it('navigates sequentially using Next and Previous buttons', () => {
      render(<VCDeckViewer />);
      const nextButtons = screen.getAllByRole('button', { name: /Next Slide/i });
      const prevButtons = screen.getAllByRole('button', { name: /Previous Slide/i });

      // Click Next -> Slide 2 (Solution)
      fireEvent.click(nextButtons[0]);
      expect(screen.getByText(/Slide 2 of 6/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Replace a \$150k Dev Team/i).length).toBeGreaterThan(0);

      // Click Next -> Slide 3 (Market Opportunity)
      fireEvent.click(nextButtons[0]);
      expect(screen.getByText(/Slide 3 of 6/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Market Opportunity/i).length).toBeGreaterThan(0);

      // Click Prev -> Slide 2
      fireEvent.click(prevButtons[0]);
      expect(screen.getByText(/Slide 2 of 6/i)).toBeInTheDocument();
    });

    it('navigates directly to Slide 6 (The Ask) via slide selector buttons', () => {
      render(<VCDeckViewer />);
      const slide6Btn = screen.getByRole('button', { name: /SLIDE 6/i });
      fireEvent.click(slide6Btn);

      expect(screen.getByText(/Slide 6 of 6/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Join Us in Automating the Software Industry/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/60% Allocation/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Cloud Runner Infrastructure/i).length).toBeGreaterThan(0);
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
      expect(screen.getByText(/Technical Roadmap: Autonomous Swarm Scaling/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Establish the AI Workforce/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Autonomous Execution Pipeline/i)).toBeInTheDocument();
    });

    it('switches between all 4 phases correctly', () => {
      render(<RoadmapTimeline />);

      // Switch to Phase 2 (Open the Marketplace)
      const phase2Btn = screen.getByRole('button', { name: /PHASE 02/i });
      fireEvent.click(phase2Btn);
      expect(screen.getAllByText(/Open the Marketplace/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Public Client Dashboard/i)).toBeInTheDocument();

      // Switch to Phase 3 (Autonomous Expansion)
      const phase3Btn = screen.getByRole('button', { name: /PHASE 03/i });
      fireEvent.click(phase3Btn);
      expect(screen.getAllByText(/Autonomous Expansion/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/24\/7 Autonomous Bounty Discovery/i)).toBeInTheDocument();

      // Switch to Phase 4 (Full Enterprise Automation)
      const phase4Btn = screen.getByRole('button', { name: /PHASE 04/i });
      fireEvent.click(phase4Btn);
      expect(screen.getAllByText(/Full Enterprise Automation/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Enterprise IT Fleet Management/i)).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. SCFGrantView Component
  // ---------------------------------------------------------------------------
  describe('SCFGrantView Component', () => {
    it('renders $50,000 in XLM requested award and grant details', () => {
      render(<SCFGrantView />);
      expect(screen.getByText(/Universal Bounty Swarm: Dedicated Stellar AI Workforce/i)).toBeInTheDocument();
      expect(screen.getAllByText(/\$50,000 in XLM/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC/i)).toBeInTheDocument();
    });

    it('switches between all 3 tranches and validates deliverables', () => {
      render(<SCFGrantView />);

      // Default is Tranche 1 ($15,000 in XLM)
      expect(screen.getAllByText(/Ecosystem Acceleration & Tooling Integration/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/15,000 XLM/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Resolve and merge 25\+ automated pull requests/i)).toBeInTheDocument();

      // Click Tranche 2 ($15,000 in XLM)
      const tranche2Btn = screen.getByRole('button', { name: /TRANCHE 2/i });
      fireEvent.click(tranche2Btn);
      expect(screen.getAllByText(/Startup Onboarding & Bounty Hunting/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/15,000 XLM/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Successfully support 10 Stellar startups/i)).toBeInTheDocument();

      // Click Tranche 3 ($20,000 in XLM)
      const tranche3Btn = screen.getByRole('button', { name: /TRANCHE 3/i });
      fireEvent.click(tranche3Btn);
      expect(screen.getAllByText(/Core Infrastructure Maintenance & Mainnet Automation/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/20,000 XLM/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Maintain active 24\/7 coverage across core Stellar SDKs/i)).toBeInTheDocument();
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
      expect(screen.getByText(/Strategic Business Plan & Dual Monetization Engine/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Model A: The Hybrid Engine/i).length).toBeGreaterThan(0);

      // Click Model B (Proprietary Syndicate)
      const syndicateBtn = screen.getByRole('button', { name: /Model B: The Proprietary Syndicate/i });
      fireEvent.click(syndicateBtn);
      expect(screen.getAllByText(/100% Closed-Source Autonomous Bounty Hunting Fleet/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Deploy 1,000\+ autonomous cloud workers/i)).toBeInTheDocument();

      // Click Model C (Open Core)
      const opencoreBtn = screen.getByRole('button', { name: /Model C: Open Core & Commercial Licensing/i });
      fireEvent.click(opencoreBtn);
      expect(screen.getAllByText(/Public Automation Engine \+ Enterprise Compliance Gating/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Open-source core GitHub webhook runner/i)).toBeInTheDocument();
    });

    it('switches between all 4 audience asks (VC, Grants, Enterprise, Sponsors)', () => {
      render(<BusinessPlanView />);

      // Default is VC ask (Seed Round)
      expect(screen.getByText(/Seed Round to Scale Autonomous Software Labor/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Seed Round/i).length).toBeGreaterThan(0);

      // Click Grants tab
      const grantsTab = screen.getByRole('tab', { name: /Web3 Ecosystem Grants/i });
      fireEvent.click(grantsTab);
      expect(screen.getByText(/\$50,000 XLM Stellar Community Fund Build Award/i)).toBeInTheDocument();
      expect(screen.getAllByText(/\$50,000 in XLM/i).length).toBeGreaterThan(0);

      // Click Enterprise tab
      const enterpriseTab = screen.getByRole('tab', { name: /B2B Enterprise & Startups/i });
      fireEvent.click(enterpriseTab);
      expect(screen.getByText(/Replace Routine Engineering Costs with Low-Cost Subscriptions/i)).toBeInTheDocument();
      expect(screen.getByText(/Startup Tier/i)).toBeInTheDocument();
      expect(screen.getByText(/\$299 \/ month/i)).toBeInTheDocument();

      // Click Sponsors tab
      const sponsorsTab = screen.getByRole('tab', { name: /Open Source Sponsors/i });
      fireEvent.click(sponsorsTab);
      expect(screen.getByText(/Support Autonomous Open-Source Maintenance/i)).toBeInTheDocument();
      expect(screen.getByText(/Swarm Commander/i)).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 6. MarkdownDocViewer Component
  // ---------------------------------------------------------------------------
  describe('MarkdownDocViewer Component', () => {
    it('renders rendered markdown by default and switches between documents', () => {
      render(<MarkdownDocViewer initialDocId="b2b" />);
      expect(screen.getAllByText(/B2B Landing Page Copy \(v2\)/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Replace your \$150k dev team for a fraction of the cost/i).length).toBeGreaterThan(0);

      // Switch to Pitch Deck markdown
      const pitchDocBtn = screen.getByRole('button', { name: /^PITCH$/i });
      fireEvent.click(pitchDocBtn);
      expect(screen.getAllByText(/VC Pitch Deck/i).length).toBeGreaterThan(0);

      // Switch to Tech Roadmap markdown
      const roadmapDocBtn = screen.getByRole('button', { name: /^ROADMAP$/i });
      fireEvent.click(roadmapDocBtn);
      expect(screen.getAllByText(/Technical Roadmap/i).length).toBeGreaterThan(0);

      // Switch to SCF Grant markdown
      const scfDocBtn = screen.getByRole('button', { name: /^SCF$/i });
      fireEvent.click(scfDocBtn);
      expect(screen.getAllByText(/Stellar Community Fund/i).length).toBeGreaterThan(0);

      // Switch to Business Plan markdown
      const planDocBtn = screen.getByRole('button', { name: /^PLAN$/i });
      fireEvent.click(planDocBtn);
      expect(screen.getAllByText(/Strategic Business Plan/i).length).toBeGreaterThan(0);
    });

    it('toggles between Rendered view and Raw Markdown view', () => {
      render(<MarkdownDocViewer initialDocId="b2b" />);
      const rawBtn = screen.getByRole('button', { name: /Raw Markdown/i });
      fireEvent.click(rawBtn);

      expect(screen.getByText(/Raw Source: B2B_Landing_Page_Copy_v2.md/i)).toBeInTheDocument();
      expect(screen.getByText(/# B2B Landing Page Copy \(v2\)/i)).toBeInTheDocument();

      const renderedBtn = screen.getByRole('button', { name: /Rendered/i });
      fireEvent.click(renderedBtn);
      expect(screen.getAllByText(/Replace your \$150k dev team for a fraction of the cost/i).length).toBeGreaterThan(0);
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

      expect(screen.getAllByText(/\$500B\+/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Global Developer Labor/i)).toBeInTheDocument();
      expect(screen.getAllByText(/90%\+/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/\$50k/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/4 Phases/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Seed Round/i).length).toBeGreaterThan(0);
    });

    it('switches across all 5 master tabs and markdown inspector tab', () => {
      render(
        <MemoryRouter initialEntries={['/strategy']}>
          <StrategyPage />
        </MemoryRouter>
      );

      // Default is B2B Showcase
      expect(screen.getAllByText(/Replace your \$150k dev team/i).length).toBeGreaterThan(0);

      // Tab 2: VC Pitch Deck
      const pitchTab = screen.getByRole('tab', { name: /VC Pitch Deck/i });
      fireEvent.click(pitchTab);
      expect(screen.getByText(/VC Pitch Deck Master Summary/i)).toBeInTheDocument();

      // Tab 3: Tech Roadmap
      const roadmapTab = screen.getByRole('tab', { name: /Tech Roadmap/i });
      fireEvent.click(roadmapTab);
      expect(screen.getByText(/Technical Roadmap: Autonomous Swarm Scaling/i)).toBeInTheDocument();

      // Tab 4: Stellar SCF Grant
      const scfTab = screen.getByRole('tab', { name: /Stellar SCF Grant/i });
      fireEvent.click(scfTab);
      expect(screen.getByText(/Universal Bounty Swarm: Dedicated Stellar AI Workforce/i)).toBeInTheDocument();

      // Tab 5: Business Plan
      const planTab = screen.getByRole('tab', { name: /Business Plan/i });
      fireEvent.click(planTab);
      expect(screen.getByText(/Strategic Business Plan & Dual Monetization Engine/i)).toBeInTheDocument();

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
