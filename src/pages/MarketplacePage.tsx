import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Store, Search, Filter, Sparkles } from 'lucide-react';
import { marketplaceServices, MarketplaceService } from '../data/marketplaceData';
import { ServiceCard } from '../components/marketplace/ServiceCard';
import { ServiceDetailModal } from '../components/marketplace/ServiceDetailModal';
import { PricingTable } from '../components/marketplace/PricingTable';
import { DeployConfigDrawer } from '../components/marketplace/DeployConfigDrawer';

export const MarketplacePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedService, setSelectedService] = useState<MarketplaceService | null>(null);
  const [deployingService, setDeployingService] = useState<MarketplaceService | null>(null);

  // Check URL query param for deep-linking: ?service=id
  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId) {
      const found = marketplaceServices.find((s) => s.id === serviceId);
      if (found) {
        setSelectedService(found);
      }
    }
  }, [searchParams]);

  const handleOpenInspect = (service: MarketplaceService) => {
    setSelectedService(service);
    setSearchParams({ service: service.id });
  };

  const handleCloseInspect = () => {
    setSelectedService(null);
    setSearchParams({});
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('All');
    marketplaceServices.forEach((s) => set.add(s.category));
    return Array.from(set);
  }, []);

  const filteredServices = useMemo(() => {
    return marketplaceServices.filter((srv) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || srv.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
          <Store className="w-3.5 h-3.5" />
          <span>Autonomous Micro-Services & API Marketplace</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
          Swarm <span className="cyber-gradient-text">Marketplace</span>
        </h1>
        <p className="text-sm text-slate-400 font-sans leading-relaxed">
          Deploy modular, production-ready autonomous swarm agents into your engineering pipeline. Available as managed cloud workers or drop-in REST & WebSocket APIs.
        </p>
      </div>

      {/* Filter & Billing Switcher Toolbar */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search micro-services, tools & schemas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-obsidian-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan"
              aria-label="Search micro-services, tools and schemas"
            />
          </div>

          {/* Billing Switcher */}
          <div className="p-1 rounded-xl bg-obsidian-900 border border-slate-800 flex items-center gap-2 font-mono text-xs self-start sm:self-auto">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3.5 py-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan ${
                billingCycle === 'monthly'
                  ? 'bg-cyber-cyan text-obsidian-950 font-bold shadow-glow-cyan/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-volt ${
                billingCycle === 'annual'
                  ? 'bg-cyber-volt text-obsidian-950 font-bold shadow-glow-volt/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-obsidian-950/80 text-cyber-volt font-mono font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>Category:</span>
          </div>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan ${
                  isSelected
                    ? 'bg-cyber-cyan text-obsidian-950 font-bold shadow-glow-cyan/20'
                    : 'bg-obsidian-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {cat === 'All' && <Sparkles className="w-3 h-3 inline mr-1" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            billingCycle={billingCycle}
            onInspect={handleOpenInspect}
            onDeploy={(srv) => setDeployingService(srv)}
          />
        ))}
      </div>

      {/* Pricing Matrix Section */}
      <PricingTable
        billingCycle={billingCycle}
        onToggleBilling={setBillingCycle}
        onSelectPlan={() => {
          // Default deploy victory-auditor for convenience
          setDeployingService(marketplaceServices[0]);
        }}
      />

      {/* Service Detail Modal (REST / Webhook API Schema) */}
      <ServiceDetailModal
        service={selectedService}
        onClose={handleCloseInspect}
      />

      {/* Interactive Deploy Swarm Drawer */}
      <DeployConfigDrawer
        service={deployingService}
        isOpen={!!deployingService}
        onClose={() => setDeployingService(null)}
      />
    </div>
  );
};
