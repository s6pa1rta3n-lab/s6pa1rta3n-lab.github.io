import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GrantsPage } from '../pages/GrantsPage';
import { PayoutVerifier } from '../components/grants/PayoutVerifier';
import { GrantDossierCard } from '../components/grants/GrantDossierCard';
import { MilestonesTranches } from '../components/grants/MilestonesTranches';
import { TeaConstitutionViewer } from '../components/grants/TeaConstitutionViewer';
import { grantDossiers, OFFICIAL_PAYOUT_ADDRESSES, sampleTeaConstitutionYaml } from '../data/grantsData';

describe('Milestone 4 — Grants Funding Hub Test Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders GrantsPage header, settlement proofs, and all grant dossiers', () => {
    render(<GrantsPage />);

    expect(screen.getByText(/Multi-Chain Public Goods & Grant Funding/i)).toBeInTheDocument();
    expect(screen.getByText(/Grants &/i)).toBeInTheDocument();
    expect(screen.getByText(/Ecosystem Funding/i)).toBeInTheDocument();
    expect(screen.getByText(/Cryptographic Payout Routing Proof/i)).toBeInTheDocument();

    // Verify all 4 grant programs rendered
    grantDossiers.forEach((grant) => {
      expect(screen.getByRole('heading', { name: new RegExp(grant.name.replace(/([()])/g, '\\$1'), 'i') })).toBeInTheDocument();
      expect(screen.getAllByText(grant.award)[0]).toBeInTheDocument();
    });
  });

  it('verifies and copies authoritative EVM and Stellar settlement addresses in PayoutVerifier', async () => {
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

    render(<PayoutVerifier />);

    // Check displayed addresses
    expect(screen.getByText(OFFICIAL_PAYOUT_ADDRESSES.evm)).toBeInTheDocument();
    expect(screen.getByText(OFFICIAL_PAYOUT_ADDRESSES.stellar)).toBeInTheDocument();

    // Copy EVM address
    const copyEvmBtn = screen.getByRole('button', { name: /Copy EVM Address/i });
    fireEvent.click(copyEvmBtn);

    expect(writeTextSpy).toHaveBeenCalledWith(OFFICIAL_PAYOUT_ADDRESSES.evm);
    expect(screen.getByText(/Copied/i)).toBeInTheDocument();

    // Copy Stellar address
    const copyStellarBtn = screen.getByRole('button', { name: /Copy Stellar Address/i });
    fireEvent.click(copyStellarBtn);

    expect(writeTextSpy).toHaveBeenCalledWith(OFFICIAL_PAYOUT_ADDRESSES.stellar);
  });

  it('filters payout networks inside PayoutVerifier', () => {
    render(<PayoutVerifier />);

    // Filter to Stellar only
    const stellarFilterBtn = screen.getByRole('button', { name: /Stellar \(XLM\/Soroban\)/i });
    fireEvent.click(stellarFilterBtn);

    expect(screen.getByText(OFFICIAL_PAYOUT_ADDRESSES.stellar)).toBeInTheDocument();
    expect(screen.queryByText(OFFICIAL_PAYOUT_ADDRESSES.evm)).not.toBeInTheDocument();

    // Filter to EVM only
    const evmFilterBtn = screen.getByRole('button', { name: /EVM \(Base\/ETH\/Arb\)/i });
    fireEvent.click(evmFilterBtn);

    expect(screen.getByText(OFFICIAL_PAYOUT_ADDRESSES.evm)).toBeInTheDocument();
    expect(screen.queryByText(OFFICIAL_PAYOUT_ADDRESSES.stellar)).not.toBeInTheDocument();
  });

  it('filters grant dossiers by ecosystem tab in GrantsPage', () => {
    render(<GrantsPage />);

    // Filter by Stellar
    const stellarTab = screen.getByRole('button', { name: /^Stellar$/i });
    fireEvent.click(stellarTab);

    expect(screen.getByRole('heading', { name: /Stellar Community Fund \(SCF\)/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Octant Atlas v2 Public Goods/i })).not.toBeInTheDocument();

    // Filter by Base
    const baseTab = screen.getByRole('button', { name: /^Base$/i });
    fireEvent.click(baseTab);

    expect(screen.getByRole('heading', { name: /TEA Protocol Proof of Contribution/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Stellar Community Fund \(SCF\)/i })).not.toBeInTheDocument();

    // Reset to All
    const allTab = screen.getByRole('button', { name: /^All$/i });
    fireEvent.click(allTab);

    expect(screen.getByRole('heading', { name: /Stellar Community Fund \(SCF\)/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Octant Atlas v2 Public Goods/i })).toBeInTheDocument();
  });

  it('renders milestone tranches with deliverables and accurate financial totals for Stellar SCF', () => {
    const scfGrant = grantDossiers.find((g) => g.id === 'stellar-scf')!;

    render(<MilestonesTranches tranches={scfGrant.tranches} />);

    // Verify 3 phases
    expect(screen.getByText(/Phase 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Ecosystem Acceleration & Tooling Integration/i)).toBeInTheDocument();
    expect(screen.getAllByText(/\$15,000 XLM/i).length).toBe(2);

    expect(screen.getByText(/Phase 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Startup Onboarding & Bounty Hunting/i)).toBeInTheDocument();

    expect(screen.getByText(/Phase 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Core Infrastructure Maintenance & Mainnet Automation/i)).toBeInTheDocument();
    expect(screen.getByText(/\$20,000 XLM/i)).toBeInTheDocument();

    // Verify sum of amounts is $50,000
    const totalAmount = scfGrant.tranches.reduce((sum, t) => {
      const num = parseInt(t.amount.replace(/[^0-9]/g, ''), 10);
      return sum + num;
    }, 0);
    expect(totalAmount).toBe(50000);
  });

  it('renders and allows copying valid tea.yaml in TeaConstitutionViewer', () => {
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

    render(<TeaConstitutionViewer yamlContent={sampleTeaConstitutionYaml} />);

    expect(screen.getByRole('heading', { name: /TEA Protocol Governance Constitution/i })).toBeInTheDocument();
    expect(screen.getByText(/67% \(2\/3\)/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Base L2/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/80% Maintainers/i)).toBeInTheDocument();

    const copyBtn = screen.getByRole('button', { name: /Copy tea.yaml/i });
    fireEvent.click(copyBtn);

    expect(writeTextSpy).toHaveBeenCalledWith(expect.stringContaining('rewards:'));
    expect(writeTextSpy).toHaveBeenCalledWith(expect.stringContaining(OFFICIAL_PAYOUT_ADDRESSES.evm));
    expect(screen.getByText(/YAML Copied!/i)).toBeInTheDocument();
  });

  it('allows expanding and collapsing milestone tranches in GrantDossierCard', () => {
    const scfGrant = grantDossiers.find((g) => g.id === 'stellar-scf')!;

    render(<GrantDossierCard grant={scfGrant} />);

    // Initially expanded
    expect(screen.getByText(/Ecosystem Acceleration & Tooling Integration/i)).toBeInTheDocument();

    // Toggle collapse
    const toggleBtn = screen.getByRole('button', { name: /Hide Milestone Tranches/i });
    fireEvent.click(toggleBtn);

    expect(screen.queryByText(/Ecosystem Acceleration & Tooling Integration/i)).not.toBeInTheDocument();

    // Toggle expand again
    fireEvent.click(screen.getByRole('button', { name: /View Milestone Tranches/i }));
    expect(screen.getByText(/Ecosystem Acceleration & Tooling Integration/i)).toBeInTheDocument();
  });
});
