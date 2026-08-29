import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PortfolioPage } from '../pages/PortfolioPage';

describe('Milestone 5 — Portfolio & Proof of Work Test Suite', () => {
  beforeEach(() => {
    // Reset any mocks or DOM states if needed
  });

  it('renders PortfolioPage header, aggregate metrics ribbon, and initial project cards', () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    // Header & Subtitle
    expect(screen.getByText(/Proof of Work & Verifiable Track Record/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Proof of Work & Ecosystem Contributions/i })).toBeInTheDocument();
    expect(screen.getByText(/Live multi-agent ledger of 195\+ Pull Requests/i)).toBeInTheDocument();

    // Aggregate Telemetry Metrics Ribbon
    expect(screen.getByText('195+')).toBeInTheDocument();
    expect(screen.getByText('(132 in dataset)')).toBeInTheDocument();
    expect(screen.getAllByText('42')[0]).toBeInTheDocument();
    expect(screen.getByText('Active Repos')).toBeInTheDocument();
    expect(screen.getAllByText('30')[0]).toBeInTheDocument();
    expect(screen.getByText(/Merge Rate/i)).toBeInTheDocument();
    expect(screen.getByText('6+')).toBeInTheDocument();
    expect(screen.getByText('100% Zero-Mock')).toBeInTheDocument();
  });

  it('renders all 42 repository case study cards from swarm_portfolio.json', () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    // Check that top repos are rendered
    expect(screen.getByText('ADG-VITV/RepoRaid')).toBeInTheDocument();
    expect(screen.getByText('Stellar-IndigoPay/Stellar-IndigoPay')).toBeInTheDocument();
    expect(screen.getByText('StellarCheckMate/Checkmate-Escrow')).toBeInTheDocument();
    expect(screen.getByText('Bitcoindefi/runa')).toBeInTheDocument();

    // Verify counter shows 42 repositories
    expect(screen.getByText(/Displaying/i)).toHaveTextContent('42 of 42 Repositories (132 PRs)');
  });

  it('expands and collapses repository PR details accordion on click', () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    // Find the toggle button for ADG-VITV/RepoRaid (which has 23 PRs)
    const repoRaidHeading = screen.getByText('ADG-VITV/RepoRaid');
    const card = repoRaidHeading.closest('.glass-panel');
    expect(card).not.toBeNull();

    const viewButton = within(card as HTMLElement).getByRole('button', {
      name: /Expand PR list for ADG-VITV\/RepoRaid/i,
    });
    expect(viewButton).toBeInTheDocument();

    // Click to expand all 23 PRs
    fireEvent.click(viewButton);
    expect(within(card as HTMLElement).getByRole('button', {
      name: /Collapse PR list for ADG-VITV\/RepoRaid/i,
    })).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(viewButton);
    expect(within(card as HTMLElement).getByRole('button', {
      name: /Expand PR list for ADG-VITV\/RepoRaid/i,
    })).toBeInTheDocument();
  });

  it('filters project cards dynamically when typing repository name in search bar', () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    const searchInput = screen.getByLabelText(/Search repositories and pull requests/i);
    fireEvent.change(searchInput, { target: { value: 'RepoRaid' } });

    expect(screen.getByText('ADG-VITV/RepoRaid')).toBeInTheDocument();
    expect(screen.queryByText('Bitcoindefi/runa')).not.toBeInTheDocument();
    expect(screen.getByText(/Displaying/i)).toHaveTextContent('1 of 42 Repositories (23 PRs)');
  });

  it('filters project cards dynamically when typing specific PR title in search bar', () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    const searchInput = screen.getByLabelText(/Search repositories and pull requests/i);
    fireEvent.change(searchInput, { target: { value: 'update_contact_information' } });

    expect(screen.getByText('ADG-VITV/RepoRaid')).toBeInTheDocument();
    expect(screen.getByText(/Implement update_contact_information/i)).toBeInTheDocument();
    expect(screen.queryByText('Bitcoindefi/runa')).not.toBeInTheDocument();
  });

  it('filters project cards when clicking status tabs (All, Merged Only, Active Pipeline)', () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    // Click 'Merged Only' status filter
    const mergedFilterBtn = screen.getByRole('button', { name: /Merged Only/i });
    fireEvent.click(mergedFilterBtn);

    // Repos with merges (like Stellar-IndigoPay) should be visible, RepoRaid (0 merged) should not
    expect(screen.getByText('Stellar-IndigoPay/Stellar-IndigoPay')).toBeInTheDocument();
    expect(screen.getByText('Bitcoindefi/runa')).toBeInTheDocument();
    expect(screen.queryByText('ADG-VITV/RepoRaid')).not.toBeInTheDocument();

    // Click 'All'
    const allFilterBtn = screen.getByRole('button', { name: /Filter status: All/i });
    fireEvent.click(allFilterBtn);
    expect(screen.getByText('ADG-VITV/RepoRaid')).toBeInTheDocument();
  });

  it('filters project cards by ecosystem category tabs', () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    // Click 'Bitcoin & L2' category
    const bitcoinBtn = screen.getByRole('button', { name: /Bitcoin & L2/i });
    fireEvent.click(bitcoinBtn);

    expect(screen.getByText('Bitcoindefi/runa')).toBeInTheDocument();
    expect(screen.queryByText('ADG-VITV/RepoRaid')).not.toBeInTheDocument();

    // Click 'Stellar / Soroban' category
    const stellarBtn = screen.getByRole('button', { name: /Stellar \/ Soroban/i });
    fireEvent.click(stellarBtn);

    expect(screen.getByText('Stellar-IndigoPay/Stellar-IndigoPay')).toBeInTheDocument();
    expect(screen.getByText('StellarCheckMate/Checkmate-Escrow')).toBeInTheDocument();
    expect(screen.queryByText('Bitcoindefi/runa')).not.toBeInTheDocument();
  });

  it('displays empty state with reset button when search query matches zero projects', () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    const searchInput = screen.getByLabelText(/Search repositories and pull requests/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent-xyz-search-query-12345' } });

    expect(screen.getByText(/No Projects Found/i)).toBeInTheDocument();
    expect(screen.getByText(/No ecosystem repositories or pull requests match/i)).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /Reset All Filters/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText('ADG-VITV/RepoRaid')).toBeInTheDocument();
    expect(screen.getByText(/Displaying/i)).toHaveTextContent('42 of 42 Repositories (132 PRs)');
  });

  it('ensures all repository and PR external links contain secure attributes', () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    const externalGitHubLinks = links.filter(
      (link) => link.getAttribute('href')?.startsWith('https://github.com')
    );

    expect(externalGitHubLinks.length).toBeGreaterThan(0);
    externalGitHubLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('sorts repositories by total PRs, merged PRs, and alphabetical name', () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    const sortSelect = screen.getByLabelText(/Sort repositories/i);

    // Sort by name-asc
    fireEvent.change(sortSelect, { target: { value: 'name-asc' } });
    expect(screen.getByText('AbleeGod/stellar-drips-protocol')).toBeInTheDocument();

    // Sort by merged-desc
    fireEvent.change(sortSelect, { target: { value: 'merged-desc' } });
    expect(screen.getByText('Stellar-IndigoPay/Stellar-IndigoPay')).toBeInTheDocument();
  });

  it('toggles Expand All and Collapse All for all filtered cards', () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    const toggleAllBtn = screen.getByRole('button', { name: /Expand all project details/i });
    fireEvent.click(toggleAllBtn);

    expect(screen.getByRole('button', { name: /Collapse all project details/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Collapse all project details/i }));
    expect(screen.getByRole('button', { name: /Expand all project details/i })).toBeInTheDocument();
  });

  it('allows copying verified EVM and Stellar settlement addresses', async () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    const copyEvmBtn = screen.getByRole('button', { name: /Copy EVM settlement address/i });
    fireEvent.click(copyEvmBtn);

    const copyStellarBtn = screen.getByRole('button', { name: /Copy Stellar settlement address/i });
    fireEvent.click(copyStellarBtn);

    expect(screen.getByText(/0xF46C9F6d/i)).toBeInTheDocument();
    expect(screen.getByText(/GCL6OXAMLD/i)).toBeInTheDocument();
  });
});
