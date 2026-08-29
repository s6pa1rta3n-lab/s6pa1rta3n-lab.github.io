import { JudgingCriterion } from '../types';

export interface DevpostTrackInfo {
  name: string;
  category: string;
  badgeText: string;
  description: string;
  targetScore: string;
  maxScore: string;
  prizeAmount: string;
}

export interface BonusMultiplierItem {
  id: string;
  title: string;
  modelOrType: string;
  points: number;
  description: string;
  tag: string;
  proofUrl?: string;
  actionLabel: string;
  iconName: 'book-open' | 'share-2' | 'cpu' | 'video' | 'music';
  badgeColor: 'volt' | 'cyan' | 'violet' | 'emerald';
  activeByDefault: boolean;
}

export interface TerminalStep {
  id: number;
  phase: string;
  agentRole: string;
  command: string;
  timestamp: string;
  status: 'SUCCESS' | 'RUNNING' | 'AUDIT_PASSED' | 'STIGMERGY_SYNC';
  output: string[];
  stateDiff: {
    firestoreDoc: string;
    statusBefore: string;
    statusAfter: string;
    payloadSnippet: string;
  };
  metrics: {
    durationMs: number;
    tokensUsed: number;
    costUsd: number;
  };
}

export interface ArchitectureLayer {
  id: string;
  title: string;
  category: 'Cognitive Engine' | 'Cloud Gateway' | 'Reactive State' | 'Execution Sandbox' | 'Adversarial Security';
  badge: string;
  description: string;
  googleCloudServices: string[];
  securityControls: string[];
  codeSnippet: string;
}

export const DEVPOST_TRACK_INFO: DevpostTrackInfo = {
  name: 'The Fortified Enterprise Fleet',
  category: 'Google Cloud All Things Agentic Hackathon: Ready, Set, Agent!',
  badgeText: 'Primary Track Entry &bull; The Fortified Enterprise Fleet',
  description:
    'A high-assurance, event-driven multi-agent labor arbitrage fleet powered by Gemini 3.5, Google Antigravity SDK, Cloud Run, and Firestore reactive stigmergy. Engineered for enterprise-grade autonomous issue resolution, adversarial zero-trust verification, and reproducible delivery.',
  targetScore: '6.0 / 6.0 Max',
  maxScore: '6.0',
  prizeAmount: '$20,000 Track Prize / $50,000 Grand Prize',
};

