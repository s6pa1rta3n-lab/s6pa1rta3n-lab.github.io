import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

// Helper component that throws on demand
const ProblemChild: React.FC<{ shouldThrow: boolean; errorMessage?: string }> = ({
  shouldThrow,
  errorMessage = 'Simulated Subsystem Fault',
}) => {
  if (shouldThrow) {
    throw new Error(errorMessage);
  }
  return <div data-testid="child-healthy">Subsystem Healthy</div>;
};

// Parent wrapper to test recovery
const RecoveryTestWrapper: React.FC = () => {
  const [hasError, setHasError] = useState(true);

  return (
    <div>
      <button onClick={() => setHasError(false)}>Fix Error State</button>
      <ErrorBoundary>
        <ProblemChild shouldThrow={hasError} errorMessage="Crash Recovery Test" />
      </ErrorBoundary>
    </div>
  );
};

// Wrapper to test custom function fallback recovery
const CustomFallbackWrapper: React.FC = () => {
  const [hasError, setHasError] = useState(true);

  return (
    <div>
      <button onClick={() => setHasError(false)}>Fix Child State</button>
      <ErrorBoundary
        fallback={(error, reset) => (
          <div>
            <div data-testid="fn-error">{error.message}</div>
            <button onClick={reset}>Reset Custom</button>
          </div>
        )}
      >
        <ProblemChild shouldThrow={hasError} errorMessage="Custom Fn Error" />
      </ErrorBoundary>
    </div>
  );
};

describe('ErrorBoundary Component Robustness Suite', () => {
  // Suppress console.error during test cases where we deliberately throw errors
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    vi.restoreAllMocks();
  });

  it('renders children normally when no exception occurs', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child-healthy')).toBeInTheDocument();
    expect(screen.getByText('Subsystem Healthy')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('catches render errors and displays default cyber fallback UI with error message', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} errorMessage="Critical Memory Corruption" />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/RUNTIME EXCEPTION CAUGHT/i)).toBeInTheDocument();
    expect(screen.getByText(/SWARM SUBSYSTEM FAILURE/i)).toBeInTheDocument();
    expect(screen.getByText(/Critical Memory Corruption/i)).toBeInTheDocument();
    expect(screen.queryByTestId('child-healthy')).not.toBeInTheDocument();
  });

  it('invokes onError prop when an error is caught', () => {
    const onErrorMock = vi.fn();

    render(
      <ErrorBoundary onError={onErrorMock}>
        <ProblemChild shouldThrow={true} errorMessage="Callback Test Error" />
      </ErrorBoundary>
    );

    expect(onErrorMock).toHaveBeenCalledTimes(1);
    expect(onErrorMock.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(onErrorMock.mock.calls[0][0].message).toBe('Callback Test Error');
    expect(onErrorMock.mock.calls[0][1]).toHaveProperty('componentStack');
  });

  it('supports custom ReactNode fallback', () => {
    render(
      <ErrorBoundary fallback={<div data-testid="custom-fallback">Custom Fallback UI</div>}>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText('Custom Fallback UI')).toBeInTheDocument();
    expect(screen.queryByText(/SWARM SUBSYSTEM FAILURE/i)).not.toBeInTheDocument();
  });

  it('supports custom render function fallback with reset capability', () => {
    render(<CustomFallbackWrapper />);

    expect(screen.getByTestId('fn-error')).toHaveTextContent('Custom Fn Error');

    // Fix underlying child state
    fireEvent.click(screen.getByText('Fix Child State'));

    // Trigger reset via custom fallback button
    fireEvent.click(screen.getByText('Reset Custom'));

    expect(screen.getByTestId('child-healthy')).toBeInTheDocument();
  });

  it('toggles diagnostic stack trace display when clicking toggle button', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} errorMessage="Stack Inspection Error" />
      </ErrorBoundary>
    );

    const toggleBtn = screen.getByRole('button', { name: /View Diagnostics Stack/i });
    expect(toggleBtn).toBeInTheDocument();

    // Click to view diagnostics
    fireEvent.click(toggleBtn);
    expect(screen.getByRole('button', { name: /Hide Diagnostics Stack/i })).toBeInTheDocument();

    // Click again to hide
    fireEvent.click(screen.getByRole('button', { name: /Hide Diagnostics Stack/i }));
    expect(screen.getByRole('button', { name: /View Diagnostics Stack/i })).toBeInTheDocument();
  });

  it('resets error state when clicking REBOOT / RETRY button', () => {
    render(<RecoveryTestWrapper />);

    // Initially crashed
    expect(screen.getByText(/Crash Recovery Test/i)).toBeInTheDocument();

    // Fix the external state
    fireEvent.click(screen.getByText('Fix Error State'));

    // Click the Reboot button in ErrorBoundary
    const rebootBtn = screen.getByRole('button', { name: /REBOOT \/ RETRY/i });
    fireEvent.click(rebootBtn);

    // Should now render healthy child
    expect(screen.getByTestId('child-healthy')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('handles RETURN TO HUB button by setting window location hash to #/pitch and resetting state', () => {
    render(<RecoveryTestWrapper />);

    expect(screen.getByText(/Crash Recovery Test/i)).toBeInTheDocument();

    // Fix the external state
    fireEvent.click(screen.getByText('Fix Error State'));

    // Click Return to Hub
    const returnHomeBtn = screen.getByRole('button', { name: /RETURN TO HUB/i });
    fireEvent.click(returnHomeBtn);

    expect(window.location.hash).toBe('#/pitch');
    expect(screen.getByTestId('child-healthy')).toBeInTheDocument();
  });
});
