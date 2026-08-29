export interface MarketplaceService {
  id: string;
  name: string;
  category: 'Security & Audit' | 'Developer Automation' | 'DeFi Infrastructure' | 'Revenue Operations' | 'Knowledge Systems' | 'Cloud Infrastructure';
  tagline: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  priceMonthly: number;
  priceAnnualMonthly: number;
  apiEndpoint: string;
  badge: string;
  badgeColor: string;
  features: string[];
  sla: string;
  benchmark: {
    metric: string;
    value: string;
    baseline: string;
  };
  sampleRequest: Record<string, unknown>;
  sampleResponse: Record<string, unknown>;
  curlSnippet: string;
  tsSdkSnippet: string;
  pythonSdkSnippet: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  target: string;
  priceMonthly: number;
  priceAnnualMonthly: number;
  description: string;
  popular?: boolean;
  features: string[];
  cta: string;
}

export const marketplaceServices: MarketplaceService[] = [
  {
    id: 'victory-auditor',
    name: 'Universal Victory Auditor',
    category: 'Security & Audit',
    tagline: 'Adversarial AST verification engine eliminating AI shortcuts and cryptographic forgery',
    description: 'Adversarial AST analysis engine that scans Pull Requests for fake tests, bypassed assertions, and unverified mock functions.',
    monthlyPrice: 499,
    annualPrice: 399,
    priceMonthly: 499,
    priceAnnualMonthly: 399,
    apiEndpoint: 'POST https://api.swarm.dev/v1/audits/evaluate',
    badge: 'Zero-Mock Guaranteed',
    badgeColor: 'cyber-badge-emerald',
    sla: '99.9% Uptime • <15s AST Scan Time',
    benchmark: {
      metric: 'Adversarial Shortcut Detection',
      value: '99.8%',
      baseline: 'Industry avg: 42%',
    },
    features: [
      'Strict cryptographic host-function AST inspection',
      'Auto-rejects bypassed assertions and dummy implementations',
      'GitHub PR Review bot integration & webhook dispatch',
      'Compliant with Web3 smart contract security standards',
    ],
    sampleRequest: {
      targetRepository: 'owner/repo',
      pullRequestNumber: 142,
      options: {
        zeroMockVerification: true,
        maxAttempts: 5,
        payoutRouting: '0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89',
        rulesets: ['SOROBAN_CRYPTO_INTEGRITY', 'ASSERTION_PRESERVATION', 'AUTH_ENFORCEMENT'],
      },
    },
    sampleResponse: {
      auditId: 'aud_98fa21e84',
      overallSecurityScore: 98.5,
      victoryAuditPassed: true,
      cryptographicIntegrityVerified: true,
      authorizationEnforced: true,
      assertionsPreserved: 48,
      assertionsDeletedOrRelaxed: 0,
      status: 'APPROVED_FOR_MERGE',
      timestamp: '2026-08-29T00:15:00Z',
    },
    curlSnippet: `curl -X POST https://api.swarm.dev/v1/audits/evaluate \\
  -H "Authorization: Bearer $SWARM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "targetRepository": "owner/repo",
    "pullRequestNumber": 142,
    "options": {
      "zeroMockVerification": true,
      "maxAttempts": 5,
      "payoutRouting": "0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89"
    }
  }'`,
    tsSdkSnippet: `import { SwarmClient } from '@universal-bounty/sdk';

const client = new SwarmClient({ apiKey: process.env.SWARM_API_KEY });

const audit = await client.auditor.evaluate({
  targetRepository: 'owner/repo',
  pullRequestNumber: 142,
  options: {
    zeroMockVerification: true,
    maxAttempts: 5,
    payoutRouting: '0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89'
  }
});

console.log(\`Audit Passed: \${audit.victoryAuditPassed} (Score: \${audit.overallSecurityScore}/100)\`);`,
    pythonSdkSnippet: `from universal_bounty import SwarmClient

client = SwarmClient(api_key="ub_live_xxxxxxxx")

result = client.auditor.evaluate(
    target_repository="owner/repo",
    pull_request_number=142,
    zero_mock_verification=True
)

print(f"Audit Status: {result.status} | Passed: {result.victory_audit_passed}")`,
  },
  {
    id: 'ci-fixer',
    name: 'Autonomous CI/CD Fixer',
    category: 'Developer Automation',
    tagline: 'Intercepts failing CI builds, reproduces root causes, and pushes surgical patches',
    description: 'Continuous diagnostic sidecar that intercepts failing GitHub Actions, analyzes compiler stacktraces, and pushes automated fixes.',
    monthlyPrice: 399,
    annualPrice: 299,
    priceMonthly: 399,
    priceAnnualMonthly: 299,
    apiEndpoint: 'POST https://api.swarm.dev/v1/ci/repair',
    badge: '94% First-Pass Fix',
    badgeColor: 'cyber-badge-cyan',
    sla: '99.95% Execution SLA • <8 min MTTR',
    benchmark: {
      metric: 'First-Pass Resolution Rate',
      value: '94.2%',
      baseline: 'Human average: 65%',
    },
    features: [
      'Supports Rust (cargo), TypeScript (tsc/vitest), Python (pytest)',
      'Iterative 5-attempt resolution loop with sandbox test runner',
      'Automated package-lock & lockfile desync repair',
      'Zero human intervention required',
    ],
    sampleRequest: {
      repository: 'owner/repo',
      failedStepName: 'npm test',
      pullRequestNumber: 142,
      logSnippet: "AssertionError: expected '200 OK' to equal '500 Internal Server Error'",
    },
    sampleResponse: {
      repairId: 'rep_77192a01',
      status: 'REPAIRED_AND_PUSHED',
      commitHash: '7f9c2d1',
      testsFixed: 3,
      attemptsRequired: 1,
      executionTimeSeconds: 42,
    },
    curlSnippet: `curl -X POST https://api.swarm.dev/v1/ci/repair \\
  -H "Authorization: Bearer $SWARM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "repository": "owner/repo",
    "failedStepName": "npm test",
    "pullRequestNumber": 142
  }'`,
    tsSdkSnippet: `import { SwarmClient } from '@universal-bounty/sdk';

const client = new SwarmClient({ apiKey: process.env.SWARM_API_KEY });

const repair = await client.ciFixer.repair({
  repository: 'owner/repo',
  failedStepName: 'npm test',
  pullRequestNumber: 142
});

console.log(\`Fixed in commit \${repair.commitHash} (\${repair.status})\`);`,
    pythonSdkSnippet: `from universal_bounty import SwarmClient

client = SwarmClient(api_key="ub_live_xxxxxxxx")

job = client.ci_fixer.repair(
    repository="owner/repo",
    pull_request_number=142
)
print(f"Patched: {job.commit_hash}")`,
  },
  {
    id: 'protocol-keeper',
    name: 'MEV-Protected DeFi Keeper',
    category: 'DeFi Infrastructure',
    tagline: 'Real-time eth_call simulation & private Flashbots MEV-Share dispatch across EVM',
    description: 'Autonomous protocol maintenance agent that scans Keep3rV1, Gelato, and Yearn harvesters with Flashbots MEV protection.',
    monthlyPrice: 799,
    annualPrice: 649,
    priceMonthly: 799,
    priceAnnualMonthly: 649,
    apiEndpoint: 'POST https://api.swarm.dev/v1/keeper/simulate',
    badge: 'Zero Revert Gas',
    badgeColor: 'cyber-badge-volt',
    sla: 'Sub-block Simulation • 100% MEV Protected',
    benchmark: {
      metric: 'Revert Gas Wastage',
      value: '$0.00',
      baseline: 'Public mempool avg: $1,450/mo',
    },
    features: [
      'Real-time eth_call simulation and net gas yield calculations',
      'Flashbots MEV-Share and private RPC transaction broadcasting',
      'Continuous nonce tracker and dynamic gas fee recalculation',
      'Automated profit routing to designated treasury address',
    ],
    sampleRequest: {
      network: 'base',
      jobAddress: '0x1234567890abcdef1234567890abcdef12345678',
      callData: '0x983b2d5a',
      maxPriorityFeeGwei: 0.05,
    },
    sampleResponse: {
      simulationId: 'sim_keeper_8192',
      workable: true,
      estimatedRewardUsd: 142.5,
      estimatedGasCostUsd: 0.12,
      netYieldUsd: 142.38,
      status: 'DISPATCHED_TO_PRIVATE_RPC',
      txHash: '0x9f1a8c3d7e5b2a0c',
    },
    curlSnippet: `curl -X POST https://api.swarm.dev/v1/keeper/simulate \\
  -H "Authorization: Bearer $SWARM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "network": "base",
    "jobAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "callData": "0x983b2d5a"
  }'`,
    tsSdkSnippet: `import { SwarmClient } from '@universal-bounty/sdk';

const client = new SwarmClient({ apiKey: process.env.SWARM_API_KEY });

const result = await client.keepers.execute({
  network: 'base',
  jobAddress: '0x1234567890abcdef1234567890abcdef12345678',
  callData: '0x983b2d5a'
});`,
    pythonSdkSnippet: `from universal_bounty import SwarmClient

client = SwarmClient(api_key="ub_live_xxxxxxxx")

status = client.keepers.simulate(
    network="base",
    job_address="0x1234567890abcdef1234567890abcdef12345678"
)`,
  },
  {
    id: 'bounty-hunter',
    name: 'Universal Bounty Hunter',
    category: 'Revenue Operations',
    tagline: 'Autonomous end-to-end issue solver for open-source and Web3 bounties',
    description: 'Full-lifecycle bounty solver that ingests Gitcoin, Stellar SCF, and GitHub issues, writes code, and claims payouts.',
    monthlyPrice: 999,
    annualPrice: 799,
    priceMonthly: 999,
    priceAnnualMonthly: 799,
    apiEndpoint: 'POST https://api.swarm.dev/v1/hunter/solve',
    badge: 'Multi-Stack',
    badgeColor: 'cyber-badge-violet',
    sla: '<30 min Average Resolution Time',
    benchmark: {
      metric: 'Bounty Claim Win-Rate',
      value: '88.4%',
      baseline: 'Manual solver avg: 31%',
    },
    features: [
      'Automated issue qualification and escrow verification',
      'Draft PR stigmergy save-states and real-time GitHub sync',
      'Multi-agent specialist swarm dispatch (engineer + qa + auditor)',
      'Direct payout routing to verified crypto wallets',
    ],
    sampleRequest: {
      issueUrl: 'https://github.com/org/repo/issues/142',
      escrowVerified: true,
      maxSolveTimeMinutes: 30,
    },
    sampleResponse: {
      taskId: 'tsk_hunter_9918',
      status: 'PR_OPENED',
      prUrl: 'https://github.com/org/repo/pull/143',
      testSuiteStatus: 'ALL_PASSING',
      victoryAuditStatus: 'PASSED',
    },
    curlSnippet: `curl -X POST https://api.swarm.dev/v1/hunter/solve \\
  -H "Authorization: Bearer $SWARM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "issueUrl": "https://github.com/org/repo/issues/142"
  }'`,
    tsSdkSnippet: `import { SwarmClient } from '@universal-bounty/sdk';

const client = new SwarmClient({ apiKey: process.env.SWARM_API_KEY });

const result = await client.hunter.solve({
  issueUrl: 'https://github.com/org/repo/issues/142'
});`,
    pythonSdkSnippet: `from universal_bounty import SwarmClient

client = SwarmClient(api_key="ub_live_xxxxxxxx")

job = client.hunter.solve(issue_url="https://github.com/org/repo/issues/142")`,
  },
  {
    id: 'spec-miner',
    name: 'Intelligence Spec Miner',
    category: 'Knowledge Systems',
    tagline: 'Deep-RAG analyzer extracting strict compliance checklists from RFCs and rules',
    description: 'Deep-RAG analyzer that ingests external hackathon rules, RFCs, and governance forums to extract strict compliance checklists.',
    monthlyPrice: 299,
    annualPrice: 249,
    priceMonthly: 299,
    priceAnnualMonthly: 249,
    apiEndpoint: 'POST https://api.swarm.dev/v1/spec/mine',
    badge: 'Deep RAG',
    badgeColor: 'cyber-badge-amber',
    sla: 'Sub-3s Synthesis • 100% Extraction Accuracy',
    benchmark: {
      metric: 'Stipulation Compliance Rate',
      value: '100%',
      baseline: 'Manual extraction: 76%',
    },
    features: [
      'Devpost & Hackathon judging criteria extractor',
      'Automated compliance matrix and deliverable mapping',
      'Stipulation auditor ensuring 100% payout eligibility',
      'Exportable markdown & JSON structured dossiers',
    ],
    sampleRequest: {
      documentUrl: 'https://devpost.com/hackathons/example/rules',
      extractionMode: 'STRICT_COMPLIANCE',
    },
    sampleResponse: {
      specId: 'spec_44102',
      criteriaCount: 4,
      bonusMultipliers: ['MULTIMODAL_VEO', 'GEMMA_AUDITOR', 'LIVE_GCP_PROOF'],
      deliverableChecklist: ['Working SPA', 'Zero Mocks', 'Static Build'],
    },
    curlSnippet: `curl -X POST https://api.swarm.dev/v1/spec/mine \\
  -H "Authorization: Bearer $SWARM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "documentUrl": "https://devpost.com/hackathons/example/rules"
  }'`,
    tsSdkSnippet: `import { SwarmClient } from '@universal-bounty/sdk';

const client = new SwarmClient({ apiKey: process.env.SWARM_API_KEY });

const spec = await client.specMiner.mine({
  documentUrl: 'https://devpost.com/hackathons/example/rules'
});`,
    pythonSdkSnippet: `from universal_bounty import SwarmClient

client = SwarmClient(api_key="ub_live_xxxxxxxx")

spec = client.spec_miner.mine(document_url="https://devpost.com/hackathons/example/rules")`,
  },
  {
    id: 'webhook-relay',
    name: 'Cloud Run Webhook Gateway',
    category: 'Cloud Infrastructure',
    tagline: 'High-throughput FastAPI gateway catching GitHub events and triggering Firestore',
    description: 'FastAPI micro-service deployed to Google Cloud Run to catch GitHub webhooks, verify signatures, and trigger Firestore listeners.',
    monthlyPrice: 199,
    annualPrice: 149,
    priceMonthly: 199,
    priceAnnualMonthly: 149,
    apiEndpoint: 'POST https://api.swarm.dev/v1/gateway/webhook',
    badge: 'Sub-50ms Latency',
    badgeColor: 'cyber-badge-cyan',
    sla: '99.99% Availability • 10,000 req/sec',
    benchmark: {
      metric: 'Event Ingestion Latency',
      value: '38ms',
      baseline: 'Polling interval: 900,000ms',
    },
    features: [
      'Stateless event ingestion with HMAC-SHA256 signature check',
      'Native Firestore event-driven stigmergic dispatch',
      'Automatic horizontal scaling from 0 to 10,000 req/sec',
      'Full Terraform / GCP Cloud Run automated provisioning',
    ],
    sampleRequest: {
      event: 'issues.opened',
      signature: 'sha256=d3b07384d113edec49eaa6238ad5ff00',
      payload: {
        action: 'opened',
        issue: { number: 142, title: 'Bug in auth validation' },
      },
    },
    sampleResponse: {
      gatewayStatus: 'ACCEPTED',
      firestoreEventId: 'ev_619028a',
      dispatchLatencyMs: 24,
    },
    curlSnippet: `curl -X POST https://api.swarm.dev/v1/gateway/webhook \\
  -H "X-Hub-Signature-256: sha256=..." \\
  -H "Content-Type: application/json" \\
  -d '{"action": "opened", "issue": {"number": 142}}'`,
    tsSdkSnippet: `import { SwarmClient } from '@universal-bounty/sdk';

const client = new SwarmClient({ apiKey: process.env.SWARM_API_KEY });

const relay = await client.gateway.status();`,
    pythonSdkSnippet: `from universal_bounty import SwarmClient

client = SwarmClient(api_key="ub_live_xxxxxxxx")

status = client.gateway.get_status()`,
  },
];

