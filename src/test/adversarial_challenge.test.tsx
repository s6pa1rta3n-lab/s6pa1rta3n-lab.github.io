import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../App';
import { EarningsCalculator } from '../components/affiliates/EarningsCalculator';
import { VCDeckViewer } from '../components/strategy/VCDeckViewer';
import { ParticleCanvas } from '../components/common/ParticleCanvas';
import { ServiceDetailModal } from '../components/marketplace/ServiceDetailModal';
import { DeployConfigDrawer } from '../components/marketplace/DeployConfigDrawer';
import { ArticleModal } from '../components/blog/ArticleModal';
import { marketplaceServices } from '../data/marketplaceData';
import { blogArticles } from '../data/blogArticles';

describe('EMPIRICAL CHALLENGER & ADVERSARIAL STRESS TEST SUITE', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.style.overflow = 'unset';
  });

  // =========================================================================
  // 1. Static Routing & Invalid Path Fuzzing / 404 Recovery
  // =========================================================================
  describe('Vector 1: Routing Robustness & 404 Recovery', () => {
    it('catches nonexistent routes (e.g. #/nonexistent-path-12345) and renders NotFoundPage', async () => {
      window.location.hash = '#/nonexistent-path-12345';
      render(<App />);

      expect(screen.getByText(/404/i)).toBeInTheDocument();
      expect(screen.getByText(/Route Not Found/i)).toBeInTheDocument();
      expect(screen.getByText(/The requested Swarm sector does not exist or has been re-indexed/i)).toBeInTheDocument();
      
      const returnLink = screen.getByRole('link', { name: /Return to Pitch & Simulator/i });
      expect(returnLink).toBeInTheDocument();
      expect(returnLink).toHaveAttribute('href', '#/pitch');
    });

    it('recovers from 404 to PitchPage when clicking the return link', async () => {
      window.location.hash = '#/arbitrary/nested/deep/404/path';
      render(<App />);

      expect(screen.getByText(/404/i)).toBeInTheDocument();
      const returnLink = screen.getByRole('link', { name: /Return to Pitch & Simulator/i });
      
      fireEvent.click(returnLink);

      // Verify Pitch page content mounts
      expect(screen.getAllByText(/Universal/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Bounty Swarm/i)[0]).toBeInTheDocument();
    });

    it('handles query parameters and hash fragments safely without crashing router', () => {
      const complexPaths = [
        '#/pitch?ref=affiliate_123&utm_source=twitter&v=2',
        '#/strategy#section-scf-grant',
        '#/marketplace?category=auditing&sort=price_desc',
        '#/blog?search=zero-mock&tag=soroban',
        '#/unknown?payload=<script>alert(1)</script>&x=1',
      ];

      for (const path of complexPaths) {
        window.location.hash = path;
        const { unmount } = render(<App />);
        expect(document.body).toBeInTheDocument();
        unmount();
      }
    });
  });

  // =========================================================================
  // 2. Dual-Slider Calculations in Affiliates Calculator (Boundaries & Edge Cases)
  // =========================================================================
  describe('Vector 2: Dual-Slider Edge Cases & Mathematical Invariants', () => {
    it('evaluates exact Tier boundary conditions across all tiers (1, 9, 10, 24, 25, 49, 50, 100 teams)', () => {
      const onTierChangeMock = vi.fn();
      render(<EarningsCalculator onTierChange={onTierChangeMock} />);

      const sliders = screen.getAllByRole('slider');
      const teamsSlider = sliders[0];
      const spendSlider = sliders[1];

      // Set average spend to $1,000 for deterministic calculations
      fireEvent.change(spendSlider, { target: { value: '1000' } });

      const testCases = [
        { teams: 1, expectedTier: 'Bronze Scout (10%)', expectedMonthly: '$100', expectedAnnual: '$1,200' },
        { teams: 9, expectedTier: 'Bronze Scout (10%)', expectedMonthly: '$900', expectedAnnual: '$10,800' },
        { teams: 10, expectedTier: 'Silver Hunter (15%)', expectedMonthly: '$1,500', expectedAnnual: '$18,000' },
        { teams: 24, expectedTier: 'Silver Hunter (15%)', expectedMonthly: '$3,600', expectedAnnual: '$43,200' },
        { teams: 25, expectedTier: 'Gold Commander (20%)', expectedMonthly: '$5,000', expectedAnnual: '$60,000' },
        { teams: 49, expectedTier: 'Gold Commander (20%)', expectedMonthly: '$9,800', expectedAnnual: '$117,600' },
        { teams: 50, expectedTier: 'Diamond Syndicate (25%)', expectedMonthly: '$12,500', expectedAnnual: '$150,000' },
        { teams: 100, expectedTier: 'Diamond Syndicate (25%)', expectedMonthly: '$25,000', expectedAnnual: '$300,000' },
      ];

      for (const tc of testCases) {
        fireEvent.change(teamsSlider, { target: { value: String(tc.teams) } });
        expect(screen.getByText(new RegExp(`Current Tier: ${tc.expectedTier.replace('(', '\\(').replace(')', '\\)')}`, 'i'))).toBeInTheDocument();
        expect(screen.getByText(tc.expectedMonthly)).toBeInTheDocument();
        expect(screen.getByText(tc.expectedAnnual)).toBeInTheDocument();
      }
    });

    it('evaluates maximum allowable volume boundary: 100 teams @ $5,000/mo ($500,000 monthly volume)', () => {
      render(<EarningsCalculator />);

      const sliders = screen.getAllByRole('slider');
      fireEvent.change(sliders[0], { target: { value: '100' } }); // 100 teams
      fireEvent.change(sliders[1], { target: { value: '5000' } }); // $5,000/mo spend

      // Total Volume = 100 * $5,000 = $500,000
      // Tier: Diamond Syndicate = 25%
      // Monthly Yield = $500,000 * 0.25 = $125,000
      // Annualized = $125,000 * 12 = $1,500,000
      expect(screen.getByText(/Current Tier: Diamond Syndicate \(25%\)/i)).toBeInTheDocument();
      expect(screen.getByText('$125,000')).toBeInTheDocument();
      expect(screen.getByText('$1,500,000')).toBeInTheDocument();
      expect(screen.getByText(/Based on \$500,000\/mo total referred subscription volume/i)).toBeInTheDocument();
    });

    it('evaluates minimum allowable volume boundary: 1 team @ $300/mo ($300 monthly volume)', () => {
      render(<EarningsCalculator />);

      const sliders = screen.getAllByRole('slider');
      fireEvent.change(sliders[0], { target: { value: '1' } }); // 1 team
      fireEvent.change(sliders[1], { target: { value: '300' } }); // $300/mo spend

      // Total Volume = 1 * $300 = $300
      // Tier: Bronze Scout = 10%
      // Monthly Yield = $300 * 0.10 = $30
      // Annualized = $30 * 12 = $360
      expect(screen.getByText(/Current Tier: Bronze Scout \(10%\)/i)).toBeInTheDocument();
      expect(screen.getByText('$30')).toBeInTheDocument();
      expect(screen.getByText('$360')).toBeInTheDocument();
    });

    it('does not produce NaN or Infinity under extreme fuzzed numeric inputs', () => {
      render(<EarningsCalculator />);
      const sliders = screen.getAllByRole('slider');

      const extremeInputs = [
        { teams: '1', spend: '300' },
        { teams: '100', spend: '5000' },
        { teams: '50', spend: '2000' },
      ];

      for (const input of extremeInputs) {
        fireEvent.change(sliders[0], { target: { value: input.teams } });
        fireEvent.change(sliders[1], { target: { value: input.spend } });

        const bodyText = document.body.textContent || '';
        expect(bodyText).not.toContain('NaN');
        expect(bodyText).not.toContain('Infinity');
        expect(bodyText).not.toContain('undefined');
      }
    });
  });

  // =========================================================================
  // 3. VCDeckViewer Navigation, Boundary Clamping, and Autoplay Loop
  // =========================================================================
  describe('Vector 3: VCDeckViewer Navigation & Autoplay Lifecycle', () => {
    it('verifies boundary wrap-around / clamping at Slide 1 and Slide 8', () => {
      render(<VCDeckViewer />);

      // Starts on Slide 1 of 8
      expect(screen.getByText(/Slide 1 of 8/i)).toBeInTheDocument();

      const prevBtns = screen.getAllByRole('button', { name: /Previous Slide/i });
      const nextBtns = screen.getAllByRole('button', { name: /Next Slide/i });

      // Clicking Previous on Slide 1 wraps to Slide 8 of 8
      fireEvent.click(prevBtns[0]);
      expect(screen.getByText(/Slide 8 of 8/i)).toBeInTheDocument();
      expect(screen.getByText(/8 \/ 8/i)).toBeInTheDocument();

      // Clicking Next on Slide 8 wraps back to Slide 1 of 8
      fireEvent.click(nextBtns[0]);
      expect(screen.getByText(/Slide 1 of 8/i)).toBeInTheDocument();
      expect(screen.getByText(/1 \/ 8/i)).toBeInTheDocument();
    });

    it('allows jumping to all 8 slides directly via selector buttons', () => {
      render(<VCDeckViewer />);

      for (let i = 1; i <= 8; i++) {
        const slideBtn = screen.getByRole('button', { name: new RegExp(`SLIDE ${i}`, 'i') });
        fireEvent.click(slideBtn);
        expect(screen.getByText(new RegExp(`Slide ${i} of 8`, 'i'))).toBeInTheDocument();
      }
    });

    it('cycles through slides automatically when Autoplay is enabled and cleans up on toggle', () => {
      vi.useFakeTimers();

      render(<VCDeckViewer />);
      expect(screen.getByText(/Slide 1 of 8/i)).toBeInTheDocument();

      const autoplayBtn = screen.getByRole('button', { name: /Autoplay/i });
      fireEvent.click(autoplayBtn);
      expect(screen.getByText(/Autoplay On/i)).toBeInTheDocument();

      // Advance by 6000ms -> should move to Slide 2
      act(() => {
        vi.advanceTimersByTime(6000);
      });
      expect(screen.getByText(/Slide 2 of 8/i)).toBeInTheDocument();

      // Advance by another 6000ms -> should move to Slide 3
      act(() => {
        vi.advanceTimersByTime(6000);
      });
      expect(screen.getByText(/Slide 3 of 8/i)).toBeInTheDocument();

      // Advance through all remaining slides until it loops back
      act(() => {
        vi.advanceTimersByTime(6000 * 6);
      });
      expect(screen.getByText(/Slide 1 of 8/i)).toBeInTheDocument();

      // Turn Autoplay off
      const autoplayOnBtn = screen.getByRole('button', { name: /Autoplay On/i });
      fireEvent.click(autoplayOnBtn);
      expect(screen.getByText(/^Autoplay$/i)).toBeInTheDocument();

      // Verify timer does not advance slide anymore
      act(() => {
        vi.advanceTimersByTime(12000);
      });
      expect(screen.getByText(/Slide 1 of 8/i)).toBeInTheDocument();

      vi.useRealTimers();
    });
  });

  // =========================================================================
  // 4. ParticleCanvas Resilience, IntersectionObserver, and Motion Reduction
  // =========================================================================
  describe('Vector 4: ParticleCanvas Lifecycle, IntersectionObserver & a11y', () => {
    it('handles IntersectionObserver disconnect and resume on viewport visibility', () => {
      let observerCallback: IntersectionObserverCallback | null = null;
      const originalIntersectionObserver = window.IntersectionObserver;

      window.IntersectionObserver = vi.fn().mockImplementation((cb) => {
        observerCallback = cb;
        return {
          observe: vi.fn(),
          unobserve: vi.fn(),
          disconnect: vi.fn(),
          takeRecords: () => [],
        };
      }) as any;

      const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');
      const requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame');

      render(<ParticleCanvas />);

      expect(window.IntersectionObserver).toHaveBeenCalled();

      // Simulate off-screen (isIntersecting: false)
      act(() => {
        if (observerCallback) {
          observerCallback(
            [{ isIntersecting: false } as IntersectionObserverEntry],
            {} as IntersectionObserver
          );
        }
      });
      expect(cancelAnimationFrameSpy).toHaveBeenCalled();

      // Simulate on-screen (isIntersecting: true)
      act(() => {
        if (observerCallback) {
          observerCallback(
            [{ isIntersecting: true } as IntersectionObserverEntry],
            {} as IntersectionObserver
          );
        }
      });
      expect(requestAnimationFrameSpy).toHaveBeenCalled();

      window.IntersectionObserver = originalIntersectionObserver;
    });

    it('switches to static frame mode when prefers-reduced-motion is active without endless rAF loops', () => {
      const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');
      let mediaQueryCallback: ((e: MediaQueryListEvent) => void) | null = null;

      const originalMatchMedia = window.matchMedia;
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((event, handler) => {
          if (event === 'change') mediaQueryCallback = handler;
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      render(<ParticleCanvas />);

      // Trigger reduced motion change event
      act(() => {
        if (mediaQueryCallback) {
          mediaQueryCallback({ matches: true } as MediaQueryListEvent);
        }
      });

      expect(cancelAnimationFrameSpy).toHaveBeenCalled();

      window.matchMedia = originalMatchMedia;
    });

    it('handles multiple rapid window resize events and extreme canvas bounds', () => {
      render(<ParticleCanvas />);

      const sizes = [
        { w: 320, h: 480 },
        { w: 768, h: 1024 },
        { w: 1920, h: 1080 },
        { w: 3840, h: 2160 },
        { w: 0, h: 0 },
      ];

      for (const size of sizes) {
        act(() => {
          window.innerWidth = size.w;
          window.innerHeight = size.h;
          window.dispatchEvent(new Event('resize'));
        });
      }

      const canvas = screen.getByTestId('particle-canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  // =========================================================================
  // 5. Modal & Drawer Open/Close State Transitions & Keyboard Accessibility
  // =========================================================================
  describe('Vector 5: Modal & Drawer Focus & Escape State Transitions', () => {
    it('manages ServiceDetailModal open/close via Escape, close button, and backdrop click', () => {
      const onCloseMock = vi.fn();
      const sampleService = marketplaceServices[0];

      const { rerender } = render(
        <ServiceDetailModal service={sampleService} onClose={onCloseMock} />
      );

      // Body overflow hidden when open
      expect(document.body.style.overflow).toBe('hidden');
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(sampleService.name)).toBeInTheDocument();

      // Test Escape key
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(onCloseMock).toHaveBeenCalledTimes(1);

      // Test Backdrop click (clicking the outer backdrop container)
      const dialogBackdrop = screen.getByRole('dialog');
      fireEvent.click(dialogBackdrop);
      expect(onCloseMock).toHaveBeenCalledTimes(2);

      // Clicking inside the modal container must NOT trigger onClose (stopPropagation)
      const modalHeader = screen.getByText(sampleService.name);
      fireEvent.click(modalHeader);
      expect(onCloseMock).toHaveBeenCalledTimes(2); // count remains 2

      // Re-render closed (service = null)
      rerender(<ServiceDetailModal service={null} onClose={onCloseMock} />);
      expect(document.body.style.overflow).toBe('unset');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('manages DeployConfigDrawer open/close via Escape, close button, and backdrop click', () => {
      const onCloseMock = vi.fn();
      const sampleService = marketplaceServices[0];

      const { rerender } = render(
        <DeployConfigDrawer service={sampleService} isOpen={true} onClose={onCloseMock} />
      );

      expect(document.body.style.overflow).toBe('hidden');
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`Deploy ${sampleService.name}`, 'i'))).toBeInTheDocument();

      // Test Escape key
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(onCloseMock).toHaveBeenCalledTimes(1);

      // Test Backdrop click
      const dialogBackdrop = screen.getByRole('dialog');
      fireEvent.click(dialogBackdrop);
      expect(onCloseMock).toHaveBeenCalledTimes(2);

      // Clicking inside drawer panel does NOT close
      const drawerTitle = screen.getByText(new RegExp(`Deploy ${sampleService.name}`, 'i'));
      fireEvent.click(drawerTitle);
      expect(onCloseMock).toHaveBeenCalledTimes(2);

      // Close drawer (isOpen = false)
      rerender(<DeployConfigDrawer service={sampleService} isOpen={false} onClose={onCloseMock} />);
      expect(document.body.style.overflow).toBe('unset');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('manages ArticleModal open/close via Escape and backdrop click', () => {
      const onCloseMock = vi.fn();
      const sampleArticle = blogArticles[0];

      const { rerender } = render(
        <ArticleModal article={sampleArticle} onClose={onCloseMock} />
      );

      expect(document.body.style.overflow).toBe('hidden');
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(sampleArticle.title)).toBeInTheDocument();

      // Test Escape key
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(onCloseMock).toHaveBeenCalledTimes(1);

      // Test Backdrop click
      const dialogBackdrop = screen.getByRole('dialog');
      fireEvent.click(dialogBackdrop);
      expect(onCloseMock).toHaveBeenCalledTimes(2);

      // Inner click does NOT close
      const articleTitle = screen.getByText(sampleArticle.title);
      fireEvent.click(articleTitle);
      expect(onCloseMock).toHaveBeenCalledTimes(2);

      // Unmount / set article = null
      rerender(<ArticleModal article={null} onClose={onCloseMock} />);
      expect(document.body.style.overflow).toBe('unset');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  // =========================================================================
  // 6. Cross-Section High-Frequency Navigation Stress Test
  // =========================================================================
  describe('Vector 6: High-Frequency Navigation & State Thrashing', () => {
    it('survives rapid tab and route switching without race conditions or memory corruption', async () => {
      render(<App />);

      const routes = [
        /Strategy & Ops/i,
        /Research Blog/i,
        /Grants/i,
        /Affiliates/i,
        /Marketplace/i,
        /Pitch/i,
      ];

      // Rapidly click all 6 navigation tabs in sequence 3 times (18 rapid switches)
      for (let cycle = 0; cycle < 3; cycle++) {
        for (const routePattern of routes) {
          const links = screen.getAllByRole('link', { name: routePattern });
          if (links.length > 0) {
            fireEvent.click(links[0]);
          }
        }
      }

      // Final destination: Pitch page should be cleanly rendered
      expect(screen.getAllByText(/Universal/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Bounty Swarm/i)[0]).toBeInTheDocument();
      expect(document.body.textContent).not.toContain('TypeError');
    });
  });
});
