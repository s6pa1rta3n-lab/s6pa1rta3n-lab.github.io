export interface AffiliateTier {
  id: string;
  name: string;
  minTeams: number;
  maxTeams?: number;
  volumeRange: string;
  saasCommissionPercent: number;
  bountyCommissionPercent: number;
  payoutFrequency: string;
  badgeColor: string;
  perks: string[];
  description: string;
}

export interface MarketingAsset {
  id: string;
  category: 'Social Copy' | 'Email Pitch' | 'Badges & Markdown' | 'Pitch Script';
  title: string;
  description: string;
  content: string;
  previewType?: 'text' | 'badge' | 'script';
}

export interface AffiliateFaq {
  question: string;
  answer: string;
}

export const affiliateTiers: AffiliateTier[] = [
  {
    id: 'bronze-scout',
    name: 'Bronze Scout',
    minTeams: 1,
    maxTeams: 9,
    volumeRange: '1-9 Teams',
    saasCommissionPercent: 10,
    bountyCommissionPercent: 5,
    payoutFrequency: 'Monthly (1st of month)',
    badgeColor: 'cyber-badge-violet',
    description: 'Entry tier for individual developers, open-source maintainers, and community leaders.',
    perks: [
      'Standard referral link with live conversion tracking',
      '10% recurring monthly commission on all SaaS subscriptions',
      '5% net bonus on referred open-source bounty settlements',
      'Real-time affiliate revenue dashboard',
    ],
  },
  {
    id: 'silver-hunter',
    name: 'Silver Hunter',
    minTeams: 10,
    maxTeams: 24,
    volumeRange: '10-24 Teams',
    saasCommissionPercent: 15,
    bountyCommissionPercent: 7.5,
    payoutFrequency: 'Bi-Weekly (1st & 15th)',
    badgeColor: 'cyber-badge-cyan',
    description: 'Growth tier for technical content creators, newsletter authors, and developer advocates.',
    perks: [
      '15% recurring SaaS commission + 7.5% bounty referral bonus',
      'Custom vanity referral link (e.g. swarm.dev/r/your-brand)',
      'Co-branded marketing kits, ROI calculators, and demo scripts',
      'Bi-weekly crypto (USDC on Base) or Stripe direct bank payouts',
    ],
  },
  {
    id: 'gold-commander',
    name: 'Gold Commander',
    minTeams: 25,
    maxTeams: 49,
    volumeRange: '25-49 Teams',
    saasCommissionPercent: 20,
    bountyCommissionPercent: 10,
    payoutFrequency: 'Weekly (Every Friday)',
    badgeColor: 'cyber-badge-volt',
    description: 'High-volume tier for software agencies, venture scouts, and dev tooling consultancies.',
    perks: [
      '20% recurring SaaS commission + 10% bounty referral bonus',
      'Dedicated Swarm Solutions Architect & private Discord/Slack channel',
      'Early access to new autonomous worker models and custom tools',
      'Priority ticket dispatch & automated weekly revenue settlement',
    ],
  },
  {
    id: 'diamond-syndicate',
    name: 'Diamond Syndicate',
    minTeams: 50,
    volumeRange: '50+ Teams',
    saasCommissionPercent: 25,
    bountyCommissionPercent: 15,
    payoutFrequency: 'Instant / Daily On-Chain',
    badgeColor: 'cyber-badge-emerald',
    description: 'Elite enterprise tier for venture accelerators, incubators, and enterprise tech networks.',
    perks: [
      '25% recurring SaaS commission + 15% bounty referral bonus',
      'Quarterly ecosystem revenue-pool profit sharing bonus',
      'Custom API endpoints & white-label swarm integration',
      'Instant real-time on-chain USDC settlement with zero minimums',
    ],
  },
];

