import { siteData } from './lib/siteData'

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
	return (
		<div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-glow backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.06]">
			<p className="text-sm uppercase tracking-[0.3em] text-slate-400">{label}</p>
			<div className="mt-3 text-3xl font-semibold text-white">{value}</div>
			<p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
		</div>
	)
}

function SectionHeading({ eyebrow, title, blurb }: { eyebrow: string; title: string; blurb: string }) {
	return (
		<div className="max-w-3xl">
			<p className="text-sm uppercase tracking-[0.4em] text-emerald-300/80">{eyebrow}</p>
			<h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
			<p className="mt-4 text-base leading-8 text-slate-300">{blurb}</p>
		</div>
	)
}

function App() {
	return (
		<main className="min-h-screen bg-radial-grid text-white">
			<div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-16 pt-6 lg:px-8">
				<header className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 shadow-glow backdrop-blur-xl">
					<div>
						<p className="text-xs uppercase tracking-[0.45em] text-emerald-300/70">GuardrailX</p>
						<p className="text-sm text-slate-300">Policy-driven AI governance runtime</p>
					</div>
					<a
						href={siteData.repositoryUrl}
						className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-400/20"
					>
						GitHub Repository
					</a>
				</header>

				<section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
					<div>
						<div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
							<span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
							OpenTelemetry • Prometheus • Grafana ready
						</div>
						<h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
							Secure every prompt, route every model, and keep every decision auditable.
						</h1>
						<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
							GuardrailX combines policy-as-code, risk scoring, content safety, PII redaction, and provider routing into a single enterprise-grade control plane for LLM workloads.
						</p>

						<div className="mt-8 flex flex-wrap gap-4">
							<a href="#capabilities" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]">
								Explore capabilities
							</a>
							<a href="#architecture" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
								Review architecture
							</a>
						</div>

						<div className="mt-12 grid gap-4 sm:grid-cols-3">
							{siteData.metrics.map((metric) => (
								<MetricCard key={metric.label} {...metric} />
							))}
						</div>
					</div>

					<div className="relative">
						<div className="absolute -inset-8 rounded-[2rem] bg-emerald-400/10 blur-3xl animate-pulseGlow" />
						<div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-glow backdrop-blur-xl">
							<svg viewBox="0 0 760 760" className="h-[34rem] w-full">
								<defs>
									<linearGradient id="gridGlow" x1="0%" x2="100%" y1="0%" y2="100%">
										<stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
										<stop offset="100%" stopColor="#60a5fa" stopOpacity="0.08" />
									</linearGradient>
									<radialGradient id="coreGlow">
										<stop offset="0%" stopColor="#a7f3d0" stopOpacity="1" />
										<stop offset="65%" stopColor="#34d399" stopOpacity="0.75" />
										<stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
									</radialGradient>
								</defs>
								<rect x="0" y="0" width="760" height="760" rx="32" fill="#07111f" />
								<g opacity="0.22">
									{Array.from({ length: 11 }).map((_, index) => (
										<line key={`h-${index}`} x1="40" y1={90 + index * 56} x2="720" y2={90 + index * 56} stroke="#ffffff" strokeOpacity="0.18" />
									))}
									{Array.from({ length: 11 }).map((_, index) => (
										<line key={`v-${index}`} x1={40 + index * 64} y1="60" x2={40 + index * 64} y2="700" stroke="#ffffff" strokeOpacity="0.1" />
									))}
								</g>
								<circle cx="380" cy="372" r="135" fill="url(#coreGlow)">
									<animate attributeName="r" values="124;142;124" dur="7s" repeatCount="indefinite" />
								</circle>
								<g>
									{siteData.orbits.map((orbit) => (
										<g key={orbit.label}>
											<circle cx={orbit.cx} cy={orbit.cy} r={orbit.radius} fill="none" stroke="url(#gridGlow)" strokeWidth="2" strokeDasharray="6 12" opacity="0.75">
												<animateTransform attributeName="transform" type="rotate" values="0 380 372;360 380 372" dur={orbit.duration} repeatCount="indefinite" />
											</circle>
											<circle cx={orbit.dotX} cy={orbit.dotY} r="18" fill={orbit.color} opacity="0.95">
												<animateTransform attributeName="transform" type="rotate" values="0 380 372;360 380 372" dur={orbit.duration} repeatCount="indefinite" />
											</circle>
										</g>
									))}
								</g>
								<text x="380" y="365" fill="#e2e8f0" fontSize="30" fontWeight="700" textAnchor="middle">GuardrailX</text>
								<text x="380" y="400" fill="#94a3b8" fontSize="15" textAnchor="middle">Governance runtime • risk scoring • provider routing</text>
							</svg>
						</div>
					</div>
				</section>

				<section id="capabilities" className="space-y-6 py-10">
					<SectionHeading
						eyebrow="Capabilities"
						title="A control plane built for enterprise LLM operations"
						blurb="Every request can be inspected, redacted, routed, evaluated, and logged. The product structure is intentionally modular so the backend, frontend, and policy system can evolve independently without losing auditability."
					/>
					<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
						{siteData.capabilities.map((item) => (
							<article
								key={item.title}
								className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-glow transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.06]"
							>
								<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-200 ring-1 ring-inset ring-emerald-400/20">
									{item.icon}
								</div>
								<h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
								<p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
							</article>
						))}
					</div>
				</section>

				<section id="architecture" className="grid gap-6 py-10 lg:grid-cols-[1fr_0.9fr]">
					<div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-glow">
						<SectionHeading
							eyebrow="Architecture"
							title="Opinionated boundaries, clean dependencies"
							blurb="The codebase is organized to keep policy logic, routing, service orchestration, observability, and presentation concerns separated. That keeps the system testable and makes future hardening straightforward."
						/>
						<div className="mt-8 grid gap-4 sm:grid-cols-2">
							{siteData.layers.map((layer) => (
								<div key={layer.name} className="rounded-2xl border border-white/8 bg-slate-950/50 p-4">
									<p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">{layer.name}</p>
									<p className="mt-3 text-sm leading-7 text-slate-300">{layer.description}</p>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-8 shadow-glow">
						<SectionHeading
							eyebrow="Delivery"
							title="Built to deploy on GitHub Pages"
							blurb="The frontend is configured as a static Vite app with relative asset paths, so it can be built and published directly from GitHub Actions."
						/>
						<ol className="mt-8 space-y-4">
							{siteData.delivery.map((step, index) => (
								<li key={step} className="flex gap-4 rounded-2xl border border-white/8 bg-slate-950/40 p-4">
									<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-sm font-semibold text-emerald-100">
										{index + 1}
									</div>
									<p className="text-sm leading-7 text-slate-300">{step}</p>
								</li>
							))}
						</ol>
					</div>
				</section>
			</div>
		</main>
	)
}

export default App

