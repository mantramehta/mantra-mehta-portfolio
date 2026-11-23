import { Link } from "react-router-dom";
import { education, experience, focusAreas, profile, skills } from "../data/profile";
import { genomic, planned, secondaryProjects, staysphere } from "../data/projects";
import { ButtonLink, Container, Eyebrow, Icon, Reveal, SectionHeading, StatusBadge, Tag } from "../components/ui";

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div aria-hidden className="grid-lines absolute inset-0" />
      <Container className="relative pt-20 pb-12 sm:pt-28 sm:pb-16">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 text-sm text-fg-muted">
            <span className="font-medium text-fg">{profile.name}</span>
            <span aria-hidden className="h-3 w-px bg-ink-600" />
            <span>{profile.role}</span>
            <span aria-hidden className="h-3 w-px bg-ink-600" />
            <span>{profile.location}</span>
          </div>
          <h1
            id="hero-title"
            className="mt-6 max-w-4xl font-display text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl xl:max-w-5xl xl:text-[5rem]"
          >
            Software Engineer building <span className="text-accent">reliable</span> AI-powered applications.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted text-pretty sm:text-xl">{profile.summary}</p>
          <p className="mt-3 max-w-xl text-[15px] text-fg-subtle">
            Now at <span className="text-fg-muted">Treevah</span> · previously{" "}
            <span className="text-fg-muted">Freshworks</span> · M.S. Computer Science
          </p>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <ButtonLink href="/#work" variant="primary" className="col-span-2 sm:col-auto">
              View work <Icon.Arrow width={16} height={16} />
            </ButtonLink>
            <ButtonLink href={profile.github} external>
              <Icon.Github width={16} height={16} /> GitHub
            </ButtonLink>
            <ButtonLink href={profile.linkedin} external>
              <Icon.Linkedin width={16} height={16} /> LinkedIn
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <ul className="mt-16 flex flex-wrap gap-2" aria-label="Focus areas">
            {focusAreas.map((f) => (
              <li
                key={f}
                className="rounded-full border border-ink-700 bg-ink-900/70 px-3.5 py-1.5 text-sm text-fg-muted backdrop-blur"
              >
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

function FeaturedWork() {
  return (
    <section id="work" className="py-20 sm:py-28" aria-labelledby="work-title">
      <Container>
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title="Featured projects"
          intro="Two projects with public code, real screenshots, and results you can check in the repositories."
        />

        <div className="space-y-8">
          {/* StaySphere */}
          <Reveal>
            <article className="group grid overflow-hidden rounded-3xl border border-ink-700 bg-ink-900 lg:grid-cols-[1.05fr_1fr]">
              <div className="flex flex-col p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <Eyebrow>01 · Full-stack + LLM</Eyebrow>
                  <StatusBadge kind="live" />
                </div>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">{staysphere.name}</h3>
                <p className="mt-2 text-fg-muted">{staysphere.tagline}</p>
                <p className="mt-5 leading-relaxed text-fg-muted">
                  Gemini turns a plain-English request into validated, structured preferences. Express owns the
                  MongoDB query and ranks results deterministically, so every recommendation is a real listing
                  that respects the user’s budget and destination.
                </p>
                <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink-700 bg-ink-700 sm:grid-cols-4">
                  {staysphere.highlights.map((h) => (
                    <div key={h.label} className="bg-ink-900 p-3.5">
                      <dt className="text-[11px] leading-snug text-fg-subtle">{h.label}</dt>
                      <dd className="mt-1 font-display text-2xl font-semibold">{h.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-2 text-[11.5px] text-fg-subtle">{staysphere.evalNote}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {staysphere.stack.slice(0, 8).map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  <Link
                    to="/projects/staysphere"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-4.5 py-2.5 text-sm font-medium text-ink-950 transition-colors hover:bg-[#f7c97f]"
                  >
                    Read case study <Icon.Arrow width={16} height={16} />
                  </Link>
                  <ButtonLink href={staysphere.demo} external>
                    Live demo <Icon.External width={15} height={15} />
                  </ButtonLink>
                  <ButtonLink href={staysphere.repo} external>
                    <Icon.Github width={15} height={15} /> Code
                  </ButtonLink>
                </div>
              </div>
              <Link
                to="/projects/staysphere"
                tabIndex={-1}
                aria-hidden
                className="relative hidden min-h-[22rem] overflow-hidden border-l border-ink-700 bg-[#f6f3ef] lg:block"
              >
                <img
                  src={staysphere.cover.src}
                  alt=""
                  width={staysphere.cover.width}
                  height={staysphere.cover.height}
                  className="absolute top-8 left-8 w-[115%] max-w-none rounded-xl shadow-2xl shadow-black/30 transition-transform duration-700 group-hover:-translate-y-1.5"
                />
              </Link>
              <img
                src={staysphere.cover.src}
                alt={staysphere.cover.alt}
                width={staysphere.cover.width}
                height={staysphere.cover.height}
                loading="lazy"
                className="w-full border-t border-ink-700 lg:hidden"
              />
            </article>
          </Reveal>

          {/* Genomic ML */}
          <Reveal>
            <article className="group grid overflow-hidden rounded-3xl border border-ink-700 bg-ink-900 lg:grid-cols-[1fr_1.05fr]">
              <Link
                to="/projects/genomic-ml"
                tabIndex={-1}
                aria-hidden
                className="relative hidden items-center justify-center border-r border-ink-700 bg-white p-8 lg:flex"
              >
                <img
                  src={genomic.cover.src}
                  alt=""
                  width={genomic.cover.width}
                  height={genomic.cover.height}
                  loading="lazy"
                  className="max-h-[26rem] w-auto transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </Link>
              <div className="flex flex-col p-7 sm:p-10">
                <Eyebrow>02 · Applied machine learning</Eyebrow>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">{genomic.name}</h3>
                <p className="mt-2 text-fg-muted">{genomic.tagline}</p>
                <p className="mt-1 text-sm text-fg-subtle">{genomic.context}</p>
                <p className="mt-5 leading-relaxed text-fg-muted">
                  Benchmarked Logistic Regression, Random Forest, and XGBoost across four simulated genetic
                  architectures at 100 and 10,000 SNPs, with leakage-safe Mutual Information feature selection
                  inside the cross-validation pipeline.
                </p>
                <dl className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-ink-700 bg-ink-700">
                  <div className="bg-ink-900 p-3.5">
                    <dt className="text-[11px] leading-snug text-fg-subtle">Additive, 100 SNPs (all models)</dt>
                    <dd className="mt-1 font-display text-2xl font-semibold">0.99</dd>
                  </div>
                  <div className="bg-ink-900 p-3.5">
                    <dt className="text-[11px] leading-snug text-fg-subtle">Epistatic, XGBoost</dt>
                    <dd className="mt-1 font-display text-2xl font-semibold">0.69</dd>
                  </div>
                  <div className="bg-ink-900 p-3.5">
                    <dt className="text-[11px] leading-snug text-fg-subtle">Epistatic, LogReg</dt>
                    <dd className="mt-1 font-display text-2xl font-semibold">0.49</dd>
                  </div>
                </dl>
                <p className="mt-2 text-[11.5px] text-fg-subtle">Test ROC-AUC on held-out data.</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {genomic.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  <Link
                    to="/projects/genomic-ml"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-4.5 py-2.5 text-sm font-medium text-ink-950 transition-colors hover:bg-[#f7c97f]"
                  >
                    Read case study <Icon.Arrow width={16} height={16} />
                  </Link>
                  <ButtonLink href={genomic.repo} external>
                    <Icon.Github width={15} height={15} /> Code
                  </ButtonLink>
                  <ButtonLink href={genomic.report} external>
                    Final report <Icon.External width={15} height={15} />
                  </ButtonLink>
                </div>
              </div>
              <div className="border-t border-ink-700 bg-white p-6 lg:hidden">
                <img
                  src={genomic.cover.src}
                  alt={genomic.cover.alt}
                  width={genomic.cover.width}
                  height={genomic.cover.height}
                  loading="lazy"
                  className="mx-auto max-h-80 w-auto"
                />
              </div>
            </article>
          </Reveal>

          {/* Secondary */}
          {secondaryProjects.map((p) => (
            <Reveal key={p.name}>
              <article className="flex flex-col gap-5 rounded-2xl border border-ink-800 bg-ink-900/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="max-w-3xl">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">Also on GitHub</p>
                  <h3 className="mt-2 font-display text-xl font-semibold">{p.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
                <div className="shrink-0">
                  <ButtonLink href={p.repo} external>
                    <Icon.Github width={15} height={15} /> View code
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-ink-800 py-20 sm:py-28" aria-labelledby="exp-title">
      <Container>
        <SectionHeading
          id="exp-title"
          eyebrow="Experience"
          title="Production backend, search, and AI integrations"
          intro="From search and recommendation services to AI-powered document workflows in a SaaS product."
        />
        <ol className="relative space-y-6">
          {experience.map((job, i) => (
            <li key={job.company}>
              <Reveal delay={i * 80}>
                <article className="grid gap-6 rounded-2xl border border-ink-700 bg-ink-900 p-6 sm:p-8 lg:grid-cols-[15rem_1fr] lg:gap-10">
                  <header>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-display text-2xl font-semibold tracking-tight">{job.company}</h3>
                      {job.current && <StatusBadge kind="current" />}
                    </div>
                    <p className="mt-1.5 text-fg">{job.role}</p>
                    <p className="mt-3 font-mono text-[12px] text-fg-subtle">{job.period}</p>
                    <p className="font-mono text-[12px] text-fg-subtle">{job.location}</p>
                  </header>
                  <div>
                    <ul className="space-y-3.5">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-3 leading-relaxed text-fg-muted">
                          <span aria-hidden className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-accent/80" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {job.stack.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-ink-800 py-20 sm:py-28" aria-labelledby="about-title">
      <Container>
        <div className="grid items-start gap-10 md:grid-cols-[15rem_1fr] md:gap-12 lg:grid-cols-[18rem_1fr] lg:gap-16">
          <Reveal>
            <div className="mx-auto w-full max-w-[15rem] md:max-w-none">
              <img
                src={profile.photo.src}
                alt={`Portrait of ${profile.name}`}
                width={profile.photo.width}
                height={profile.photo.height}
                decoding="async"
                className="aspect-square w-full rounded-2xl border border-ink-700 object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Eyebrow>About</Eyebrow>
            <h2 id="about-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Hi, I’m Mantra.
            </h2>
            <div className="mt-5 max-w-2xl space-y-4 text-[17px] leading-relaxed text-fg-muted text-pretty">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex max-w-2xl flex-col justify-between gap-3 rounded-2xl border border-ink-700 bg-ink-900 p-5 sm:flex-row sm:items-center sm:p-6">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">Education</p>
                <p className="mt-2 font-display text-lg font-semibold">{education.degree}</p>
                <p className="text-[15px] text-fg-muted">
                  {education.school}, {education.place}
                </p>
              </div>
              <div className="shrink-0 font-mono text-[12px] whitespace-nowrap text-fg-subtle sm:text-right">
                <p>{education.period}</p>
                <p>GPA {education.gpa}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Building() {
  return (
    <section id="building" className="border-t border-ink-800 py-20 sm:py-28" aria-labelledby="building-title">
      <Container>
        <SectionHeading
          id="building-title"
          eyebrow="Currently building"
          title="Next: evaluation tooling for AI agents"
          intro="Upcoming projects. Both are planned, with no public code or results yet."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {planned.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <article className="h-full rounded-2xl border border-dashed border-ink-600 bg-ink-900/40 p-6 sm:p-7">
                <StatusBadge kind="planned" />
                <h3 className="mt-4 font-display text-xl font-semibold">{p.name}</h3>
                <p className="mt-1.5 text-fg-muted">{p.subtitle}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="border-t border-ink-800 py-20 sm:py-28" aria-labelledby="skills-title">
      <Container>
        <SectionHeading id="skills-title" eyebrow="Toolkit" title="Skills used in production and projects" />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g) => (
            <div key={g.group} className="bg-ink-900 p-6">
              <h3 className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">{g.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <li key={s} className="rounded-md bg-ink-850 px-2.5 py-1 text-[13px] text-fg-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-ink-800 py-20 sm:py-28" aria-labelledby="contact-title">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-ink-700 bg-ink-900 p-8 sm:p-14">
            <div
              aria-hidden
              className="absolute -top-32 -right-32 size-80 rounded-full bg-accent/10 blur-3xl"
            />
            <Eyebrow>Contact</Eyebrow>
            <h2 id="contact-title" className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              Building something with AI that has to work reliably?
            </h2>
            <p className="mt-5 max-w-xl text-lg text-fg-muted">
              I’m always glad to talk about backend, full-stack, and AI product engineering. Email is the
              fastest way to reach me.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${profile.email}`} variant="primary">
                <Icon.Mail width={16} height={16} /> {profile.email}
              </ButtonLink>
              <ButtonLink href={profile.linkedin} external>
                <Icon.Linkedin width={16} height={16} /> LinkedIn
              </ButtonLink>
              <ButtonLink href={profile.github} external>
                <Icon.Github width={16} height={16} /> GitHub
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <About />
      <ExperienceSection />
      <Building />
      <Skills />
      <Contact />
    </>
  );
}
