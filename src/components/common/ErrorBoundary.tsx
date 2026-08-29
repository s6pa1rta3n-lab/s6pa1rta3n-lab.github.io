import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Terminal, Home } from 'lucide-react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, resetError: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  public handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    });
  };

  public handleReturnHome = (): void => {
    window.location.hash = '#/pitch';
    this.handleReset();
  };

  public toggleDetails = (): void => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback(this.state.error || new Error('Unknown Error'), this.handleReset);
        }
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen bg-obsidian-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 select-text"
        >
          <div className="max-w-2xl w-full glass-panel border border-cyber-rose/40 rounded-xl p-6 sm:p-8 shadow-glass-card relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-rose/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyber-volt/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

            <div className="relative z-10">
              {/* Header Badge & Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-cyber-rose/20 border border-cyber-rose/40 flex items-center justify-center text-cyber-rose shrink-0 shadow-lg">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-cyber-rose/10 text-cyber-rose border border-cyber-rose/30 mb-1">
                    RUNTIME EXCEPTION CAUGHT
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white">
                    SWARM SUBSYSTEM FAILURE
                  </h1>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                An unhandled runtime error occurred within the UI rendering pipeline. The Swarm Error Boundary intercepted the fault to prevent total system unmount.
              </p>

              {/* Error Message Box */}
              <div className="bg-obsidian-900/90 border border-slate-800 rounded-lg p-4 mb-6 font-mono text-xs overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2 mb-2">
                  <span className="flex items-center gap-1.5 text-cyber-rose font-semibold">
                    <Terminal className="w-3.5 h-3.5" />
                    EXCEPTION TRACE
                  </span>
                  <span className="text-[10px] text-slate-500">
                    DIAGNOSTICS RECORD
                  </span>
                </div>
                <div className="text-cyber-rose font-medium break-words">
                  {this.state.error?.name || 'Error'}: {this.state.error?.message || 'Unknown runtime error'}
                </div>

                {this.state.showDetails && this.state.error?.stack && (
                  <pre className="mt-3 pt-3 border-t border-slate-800/60 text-slate-400 max-h-48 overflow-y-auto whitespace-pre-wrap leading-tight text-[11px]">
                    {this.state.error.stack}
                    {this.state.errorInfo?.componentStack && (
                      <div className="mt-2 text-slate-500">
                        {this.state.errorInfo.componentStack}
                      </div>
                    )}
                  </pre>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={this.toggleDetails}
                  className="text-xs font-mono text-slate-400 hover:text-cyber-cyan transition-colors underline-offset-4 hover:underline focus-ring"
                >
                  {this.state.showDetails ? 'Hide Diagnostics Stack' : 'View Diagnostics Stack'}
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={this.handleReturnHome}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 text-slate-200 border border-slate-700 text-xs font-mono font-medium transition-all focus-ring"
                  >
                    <Home className="w-3.5 h-3.5 text-cyber-cyan" />
                    RETURN TO HUB
                  </button>

                  <button
                    type="button"
                    onClick={this.handleReset}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-volt/20 hover:bg-cyber-volt/30 text-cyber-volt border border-cyber-volt/50 text-xs font-mono font-bold tracking-wide transition-all shadow-glow-volt focus-ring"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    REBOOT / RETRY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