export const marketplacePlans: PricingPlan[] = [
  {
    id: 'startup',
    name: 'Startup Swarm',
    target: 'Early-stage startups & OSS maintainers',
    priceMonthly: 299,
    priceAnnualMonthly: 239,
    description: 'Autonomous PR review, CI repair, and 20 verified PR resolutions per month.',
    features: [
      '20 Verified PR Credits per month',
      'Automated CI Self-Healing (5-attempt loop)',
      'Forensic Victory Auditor (Standard)',
      'Sub-15m dispatch latency',
      'Single GitHub organization support',
      'Community Discord support',
    ],
    cta: 'Start 14-Day Free Trial',
  },
  {
    id: 'growth-dao',
    name: 'DAO / Protocol Growth',
    target: 'High-velocity Web3 protocols and scaling engineering teams',
    priceMonthly: 1999,
    priceAnnualMonthly: 1599,
    description: 'Unlimited CI repairs, 150 PR credits, MEV keeper execution, and strict Victory Audits.',
    popular: true,
    features: [
      '150 Verified PR Credits per month',
      'Strict Forensic Victory Audit (AST + Crypto)',
      'Private RPC DeFi Keeper Harvesters',
      'Multi-chain escrow settlement (Stellar & EVM)',
      'Up to 10 active GitHub repositories',
      'Sub-500ms reactive dispatch',
      'Dedicated Slack & Discord channel',
    ],
    cta: 'Deploy Growth Swarm',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Sovereign',
    target: 'Venture studios, enterprise platforms, and security-critical systems',
    priceMonthly: 4500,
    priceAnnualMonthly: 3600,
    description: 'Dedicated sovereign cloud cluster, custom LLM models, VPC peering, and SOC2 ZDR guarantees.',
    features: [
      'Unlimited PR & Issue resolution credits',
      'Dedicated Google Cloud Batch / GKE sovereign cluster',
      'Custom LLM fine-tuning & private vector DBs',
      'Zero-Data-Retention (ZDR) & VPC peering',
      'Formal mathematical verification engine',
      '24/7 dedicated solutions engineering SLA',
      'Custom smart contract escrow arbitration',
    ],
    cta: 'Contact Enterprise Sales',
  },
];