export const marketingAssets: MarketingAsset[] = [
  {
    id: 'asset-twitter-hook',
    category: 'Social Copy',
    title: 'High-Converting Twitter/X Post',
    description: 'Battle-tested social copy highlighting 90% payroll reduction and audited 24/7 delivery.',
    content: `🚀 Stop burning cash on routine engineering. Universal Bounty Swarm gives you an autonomous AI workforce that fixes GitHub bugs, writes tests, and audits its own code 24/7 for a fraction of the cost of a dev team. Check it out: https://swarm.dev/r/YOUR_TAG`,
  },
  {
    id: 'asset-linkedin-post',
    category: 'Social Copy',
    title: 'LinkedIn Executive Post',
    description: 'Professional copy designed for Engineering VPs, CTOs, and startup founders.',
    content: `Your best engineers shouldn't spend 40% of their sprints fixing minor bugs and resolving dependency conflicts.\n\nUniversal Bounty Swarm deploys a 24/7 AI workforce that connects to your GitHub repository, reads the code, fixes the problem, and delivers fully tested, ready-to-merge Pull Requests in under 30 minutes.\n\nReplace a $150k dev team with a low-cost subscription. Zero human babysitting.\n\nDeploy your swarm today: https://swarm.dev/r/YOUR_TAG`,
  },
  {
    id: 'asset-email-pitch',
    category: 'Email Pitch',
    title: 'Cold Outreach Pitch to Engineering Leads',
    description: 'Concise 3-paragraph email template for reaching out to engineering managers.',
    content: `Subject: Cut engineering maintenance costs by 90% for {{company_name}}\n\nHi {{first_name}},\n\nI noticed your engineering team manages an active repository on GitHub. Most dev teams we speak with lose 15+ hours each week on routine bug fixes, dependency updates, and maintenance backlog.\n\nUniversal Bounty Swarm connects directly to your GitHub repository. When you assign a task in plain English, an autonomous AI worker writes the fix, runs your test suite, performs an independent quality audit, and opens a tested Pull Request in <30 minutes.\n\nYou can test it on your repository today: https://swarm.dev/r/YOUR_TAG\n\nBest,\n{{your_name}}`,
  },
  {
    id: 'asset-badge-maintained',
    category: 'Badges & Markdown',
    title: 'Maintained by Universal Bounty Swarm Badge',
    description: 'Embeddable SVG shield badge for open-source GitHub READMEs.',
    content: `[![Maintained by Universal Bounty Swarm](https://img.shields.io/badge/Maintained%20By-Universal%20Bounty%20Swarm-c0ff70?style=for-the-badge&logo=github)](https://swarm.dev/r/YOUR_TAG)`,
  },
  {
    id: 'asset-badge-audit',
    category: 'Badges & Markdown',
    title: 'Victory Audit Passed Badge',
    description: 'Quality attestation badge indicating 100% verified and audited code.',
    content: `[![Victory Audit Verified](https://img.shields.io/badge/Quality-Victory%20Audit%20Passed-10b981?style=for-the-badge)](https://swarm.dev/r/YOUR_TAG)`,
  },
  {
    id: 'asset-60s-script',
    category: 'Pitch Script',
    title: '60-Second Video / Loom Pitch Script',
    description: 'Spoken script for technical creators recording Loom, YouTube, or social clips.',
    content: `Hey everyone! Today I want to show you how our team cut engineering maintenance costs by 90%. We connected Universal Bounty Swarm to our GitHub repo. When an issue is posted, an AI worker spins up in the cloud, reads the code, writes a unit test to reproduce the bug, fixes the issue, and verifies that the build passes. Best of all, a separate 'Auditor' AI independently checks the code before you ever see it to guarantee it actually works. Try it out at the link below!`,
  },
];

export const affiliateFaqs: AffiliateFaq[] = [
  {
    question: 'How and when do I get paid?',
    answer: 'Payouts are processed automatically in USDC (on Base, Arbitrum, or Ethereum) or via Stripe direct deposit to your bank account. Depending on your tier, payouts occur monthly, bi-weekly, weekly, or instantly on-chain.',
  },
  {
    question: 'Is there a cookie attribution window?',
    answer: 'Yes! We offer a generous 90-day cookie attribution window. If a referred user registers or starts a subscription within 90 days of clicking your link, you receive recurring commissions for that team.',
  },
  {
    question: 'Can I refer open-source repositories and bounties?',
    answer: 'Yes. If you refer an open-source maintainer or protocol sponsor who posts a paid bounty, you receive 5% to 15% of the settled bounty amount immediately upon merge.',
  },
  {
    question: 'Are there any minimum payout thresholds?',
    answer: 'No minimum threshold for Web3 crypto payouts (USDC on Base). For Stripe fiat bank transfers, the minimum threshold is $50.',
  },
];
