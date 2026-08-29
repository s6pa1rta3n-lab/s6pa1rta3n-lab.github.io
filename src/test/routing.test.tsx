import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('HashRouter Navigation & Shell Verification', () => {
  beforeEach(() => {
    window.location.hash = '#/pitch';
  });

  it('renders Pitch page by default on root hash route', async () => {
    render(<App />);
    expect(screen.getAllByText(/Universal/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Bounty Swarm/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/All Things Agentic Hackathon Entry/i)).toBeInTheDocument();
    expect(screen.getByText(/Autonomous Labor Arbitrage/i)).toBeInTheDocument();
  });

  it('navigates to Strategy & Operations page when clicking navbar link', async () => {
    render(<App />);
    
    // Find Strategy navigation link in header
    const strategyLinks = screen.getAllByRole('link', { name: /Strategy & Ops/i });
    fireEvent.click(strategyLinks[0]);

    expect(screen.getByText(/Operations Hub/i)).toBeInTheDocument();
    expect(screen.getByText(/B2B Landing Copy/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /VC Pitch Deck/i })).toBeInTheDocument();
  });

  it('navigates to Research Blog page when clicking navbar link', async () => {
    render(<App />);
    
    const blogLinks = screen.getAllByRole('link', { name: /Research Blog/i });
    fireEvent.click(blogLinks[0]);

    expect(screen.getByPlaceholderText(/Search engineering dispatches/i)).toBeInTheDocument();
    expect(screen.getByText(/Decentralized Multi-Agent Coordination via Firebase/i)).toBeInTheDocument();
  });

  it('navigates to Grants & Payout Verification page when clicking navbar link', async () => {
    render(<App />);
    
    const grantsLinks = screen.getAllByRole('link', { name: /Grants/i });
    fireEvent.click(grantsLinks[0]);

    expect(screen.getByText(/Grants &/i)).toBeInTheDocument();
    expect(screen.getByText(/Settlement Proofs/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Stellar Community Fund \(SCF\)/i })).toBeInTheDocument();
    expect(screen.getAllByText(/0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC/i)[0]).toBeInTheDocument();
  });

  it('navigates to Affiliates page when clicking navbar link', async () => {
    render(<App />);
    
    const affiliatesLinks = screen.getAllByRole('link', { name: /Affiliates/i });
    fireEvent.click(affiliatesLinks[0]);

    expect(screen.getByText(/Affiliate &/i)).toBeInTheDocument();
    expect(screen.getByText(/Creator Program/i)).toBeInTheDocument();
    expect(screen.getByText(/Dynamic Earnings Calculator/i)).toBeInTheDocument();
    expect(screen.getByText(/Bronze Scout/i)).toBeInTheDocument();
    expect(screen.getByText(/Diamond Syndicate/i)).toBeInTheDocument();
  });

  it('navigates to Marketplace page when clicking navbar link', async () => {
    render(<App />);
    
    const marketplaceLinks = screen.getAllByRole('link', { name: /Marketplace/i });
    fireEvent.click(marketplaceLinks[0]);

    expect(screen.getByRole('heading', { name: /Swarm Marketplace/i })).toBeInTheDocument();
    expect(screen.getByText(/Universal Victory Auditor/i)).toBeInTheDocument();
    expect(screen.getByText(/Autonomous CI\/CD Fixer/i)).toBeInTheDocument();
    expect(screen.getByText(/MEV-Protected DeFi Keeper/i)).toBeInTheDocument();
  });

  it('renders live telemetry pill and verified settlement addresses in footer', async () => {
    render(<App />);
    
    // Telemetry pill in navbar
    expect(screen.getAllByText(/Swarm Engine/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Online/i)[0]).toBeInTheDocument();

    // Footer settlement proof
    expect(screen.getAllByText(/Outcome-Based Labor Arbitrage/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/EVM Base\/Arb\/ETH/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Stellar \/ Soroban/i)[0]).toBeInTheDocument();
  });

  it('allows switching tabs on Strategy & Operations page', async () => {
    render(<App />);
    
    const strategyLinks = screen.getAllByRole('link', { name: /Strategy & Ops/i });
    fireEvent.click(strategyLinks[0]);

    const vcTab = screen.getByRole('tab', { name: /VC Pitch Deck/i });
    fireEvent.click(vcTab);

    expect(screen.getByText(/Ask: \$3.5M Seed @ \$22M Cap/i)).toBeInTheDocument();
    expect(screen.getByText(/VC Pitch Deck Master Summary/i)).toBeInTheDocument();

    const scfTab = screen.getByRole('tab', { name: /Stellar SCF Grant/i });
    fireEvent.click(scfTab);
    expect(screen.getByText(/Stellar Community Fund \(\$150,000 Award\)/i)).toBeInTheDocument();
  });

  it('updates affiliate earnings calculator on slider change', async () => {
    render(<App />);
    
    const affiliatesLinks = screen.getAllByRole('link', { name: /Affiliates/i });
    fireEvent.click(affiliatesLinks[0]);

    const sliders = screen.getAllByRole('slider');
    expect(sliders.length).toBeGreaterThanOrEqual(2);

    // Change teams referred to 30 (Gold tier)
    fireEvent.change(sliders[0], { target: { value: '30' } });
    expect(screen.getByText(/Current Tier: Gold Commander \(20%\)/i)).toBeInTheDocument();
  });

  it('renders and allows opening and closing API schema modal in Marketplace', async () => {
    render(<App />);
    
    const marketplaceLinks = screen.getAllByRole('link', { name: /Marketplace/i });
    fireEvent.click(marketplaceLinks[0]);

    const inspectButtons = screen.getAllByRole('button', { name: /Inspect API Schema/i });
    fireEvent.click(inspectButtons[0]);

    expect(screen.getByText(/REST \/ Webhook API Schema/i)).toBeInTheDocument();
    expect(screen.getByText(/zeroMockVerification/i)).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /Close Inspector/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByText(/zeroMockVerification/i)).not.toBeInTheDocument();
  });
});
