import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BlogPage } from '../pages/BlogPage';
import { blogArticles } from '../data/blogArticles';
import { ArticleModal } from '../components/blog/ArticleModal';

describe('Milestone 4 — Blog Hub Test Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderBlogPage = () => {
    return render(
      <MemoryRouter initialEntries={['/blog']}>
        <BlogPage />
      </MemoryRouter>
    );
  };

  it('renders BlogPage header, search bar, and all initial articles', () => {
    renderBlogPage();

    expect(screen.getByText(/Research & Engineering Dispatches/i)).toBeInTheDocument();
    expect(screen.getByText(/Research Dispatches/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search engineering dispatches.../i)).toBeInTheDocument();

    // Verify all 4 articles are rendered
    blogArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
      expect(screen.getByText(article.excerpt)).toBeInTheDocument();
    });
  });

  it('filters articles by category when category pill is clicked', () => {
    renderBlogPage();

    // Click 'Security & Verification' category pill
    const securityBtn = screen.getByRole('button', { name: /Security & Verification/i });
    fireEvent.click(securityBtn);

    // Should display the Victory Audit post
    expect(
      screen.getByText(/The Victory Audit: How We Stop AI from Faking Tests/i)
    ).toBeInTheDocument();

    // Should NOT display the Firebase Stigmergy post
    expect(
      screen.queryByText(/How We Built an Always-On AI Workforce with Sub-Second Response Times/i)
    ).not.toBeInTheDocument();

    // Click 'All' to restore
    const allBtn = screen.getByRole('button', { name: /All/i });
    fireEvent.click(allBtn);

    expect(
      screen.getByText(/How We Built an Always-On AI Workforce with Sub-Second Response Times/i)
    ).toBeInTheDocument();
  });

  it('filters articles by tag', () => {
    renderBlogPage();

    // Click #Architecture tag
    const tagButtons = screen.getAllByRole('button', { name: /#Architecture/i });
    fireEvent.click(tagButtons[0]);

    // Should show architecture article
    expect(
      screen.getByText(/How We Built an Always-On AI Workforce with Sub-Second Response Times/i)
    ).toBeInTheDocument();

    // Should not show MEV article
    expect(
      screen.queryByText(/Autonomous Protocol Maintenance: Zero-Loss Execution for DeFi Protocols/i)
    ).not.toBeInTheDocument();

    // Clear tag filter
    const clearTagBtn = screen.getByRole('button', { name: /Clear tag: #Architecture/i });
    fireEvent.click(clearTagBtn);

    expect(
      screen.getByText(/Autonomous Protocol Maintenance: Zero-Loss Execution for DeFi Protocols/i)
    ).toBeInTheDocument();
  });

  it('filters articles dynamically by search query in title, excerpt, and subtitle', () => {
    renderBlogPage();

    const searchInput = screen.getByPlaceholderText(/Search engineering dispatches.../i);

    // Search for 'Soroban'
    fireEvent.change(searchInput, { target: { value: 'Soroban' } });

    expect(
      screen.getByText(/Automating Open-Source Bounties: Instant Smart Contract Escrows on Stellar/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByText(/Autonomous Protocol Maintenance: Zero-Loss Execution for DeFi Protocols/i)
    ).not.toBeInTheDocument();
  });

  it('displays empty state when search returns zero matching results and allows reset', () => {
    renderBlogPage();

    const searchInput = screen.getByPlaceholderText(/Search engineering dispatches.../i);
    fireEvent.change(searchInput, { target: { value: 'non_existent_quantum_query_xyz' } });

    expect(screen.getByText(/No matching dispatches found/i)).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /Reset Filters/i });
    fireEvent.click(resetBtn);

    expect(
      screen.getByText(/How We Built an Always-On AI Workforce with Sub-Second Response Times/i)
    ).toBeInTheDocument();
  });

  it('opens ArticleModal reader on card click, showing TOC, takeaways, and markdown content', () => {
    renderBlogPage();

    // Click on the Victory Audit card
    const articleCard = screen.getByText(/The Victory Audit: How We Stop AI from Faking Tests/i);
    fireEvent.click(articleCard);

    // Modal dialog should appear
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    // Check modal contents
    expect(within(modal).getByText(/Key Executive Takeaways/i)).toBeInTheDocument();
    expect(within(modal).getByText(/Table of Contents/i)).toBeInTheDocument();
    expect(within(modal).getAllByText(/The AI Shortcut & Cheating Problem/i)[0]).toBeInTheDocument();
    expect(within(modal).getAllByText(/The Three Pillars of the Victory Audit/i)[0]).toBeInTheDocument();

    // Close modal via close button
    const closeBtn = screen.getByRole('button', { name: /Close modal/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes modal when pressing Escape key', () => {
    renderBlogPage();

    const articleCard = screen.getByText(/How We Built an Always-On AI Workforce with Sub-Second Response Times/i);
    fireEvent.click(articleCard);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('copies article URL when clicking Share in ArticleModal', async () => {
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

    render(
      <ArticleModal
        article={blogArticles[0]}
        onClose={() => {}}
      />
    );

    const shareButtons = screen.getAllByRole('button', { name: /Share/i });
    fireEvent.click(shareButtons[0]);

    expect(writeTextSpy).toHaveBeenCalledWith(expect.stringContaining('#/blog?article=firebase-stigmergy-architecture'));
    expect(screen.getByText(/Link Copied!/i)).toBeInTheDocument();
  });
});
