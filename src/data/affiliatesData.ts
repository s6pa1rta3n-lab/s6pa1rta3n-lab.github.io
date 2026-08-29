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
    description: 'Entry tier for individual developers, open-source maintainers, and community evangelists.',
    perks: [
      'Standard referral link with live conversion tracking',
      '10% recurring commission on all SaaS subscriptions',
      '5% net bonus on referred open-source bounty payouts',
      'Real-time affiliate analytics dashboard',
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
      'Custom vanity landing page (e.g. swarm.dev/r/your-brand)',
      'Co-branded marketing assets, banner kits, and demo scripts',
      'Bi-weekly crypto (USDC on Base) or Stripe bank payouts',
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
    description: 'High-volume tier for tech podcasters, software agencies, and boutique developer tooling consultancies.',
    perks: [
      '20% recurring SaaS commission + 10% bounty referral bonus',
      'Dedicated Swarm Solutions Architect & private Discord/Slack channel',
      'Early access to beta micro-services & custom agent models',
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
    description: 'Elite enterprise tier for venture studios, accelerator networks, and large-scale developer communities.',
    perks: [
      '25% recurring SaaS commission + 15% bounty referral bonus',
      'Quarterly ecosystem revenue-pool profit sharing bonus',
      'Custom API endpoints & white-label swarm node integration',
      'Instant real-time on-chain USDC settlement with zero minimums',
    ],
  },
];

export const marketingAssets: MarketingAsset[] = [
  {
    id: 'asset-twitter-hook',
    category: 'Social Copy',
    title: 'High-Converting Twitter/X Post',
    description: 'Battle-tested social copy highlighting autonomous ticket liquidation and zero-mock verification.',
    content: `🚀 Supercharge your engineering team with Universal Bounty Swarm: Autonomous AI developers that fix GitHub bugs, pass CI, and enforce zero-mock forensic security audits 24/7. Deploy your first swarm node: https://swarm.dev/r/YOUR_TAG`,
  },
  {
    id: 'asset-linkedin-post',
    category: 'Social Copy',
    title: 'LinkedIn Enterprise Post',
    description: 'Professional copy designed for Engineering VPs, CTOs, and Product Leads.',
    content: `Engineers shouldn't spend 40% of their sprints fixing flaky tests and triaging dependency backlogs.\n\nUniversal Bounty Swarm deploys headless, event-driven AI engineering nodes that ingest GitHub issues, spin up ephemeral sandboxes, and submit verified, CI-passing Pull Requests in under 30 minutes.\n\nZero seats. Zero autocomplete fatigue. 100% verified outcomes.\n\nCheck out the demo or start a 14-day trial: https://swarm.dev/r/YOUR_TAG`,
  },
  {
    id: 'asset-email-pitch',
    category: 'Email Pitch',
    title: 'Cold Outreach Pitch to Engineering Leads',
    description: 'Concise 3-paragraph email template for reaching out to engineering managers.',
    content: `Subject: Autonomous issue liquidation for {{company_name}}'s repository\n\nHi {{first_name}},\n\nI noticed your engineering team manages an active repository on GitHub. Most dev teams we talk to lose 15+ hours weekly on CI debugging and backlog triage.\n\nUniversal Bounty Swarm connects directly to your GitHub repository via webhooks. When an issue is tagged, an ephemeral swarm node spins up, writes unit tests, fixes the bug, runs a forensic security audit, and opens a passing PR in <30 minutes.\n\nYou can test a 20-PR free trial on a single repository here: https://swarm.dev/r/YOUR_TAG\n\nBest,\n{{your_name}}`,
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
    description: 'Security attestation badge indicating zero-mock code verification.',
    content: `[![Victory Audit Verified](https://img.shields.io/badge/Security-Victory%20Audit%20Passed-10b981?style=for-the-badge)](https://swarm.dev/r/YOUR_TAG)`,
  },
  {
    id: 'asset-60s-script',
    category: 'Pitch Script',
    title: '60-Second Video / Loom Pitch Script',
    description: 'Spoken script for technical creators recording Loom, YouTube, or TikTok videos.',
    content: `Hey everyone! Today I want to show you how our team stopped wasting developer hours on repetitive bugs. We connected Universal Bounty Swarm to our GitHub repo. Watch this: when I tag an issue with '@universal-swarm', a container spins up in the cloud, reads the stack trace, writes a failing unit test to reproduce the bug, fixes the source code, and verifies that CI passes. Best of all, it has a built-in 'Victory Audit' murder-board that prevents the AI from cheating or mocking assertions. Try it out at the link below!`,
  },
];

export const affiliateFaqs: AffiliateFaq[] = [
  {
    question: 'How and when do I get paid?',
    answer: 'Payouts are processed automatically in USDC (on Base, Arbitrum, or Ethereum) or via Stripe direct deposit to your bank account. Depending on your tier, payouts occur monthly, bi-weekly, weekly, or instantly on-chain.',
  },
  {
    question: 'Is there a cookie attribution window?',
    answer: 'Yes! We offer a generous 90-day cookie attribution window. If a referred user registers or starts a trial within 90 days of clicking your link, you receive lifetime recurring commissions for that team.',
  },
  {
    question: 'Can I refer open-source repositories and bounties?',
    answer: 'Absolutely. If you refer an open-source maintainer or protocol sponsor who posts a paid bounty, you receive 5% to 15% of the settled bounty amount immediately upon merge.',
  },
  {
    question: 'Are there any minimum payout thresholds?',
    answer: 'No minimum threshold for Web3 crypto payouts (USDC on Base). For Stripe fiat bank transfers, the minimum threshold is $50.',
  },
];
