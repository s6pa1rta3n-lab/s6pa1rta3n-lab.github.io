import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Shell } from './components/layout/Shell';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { PitchPage } from './pages/PitchPage';
import { StrategyPage } from './pages/StrategyPage';
import { BlogPage } from './pages/BlogPage';
import { GrantsPage } from './pages/GrantsPage';
import { AffiliatesPage } from './pages/AffiliatesPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HashRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<Navigate to="/pitch" replace />} />
            <Route path="/pitch" element={<PitchPage />} />
            <Route path="/strategy" element={<StrategyPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/grants" element={<GrantsPage />} />
            <Route path="/affiliates" element={<AffiliatesPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/proof-of-work" element={<Navigate to="/portfolio" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Shell>
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;
