import { staysphere as p } from "../data/projects";
import { CardGrid, CaseHeader, CaseNav, CaseSection, NextProject, useTitle } from "../components/Case";
import { Figure } from "../components/Figure";
import { ButtonLink, Eyebrow, Icon, StatusBadge, Tag } from "../components/ui";

function ArchitectureDiagram() {
  const services = ["Passport + sessions", "Mongoose models", "Cloudinary images", "Mapbox geocoding", "Google Gemini API"];
  return (
    <div
      role="img"
      aria-label="Architecture: the React and TypeScript client sends JSON requests to an Express API. The API uses Passport sessions and Mongoose models backed by MongoDB Atlas, Cloudinary for images, Mapbox for geocoding, and the Google Gemini API. The browser renders Mapbox maps."
      className="overflow-x-auto rounded-2xl border border-ink-700 bg-ink-900 p-6 sm:p-8"
    >
      <div className="grid min-w-[620px] grid-cols-[1fr_auto_1.1fr_auto_1.2fr] items-center gap-4 text-sm">
        <div className="space-y-3">
          <Node title="React + TypeScript" sub="Vite · React Router" accent />
          <Node title="Mapbox GL" sub="maps in the browser" />
        </div>
        <Arrow label="JSON" />
        <Node title="Express 5 API" sub="Joi validation · authz middleware · rate limits · serves client/dist" accent />
        <Arrow />
        <div className="space-y-2">
          {services.map((s) => (
            <Node key={s} title={s} small />
          ))}
          <div className="pt-1">
            <Node title="MongoDB Atlas" sub="listings · reviews · users · sessions" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Node({ title, sub, accent, small }: { title: string; sub?: string; accent?: boolean; small?: boolean }) {
  return (
    <div
      className={`rounded-xl border ${accent ? "border-accent/40 bg-accent-soft" : "border-ink-700 bg-ink-850"} ${
        small ? "px-3 py-2" : "px-4 py-3.5"
      }`}
    >
      <div className={`font-medium ${small ? "text-[13px]" : ""}`}>{title}</div>
      {sub && <div className="mt-0.5 text-xs text-fg-subtle">{sub}</div>}
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-fg-subtle" aria-hidden>
      {label && <span className="font-mono text-[10px]">{label}</span>}
      <Icon.Arrow width={22} height={22} />
    </div>
  );
}

export default function StaySphereCase() {
  useTitle("StaySphere case study | Mantra Mehta");
  return (
    <article>
      <CaseHeader
        eyebrow={
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>Case study · Full-stack + LLM</Eyebrow>
            <StatusBadge kind="live" />
          </div>
        }
        title={p.name}
        tagline={p.tagline}
        meta={
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        }
        actions={
          <>
            <ButtonLink href={p.demo} external variant="primary">
              Open live demo <Icon.External width={15} height={15} />
            </ButtonLink>
            <ButtonLink href={p.repo} external>
              <Icon.Github width={15} height={15} /> View code
            </ButtonLink>
          </>
        }
      >
        <p className="mt-3 text-xs text-fg-subtle">{p.demoNote}</p>
        <div className="mt-12 rounded-2xl border border-ink-700 bg-[#f6f3ef] p-3 sm:p-6">
          <Figure shot={p.cover} priority imgClassName="rounded-lg" />
        </div>
      </CaseHeader>

      <CaseNav
        items={[
          ["overview", "Overview"],
          ["ai-pipeline", "AI pipeline"],
          ["decisions", "Design decisions"],
          ["evaluation", "Evaluation"],
          ["architecture", "Architecture"],
          ["screens", "Screens"],
          ["limitations", "Limitations"],
        ]}
      />

      <CaseSection id="overview" eyebrow="Overview" title="An accommodation marketplace where the AI can’t go rogue">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-[17px] leading-relaxed text-fg-muted">
            <p>{p.summary}</p>
            <p>
              Around the AI concierge is a complete product: authentication and persistent sessions, listing
              creation with image uploads, owner-only editing, reviews, automatic geocoding with interactive maps,
              search with 11 category filters, and a responsive React UI, all deployed as one production service.
            </p>
          </div>
          <div className="rounded-2xl border border-ink-700 bg-ink-900 p-6">
            <h3 className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">Project evolution</h3>
            <ol className="mt-4 space-y-4">
              {p.evolution.map(([v, text]) => (
                <li key={v} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-ink-600 font-mono text-xs text-accent">
                    {v}
                  </span>
                  <span className="text-[15px] leading-relaxed text-fg-muted">{text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </CaseSection>

      <CaseSection id="ai-pipeline" eyebrow="AI travel concierge" title="The AI understands the request. The backend controls the search.">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {p.pipeline.map((step, i) => (
            <li key={step.title} className="relative rounded-2xl border border-ink-700 bg-ink-900 p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="rounded-md bg-ink-800 px-2 py-0.5 font-mono text-[10.5px] text-fg-subtle">{step.tag}</span>
              </div>
              <h3 className="mt-3 font-display text-[17px] font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-fg-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 overflow-hidden rounded-2xl border border-ink-700 bg-ink-900">
          <div className="border-b border-ink-700 px-5 py-3 font-mono text-xs text-fg-subtle">
            POST /api/ai/recommendations · example response item
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-fg-muted">
{`{
  "listing": { "title": "Himalayan Retreat in Manali", "price": 135,
               "location": "Manali", "country": "India", "category": "mountains" },
  "score": 3,
  "reasons": [
    "Located in Manali, India",
    "Matches your mountains preference",
    "$135/night, within your $200 budget"
  ]
}`}
          </pre>
        </div>
      </CaseSection>

      <CaseSection id="decisions" eyebrow="Design decisions" title="Guardrails built into the architecture, not the prompt">
        <CardGrid items={p.decisions} />
      </CaseSection>

      <CaseSection id="evaluation" eyebrow="Testing & evaluation" title="Measured, not guessed">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 lg:grid-cols-4">
          {p.highlights.map((h) => (
            <div key={h.label} className="bg-ink-900 p-5 sm:p-6">
              <dt className="text-sm text-fg-muted">{h.label}</dt>
              <dd className="mt-2 font-display text-4xl font-semibold tracking-tight">{h.value}</dd>
              <dd className="mt-1.5 text-xs text-fg-subtle">{h.detail}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="overflow-hidden rounded-2xl border border-ink-700 bg-ink-900">
            <table className="w-full text-left text-[14.5px]">
              <caption className="border-b border-ink-700 px-5 py-3 text-left font-mono text-xs text-fg-subtle">
                Live evaluation · scripts/evaluateAiSearch.js
              </caption>
              <tbody>
                {p.evalRows.map(([k, v]) => (
                  <tr key={k} className="border-b border-ink-800 last:border-0">
                    <th scope="row" className="px-5 py-3.5 font-normal text-fg-muted">
                      {k}
                    </th>
                    <td className="px-5 py-3.5 text-right font-mono whitespace-nowrap text-fg">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-4 text-[15px] leading-relaxed text-fg-muted">
            <p>
              <strong className="font-medium text-fg">26 unit tests</strong> use Node’s built-in test runner and a
              mocked <code className="font-mono text-[13px] text-fg">fetch</code>. They cover prompt validation,
              AI-output validation (non-JSON text, invented categories, negative prices, injected query operators),
              provider failures and timeouts, and the filter, scoring, and ranking logic.
            </p>
            <p>
              <strong className="font-medium text-fg">The live evaluation</strong> sends 15 prompts to the real model
              and database: budget, location, category, combined, impossible, unsupported, off-topic, and prompt
              injection cases.
            </p>
            <p className="rounded-xl border border-ink-700 bg-ink-900 p-4 text-sm text-fg-subtle">{p.evalNote}</p>
          </div>
        </div>
      </CaseSection>

      <CaseSection id="architecture" eyebrow="Architecture" title="One repository, one production service">
        <ArchitectureDiagram />
        <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {p.engineering.map(([title, body]) => (
            <div key={title} className="border-l-2 border-ink-700 pl-4">
              <h3 className="font-medium text-fg">{title}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-fg-muted">{body}</p>
            </div>
          ))}
        </div>
      </CaseSection>

      <CaseSection id="screens" eyebrow="Screens" title="The product">
        <div className="grid gap-6 lg:grid-cols-2">
          <Figure shot={p.shots[0]} />
          <Figure shot={p.shots[1]} />
        </div>
        <div className="mt-6 grid items-start gap-6 sm:grid-cols-[1.9fr_1fr]">
          <Figure shot={p.shots[2]} />
          <Figure shot={p.shots[3]} className="mx-auto w-full max-w-[260px] sm:max-w-none" />
        </div>
      </CaseSection>

      <CaseSection id="limitations" eyebrow="Known limitations" title="What it doesn’t do (yet)">
        <ul className="grid gap-3 sm:grid-cols-2">
          {p.limitations.map((l) => (
            <li key={l} className="rounded-xl border border-ink-800 bg-ink-900/60 p-5 text-[15px] leading-relaxed text-fg-muted">
              {l}
            </li>
          ))}
        </ul>
      </CaseSection>

      <NextProject to="/projects/genomic-ml" label="Next case study" title="Genomic ML Research" />
    </article>
  );
}
