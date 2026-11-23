import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { profile } from "../data/profile";
import { Container, Icon } from "./ui";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#building", label: "Building" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // wait a frame so the target section exists after route changes
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname, hash]);
  return null;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open ? "border-b border-ink-800 bg-ink-950/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Mantra Mehta, home">
          <span className="grid size-8 place-items-center rounded-lg border border-ink-700 bg-ink-900 font-display text-sm font-bold text-accent transition-colors group-hover:border-accent/50">
            MM
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight">{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.href}
              to={n.href}
              className="rounded-full px-3 py-1.5 text-sm text-fg-muted transition-colors hover:bg-ink-850 hover:text-fg"
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg border border-ink-700 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden className="relative block h-3 w-4">
            <span className={`absolute left-0 h-[1.5px] w-4 bg-fg transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-[1.5px] w-4 bg-fg transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-[1.5px] w-4 bg-fg transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-ink-800 lg:hidden">
          <Container className="flex flex-col py-3">
            {NAV.map((n) => (
              <Link key={n.href} to={n.href} className="rounded-lg px-2 py-3 text-fg-muted hover:text-fg">
                {n.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink-800 py-10">
      <Container className="flex flex-col items-start justify-between gap-4 text-sm text-fg-subtle sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, and Tailwind CSS.
        </p>
        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-fg" aria-label="GitHub">
            <Icon.Github />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-fg" aria-label="LinkedIn">
            <Icon.Linkedin />
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-fg" aria-label="Email">
            <Icon.Mail />
          </a>
        </div>
      </Container>
    </footer>
  );
}

export function Layout() {
  return (
    <div className="page-backdrop relative min-h-screen">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-accent px-3 py-2 text-ink-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
