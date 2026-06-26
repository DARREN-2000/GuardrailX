export default function RoadmapSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-12 text-center">
          What's next
        </h2>
        <div className="space-y-8">
          {[
            { q: "Q3 2024", title: "Semantic Caching", desc: "Native vector database integration to serve similar queries instantly without hitting the LLM." },
            { q: "Q4 2024", title: "Advanced Evaluation", desc: "Automated regression testing for prompts to ensure output quality before merging changes." },
            { q: "Q1 2025", title: "Fine-tuning Data Export", desc: "One-click export of high-quality, redacted interaction logs formatted for model fine-tuning." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-6 rounded-2xl bg-background border border-border/50">
              <div className="w-24 shrink-0 font-mono text-sm text-primary font-semibold py-1">
                {item.q}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
