import "../pages-css/homepage.css";
import { useMemo, useState } from "react";

type Theme = "light" | "dark";

type Project = {
  title: string;
  tag: string;
  year: string;
  summary: string;
  stack: string[];
};

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
};

const featuredProjects: Project[] = [
  {
    title: "WitchLight Engine",
    tag: "Flagship",
    year: "2026",
    summary:
      "A custom rendering playground for atmospheric lighting, shader experiments, and the visual language you want to carry into your portfolio.",
    stack: ["React shell", "Three.js later", "WebGL hooks"],
  },
  {
    title: "Quest 3 Rendering Notes",
    tag: "Case Study",
    year: "2025",
    summary:
      "A write-up section for VR performance, perceptual tradeoffs, and the engineering decisions behind your graphics work.",
    stack: ["VR", "Optimization", "Technical writing"],
  },
  {
    title: "Shader Sketchbook",
    tag: "Lab",
    year: "Ongoing",
    summary:
      "A home for experiments, shader fragments, and visual prototypes that do not need to be full projects to be worth showing.",
    stack: ["GLSL", "Color studies", "R&D"],
  },
];

const notes = [
  "Rendering for comfort, not just fidelity.",
  "How I think about foveation and perceptual error budgets.",
  "Why portfolio case studies should read like postmortems, not resumes.",
];

const links = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Resume", href: "#about" },
];

function WitchlightMark() {
  return (
    <svg
      className="mark"
      viewBox="0 0 64 64"
      aria-label="WitchLight mark"
      fill="none"
    >
      <path d="M32 8L50 20V44L32 56L14 44V20L32 8Z" className="mark-outline" />
      <path d="M23 31.5H41" className="mark-line" />
      <path d="M32 18V45" className="mark-line" />
      <circle cx="32" cy="32" r="6" className="mark-core" />
    </svg>
  );
}

function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      className="themeToggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="themeToggleIcon" aria-hidden="true">
        {theme === "dark" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="4.5"/>
            <path d="M12 2.5V5M12 19V21.5M21.5 12H19M5 12H2.5M18.7 5.3L17 7M7 17L5.3 18.7M18.7 18.7L17 17M7 7L5.3 5.3"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20 14.2A8 8 0 1 1 9.8 4 6.6 6.6 0 0 0 20 14.2Z"/>
          </svg>
        )}
      </span>
    </button>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="projectCard">
      <div className="projectMeta">
        <span className="eyebrow">{project.tag}</span>
        <span className="metaText">{project.year}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <ul className="chipRow" aria-label={`${project.title} stack`}>
        {project.stack.map((item) => (
          <li key={item} className="chip">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Homepage() {
  const systemTheme: Theme = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    []
  );

  const [theme, setTheme] = useState<Theme>(systemTheme);

  return (
    <div className={`homepage theme-${theme}`}>
      <a href="#content" className="skipLink">
        Skip to content
      </a>

      <header className="siteHeader">
        <div className="brandLockup">
          <WitchlightMark />
          <div>
            <p className="eyebrow">Taylor Harry</p>
            <p className="brandTitle">Graphics Engineer / VR Developer</p>
          </div>
        </div>

        <div className="headerControls">
          <nav aria-label="Primary" className="siteNav">
            <a href="#projects">Projects</a>
            <a href="#notes">Notes</a>
            <a href="#about">About</a>
          </nav>
          <ThemeToggle
            theme={theme}
            onToggle={() =>
              setTheme((current) => (current === "dark" ? "light" : "dark"))
            }
          />
        </div>
      </header>

      <main id="content">
        <section className="heroSection">
          <div className="heroCopy">
            <p className="eyebrow">Portfolio prototype</p>
            <h1>
              Building moody, performant interfaces for VR, rendering, and
              realtime tools.
            </h1>
            <p className="heroBody">
              A modular homepage shell with room for a future WebGL intro,
              strong case studies, and a cleaner split between technical
              credibility and visual identity.
            </p>
            <div className="heroActions">
              <a className="buttonPrimary" href="#projects">
                View selected work
              </a>
              <a className="buttonSecondary" href="#about">
                About this build
              </a>
            </div>
          </div>

          <aside className="heroPanel" aria-label="Animation placeholder">
            <div className="panelGlow" />
            <p className="eyebrow">Reserved canvas</p>
            <h2>Three.js / WebGL zone</h2>
            <p>
              Keep this area intentionally open for your future scene, shader
              pass, or reactive animation system.
            </p>
            <div className="signalGrid" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </aside>
        </section>

        <section className="portalSection">
          <article className="portalCard portalCardTall">
            <p className="eyebrow">Projects landing page</p>
            <h2>Lead with one flagship build, then support it with labs and case studies.</h2>
            <p>
              This block is tuned for WitchLight, engine work, VR experiments,
              and deeper technical breakdowns.
            </p>
          </article>

          <article className="portalCard">
            <p className="eyebrow">Notes</p>
            <h2>Short writing for process and engineering taste.</h2>
            <p>Good for rendering notes, architecture posts, and lessons learned.</p>
          </article>

          <article className="portalCard">
            <p className="eyebrow">About</p>
            <h2>Simple, direct, and useful to recruiters.</h2>
            <p>Resume, stack, current focus, and contact links without extra noise.</p>
          </article>
        </section>

        <section id="projects" className="contentSection">
          <div className="sectionIntro">
            <p className="eyebrow">Selected work</p>
            <h2>Projects should read like evidence, not just thumbnails.</h2>
          </div>
          <div className="projectGrid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section id="notes" className="contentSection splitSection">
          <div className="sectionIntro narrowIntro">
            <p className="eyebrow">Writing and notes</p>
            <h2>Use short essays to show how you think.</h2>
          </div>
          <div className="notesPanel">
            <ul className="noteList">
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="about" className="contentSection aboutSection">
          <div className="sectionIntro narrowIntro">
            <p className="eyebrow">About</p>
            <h2>A modular portfolio should be easy to grow one section at a time.</h2>
          </div>
          <div className="aboutGrid">
            <article className="aboutCard">
              <p>
                Start with this homepage component, then break the rest into
                ProjectsPage, NotesPage, AboutPage, ProjectCard, and HeroCanvas
                components as the site grows.
              </p>
            </article>
            <article className="aboutCard linkCard">
              <p className="eyebrow">External links</p>
              <ul className="linkList">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noreferrer noopener">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}