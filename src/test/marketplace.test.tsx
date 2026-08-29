import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MarketplacePage } from '../pages/MarketplacePage';
import { ServiceDetailModal } from '../components/marketplace/ServiceDetailModal';
import { marketplaceServices, marketplacePlans } from '../data/marketplaceData';

describe('Milestone 4 — Marketplace Hub Test Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderMarketplacePage = () => {
    return render(
      <MemoryRouter initialEntries={['/marketplace']}>
        <MarketplacePage />
      </MemoryRouter>
    );
  };

  it('renders MarketplacePage header, all 6 micro-services, and pricing matrix', () => {
    renderMarketplacePage();

    expect(screen.getByText(/Swarm AI Worker Marketplace/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Swarm AI Worker Marketplace/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search micro-services, tools & schemas.../i)).toBeInTheDocument();

    // Verify all 6 micro-services are rendered
    marketplaceServices.forEach((service) => {
      expect(screen.getByRole('heading', { name: new RegExp(`^${service.name}$`, 'i') })).toBeInTheDocument();
    });

    // Verify 3 pricing plans
    marketplacePlans.forEach((plan) => {
      expect(screen.getByRole('heading', { name: new RegExp(`^${plan.name}$`, 'i') })).toBeInTheDocument();
    });
  });

  it('toggles billing cycle between Monthly and Annual (-20% discount) updating prices dynamically', () => {
    renderMarketplacePage();

    // Initially Annual billing is selected by default in MarketplacePage
    const victoryAuditorAnnual = screen.getByText('$399');
    expect(victoryAuditorAnnual).toBeInTheDocument();

    // Switch to Monthly
    const monthlyButtons = screen.getAllByRole('button', { name: /Monthly Billing/i });
    fireEvent.click(monthlyButtons[0]);

    expect(screen.getByText('$499')).toBeInTheDocument();

    // Switch back to Annual
    const annualButtons = screen.getAllByRole('button', { name: /Annual Billing/i });
    fireEvent.click(annualButtons[0]);

    expect(screen.getByText('$399')).toBeInTheDocument();
  });

  it('filters micro-services by category and search query', () => {
    renderMarketplacePage();

    // Filter by Security & Audit category
    const secCategoryBtn = screen.getByRole('button', { name: /Security & Audit/i });
    fireEvent.click(secCategoryBtn);

    expect(screen.getByRole('heading', { name: /Universal Victory Auditor/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /MEV-Protected DeFi Keeper/i })).not.toBeInTheDocument();

    // Reset category by clicking All
    const allCategoryBtn = screen.getByRole('button', { name: /All/i });
    fireEvent.click(allCategoryBtn);

    // Search query for 'Keeper'
    const searchInput = screen.getByPlaceholderText(/Search micro-services, tools & schemas.../i);
    fireEvent.change(searchInput, { target: { value: 'Keeper' } });

    expect(screen.getByRole('heading', { name: /MEV-Protected DeFi Keeper/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Universal Victory Auditor/i })).not.toBeInTheDocument();
  });

  it('opens ServiceDetailModal with JSON Schema, cURL, and SDK tabs', () => {
    renderMarketplacePage();

    // Click 'Inspect API Schema' on the first service card
    const inspectButtons = screen.getAllByRole('button', { name: /Inspect API Schema/i });
    fireEvent.click(inspectButtons[0]);

    // Modal dialog should appear
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    expect(within(modal).getByText(/REST \/ Webhook API Schema/i)).toBeInTheDocument();
    expect(within(modal).getByText(/zeroMockVerification/i)).toBeInTheDocument();

    // Switch to cURL tab
    const curlTab = within(modal).getByRole('button', { name: /^cURL$/i });
    fireEvent.click(curlTab);
    expect(within(modal).getByText(/curl -X POST/i)).toBeInTheDocument();

    // Switch to TypeScript SDK tab
    const tsTab = within(modal).getByRole('button', { name: /TypeScript SDK/i });
    fireEvent.click(tsTab);
    expect(within(modal).getByText(/import { SwarmClient }/i)).toBeInTheDocument();

    // Switch to Python SDK tab
    const pyTab = within(modal).getByRole('button', { name: /Python SDK/i });
    fireEvent.click(pyTab);
    expect(within(modal).getByText(/from universal_bounty import SwarmClient/i)).toBeInTheDocument();

    // Close Inspector
    const closeBtn = screen.getByRole('button', { name: /Close Inspector/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('copies code snippet from ServiceDetailModal to clipboard', () => {
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

    render(
      <ServiceDetailModal
        service={marketplaceServices[0]}
        onClose={() => {}}
      />
    );

    const copyBtn = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(copyBtn);

    expect(writeTextSpy).toHaveBeenCalledWith(expect.stringContaining('zeroMockVerification'));
    expect(screen.getByText(/Copied/i)).toBeInTheDocument();
  });

  it('opens and simulates DeployConfigDrawer to deploy an autonomous node', async () => {
    renderMarketplacePage();

    // Click 'Deploy' on the first service card
    const deployButtons = screen.getAllByRole('button', { name: /^Deploy$/i });
    fireEvent.click(deployButtons[0]);

    // Drawer should appear
    expect(screen.getByText(/Interactive Deployment/i)).toBeInTheDocument();
    expect(screen.getByText(/Deploy Universal Victory Auditor/i)).toBeInTheDocument();

    // Submit deployment
    const submitBtn = screen.getByRole('button', { name: /Deploy Swarm Node/i });
    fireEvent.click(submitBtn);

    // Wait for simulation completion
    expect(await screen.findByText(/Swarm Node Live!/i)).toBeInTheDocument();
    expect(screen.getByText(/DEPLOYED_AND_LISTENING/i)).toBeInTheDocument();

    // Close drawer
    const closeBtn = screen.getByRole('button', { name: /Close drawer/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByText(/Interactive Deployment/i)).not.toBeInTheDocument();
  });
});
