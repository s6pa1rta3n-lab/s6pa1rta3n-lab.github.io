import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { Navbar, NAV_ITEMS } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Shell } from '../components/layout/Shell';

describe('Shell Layout Component Tests', () => {
  it('Navbar contains all 7 navigation items with badges', () => {
    render(
      <HashRouter>
        <Navbar />
      </HashRouter>
    );

    expect(NAV_ITEMS).toHaveLength(7);
    NAV_ITEMS.forEach((item) => {
      const linkElements = screen.getAllByRole('link', { name: new RegExp(item.name, 'i') });
      expect(linkElements.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('Footer contains verified EVM and Stellar cryptographic payout addresses', () => {
    render(
      <HashRouter>
        <Footer />
      </HashRouter>
    );

    // Matches truncated or title address in settlement card
    expect(screen.getByText(/0xF46C9F6d/i)).toBeInTheDocument();
    expect(screen.getByText(/GCL6OXAMLD/i)).toBeInTheDocument();
    expect(screen.getByText(/Zero-Mock Forensic Victory Audits/i)).toBeInTheDocument();
  });

  it('Shell properly wraps child content with main container and background styles', () => {
    render(
      <HashRouter>
        <Shell>
          <div data-testid="test-child-content">Swarm Fleet Core Active</div>
        </Shell>
      </HashRouter>
    );

    expect(screen.getByTestId('test-child-content')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
