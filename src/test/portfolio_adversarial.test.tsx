import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PortfolioPage, getRepositoryCategory, getCategoryBadgeStyle, formatDate } from '../pages/PortfolioPage';
import rawPortfolioData from '../data/swarm_portfolio.json';
import { PortfolioProject } from '../types';

const portfolioData = rawPortfolioData as PortfolioProject[];

describe('ADVERSARIAL STRESS TEST & EDGE-CASE SUITE — PortfolioPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // =========================================================================
  // 1. Telemetry Consistency & Exact Math Oracles
  // =========================================================================
  describe('Oracle 1: Mathematical Invariants & Telemetry Integrity', () => {
    it('verifies dataset integrity against ground truth numbers', () => {
      expect(portfolioData).toHaveLength(42);

      const totalPrs = portfolioData.reduce((sum, p) => sum + p.prs.length, 0);
      expect(totalPrs).toBe(132);

      const mergedPrs = portfolioData.reduce((sum, p) => sum + p.merged_prs, 0);
      expect(mergedPrs).toBe(30);

      const actualMergedPrsCount = portfolioData.reduce(
        (sum, p) => sum + p.prs.filter((pr) => pr.is_merged).length,
        0
      );
      expect(actualMergedPrsCount).toBe(mergedPrs);

      const reposWithMerges = portfolioData.filter((p) => p.merged_prs > 0).length;
      expect(reposWithMerges).toBe(10);

      const expectedMergeRate = Math.round((mergedPrs / totalPrs) * 100);
      expect(expectedMergeRate).toBe(23);
    });

    it('renders exact telemetry counts and calculated rates in the DOM', () => {
      render(
        <MemoryRouter>
          <PortfolioPage />
        </MemoryRouter>
      );

      // Hero Metrics Ribbon
      expect(screen.getByText('195+')).toBeInTheDocument();
      expect(screen.getByText('(132 in dataset)')).toBeInTheDocument();
      expect(screen.getAllByText('42')[0]).toBeInTheDocument();
      expect(screen.getAllByText('30')[0]).toBeInTheDocument();
      expect(screen.getByText('(23% Merge Rate)')).toBeInTheDocument();
      expect(screen.getByText('10 repositories merged upstream')).toBeInTheDocument();
      expect(screen.getByText('6+')).toBeInTheDocument();
    });
  });

  // =========================================================================
  // 2. Search Query Fuzzing (Special Regex Chars, Empty, Whitespace, Unicode)
  // =========================================================================
  describe('Oracle 2: Search Input Fuzzing & Boundary Resistance', () => {
    it('handles special regex meta-characters without throwing errors', () => {
      render(
        <MemoryRouter>
          <PortfolioPage />
        </MemoryRouter>
      );

      const searchInput = screen.getByLabelText(/Search repositories and pull requests/i);
      const adversarialInputs = [
        '[',
        ']',
        '(',
        ')',
        '\\',
        '*',
        '+',
        '?',
        '^',
        '$',
        '.',
        '{',
        '}',
        '|',
        '<script>alert("xss")</script>',
        '"\'`~!@#$%^&*()_+-=[]{}|;:,.<>?/',
        '🚀🔥🤖💎',
        'null',
        'undefined',
        'NaN',
        'constructor',
        '__proto__',
        'toString',
      ];

      for (const input of adversarialInputs) {
        fireEvent.change(searchInput, { target: { value: input } });
        expect(document.body).toBeInTheDocument();
      }
    });

    it('handles whitespace-only queries by showing all 42 projects', () => {
      render(
        <MemoryRouter>
          <PortfolioPage />
        </MemoryRouter>
      );

      const searchInput = screen.getByLabelText(/Search repositories and pull requests/i);
      
      fireEvent.change(searchInput, { target: { value: '   ' } });
      expect(screen.getByText(/Displaying/i)).toHaveTextContent('42 of 42 Repositories (132 PRs)');

      fireEvent.change(searchInput, { target: { value: '\t\n  ' } });
      expect(screen.getByText(/Displaying/i)).toHaveTextContent('42 of 42 Repositories (132 PRs)');
    });

    it('finds items with case-insensitive and partial string matches across repo and PR titles', () => {
      render(
        <MemoryRouter>
          <PortfolioPage />
        </MemoryRouter>
      );

      const searchInput = screen.getByLabelText(/Search repositories and pull requests/i);

      // Mixed case repo search
      fireEvent.change(searchInput, { target: { value: 'rEpOrAiD' } });
      expect(screen.getByText('ADG-VITV/RepoRaid')).toBeInTheDocument();
      expect(screen.getByText(/Displaying/i)).toHaveTextContent('1 of 42 Repositories (23 PRs)');

      // Search by issue reference inside PR title and expand card to verify PR item mounts
      fireEvent.change(searchInput, { target: { value: '(Fixes #28)' } });
      expect(screen.getByText('ADG-VITV/RepoRaid')).toBeInTheDocument();
      
      const expandBtn = screen.getByRole('button', { name: /Expand PR list for ADG-VITV\/RepoRaid/i });
      fireEvent.click(expandBtn);
      expect(screen.getByText(/Implement withdraw\(\) \(Fixes #28\)/i)).toBeInTheDocument();

      // Search by Soroban protocol name
      fireEvent.change(searchInput, { target: { value: 'checkmate' } });
      expect(screen.getByText('StellarCheckMate/Checkmate-Escrow')).toBeInTheDocument();
    });

    it('clears search via clear (✕) button and restores full list', () => {
      render(
        <MemoryRouter>
          <PortfolioPage />
        </MemoryRouter>
      );

      const searchInput = screen.getByLabelText(/Search repositories and pull requests/i);
      fireEvent.change(searchInput, { target: { value: 'runa' } });
      expect(screen.getByText(/Displaying/i)).toHaveTextContent('1 of 42 Repositories (9 PRs)');

      const clearBtn = screen.getByRole('button', { name: /Clear search/i });
      expect(clearBtn).toBeInTheDocument();
      fireEvent.click(clearBtn);

      expect(screen.getByText(/Displaying/i)).toHaveTextContent('42 of 42 Repositories (132 PRs)');
    });
  });

  // =========================================================================
  // 3. Rapid Filter Toggling & Matrix State Stress
  // =========================================================================
  describe('Oracle 3: Rapid Category and Status Filter Thrashing', () => {
    it('survives rapid category switching across all 5 ecosystem options', () => {
      render(
        <MemoryRouter>
          <PortfolioPage />
        </MemoryRouter>
      );

      const categories = [
        'Stellar / Soroban',
        'DeFi & Payments',
        'Developer Tools & Infra',
        'Bitcoin & L2',
        'All',
      ];

      // Rapidly toggle each category 5 times
      for (let i = 0; i < 5; i++) {
        for (const cat of categories) {
          const btn = screen.getByRole('button', { name: new RegExp(`Filter ecosystem: ${cat}`, 'i') });
          fireEvent.click(btn);
        }
      }

      // Returned to 'All'
      expect(screen.getByText(/Displaying/i)).toHaveTextContent('42 of 42 Repositories (132 PRs)');
    });

    it('survives rapid status tab toggling (All -> Merged Only -> Active Pipeline -> All)', () => {
      render(
        <MemoryRouter>
          <PortfolioPage />
        </MemoryRouter>
      );

      const allBtn = screen.getByRole('button', { name: /Filter status: All/i });
      const mergedBtn = screen.getByRole('button', { name: /Filter status: Merged Only/i });
      const openBtn = screen.getByRole('button', { name: /Filter status: Active Pipeline/i });

      for (let i = 0; i < 10; i++) {
        fireEvent.click(mergedBtn);
        fireEvent.click(openBtn);
        fireEvent.click(allBtn);
      }

      expect(screen.getByText(/Displaying/i)).toHaveTextContent('42 of 42 Repositories (132 PRs)');
    });

    it('correctly filters combinatorial matrix of (Category x Status x Search)', () => {
      render(
        <MemoryRouter>
          <PortfolioPage />
        </MemoryRouter>
      );

      // 1. Select Stellar / Soroban
      const stellarBtn = screen.getByRole('button', { name: /Filter ecosystem: Stellar \/ Soroban/i });
      fireEvent.click(stellarBtn);

      // 2. Select Merged Only
      const mergedBtn = screen.getByRole('button', { name: /Filter status: Merged Only/i });
      fireEvent.click(mergedBtn);

      // 3. Type 'Indigo'
      const searchInput = screen.getByLabelText(/Search repositories and pull requests/i);
      fireEvent.change(searchInput, { target: { value: 'Indigo' } });

      expect(screen.getByText('Stellar-IndigoPay/Stellar-IndigoPay')).toBeInTheDocument();
      expect(screen.getByText(/Displaying/i)).toHaveTextContent('1 of 42 Repositories (11 PRs)');

      // 4. Reset via empty state reset button or full reset
      fireEvent.change(searchInput, { target: { value: 'impossible-query-string-999' } });
      expect(screen.getByText(/No Projects Found/i)).toBeInTheDocument();

      const resetBtn = screen.getByRole('button', { name: /Reset All Filters/i });
      fireEvent.click(resetBtn);

      expect(screen.getByText(/Displaying/i)).toHaveTextContent('42 of 42 Repositories (132 PRs)');
    });
  });

  // =========================================================================
  // 4. Expand / Collapse State Stress (All 42 Cards Simultaneously)
  // =========================================================================
  describe('Oracle 4: Full 42-Card Expand/Collapse Transitions', () => {
    it('simultaneously expands all 42 project cards, verifying all PRs mount', () => {
      render(
        <MemoryRouter>
          <PortfolioPage />
        </MemoryRouter>
      );

      // Initial state: Expand All button visible
      const toggleAllBtn = screen.getByRole('button', { name: /Expand all project details/i });
      fireEvent.click(toggleAllBtn);

      // Should now be Collapse All
      const collapseAllBtn = screen.getByRole('button', { name: /Collapse all project details/i });
      expect(collapseAllBtn).toBeInTheDocument();

      // All 42 cards should have "Hide PRs"
      const hideButtons = screen.getAllByRole('button', { name: /Collapse PR list for/i });
      expect(hideButtons).toHaveLength(42);

      // Collapse all
      fireEvent.click(collapseAllBtn);
      const expandButtons = screen.getAllByRole('button', { name: /Expand PR list for/i });
      expect(expandButtons).toHaveLength(42);
    });

    it('handles individual card toggling while Expand All is active without state corruption', () => {
      render(
        <MemoryRouter>
          <PortfolioPage />
        </MemoryRouter>
      );

      // Expand all
      const toggleAllBtn = screen.getByRole('button', { name: /Expand all project details/i });
      fireEvent.click(toggleAllBtn);

      // Collapse one card individually (ADG-VITV/RepoRaid)
      const repoRaidCard = screen.getByText('ADG-VITV/RepoRaid').closest('.glass-panel');
      const hideRepoRaidBtn = within(repoRaidCard as HTMLElement).getByRole('button', {
        name: /Collapse PR list for ADG-VITV\/RepoRaid/i,
      });
      fireEvent.click(hideRepoRaidBtn);

      // Global toggle should now say "Expand All" because not all are expanded
      expect(screen.getByRole('button', { name: /Expand all project details/i })).toBeInTheDocument();

      // Clicking Expand All expands the remaining collapsed card
      fireEvent.click(screen.getByRole('button', { name: /Expand all project details/i }));
      expect(screen.getByRole('button', { name: /Collapse all project details/i })).toBeInTheDocument();
    });
  });

  // =========================================================================
  // 5. Data Edge-Cases & Null Safety
  // =========================================================================
  describe('Oracle 5: Null Field Handling & Helper Functions', () => {
    it('correctly categorizes repositories using getRepositoryCategory fallback', () => {
      expect(getRepositoryCategory('stellar-dex/core')).toBe('Stellar / Soroban');
      expect(getRepositoryCategory('soroban-examples/auth')).toBe('Stellar / Soroban');
      expect(getRepositoryCategory('Adamantine-Fi/contracts')).toBe('Stellar / Soroban');
      expect(getRepositoryCategory('Bitcoindefi/runa')).toBe('Bitcoin & L2');
      expect(getRepositoryCategory('bitcoin-tools/signer')).toBe('Bitcoin & L2');
      expect(getRepositoryCategory('prometheus-community/helm')).toBe('Developer Tools & Infra');
      expect(getRepositoryCategory('hyperlane-xyz/hyperlane-monorepo')).toBe('Developer Tools & Infra');
      expect(getRepositoryCategory('unknown-dao/payments-engine')).toBe('DeFi & Payments');
    });

    it('returns valid Tailwind badge styles for all categories in getCategoryBadgeStyle', () => {
      const styles = [
        getCategoryBadgeStyle('Stellar / Soroban'),
        getCategoryBadgeStyle('Bitcoin & L2'),
        getCategoryBadgeStyle('Developer Tools & Infra'),
        getCategoryBadgeStyle('DeFi & Payments'),
        getCategoryBadgeStyle('All' as any),
      ];

      styles.forEach((style) => {
        expect(style).toContain('bg-cyber-');
        expect(style).toContain('text-cyber-');
        expect(style).toContain('border-cyber-');
      });
    });

    it('formats ISO date strings robustly with formatDate, handling invalid dates gracefully', () => {
      expect(formatDate('2026-07-29T02:00:34Z')).toBe('2026-07-29');
      expect(formatDate('2026-08-01T12:00:00.000Z')).toBe('2026-08-01');
      // Invalid date returns original string without throwing RangeError
      expect(formatDate('invalid-iso-timestamp')).toBe('invalid-iso-timestamp');
    });

    it('safely handles null closed_at values across all 132 PRs in dataset without runtime crashes', () => {
      const prsWithNullClosedAt = portfolioData.flatMap((p) =>
        p.prs.filter((pr) => pr.closed_at === null)
      );

      // Majority of open PRs have closed_at: null
      expect(prsWithNullClosedAt.length).toBeGreaterThan(0);

      render(
        <MemoryRouter>
          <PortfolioPage />
        </MemoryRouter>
      );

      // Verify page renders completely without crashing
      expect(screen.getByText('ADG-VITV/RepoRaid')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Verified Track Record & Proof of Work/i })).toBeInTheDocument();
    });
  });

  // =========================================================================
  // 6. Settlement Address Copy & Clipboard Interactions
  // =========================================================================
  describe('Oracle 6: Settlement Address Clipboard Interactions', () => {
    it('triggers clipboard writeText for EVM and Stellar addresses', async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText: writeTextMock,
        },
      });

      render(
        <MemoryRouter>
          <PortfolioPage />
        </MemoryRouter>
      );

      const copyEvmBtn = screen.getByRole('button', { name: /Copy EVM settlement address/i });
      fireEvent.click(copyEvmBtn);
      expect(writeTextMock).toHaveBeenCalledWith('0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89');

      const copyStellarBtn = screen.getByRole('button', { name: /Copy Stellar settlement address/i });
      fireEvent.click(copyStellarBtn);
      expect(writeTextMock).toHaveBeenCalledWith('GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC');
    });
  });
});
