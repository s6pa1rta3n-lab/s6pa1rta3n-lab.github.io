import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { PitchPage } from '../pages/PitchPage';
import { JudgingCriteriaGrid } from '../components/pitch/JudgingCriteriaGrid';
import { TerminalSimulator } from '../components/pitch/TerminalSimulator';
import { ArchitectureNexus } from '../components/pitch/ArchitectureNexus';
import { BonusMultipliers } from '../components/pitch/BonusMultipliers';
import {
  CORE_JUDGING_CRITERIA,
  BONUS_MULTIPLIERS_DATA,
  TERMINAL_SIMULATION_STEPS,
  ARCHITECTURE_LAYERS,
} from '../data/devpostCriteria';

describe('Milestone 3 — Hackathon Pitch & Devpost Alignment Test Suite', () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });

  describe('Devpost Criteria Data Model Integrity', () => {
    it('contains all 3 Stage 2 judging criteria with correct weights totaling 100%', () => {
      expect(CORE_JUDGING_CRITERIA).toHaveLength(3);
      const totalWeight = CORE_JUDGING_CRITERIA.reduce((sum, item) => sum + item.scorePercent, 0);
      expect(totalWeight).toBe(100);

      const innovation = CORE_JUDGING_CRITERIA.find((c) => c.id === 'criterion-1-innovation');
      expect(innovation).toBeDefined();
      expect(innovation?.scorePercent).toBe(40);

      const architecture = CORE_JUDGING_CRITERIA.find((c) => c.id === 'criterion-2-architecture');
      expect(architecture).toBeDefined();
      expect(architecture?.scorePercent).toBe(30);

      const demo = CORE_JUDGING_CRITERIA.find((c) => c.id === 'criterion-3-demo-readiness');
      expect(demo).toBeDefined();
      expect(demo?.scorePercent).toBe(30);
    });

    it('contains valid Stage 3 bonus multipliers including multi-model integrations', () => {
      expect(BONUS_MULTIPLIERS_DATA.length).toBeGreaterThanOrEqual(4);
      const gemma = BONUS_MULTIPLIERS_DATA.find((b) => b.id === 'bonus-gemma-auditor');
      expect(gemma).toBeDefined();
      expect(gemma?.points).toBe(0.2);

      const veo = BONUS_MULTIPLIERS_DATA.find((b) => b.id === 'bonus-veo-walkthrough');
      expect(veo).toBeDefined();
      expect(veo?.points).toBe(0.2);
    });

    it('contains 5-phase terminal simulation steps covering the full autonomous lifecycle', () => {
      expect(TERMINAL_SIMULATION_STEPS).toHaveLength(5);
      expect(TERMINAL_SIMULATION_STEPS[0].phase).toBe('INTAKE_GATEWAY');
      expect(TERMINAL_SIMULATION_STEPS[1].phase).toBe('CONTEXT_RAG');
      expect(TERMINAL_SIMULATION_STEPS[2].phase).toBe('SANDBOX_SYNTHESIS');
      expect(TERMINAL_SIMULATION_STEPS[3].phase).toBe('VICTORY_AUDIT');
      expect(TERMINAL_SIMULATION_STEPS[4].phase).toBe('PR_DELIVERY');
    });

    it('contains all 5 decoupled architecture layers with GCP service maps', () => {
      expect(ARCHITECTURE_LAYERS).toHaveLength(5);
      ARCHITECTURE_LAYERS.forEach((layer) => {
        expect(layer.googleCloudServices.length).toBeGreaterThan(0);
        expect(layer.securityControls.length).toBeGreaterThan(0);
        expect(layer.codeSnippet.length).toBeGreaterThan(20);
      });
    });
  });

  describe('JudgingCriteriaGrid Component', () => {
    it('renders all 3 judging criteria cards with weights, score targets, and BYOF highlights', () => {
      render(<JudgingCriteriaGrid />);

      expect(screen.getByRole('heading', { name: /Innovation & Operational Utility/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Architectural Discipline & Tech Stack/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Demo & Production Readiness/i })).toBeInTheDocument();

      expect(screen.getByText(/40% Weight \(2.0 Base Pts\)/i)).toBeInTheDocument();
      expect(screen.getAllByText(/30% Weight \(1.5 Base Pts\)/i)).toHaveLength(2);

      expect(screen.getAllByText(/Bring Your Own Friction \(BYOF\) Proof/i)).toHaveLength(3);
    });

    it('allows toggling deep-dive evidence and technical moat accordion', () => {
      render(<JudgingCriteriaGrid />);

      const toggleButtons = screen.getAllByRole('button', { name: /Toggle deep-dive for/i });
      expect(toggleButtons).toHaveLength(3);

      // Initially expanded
      expect(screen.getAllByText(/Verifiable Evidence & Production Proofs/i)[0]).toBeInTheDocument();

      // Click to collapse
      fireEvent.click(toggleButtons[0]);
      expect(toggleButtons[0]).toHaveAttribute('aria-expanded', 'false');

      // Click to expand again
      fireEvent.click(toggleButtons[0]);
      expect(toggleButtons[0]).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('TerminalSimulator Component', () => {
    it('renders terminal console, playback buttons, and step navigator', () => {
      render(<TerminalSimulator />);

      expect(screen.getByText(/fleet-cloudrun-runner@gcp-us-central1:~/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Play simulation/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Previous step/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Next step/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Reset simulation/i })).toBeInTheDocument();

      // Check step buttons
      expect(screen.getByRole('button', { name: /Jump to Step 1: INTAKE_GATEWAY/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Jump to Step 4: VICTORY_AUDIT/i })).toBeInTheDocument();
    });

    it('steps forward and backward through autonomous lifecycle phases', () => {
      render(<TerminalSimulator />);

      // Step 1 initial state
      expect(screen.getByText(/cloudrun:ingest_webhook/i)).toBeInTheDocument();
      expect(screen.getAllByText(/INTAKE_GATEWAY/i)[0]).toBeInTheDocument();

      // Step Forward to Step 2
      const nextBtn = screen.getByRole('button', { name: /Next step/i });
      fireEvent.click(nextBtn);

      expect(screen.getByText(/antigravity:episodic_rag/i)).toBeInTheDocument();
      expect(screen.getAllByText(/CONTEXT_RAG/i)[0]).toBeInTheDocument();

      // Jump directly to Step 4: VICTORY_AUDIT
      const step4Btn = screen.getByRole('button', { name: /Jump to Step 4: VICTORY_AUDIT/i });
      fireEvent.click(step4Btn);

      expect(screen.getByText(/auditor:murder_board/i)).toBeInTheDocument();
      expect(screen.getAllByText(/VICTORY_AUDIT/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/VERDICT: VICTORY AUDIT PASSED/i)).toBeInTheDocument();

      // Step Backward to Step 3
      const prevBtn = screen.getByRole('button', { name: /Previous step/i });
      fireEvent.click(prevBtn);

      expect(screen.getByText(/docker:sandbox_exec/i)).toBeInTheDocument();
      expect(screen.getAllByText(/SANDBOX_SYNTHESIS/i)[0]).toBeInTheDocument();
    });

    it('resets back to step 1 when clicking reset button', () => {
      render(<TerminalSimulator />);

      // Jump to step 5
      const step5Btn = screen.getByRole('button', { name: /Jump to Step 5: PR_DELIVERY/i });
      fireEvent.click(step5Btn);
      expect(screen.getByText(/github:create_pr/i)).toBeInTheDocument();

      // Click Reset
      const resetBtn = screen.getByRole('button', { name: /Reset simulation/i });
      fireEvent.click(resetBtn);

      expect(screen.getByText(/cloudrun:ingest_webhook/i)).toBeInTheDocument();
      expect(screen.getAllByText(/INTAKE_GATEWAY/i)[0]).toBeInTheDocument();
    });

    it('toggles play/pause playback state', () => {
      render(<TerminalSimulator />);

      const playBtn = screen.getByRole('button', { name: /Play simulation/i });
      fireEvent.click(playBtn);

      expect(screen.getByRole('button', { name: /Pause simulation/i })).toBeInTheDocument();

      const pauseBtn = screen.getByRole('button', { name: /Pause simulation/i });
      fireEvent.click(pauseBtn);

      expect(screen.getByRole('button', { name: /Play simulation/i })).toBeInTheDocument();
    });

    it('displays reactive Firestore state diff and cumulative cost metrics', () => {
      render(<TerminalSimulator />);

      expect(screen.getByText(/Firestore Stigmergy State/i)).toBeInTheDocument();
      expect(screen.getByText(/Real-Time Labor Arbitrage Cost/i)).toBeInTheDocument();
      expect(screen.getByText(/98% Cheaper/i)).toBeInTheDocument();
    });
  });

  describe('ArchitectureNexus Component', () => {
    it('renders all 5 architecture layers and allows switching layers', () => {
      render(<ArchitectureNexus />);

      expect(screen.getByRole('button', { name: /Inspect Multi-Model Cognitive Nexus/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Inspect Cloud Run Serverless Webhook Gateway/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Inspect Reactive Stigmergy & State Engine/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Inspect Ephemeral Execution Sandboxes/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Inspect Zero-Trust Victory Audit Protocol/i })).toBeInTheDocument();

      // Click on Cloud Run Gateway layer
      const gatewayBtn = screen.getByRole('button', { name: /Inspect Cloud Run Serverless Webhook Gateway/i });
      fireEvent.click(gatewayBtn);

      expect(screen.getByRole('heading', { name: /Cloud Run Serverless Webhook Gateway/i })).toBeInTheDocument();
      expect(screen.getByText(/Cloud Run \(Serverless Container Gateway\)/i)).toBeInTheDocument();
      expect(screen.getByText(/HMAC-SHA256 signature verification/i)).toBeInTheDocument();

      // Click on Victory Audit layer
      const auditBtn = screen.getByRole('button', { name: /Inspect Zero-Trust Victory Audit Protocol/i });
      fireEvent.click(auditBtn);

      expect(screen.getByRole('heading', { name: /Zero-Trust Victory Audit Protocol/i })).toBeInTheDocument();
      expect(screen.getByText(/The Adversarial Murder Board/i)).toBeInTheDocument();
      expect(screen.getByText(/Strict anti-mock AST parser/i)).toBeInTheDocument();
    });

    it('handles code snippet copy functionality', async () => {
      render(<ArchitectureNexus />);

      const copyBtn = screen.getByRole('button', { name: /Copy code snippet/i });
      await act(async () => {
        fireEvent.click(copyBtn);
      });

      expect(await screen.findByText(/Copied!/i)).toBeInTheDocument();
    });
  });

  describe('BonusMultipliers Component', () => {
    it('renders bonus calculator banner and cards with point values', () => {
      render(<BonusMultipliers />);

      expect(screen.getByRole('heading', { name: /Bonus Points Multipliers/i })).toBeInTheDocument();
      expect(screen.getByText(/Interactive Devpost Final Score Projector/i)).toBeInTheDocument();
      expect(screen.getByText(/Published Technical Article/i)).toBeInTheDocument();
      expect(screen.getByText(/Social Launch Campaign/i)).toBeInTheDocument();
      expect(screen.getByText(/Gemma 2 Offline AST Auditor/i)).toBeInTheDocument();
      expect(screen.getByText(/Google Veo PR Video Generator/i)).toBeInTheDocument();
    });

    it('dynamically updates score calculation when toggling bonuses', () => {
      render(<BonusMultipliers />);

      // Initial state: 4 active bonuses (0.2 * 4 = 0.8 bonus -> 5.0 + 0.8 = 5.8)
      expect(screen.getAllByText(/5.8/i)[0]).toBeInTheDocument();

      // Toggle Lyria on (+0.2 -> 1.0 total bonus -> 6.0 / 6.0)
      const lyriaToggle = screen.getByRole('button', { name: /Toggle Google Lyria Audio Telemetry/i });
      fireEvent.click(lyriaToggle);

      expect(screen.getAllByText(/6.0/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/Maximum Stage 3 Bonus Achieved \(\+1.0\)/i)).toBeInTheDocument();

      // Toggle Dev.to off (-0.2 -> 0.8 bonus -> 5.8)
      const devtoToggle = screen.getByRole('button', { name: /Toggle Published Technical Article/i });
      fireEvent.click(devtoToggle);

      expect(screen.getAllByText(/5.8/i)[0]).toBeInTheDocument();
    });
  });

  describe('Full PitchPage Integration', () => {
    it('renders complete pitch page with hero, value proposition, all sections, and CTAs', () => {
      render(
        <HashRouter>
          <PitchPage />
        </HashRouter>
      );

      // Hero
      expect(screen.getAllByText(/Universal/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Bounty Swarm/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/All Things Agentic Hackathon Entry/i)).toBeInTheDocument();
      expect(screen.getByText(/Autonomous Software Labor Force on Google Cloud/i)).toBeInTheDocument();

      // Value proposition
      expect(screen.getAllByText(/Outcome-Based Labor Arbitrage/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/90%\+ Cost Arbitrage/i)).toBeInTheDocument();

      // Integrated sub-components
      expect(screen.getByRole('heading', { name: /Core Judging Criteria/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Autonomous Terminal Simulator/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Interactive Architecture Nexus/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Stage 3 Bonus Points Multipliers/i })).toBeInTheDocument();

      // GCP deployment proof
      expect(screen.getByText(/Production Verified on Google Cloud Run & Firestore/i)).toBeInTheDocument();
      expect(screen.getByText(/1-Click Local Reproducibility/i)).toBeInTheDocument();

      // CTA buttons
      expect(screen.getByRole('link', { name: /Explore Marketplace Micro-Services/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Verify Settlement Proofs/i })).toBeInTheDocument();
    });
  });
});
