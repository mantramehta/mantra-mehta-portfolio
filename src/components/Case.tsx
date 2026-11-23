import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Container, Eyebrow, Icon } from "./ui";

export function useTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);
}

export function CaseHeader({
  eyebrow,
  title,
  tagline,
  meta,
  actions,
  children,
}: {
  eyebrow: ReactNode;
  title: string;
  tagline: string;
  meta: ReactNode;
  actions: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-ink-800">
      <div aria-hidden className="grid-lines absolute inset-0" />
      <Container className="relative pt-12 pb-14 sm:pt-16 sm:pb-20">
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 text-sm text-fg-subtle transition-colors hover:text-fg"
        >
          <Icon.ArrowLeft width={15} height={15} /> All work
        </Link>
        <div className="mt-8">{eyebrow}</div>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-xl text-fg-muted text-pretty">{tagline}</p>
        <div className="mt-6 text-sm text-fg-subtle">{meta}</div>
        <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
        {children}
      </Container>
    </header>
  );
}

export function CaseSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-b border-ink-800 py-14 sm:py-20">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={`${id}-title`} className="mt-3 mb-8 max-w-3xl font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {title}
        </h2>
        {children}
      </Container>
    </section>
  );
}

export function CaseNav({ items }: { items: [string, string][] }) {
  return (
    <nav
      aria-label="On this page"
      className="sticky top-16 z-30 border-b border-ink-800 bg-ink-950/85 backdrop-blur-md"
    >
      <Container>
        <ul className="-mx-2 flex gap-1 overflow-x-auto py-2.5 text-sm [scrollbar-width:none]">
          {items.map(([id, label]) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                className="block rounded-full px-3 py-1.5 text-fg-subtle transition-colors hover:bg-ink-850 hover:text-fg"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}

export function CardGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((d) => (
        <div key={d.title} className="rounded-2xl border border-ink-700 bg-ink-900 p-6">
          <h3 className="font-display text-[17px] font-semibold">{d.title}</h3>
          <p className="mt-2.5 text-[15px] leading-relaxed text-fg-muted">{d.body}</p>
        </div>
      ))}
    </div>
  );
}

export function NextProject({ to, label, title }: { to: string; label: string; title: string }) {
  return (
    <Container className="py-16">
      <Link
        to={to}
        className="group flex items-center justify-between gap-6 rounded-3xl border border-ink-700 bg-ink-900 p-8 transition-colors hover:border-accent/50 sm:p-10"
      >
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">{label}</p>
          <p className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{title}</p>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-full border border-ink-600 transition-all group-hover:translate-x-1 group-hover:border-accent group-hover:text-accent">
          <Icon.Arrow />
        </span>
      </Link>
    </Container>
  );
}
