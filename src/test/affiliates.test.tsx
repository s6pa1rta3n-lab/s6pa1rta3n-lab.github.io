import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AffiliatesPage } from '../pages/AffiliatesPage';
import { EarningsCalculator } from '../components/affiliates/EarningsCalculator';
import { TierMatrix } from '../components/affiliates/TierMatrix';
import { MarketingToolkit } from '../components/affiliates/MarketingToolkit';

describe('Milestone 4 — Affiliates & Creator Hub Test Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders AffiliatesPage header, calculator, tier matrix, toolkit, and FAQs', () => {
    render(<AffiliatesPage />);

    expect(screen.getByText(/Creator & Partner Revenue-Share Program/i)).toBeInTheDocument();
    expect(screen.getByText(/Affiliate &/i)).toBeInTheDocument();
    expect(screen.getByText(/Creator Program/i)).toBeInTheDocument();
    expect(screen.getByText(/Dynamic Earnings Calculator/i)).toBeInTheDocument();
    expect(screen.getByText(/4-Tier Commission Matrix/i)).toBeInTheDocument();
    expect(screen.getByText(/Creator Marketing Toolkit/i)).toBeInTheDocument();
    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
  });

  it('calculates monthly and annual earnings dynamically across all 4 tiers via sliders', () => {
    render(<EarningsCalculator />);

    const sliders = screen.getAllByRole('slider');
    const teamsSlider = sliders[0];
    const spendSlider = sliders[1];

    // Case 1: Bronze Scout (<10 teams, e.g. 4 teams @ $1,000/mo)
    fireEvent.change(teamsSlider, { target: { value: '4' } });
    fireEvent.change(spendSlider, { target: { value: '1000' } });

    expect(screen.getByText(/Current Tier: Bronze Scout \(10%\)/i)).toBeInTheDocument();
    expect(screen.getByText('$400')).toBeInTheDocument(); // 4 * 1000 * 10%
    expect(screen.getByText('$4,800')).toBeInTheDocument(); // 400 * 12

    // Case 2: Silver Hunter (10-24 teams, e.g. 15 teams @ $2,000/mo)
    fireEvent.change(teamsSlider, { target: { value: '15' } });
    fireEvent.change(spendSlider, { target: { value: '2000' } });

    expect(screen.getByText(/Current Tier: Silver Hunter \(15%\)/i)).toBeInTheDocument();
    expect(screen.getByText('$4,500')).toBeInTheDocument(); // 15 * 2000 * 15%
    expect(screen.getByText('$54,000')).toBeInTheDocument(); // 4500 * 12

    // Case 3: Gold Commander (25-49 teams, e.g. 30 teams @ $1,200/mo)
    fireEvent.change(teamsSlider, { target: { value: '30' } });
    fireEvent.change(spendSlider, { target: { value: '1200' } });

    expect(screen.getByText(/Current Tier: Gold Commander \(20%\)/i)).toBeInTheDocument();
    expect(screen.getByText('$7,200')).toBeInTheDocument(); // 30 * 1200 * 20%
    expect(screen.getByText('$86,400')).toBeInTheDocument(); // 7200 * 12

    // Case 4: Diamond Syndicate (50+ teams, e.g. 50 teams @ $1,200/mo)
    fireEvent.change(teamsSlider, { target: { value: '50' } });
    fireEvent.change(spendSlider, { target: { value: '1200' } });

    expect(screen.getByText(/Current Tier: Diamond Syndicate \(25%\)/i)).toBeInTheDocument();
    expect(screen.getByText('$15,000')).toBeInTheDocument(); // 50 * 1200 * 25%
    expect(screen.getByText('$180,000')).toBeInTheDocument(); // 15000 * 12
  });

  it('renders all 4 tier cards with commission rates and perks in TierMatrix', () => {
    render(<TierMatrix currentTierId="silver-hunter" />);

    expect(screen.getByText('Bronze Scout')).toBeInTheDocument();
    expect(screen.getByText('Silver Hunter')).toBeInTheDocument();
    expect(screen.getByText('Gold Commander')).toBeInTheDocument();
    expect(screen.getByText('Diamond Syndicate')).toBeInTheDocument();

    // Check SaaS Commission rates are present
    expect(screen.getAllByText('10%').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('15%').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('20%').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('25%').length).toBeGreaterThanOrEqual(1);

    // Check Bounty Commission rates are present
    expect(screen.getByText('5%')).toBeInTheDocument();
    expect(screen.getByText('7.5%')).toBeInTheDocument();

    // Check Active Tier label
    expect(screen.getByText(/Active Tier/i)).toBeInTheDocument();
  });

  it('allows copying marketing snippets and generates custom referral links in MarketingToolkit', () => {
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

    render(<MarketingToolkit />);

    // Check Quick Pitch Copy
    const copyPitchBtn = screen.getByRole('button', { name: /Copy Pitch/i });
    fireEvent.click(copyPitchBtn);

    expect(writeTextSpy).toHaveBeenCalledWith(expect.stringContaining('https://swarm.dev/r/YOUR_TAG'));

    // Custom referral link generator
    const tagInput = screen.getByPlaceholderText(/dev_partner/i);
    fireEvent.change(tagInput, { target: { value: 'crypto_lead_42' } });

    expect(screen.getByText('https://swarm.dev/r/crypto_lead_42')).toBeInTheDocument();

    const copyLinkBtn = screen.getByRole('button', { name: /Copy Link/i });
    fireEvent.click(copyLinkBtn);

    expect(writeTextSpy).toHaveBeenCalledWith('https://swarm.dev/r/crypto_lead_42');
  });

  it('toggles FAQ questions open and closed in AffiliatesPage', () => {
    render(<AffiliatesPage />);

    const faqButton = screen.getByRole('button', { name: /How and when do I get paid\?/i });
    expect(screen.queryByText(/Payouts are processed automatically in USDC/i)).not.toBeInTheDocument();

    // Open FAQ
    fireEvent.click(faqButton);
    expect(screen.getByText(/Payouts are processed automatically in USDC/i)).toBeInTheDocument();

    // Close FAQ
    fireEvent.click(faqButton);
    expect(screen.queryByText(/Payouts are processed automatically in USDC/i)).not.toBeInTheDocument();
  });
});
