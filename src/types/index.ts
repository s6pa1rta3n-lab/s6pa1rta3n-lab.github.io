export interface NavItem {
  name: string;
  path: string;
  description: string;
  icon?: string;
  badge?: string;
}

export interface TelemetryStatus {
  status: 'online' | 'degraded' | 'syncing';
  activeSwarmNodes: number;
  openBountiesIndexed: number;
  totalSettledUsd: number;
  lastHeartbeat: string;
  activeEcosystems: string[];
}

export interface StrategyDoc {
  id: 'b2b' | 'pitch' | 'roadmap' | 'scf' | 'plan';
  title: string;
  category: string;
  summary: string;
  markdownContent: string;
  lastUpdated: string;
}

export interface JudgingCriterion {
  id: string;
  name: string;
  weight: string;
  scorePercent: number;
  description: string;
  keyDeliverables: string[];
  evidence: string[];
  status: 'passed' | 'exceptional' | 'verified';
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readingTime: string;
  tags: string[];
  content: string;
}

export interface GrantDossier {
  id: string;
  program: string;
  ecosystem: 'Stellar' | 'Base' | 'Octant' | 'Gitcoin' | 'Optimism';
  grantAmount: string;
  status: 'Active' | 'Approved' | 'In Review' | 'Settled';
  tranches: {
    number: number;
    title: string;
    amount: string;
    deliverables: string[];
    status: 'completed' | 'in-progress' | 'upcoming';
  }[];
  payoutAddress: string;
  proofUrl?: string;
}

export interface AffiliateTier {
  id: string;
  name: string;
  minMonthlyReferrals: number;
  commissionPercent: number;
  payoutFrequency: string;
  perks: string[];
  badgeColor: string;
}

export interface MarketplaceService {
  id: string;
  name: string;
  category: 'Security & Audit' | 'CI/CD & Testing' | 'DeFi Automation' | 'Bounty Engine' | 'Intelligence';
  tagline: string;
  description: string;
  priceMonthly: number;
  priceAnnualMonthly: number;
  apiEndpoint: string;
  features: string[];
  sampleRequest: Record<string, unknown>;
  sampleResponse: Record<string, unknown>;
  badge?: string;
}
