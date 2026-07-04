import { Terminal } from "lucide-react";

export default function DeveloperExperienceSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              <Terminal className="h-4 w-4" /> Built for developers
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
              Integrates in minutes,<br/>not months.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Just change your API base URL. Aegis is fully compatible with OpenAI and Anthropic SDKs, meaning you don't need to rewrite your application code.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {['LangChain', 'LlamaIndex', 'OpenAI SDK', 'Vercel AI SDK'].map(fw => (
                 <div key={fw} className="p-3 rounded-lg border border-border/50 bg-muted/30 text-center text-sm font-medium">
                   {fw} Compatible
                 </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-2xl border border-border/50 bg-zinc-950 p-6 overflow-hidden shadow-xl">
             <div className="absolute top-0 right-0 left-0 h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-4">
               <span className="text-xs text-zinc-500 font-mono">app.ts</span>
             </div>
             <pre className="mt-8 text-sm font-mono text-zinc-300 overflow-x-auto">
{`import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // 1. Point to Aegis proxy
  baseURL: "https://aegis.your-domain.com/v1",
  defaultHeaders: {
    // 2. Pass your Aegis token
    "x-aegis-token": process.env.AEGIS_TOKEN
  }
});

// 3. That's it. All requests are now secured.
const response = await client.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "..." }]
});`}
             </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