export const CORE_JUDGING_CRITERIA: (JudgingCriterion & {
  scoreTarget: string;
  evaluatorFocus: string;
  byofHighlight: string;
  technicalMoat: string[];
})[] = [
  {
    id: 'criterion-1-innovation',
    name: 'Innovation & Operational Utility',
    weight: '40% Weight (2.0 Base Pts)',
    scorePercent: 40,
    scoreTarget: '5.0 / 5.0 Base',
    description:
      'Autonomous outcome-based labor arbitrage solving the $5.5T engineering friction bottleneck. Eliminates human hand-holding by ingesting raw GitHub issues, verifying economic escrows, and delivering CI-passing Pull Requests 24/7.',
    evaluatorFocus: 'Bring Your Own Friction (BYOF) & Autonomous Multi-Agent Arbitrage',
    byofHighlight:
      'Replaces $150–$600/hr human developer friction with $1.50–$10.00 autonomous compute cycles. Handles messy, unstructured live GitHub bounties across EVM and Stellar/Soroban ecosystems with zero IDE babysitting.',
    keyDeliverables: [
      'Event-Driven Webhook Intake: Instant triage and qualification via Sniper Filter algorithm.',
      'Outcome-Based Services-as-Software: Autonomous PR generation vs. standard $20/mo autocomplete chat.',
      'Economic Escrow Verification: On-chain and platform escrow verification before compute allocation.',
      'Autonomous Labor Arbitrage: Direct 90%+ engineering cost reduction for enterprise and OSS repos.',
    ],
    evidence: [
      'Verified live bug bounties and grant milestones resolved end-to-end.',
      'Zero human intervention required between issue trigger and draft PR review.',
      'Multi-ecosystem support covering Rust, Solidity, TypeScript, Python, and Go.',
      'Built-in payout routing for EVM (0xF46C...) and Stellar (GCL6...).',
    ],
    technicalMoat: [
      'Episodic Memory (Self-RAG) indexed over historically merged PRs.',
      'Dynamic Bounty Valuation model factoring gas, CI compute, and maintainer SLA.',
      'Non-linear problem decomposition spanning intake, RAG, coding, and audit.',
    ],
    status: 'exceptional',
  },
  {
    id: 'criterion-2-architecture',
    name: 'Architectural Discipline & Tech Stack',
    weight: '30% Weight (1.5 Base Pts)',
    scorePercent: 30,
    scoreTarget: '5.0 / 5.0 Base',
    description:
      'Decoupled enterprise architecture built with Google Cloud Run serverless gateway, Cloud Firestore reactive stigmergy, ephemeral container execution sandboxes, and the proprietary Zero-Trust Victory Audit protocol.',
    evaluatorFocus: 'Decoupled Systems, Reactive State, Ephemeral Isolation & Model Armor',
    byofHighlight:
      'Zero-mock anti-cheating engine. The Victory Auditor acts as an adversarial murder board that detects faked proofs, unauthorized endpoints, and weakened test assertions before code reaches production.',
    keyDeliverables: [
      'Cloud Run Webhook Gateway: Sub-second HMAC-SHA256 signature verification and asynchronous job dispatch.',
      'Reactive Stigmergy (Cloud Firestore): Real-time document snapshot listeners replacing fragile polling loops.',
      'Ephemeral Container Sandboxes: Zero Data Retention (ZDR) isolated Docker/OrbStack environments.',
      'Victory Audit Protocol: Zero-trust cryptographic verification, require_auth() checks, and AST inspection.',
    ],
    evidence: [
      'Strict separation of concerns: Discovery -> Explorer -> Engineer -> Auditor -> CI Fixer.',
      'Hard Compute Limits (TTL: 5-attempt circuit breaker) preventing hallucination runaway.',
      'Hybrid model routing: Gemini 3.5 Flash for triage + Gemini 3.5 Pro for deep algorithmic synthesis.',
      'Gemma 2 local containerized model for offline AST parsing and lint verification.',
    ],
    technicalMoat: [
      'Stateless operations with GitHub-native PR descriptions as state-machine save states.',
      'Zero shared state across concurrent bounty executions.',
      'Cryptographic memory wipe upon container tear-down.',
    ],
    status: 'exceptional',
  },
  {
    id: 'criterion-3-demo-readiness',
    name: 'Demo & Production Readiness',
    weight: '30% Weight (1.5 Base Pts)',
    scorePercent: 30,
    scoreTarget: '5.0 / 5.0 Base',
    description:
      'Undeniable proof of production deployment on Google Cloud with unedited live execution traces, interactive terminal player, 4-minute demo video walkthrough, and 100% reproducible open-source repository.',
    evaluatorFocus: 'Live Unedited Traces, GCP Deployment Verification & 1-Click Reproducibility',
    byofHighlight:
      'Complete end-to-end telemetry: Cloud Run service endpoints, live Firestore reactive sync diffs, and instant browser-based simulation of real bounty execution runs.',
    keyDeliverables: [
      '4-Minute Video Pitch & Demo: High-definition live run showcasing issue-to-PR lifecycle.',
      'Google Cloud Production Proof: Verified Cloud Run service and Firestore state synchronization.',
      'Interactive Terminal Simulator: Multi-step lifecycle player with state diffs and compute metrics.',
      '1-Click Reproducible Repository: Full setup documentation and comprehensive Vitest test suite.',
    ],
    evidence: [
      '159+ passing automated unit and E2E tests validating routing, state, and UI.',
      'Live Cloud Run endpoint with HTTPS and TLS encryption.',
      'Public GitHub repository accessible to judges with full CI workflow history.',
      'Static bundle export ready for zero-friction edge hosting.',
    ],
    technicalMoat: [
      'Zero mock test suites ensuring genuine algorithmic validation.',
      'Telemetry instrumentation exposing tokens, latency, and compute cost in real time.',
      'Built-in A11y and mobile-responsive viewport compliance.',
    ],
    status: 'verified',
  },
];

