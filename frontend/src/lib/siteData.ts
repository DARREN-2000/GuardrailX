export const siteData = {
  repositoryUrl: 'https://github.com/DARREN-2000/GuardrailX',
  metrics: [
    {
      label: 'Policy Decisions',
      value: 'Audited',
      detail: 'Every route is designed to produce an explainable, inspectable outcome.',
    },
    {
      label: 'Provider Routing',
      value: 'Adaptive',
      detail: 'OpenAI, Ollama, and vLLM routing paths are modeled explicitly.',
    },
    {
      label: 'Observability',
      value: 'Full stack',
      detail: 'Tracing, metrics, and logs are part of the platform contract.',
    },
  ],
  capabilities: [
    {
      title: 'Prompt Injection Detection',
      description: 'Detect malicious or misleading prompt content before it reaches downstream model execution.',
      icon: 'PI',
    },
    {
      title: 'Jailbreak Detection',
      description: 'Identify attempts to bypass policy boundaries with adversarial instructions or coercive phrasing.',
      icon: 'JB',
    },
    {
      title: 'PII Redaction',
      description: 'Apply structured redaction and masking policies to protect sensitive data in transit and at rest.',
      icon: 'PR',
    },
    {
      title: 'Content Safety Filtering',
      description: 'Enforce content moderation and policy gates for harmful, disallowed, or risky generations.',
      icon: 'CS',
    },
    {
      title: 'Hallucination Risk Assessment',
      description: 'Score outputs and route uncertain requests into review or escalation paths automatically.',
      icon: 'HR',
    },
    {
      title: 'Compliance Reporting',
      description: 'Produce audit-ready evidence for governance, retention, and accountability requirements.',
      icon: 'CR',
    },
  ],
  layers: [
    {
      name: 'Backend',
      description: 'FastAPI, SQLAlchemy, and Alembic provide the policy runtime and data model.',
    },
    {
      name: 'Frontend',
      description: 'React, TypeScript, and Tailwind power the operational control surface.',
    },
    {
      name: 'Observability',
      description: 'OpenTelemetry and metrics integrations keep the system measurable.',
    },
    {
      name: 'Policies',
      description: 'Policy-as-code artifacts define governance behavior independently from code.',
    },
  ],
  delivery: [
    'Static asset paths are relative so GitHub Pages can serve the build without a custom server.',
    'A GitHub Actions workflow builds the frontend from the repository and publishes the dist output.',
    'The backend remains decoupled, so the UI can be hosted statically while APIs run elsewhere.',
  ],
  orbits: [
    { label: 'policy', cx: 380, cy: 372, radius: 184, dotX: 548, dotY: 372, duration: '20s', color: '#34d399' },
    { label: 'risk', cx: 380, cy: 372, radius: 242, dotX: 380, dotY: 130, duration: '24s', color: '#60a5fa' },
    { label: 'audit', cx: 380, cy: 372, radius: 302, dotX: 148, dotY: 372, duration: '30s', color: '#f59e0b' },
  ],
} as const
