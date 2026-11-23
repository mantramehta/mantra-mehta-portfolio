import { useId, useState } from "react";
import { genomicMetrics, type MetricRow } from "../data/projects";

// Categorical slots 1–3 of the reference palette (dark steps), validated
// all-pairs against the #12141a surface: CVD ΔE ≥ 9.4, normal ΔE ≥ 26.5, ≥ 3:1 contrast.
const MODELS: { key: MetricRow["model"]; label: string; color: string }[] = [
  { key: "LogReg", label: "Logistic Regression", color: "#3987e5" },
  { key: "RandomForest", label: "Random Forest", color: "#d95926" },
  { key: "XGBoost", label: "XGBoost", color: "#199e70" },
];

const TICKS = [0, 0.25, 0.5, 0.75, 1];
const fmt = (n: number) => n.toFixed(3);

type Group = { dataset: string; label: string; dims: string; rows: MetricRow[] };

const groups: Group[] = [];
for (const row of genomicMetrics) {
  let g = groups.find((x) => x.dataset === row.dataset);
  if (!g) {
    g = { dataset: row.dataset, label: row.label, dims: row.dims, rows: [] };
    groups.push(g);
  }
  g.rows.push(row);
}

export function AucChart() {
  const [view, setView] = useState<"chart" | "table">("chart");
  const [active, setActive] = useState<string | null>(null);
  const titleId = useId();

  return (
    <div className="rounded-2xl border border-ink-700 bg-ink-900 p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 id={titleId} className="font-display text-lg font-semibold">
            Test ROC-AUC by dataset and model
          </h3>
          <p className="mt-1 text-sm text-fg-subtle">
            Held-out 30% split. The dashed line marks chance (0.5). Hover or focus a bar for CV AUC, accuracy, and F1.
          </p>
        </div>
        <div role="group" aria-label="Display as" className="flex rounded-full border border-ink-700 bg-ink-850 p-0.5 text-xs">
          {(["chart", "table"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`rounded-full px-3 py-1.5 capitalize transition-colors ${
                view === v ? "bg-ink-700 text-fg" : "text-fg-subtle hover:text-fg"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-fg-muted" aria-label="Legend">
        {MODELS.map((m) => (
          <li key={m.key} className="flex items-center gap-2">
            <span aria-hidden className="h-2.5 w-4 rounded-[3px]" style={{ background: m.color }} />
            {m.label}
          </li>
        ))}
      </ul>

      {view === "chart" ? (
        <div className="mt-6" role="figure" aria-labelledby={titleId}>
          <div className="space-y-6">
            {groups.map((g) => {
              const best = Math.max(...g.rows.map((r) => r.testAuc));
              return (
                <div key={g.dataset} className="grid gap-2 sm:grid-cols-[13rem_1fr] sm:gap-5">
                  <div className="text-sm leading-tight">
                    <div className="font-medium text-fg">{g.label}</div>
                    <div className="mt-0.5 font-mono text-[11px] text-fg-subtle">{g.dims}</div>
                  </div>
                  <div className="relative mr-11">
                    {/* recessive grid */}
                    <div aria-hidden className="pointer-events-none absolute inset-0">
                      {TICKS.map((t) => (
                        <span
                          key={t}
                          className={`absolute top-0 bottom-0 ${t === 0.5 ? "border-l border-dashed border-fg-subtle/60" : "border-l border-ink-700/70"}`}
                          style={{ left: `${t * 100}%` }}
                        />
                      ))}
                    </div>
                    <div className="relative flex flex-col gap-[2px] py-0.5">
                      {MODELS.map((m) => {
                        const r = g.rows.find((x) => x.model === m.key)!;
                        const key = `${g.dataset}-${m.key}`;
                        const isActive = active === key;
                        const dim = active !== null && !isActive;
                        return (
                          <div key={key} className="relative h-3.5">
                            <button
                              type="button"
                              onMouseEnter={() => setActive(key)}
                              onMouseLeave={() => setActive(null)}
                              onFocus={() => setActive(key)}
                              onBlur={() => setActive(null)}
                              aria-label={`${g.label}, ${g.dims}, ${m.label}: test AUC ${fmt(r.testAuc)}, CV AUC ${fmt(r.cvAucMean)} ± ${fmt(r.cvAucStd)}, accuracy ${fmt(r.testAcc)}, F1 ${fmt(r.testF1)}`}
                              className="absolute inset-y-[-3px] left-0 w-full cursor-default focus-visible:outline-none"
                            />
                            <div
                              aria-hidden
                              className="pointer-events-none h-full rounded-r-[4px] transition-opacity duration-150"
                              style={{
                                width: `${r.testAuc * 100}%`,
                                background: m.color,
                                opacity: dim ? 0.35 : 1,
                                boxShadow: isActive ? "0 0 0 2px #12141a, 0 0 0 3px #eceae4" : undefined,
                              }}
                            />
                            {r.testAuc === best && (
                              <span
                                aria-hidden
                                className="pointer-events-none absolute top-1/2 -translate-y-1/2 pl-2 font-mono text-[11px] text-fg-muted"
                                style={{ left: `${r.testAuc * 100}%` }}
                              >
                                {r.testAuc.toFixed(2)}
                              </span>
                            )}
                            {isActive && (
                              <div
                                role="tooltip"
                                className="pointer-events-none absolute bottom-full z-20 mb-2 w-56 -translate-x-1/2 rounded-lg border border-ink-600 bg-ink-850 p-3 text-xs shadow-2xl shadow-black/50"
                                style={{ left: `${Math.min(Math.max(r.testAuc * 50, 22), 78)}%` }}
                              >
                                <div className="flex items-center gap-2 font-medium text-fg">
                                  <span className="size-2 rounded-full" style={{ background: m.color }} />
                                  {m.label}
                                </div>
                                <div className="mt-0.5 text-fg-subtle">
                                  {g.label} · {g.dims}
                                </div>
                                <dl className="mt-2 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 font-mono text-fg-muted">
                                  <dt>Test AUC</dt>
                                  <dd className="text-fg">{fmt(r.testAuc)}</dd>
                                  <dt>CV AUC</dt>
                                  <dd>
                                    {fmt(r.cvAucMean)} ± {fmt(r.cvAucStd)}
                                  </dd>
                                  <dt>Accuracy</dt>
                                  <dd>{fmt(r.testAcc)}</dd>
                                  <dt>F1</dt>
                                  <dd>{fmt(r.testF1)}</dd>
                                </dl>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* x axis */}
          <div className="mt-3 grid sm:grid-cols-[13rem_1fr] sm:gap-5">
            <div className="hidden sm:block" />
            <div className="relative mr-11 h-5 font-mono text-[10.5px] text-fg-subtle" aria-hidden>
              {TICKS.map((t) => (
                <span
                  key={t}
                  className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full"
                  style={{ left: `${t * 100}%` }}
                >
                  {t === 0.5 ? "0.5 chance" : t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Metrics for each dataset and model</caption>
            <thead className="border-b border-ink-700 font-mono text-[11px] tracking-wide text-fg-subtle uppercase">
              <tr>
                <th className="py-2 pr-4 font-medium">Dataset</th>
                <th className="py-2 pr-4 font-medium">Model</th>
                <th className="py-2 pr-4 text-right font-medium">CV AUC</th>
                <th className="py-2 pr-4 text-right font-medium">Test acc</th>
                <th className="py-2 pr-4 text-right font-medium">Test F1</th>
                <th className="py-2 text-right font-medium">Test AUC</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[13px] text-fg-muted">
              {genomicMetrics.map((r) => (
                <tr key={r.dataset + r.model} className="border-b border-ink-800">
                  <td className="py-2 pr-4 font-sans text-fg">
                    {r.label} <span className="text-fg-subtle">· {r.dims}</span>
                  </td>
                  <td className="py-2 pr-4">{r.model}</td>
                  <td className="py-2 pr-4 text-right">
                    {fmt(r.cvAucMean)} ± {fmt(r.cvAucStd)}
                  </td>
                  <td className="py-2 pr-4 text-right">{fmt(r.testAcc)}</td>
                  <td className="py-2 pr-4 text-right">{fmt(r.testF1)}</td>
                  <td className="py-2 text-right text-fg">{fmt(r.testAuc)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-5 text-xs text-fg-subtle">
        Source: <span className="font-mono">Results_CSV/metrics_*.csv</span> in the project repository.
      </p>
    </div>
  );
}
