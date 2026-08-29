export interface GrantTranche {
  number: number;
  phase: string;
  title: string;
  amount: string;
  timeline: string;
  deliverables: string[];
  validationCriteria: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

export interface GrantDossier {
  id: string;
  name: string;
  program: string;
  organization: string;
  award: string;
  requestedAmount: string;
  ecosystem: 'Stellar' | 'Base' | 'Octant' | 'Gitcoin' | 'Optimism' | 'Arbitrum';
  status: 'Active' | 'Approved' | 'In Review' | 'Settled' | 'Draft';
  badgeColor: string;
  description: string;
  payoutAddress: string;
  proofUrl?: string;
  summary: string;
  tranches: GrantTranche[];
  publicGoodMetrics: {
    prsMerged: number;
    reposMaintained: number;
    testsPassing: number;
    upstreamProjects: string[];
  };
  teaConstitutionYaml?: string;
}

export const OFFICIAL_PAYOUT_ADDRESSES = {
  evm: '0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89',
  stellar: 'GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC',
  networks: {
    base: '0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89',
    arbitrum: '0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89',
    ethereum: '0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89',
    optimism: '0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89',
    polygon: '0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89',
    stellar: 'GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC',
  },
};

export const sampleTeaConstitutionYaml = `# TEA Protocol Governance Constitution
# Base L2 Verified Project Manifest
version: 1.0.0
project:
  name: universal-bounty-swarm
  organization: s6pa1rta3n-lab
  repository: https://github.com/s6pa1rta3n-lab/bounty_operations
  license: Apache-2.0

quorum:
  threshold: 0.67
  min_maintainers: 2
  advisors:
    - s6pa1rta3n
    - universal_auditor

rewards:
  network: base-l2
  payout_address: "0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89"
  staking_split_percent: 80
  community_treasury_percent: 20

governance:
  dispute_resolution: "EIP-4361-SIWE-multisig"
  victory_audit_enforced: true
  zero_mock_attestation: true
`;

export const grantDossiers: GrantDossier[] = [
  {
    id: 'stellar-scf',
    name: 'Stellar Community Fund (SCF)',
    program: 'Soroban Sentinel Build Award',
    organization: 'Stellar Development Foundation (SDF)',
    award: '$150,000 Build Award',
    requestedAmount: '$150,000 XLM',
    ecosystem: 'Stellar',
    status: 'Active',
    badgeColor: 'cyber-badge-emerald',
    description: 'Building Soroban smart contract bounty escrows with native Stellar asset settlement and automated Victory Audit attestations.',
    payoutAddress: OFFICIAL_PAYOUT_ADDRESSES.stellar,
    proofUrl: 'https://communityfund.stellar.org',
    summary: 'Soroban Sentinel provides autonomous smart contract fuzzing, automated issue resolution, and multi-sig milestone escrow settlements on Stellar.',
    tranches: [
      {
        number: 1,
        phase: 'Phase 1: Core Architecture & CLI Sandbox',
        title: 'Core Architecture & CLI Sandbox',
        amount: '$40,000 XLM',
        timeline: 'Months 1–2',
        status: 'completed',
        deliverables: [
          'Soroban CLI and SDK automated testing harness in ephemeral containers',
          '50 automated tests with real env.crypto() cryptographic host function calls',
          'Timing-safe HMAC-SHA256 signature verification for webhook events',
        ],
        validationCriteria: 'All 50 Soroban tests pass in CI without mock functions.',
      },
      {
        number: 2,
        phase: 'Phase 2: Testnet Alpha & Victory Audit',
        title: 'Testnet Alpha & Victory Audit Gatekeeper',
        amount: '$50,000 XLM',
        timeline: 'Months 3–4',
        status: 'in-progress',
        deliverables: [
          '@soroban-sentinel GitHub App with automated PR comment review bots',
          'Forensic Victory Audit AST analyzer for Soroban Rust smart contracts',
          '15 live testnet bug bounties resolved autonomously with verified PR merges',
        ],
        validationCriteria: 'Zero false-positive PR reviews and 100% test preservation rate.',
      },
      {
        number: 3,
        phase: 'Phase 3: Mainnet Settlement & Ecosystem Rollout',
        title: 'Mainnet Deployment & Escrow Routing',
        amount: '$60,000 XLM',
        timeline: 'Months 5–6',
        status: 'upcoming',
        deliverables: [
          'Live XLM and USDC smart contract escrow settlement on Stellar Mainnet',
          'Real-time public telemetry dashboard with on-chain transaction verifier',
          '3 major Stellar ecosystem projects integrated as pilot customers',
        ],
        validationCriteria: 'On-chain escrow settlement executed with sub-5s finality.',
      },
    ],
    publicGoodMetrics: {
      prsMerged: 77,
      reposMaintained: 12,
      testsPassing: 267,
      upstreamProjects: ['soroban-sdk', 'stellar-cli', 'soroban-token-contract', 'mercury-indexer'],
    },
  },
  {
    id: 'octant-atlas',
    name: 'Octant Atlas v2 Public Goods',
    program: 'Epoch Public Goods Funding Allocation',
    organization: 'Golem Foundation / Octant Community',
    award: 'Epoch Staking Allocation',
    requestedAmount: '$55,000 USD Equiv',
    ecosystem: 'Octant',
    status: 'Approved',
    badgeColor: 'cyber-badge-cyan',
    description: '168+ audited and cryptographically attributable open-source contributions indexed across major Web3 repositories.',
    payoutAddress: OFFICIAL_PAYOUT_ADDRESSES.evm,
    proofUrl: 'https://octant.app',
    summary: 'A cryptographically verified public goods contribution ledger for s6pa1rta3n-lab powering autonomous open-source maintenance.',
    tranches: [
      {
        number: 1,
        phase: 'Epoch 1: Contribution Ledger & SIWE Attestation',
        title: 'Contribution Ledger & SIWE Attestation',
        amount: '$25,000 USD Equiv',
        timeline: 'Epoch 5',
        status: 'completed',
        deliverables: [
          'SIWE EIP-4361 cryptographic identity verification manifest for s6pa1rta3n-lab',
          'Audited contribution ledger with commit hashes and upstream PR links',
          'Open-source dependency reach mapping across 20+ top Web3 repositories',
        ],
        validationCriteria: 'Verified GitHub commit graph with cryptographic signatures.',
      },
      {
        number: 2,
        phase: 'Epoch 2: Public Good Runner Subsidy',
        title: 'Public Good Runner Subsidy',
        amount: '$30,000 USD Equiv',
        timeline: 'Epoch 6',
        status: 'in-progress',
        deliverables: [
          '100% of Octant rewards routed to subsidizing cloud runner compute',
          'Automated bug triage and triage queue management for unpaid OSS repos',
          'Monthly public transparency reports with verifiable on-chain receipts',
        ],
        validationCriteria: 'Over 500 hours of sponsored cloud runner compute executed.',
      },
    ],
    publicGoodMetrics: {
      prsMerged: 168,
      reposMaintained: 20,
      testsPassing: 184,
      upstreamProjects: ['ethereum/solidity', 'openzeppelin-contracts', 'foundry-rs', 'viem'],
    },
  },
  {
    id: 'tea-protocol',
    name: 'TEA Protocol Proof of Contribution',
    program: 'Open-Source Package Staking & Yield',
    organization: 'TEA Protocol Foundation (Base L2)',
    award: 'Base L2 Staking Rewards',
    requestedAmount: 'Dynamic Epoch Yield',
    ecosystem: 'Base',
    status: 'Active',
    badgeColor: 'cyber-badge-volt',
    description: 'TEA governance constitutions (tea.yaml) generated for all maintained packages and SDKs with automated maintainer quorum.',
    payoutAddress: OFFICIAL_PAYOUT_ADDRESSES.evm,
    proofUrl: 'https://tea.xyz',
    summary: 'Valid TEA constitutions across npm, cargo, and PyPI packages ensuring maintainers earn staking yield for core dependency maintenance.',
    teaConstitutionYaml: sampleTeaConstitutionYaml,
    tranches: [
      {
        number: 1,
        phase: 'Phase 1: tea.yaml Manifest Registration',
        title: 'tea.yaml Manifest Registration',
        amount: '$10,000 Equiv',
        timeline: 'Month 1',
        status: 'completed',
        deliverables: [
          'Syntactically and semantically valid tea.yaml governance constitutions',
          'Automated schema validator ensuring compliant quorum and payout settings',
          'Base L2 reward routing directly to 0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89',
        ],
        validationCriteria: 'All 15 packages registered and active on the Base L2 tea registry.',
      },
      {
        number: 2,
        phase: 'Phase 2: Automated Staking Yield & Quorum Governance',
        title: 'Automated Staking Yield & Quorum Governance',
        amount: '$15,000 Equiv',
        timeline: 'Months 2–3',
        status: 'in-progress',
        deliverables: [
          'Automatic daily staking yield routed to verified project wallet',
          'Multi-maintainer quorum voting bot triggered by GitHub PR approvals',
          'Integration with TEA Protocol telemetry SDK',
        ],
        validationCriteria: 'Zero-downtime staking rewards receipt and verified on-chain quorum.',
      },
    ],
    publicGoodMetrics: {
      prsMerged: 92,
      reposMaintained: 15,
      testsPassing: 120,
      upstreamProjects: ['tea-cli', 'tea-base-rewards', 'npm-pack-indexer', 'cargo-tea-signer'],
    },
  },
  {
    id: 'gitcoin-grants',
    name: 'Gitcoin Grants OSS Round',
    program: 'Web3 Infrastructure & Developer Tooling Round',
    organization: 'Gitcoin DAO (Arbitrum / Optimism)',
    award: 'Quadratic Funding Pool',
    requestedAmount: '$35,000 Match + $50k Direct',
    ecosystem: 'Gitcoin',
    status: 'Active',
    badgeColor: 'cyber-badge-violet',
    description: 'StandardBounties and quadratic funding integration for continuous developer tool maintenance and security audits.',
    payoutAddress: OFFICIAL_PAYOUT_ADDRESSES.evm,
    proofUrl: 'https://grants.gitcoin.co',
    summary: 'Decentralized grant funding to sustain autonomous PR review and bug triage bots across open-source Web3 ecosystems.',
    tranches: [
      {
        number: 1,
        phase: 'Round 1: Open-Source Webhook Gateway',
        title: 'Open-Source Webhook Gateway',
        amount: '$15,000 QF Match',
        timeline: 'GG20',
        status: 'completed',
        deliverables: [
          'FastAPI Google Cloud Run gateway open-sourced with Apache-2.0 license',
          'StandardBounties smart contract event listener on Arbitrum and Base',
          'Sybil-resistant on-chain passport verification for bounty solvers',
        ],
        validationCriteria: 'Open-source repository public with 100% test coverage.',
      },
      {
        number: 2,
        phase: 'Round 2: Autonomous Maintainer Copilot',
        title: 'Autonomous Maintainer Copilot',
        amount: '$20,000 QF Match',
        timeline: 'GG21',
        status: 'in-progress',
        deliverables: [
          'Automated PR review and bug triage bots for open-source maintainers',
          'Real-time Discord and Telegram notification webhooks',
          'Automated reward distribution to verified contributor wallets',
        ],
        validationCriteria: 'Over 100 open-source repositories onboarded with 4.8/5 satisfaction.',
      },
    ],
    publicGoodMetrics: {
      prsMerged: 168,
      reposMaintained: 24,
      testsPassing: 159,
      upstreamProjects: ['gitcoin-passport', 'standard-bounties', 'allo-protocol', 'hypercerts'],
    },
  },
];