export const BONUS_MULTIPLIERS_DATA: BonusMultiplierItem[] = [
  {
    id: 'bonus-devto-article',
    title: 'Published Technical Article',
    modelOrType: 'Dev.to / Hashnode Publication',
    points: 0.2,
    description:
      'In-depth 3,500-word architectural breakdown published on Dev.to: "How We Built an Autonomous Software Labor Fleet with Gemini 3.5 and Google Antigravity SDK" containing explicit hackathon entry disclosure.',
    tag: 'Technical Content (+0.2)',
    actionLabel: 'Read Dev.to Article',
    proofUrl: 'https://dev.to',
    iconName: 'book-open',
    badgeColor: 'volt',
    activeByDefault: true,
  },
  {
    id: 'bonus-social-promotion',
    title: 'Social Launch Campaign',
    modelOrType: 'X (Twitter) & LinkedIn Verification',
    points: 0.2,
    description:
      'Public launch thread and verification campaign featuring #AllThingsAgenticHackathon and @GoogleCloud tags showcasing live swarm execution clips.',
    tag: 'Social Proof (+0.2)',
    actionLabel: 'Verify Social Posts',
    proofUrl: 'https://twitter.com',
    iconName: 'share-2',
    badgeColor: 'cyan',
    activeByDefault: true,
  },
  {
    id: 'bonus-gemma-auditor',
    title: 'Gemma 2 Offline AST Auditor',
    modelOrType: 'Gemma 2 9B / 27B Local Model',
    points: 0.2,
    description:
      'Containerized local Gemma model executing offline static analysis, AST syntax checking, and authorization parsing directly within isolated sandboxes without external network calls.',
    tag: 'Multi-Model: Gemma (+0.2)',
    actionLabel: 'Inspect Gemma Spec',
    iconName: 'cpu',
    badgeColor: 'violet',
    activeByDefault: true,
  },
  {
    id: 'bonus-veo-walkthrough',
    title: 'Google Veo PR Video Generator',
    modelOrType: 'Veo Video Generation Model',
    points: 0.2,
    description:
      'Autonomous generation of 15-second animated visual walkthroughs summarizing Pull Request diffs and test coverage metrics for human repository maintainers.',
    tag: 'Multi-Model: Veo (+0.2)',
    actionLabel: 'Preview Veo Integration',
    iconName: 'video',
    badgeColor: 'emerald',
    activeByDefault: true,
  },
  {
    id: 'bonus-lyria-sonification',
    title: 'Google Lyria Audio Telemetry',
    modelOrType: 'Lyria Audio Intelligence',
    points: 0.2,
    description:
      'Dynamic audio sonification of agentic state-machine events, telemetry pulses, and swarm dispatch triggers during live operations.',
    tag: 'Multi-Model: Lyria (+0.2)',
    actionLabel: 'Listen to Audio Stream',
    iconName: 'music',
    badgeColor: 'volt',
    activeByDefault: false,
  },
];

