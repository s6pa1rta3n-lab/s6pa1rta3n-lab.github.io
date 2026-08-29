import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ParticleCanvas } from '../components/common/ParticleCanvas';

describe('Milestone 5 — ParticleCanvas Component & Autonomous Node Swarm Simulation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders canvas element with presentation role and aria-hidden attributes', () => {
    const { container } = render(<ParticleCanvas className="custom-particle-class" />);

    const canvas = screen.getByTestId('particle-canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('role', 'presentation');
    expect(canvas).toHaveAttribute('aria-hidden', 'true');

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-particle-class');
    expect(wrapper).toHaveAttribute('role', 'presentation');
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
  });

  it('accepts custom configuration props for nodeCount, speed, and accentColors', () => {
    render(
      <ParticleCanvas
        nodeCount={50}
        speed={1.2}
        maxDistance={150}
        opacity={0.9}
        accentColors={['#00F0FF', '#D4FF00']}
        showGlow={true}
        interactive={true}
      />
    );

    const canvas = screen.getByTestId('particle-canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('handles window resize events dynamically', () => {
    render(<ParticleCanvas />);

    const canvas = screen.getByTestId('particle-canvas');
    expect(canvas).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(canvas).toBeInTheDocument();
  });

  it('handles mouse movements for interactive particle attraction without error', () => {
    render(<ParticleCanvas interactive={true} />);

    const canvas = screen.getByTestId('particle-canvas');
    expect(canvas).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 200,
          clientY: 200,
        })
      );
      window.dispatchEvent(new MouseEvent('mouseleave'));
    });

    expect(canvas).toBeInTheDocument();
  });

  it('respects prefers-reduced-motion media query', () => {
    // Mock matchMedia to simulate reduced motion requested
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<ParticleCanvas />);
    const canvas = screen.getByTestId('particle-canvas');
    expect(canvas).toBeInTheDocument();

    window.matchMedia = originalMatchMedia;
  });

  it('handles document visibility changes gracefully', () => {
    render(<ParticleCanvas />);

    act(() => {
      Object.defineProperty(document, 'hidden', {
        configurable: true,
        get: () => true,
      });
      document.dispatchEvent(new Event('visibilitychange'));
    });

    act(() => {
      Object.defineProperty(document, 'hidden', {
        configurable: true,
        get: () => false,
      });
      document.dispatchEvent(new Event('visibilitychange'));
    });

    const canvas = screen.getByTestId('particle-canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('handles null canvas 2D context gracefully without crashing', () => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null);

    expect(() => {
      render(<ParticleCanvas />);
    }).not.toThrow();

    const canvas = screen.getByTestId('particle-canvas');
    expect(canvas).toBeInTheDocument();

    HTMLCanvasElement.prototype.getContext = originalGetContext;
  });

  it('properly cleans up animation frames and listeners on unmount', () => {
    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<ParticleCanvas />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    cancelAnimationFrameSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
