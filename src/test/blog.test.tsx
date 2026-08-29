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
    expect(screen.getByText(/Research Blog/i)).toBeInTheDocument();
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
      screen.getByText(/Why Zero-Mock Forensic Victory Audits Are Mandatory for Autonomous Software Labor/i)
    ).toBeInTheDocument();

    // Should NOT display the Firebase Stigmergy post
    expect(
      screen.queryByText(/Decentralized Multi-Agent Coordination via Firebase Firestore Stigmergy/i)
    ).not.toBeInTheDocument();

    // Click 'All' to restore
    const allBtn = screen.getByRole('button', { name: /All/i });
    fireEvent.click(allBtn);

    expect(
      screen.getByText(/Decentralized Multi-Agent Coordination via Firebase Firestore Stigmergy/i)
    ).toBeInTheDocument();
  });

  it('filters articles by tag', () => {
    renderBlogPage();

    // Click #Architecture tag
    const tagButtons = screen.getAllByRole('button', { name: /#Architecture/i });
    fireEvent.click(tagButtons[0]);

    // Should show architecture article
    expect(
      screen.getByText(/Decentralized Multi-Agent Coordination via Firebase Firestore Stigmergy/i)
    ).toBeInTheDocument();

    // Should not show MEV article
    expect(
      screen.queryByText(/Autonomous Protocol Keepers: Zero-Loss MEV Protection on Base and Arbitrum/i)
    ).not.toBeInTheDocument();

    // Clear tag filter
    const clearTagBtn = screen.getByRole('button', { name: /Clear tag: #Architecture/i });
    fireEvent.click(clearTagBtn);

    expect(
      screen.getByText(/Autonomous Protocol Keepers: Zero-Loss MEV Protection on Base and Arbitrum/i)
    ).toBeInTheDocument();
  });

  it('filters articles dynamically by search query in title, excerpt, and subtitle', () => {
    renderBlogPage();

    const searchInput = screen.getByPlaceholderText(/Search engineering dispatches.../i);

    // Search for 'Soroban'
    fireEvent.change(searchInput, { target: { value: 'Soroban' } });

    expect(
      screen.getByText(/Building Instant Soroban Smart Contract Escrows for Open Source Bounties/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByText(/Autonomous Protocol Keepers: Zero-Loss MEV Protection on Base and Arbitrum/i)
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
      screen.getByText(/Decentralized Multi-Agent Coordination via Firebase Firestore Stigmergy/i)
    ).toBeInTheDocument();
  });

  it('opens ArticleModal reader on card click, showing TOC, takeaways, and markdown content', () => {
    renderBlogPage();

    // Click on the Victory Audit card
    const articleCard = screen.getByText(/Why Zero-Mock Forensic Victory Audits Are Mandatory for Autonomous Software Labor/i);
    fireEvent.click(articleCard);

    // Modal dialog should appear
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    // Check modal contents
    expect(within(modal).getByText(/Key Executive Takeaways/i)).toBeInTheDocument();
    expect(within(modal).getByText(/Table of Contents/i)).toBeInTheDocument();
    expect(within(modal).getAllByText(/The LLM Shortcut & Cheating Problem/i)[0]).toBeInTheDocument();
    expect(within(modal).getAllByText(/The Three Pillars of Victory Audit/i)[0]).toBeInTheDocument();

    // Close modal via close button
    const closeBtn = screen.getByRole('button', { name: /Close modal/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes modal when pressing Escape key', () => {
    renderBlogPage();

    const articleCard = screen.getByText(/Decentralized Multi-Agent Coordination via Firebase Firestore Stigmergy/i);
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