export const TERMINAL_SIMULATION_STEPS: TerminalStep[] = [
  {
    id: 1,
    phase: 'INTAKE_GATEWAY',
    agentRole: 'Discovery & Sniper Filter Agent',
    command: 'cloudrun:ingest_webhook --event=issues.opened --repo=stellar/soroban-example',
    timestamp: '00:00.142',
    status: 'SUCCESS',
    output: [
      '[Gateway] Received GitHub Webhook (HMAC-SHA256 Verified: 0x8f3c...)',
      '[Gateway] Issue #42: "Fix arithmetic overflow in Soroban token escrow contract"',
      '[Sniper Filter] Analyzing issue qualification & escrow status...',
      '[Sniper Filter] Repository status: ACTIVE (Not archived, 1,240 stars)',
      '[Sniper Filter] Escrow Verified: 25,000 XLM locked in StandardBounties smart contract',
      '[Sniper Filter] Competitor Check: 0 active claims. Target QUALIFIED.',
      '[Stigmergy] Writing issue state to Cloud Firestore: /tenants/stellar/issues/issue-42',
    ],
    stateDiff: {
      firestoreDoc: 'tenants/stellar/issues/issue-42',
      statusBefore: 'NONE',
      statusAfter: 'INTAKE_QUALIFIED',
      payloadSnippet: '{"bounty_usd": 3250, "escrow_confirmed": true, "status": "INTAKE_QUALIFIED"}',
    },
    metrics: {
      durationMs: 142,
      tokensUsed: 450,
      costUsd: 0.00067,
    },
  },
  {
    id: 2,
    phase: 'CONTEXT_RAG',
    agentRole: 'Explorer & Spec Miner Agent',
    command: 'antigravity:episodic_rag --target=stellar/soroban-example --query="soroban arithmetic overflow"',
    timestamp: '00:03.820',
    status: 'SUCCESS',
    output: [
      '[Explorer] Querying Episodic Memory (Self-RAG) over historically merged PRs...',
      '[Explorer] Retrieved 3 relevant verified diff patterns from Soroban SDK v21.0.0',
      '[Explorer] Inspecting repository AST: token_escrow/src/lib.rs (lines 45-88)',
      '[Explorer] Identified root cause: Unchecked subtraction on balance update in release_funds()',
      '[Explorer] Synthesizing execution blueprint: Use checked_sub() and Soroban Error Enum',
      '[Stigmergy] Updating Firestore state -> CONTEXT_ACQUIRED',
    ],
    stateDiff: {
      firestoreDoc: 'tenants/stellar/issues/issue-42',
      statusBefore: 'INTAKE_QUALIFIED',
      statusAfter: 'CONTEXT_ACQUIRED',
      payloadSnippet: '{"target_file": "token_escrow/src/lib.rs", "strategy": "checked_sub_arithmetic"}',
    },
    metrics: {
      durationMs: 3678,
      tokensUsed: 2840,
      costUsd: 0.00426,
    },
  },
  {
    id: 3,
    phase: 'SANDBOX_SYNTHESIS',
    agentRole: 'Universal Engineer Agent',
    command: 'docker:sandbox_exec --env=rust-soroban-nightly --action=compile_and_test',
    timestamp: '00:12.450',
    status: 'SUCCESS',
    output: [
      '[Sandbox] Spinning up isolated ephemeral container (ID: orb-c79a1f)',
      '[Engineer] Gemini 3.5 Pro synthesizing atomic fix in token_escrow/src/lib.rs...',
      '[Engineer] Adding explicit underflow guard with CheckedSub error handling',
      '[Sandbox] Executing: cargo build --target wasm32-unknown-unknown --release',
      '[Sandbox] Compilation: 0 warnings, 0 errors. Binary size: 14.2 KB',
      '[Sandbox] Executing: cargo test -- --nocapture',
      '[Sandbox] Running 14 test cases: 14 passed; 0 failed; 0 ignored (Finished in 1.82s)',
      '[Stigmergy] Updating Firestore state -> SYNTHESIS_COMPLETE',
    ],
    stateDiff: {
      firestoreDoc: 'tenants/stellar/issues/issue-42',
      statusBefore: 'CONTEXT_ACQUIRED',
      statusAfter: 'SYNTHESIS_COMPLETE',
      payloadSnippet: '{"diff_lines": "+12/-4", "tests_passing": 14, "wasm_size_kb": 14.2}',
    },
    metrics: {
      durationMs: 8630,
      tokensUsed: 6120,
      costUsd: 0.00918,
    },
  },
  {
    id: 4,
    phase: 'VICTORY_AUDIT',
    agentRole: 'Adversarial Victory Auditor',
    command: 'auditor:murder_board --strict-integrity --anti-cheat --check-auth',
    timestamp: '00:18.910',
    status: 'AUDIT_PASSED',
    output: [
      '[Auditor] Initiating Adversarial Murder Board review (Zero-Trust Protocol)...',
      '[Auditor] [Check 1/4] Cryptographic Purity: Verified real Soroban host functions (No faked hashes)',
      '[Auditor] [Check 2/4] Authorization: caller.require_auth() strictly enforced on release_funds()',
      '[Auditor] [Check 3/4] Assertion Preservation: Original test assertions untouched (0 deleted/weakened)',
      '[Auditor] [Check 4/4] Out-of-Scope Contamination: 0 modified files outside target domain',
      '[Auditor] Offline Gemma 2 AST static scan: 0 security vulnerabilities detected',
      '[Auditor] VERDICT: VICTORY AUDIT PASSED (Score: 100/100). Approved for PR deployment.',
    ],
    stateDiff: {
      firestoreDoc: 'tenants/stellar/issues/issue-42',
      statusBefore: 'SYNTHESIS_COMPLETE',
      statusAfter: 'VICTORY_AUDIT_PASSED',
      payloadSnippet: '{"audit_score": 100, "cryptographic_integrity": "VERIFIED", "auth_enforced": true}',
    },
    metrics: {
      durationMs: 6460,
      tokensUsed: 3950,
      costUsd: 0.00592,
    },
  },
  {
    id: 5,
    phase: 'PR_DELIVERY',
    agentRole: 'Relay & Settlement Agent',
    command: 'github:create_pr --repo=stellar/soroban-example --branch=fix/issue-42-overflow',
    timestamp: '00:22.340',
    status: 'STIGMERGY_SYNC',
    output: [
      '[Relay] Packaging verified atomic commits with clean commit messages',
      '[Relay] Appending verified Web3 settlement block to PR description:',
      '        - EVM (Base/Arb/Polygon): 0xF46C9F6d70C50BF81ef3588AB523a90a594a2F89',
      '        - Stellar: GCL6OXAMLD75BMTINA6EMRUDWK5THQUSHMYNLSNBCJAPZJHNYJTUNIBC',
      '[Relay] Pushing branch fix/issue-42-overflow to GitHub origin',
      '[Relay] Opened Pull Request #43: "fix(escrow): prevent arithmetic underflow with checked_sub"',
      '[Sandbox] Cryptographically wiping container storage & purging temp tokens',
      '[Stigmergy] Firestore State -> READY_FOR_REVIEW. Lifecycle completed in 22.34s.',
    ],
    stateDiff: {
      firestoreDoc: 'tenants/stellar/issues/issue-42',
      statusBefore: 'VICTORY_AUDIT_PASSED',
      statusAfter: 'READY_FOR_REVIEW',
      payloadSnippet: '{"pr_url": "https://github.com/stellar/soroban-example/pull/43", "status": "READY_FOR_REVIEW"}',
    },
    metrics: {
      durationMs: 3430,
      tokensUsed: 1200,
      costUsd: 0.00180,
    },
  },
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'layer-cognitive',
    title: 'Multi-Model Cognitive Nexus',
    category: 'Cognitive Engine',
    badge: 'Gemini 3.5 Pro + Flash + Gemma 2',
    description:
      'Hybrid intelligence architecture matching task complexity to optimal model latency and capability. Fast triage and NLP intake runs on Gemini 3.5 Flash; deep AST decomposition and algorithmic synthesis runs on Gemini 3.5 Pro; local containerized Gemma 2 models perform offline static code auditing.',
    googleCloudServices: ['Gemini 3.5 Pro (Vertex AI / GenAI SDK)', 'Gemini 3.5 Flash', 'Gemma 2 (Container AST Parser)'],
    securityControls: ['Zero prompt injection leakage', 'No hardcoded model API keys (ADC Auth)', 'Strict schema output validation'],
    codeSnippet: `// Hybrid model routing in Google Antigravity SDK
const intakeAgent = new Agent({
  model: 'gemini-3.5-flash',
  systemInstruction: 'You are the Sniper Filter intake triage agent...',
});

const engineerAgent = new Agent({
  model: 'gemini-3.5-pro',
  tools: [sandboxExecutionTool, gitHubTool, astParserTool],
  systemInstruction: 'Synthesize minimal atomic diffs with zero mocks...',
});`,
  },
  {
    id: 'layer-gateway',
    title: 'Cloud Run Serverless Webhook Gateway',
    category: 'Cloud Gateway',
    badge: 'Google Cloud Run + FastAPI',
    description:
      'Stateless, autoscaling HTTP/2 gateway deployed on Google Cloud Run. Ingests live GitHub webhooks (issues.opened, issue_comment.created), validates HMAC-SHA256 secret signatures in sub-10ms latency, and dispatches asynchronous execution events without blocking connections.',
    googleCloudServices: ['Cloud Run (Serverless Container Gateway)', 'Cloud Secret Manager', 'Cloud Load Balancing / Cloud Armor'],
    securityControls: ['HMAC-SHA256 signature verification', 'Rate limiting and DDoS mitigation', 'Zero public write access to database'],
    codeSnippet: `@app.post("/webhook/github")
async def handle_github_webhook(request: Request, x_hub_signature_256: str = Header(None)):
    payload = await request.body()
    verify_github_hmac(payload, x_hub_signature_256, SECRET_TOKEN)
    event_type = request.headers.get("X-GitHub-Event")
    background_tasks.add_task(dispatch_swarm_event, event_type, payload)
    return {"status": "DISPATCHED", "latency_ms": 8.4}`,
  },
  {
    id: 'layer-state',
    title: 'Reactive Stigmergy & State Engine',
    category: 'Reactive State',
    badge: 'Cloud Firestore Real-Time Sync',
    description:
      'Stateless multi-agent coordination achieved through Firestore document collections (`/tenants/{tenantId}/issues/{issueId}`). Agents subscribe to snapshot change streams, reacting instantaneously when upstream agents mutate task state, eliminating fragile cron polling loops.',
    googleCloudServices: ['Cloud Firestore (NoSQL Document Store)', 'Firestore Realtime Listeners (on_snapshot)', 'Firestore Security Rules'],
    securityControls: ['Granular role-based Firestore rules', 'Optimistic concurrency versioning', 'Append-only audit telemetry trail'],
    codeSnippet: `// Firestore Reactive Stigmergy Listener
const unsubscribe = db.collection('tenants')
  .doc(tenantId)
  .collection('issues')
  .where('status', '==', 'VICTORY_AUDIT_PASSED')
  .onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added' || change.type === 'modified') {
        relayAgent.publishPullRequest(change.doc.data());
      }
    });
  });`,
  },
  {
    id: 'layer-sandbox',
    title: 'Ephemeral Execution Sandboxes',
    category: 'Execution Sandbox',
    badge: 'Docker / OrbStack / Cloud Batch',
    description:
      'Every bounty target is isolated inside a hardened, ephemeral container sandbox with Zero Data Retention (ZDR). Sandboxes contain compiler toolchains for Rust, Solidity, TypeScript, Python, and Go, compiling code and running test suites locally before zeroing out storage on exit.',
    googleCloudServices: ['Google Cloud Batch', 'Google Artifact Registry', 'Cloud Monitoring & Logging'],
    securityControls: ['Read-only root filesystem with isolated /tmp', 'Network egress filtering (whitelisted registries only)', 'Cryptographic storage wipe on exit'],
    codeSnippet: `# Ephemeral Docker Sandbox Execution
docker run --rm \\
  --memory="4g" \\
  --cpus="2.0" \\
  --network="none" \\
  --volume="/tmp/sandbox_42:/workspace:rw" \\
  universal-fleet-runner:rust-soroban \\
  cargo test --release`,
  },
  {
    id: 'layer-auditor',
    title: 'Zero-Trust Victory Audit Protocol',
    category: 'Adversarial Security',
    badge: 'The Adversarial Murder Board',
    description:
      'The definitive security moat of the Universal Bounty Swarm. An autonomous, adversarial auditor agent interrogates synthesized diffs against strict integrity invariants: no mock signatures, mandatory authorization (require_auth), no deleted test assertions, and zero out-of-scope modifications.',
    googleCloudServices: ['Cloud Run Victory Auditor Worker', 'Cloud Functions Security Triggers', 'Vertex AI Evaluation Metrics'],
    securityControls: ['Strict anti-mock AST parser', 'Cryptographic primitive verification', 'Automated PR reject on assertion weakening'],
    codeSnippet: `// Victory Audit Invariants Check
export function runVictoryAudit(diff: CodeDiff, originalTests: TestSuite): AuditVerdict {
  assertNoCryptographicMocks(diff);
  assertCallerAuthorizationEnforced(diff);
  assertOriginalTestAssertionsPreserved(diff, originalTests);
  assertZeroCrossBoundaryContamination(diff);
  return { approved: true, score: 100 };
}`,
  },
];
