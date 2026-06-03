import "../pages-css/homepage.css";
import { useMemo, useState } from "react";

type Theme = "light" | "dark";

type Project = {
  title: string;
  tag: string;
  year: string;
  summary: string;
  stack: string[];
  href: string;
  featured?: boolean;
};

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
};

type TimelineNode = {
  phase: string;
  title: string;
  duration: string;
  goal: string;
  output: string;
};

const featuredProjects: Project[] = [
  {
    title: "WitchLight Engine",
    tag: "Flagship",
    year: "2026",
    summary:
      "A custom rendering engine and tools sandbox built to support atmospheric lighting, shader experimentation, editor workflows, and the visual foundation of a playable vertical slice.",
    stack: ["Rendering", "Shaders", "Tools", "XR"],
    href: "#projects",
    featured: true,
  },
  {
    title: "Game Prototype",
    tag: "Production Test",
    year: "In Progress",
    summary:
      "A small game built alongside the engine to validate conversation flow, board interactions, and whether the tech holds up under real production pressure.",
    stack: ["Gameplay", "Narrative", "Prototyping"],
    href: "#roadmap",
  },
  {
    title: "Rendering Notes",
    tag: "Case Studies",
    year: "Ongoing",
    summary:
      "Technical writing on VR rendering tradeoffs, perceptual tuning, atmospheric look development, and the decisions behind performance-sensitive visuals.",
    stack: ["VR", "Optimization", "Writing"],
    href: "#notes",
  },
];

const timelineNodes: TimelineNode[] = [
  {
    phase: "0",
    title: "Engine proof",
    duration: "4–8 weeks",
    goal: "Stable runtime foundation",
    output: "Desktop rendering, XR path compiling, scene boot/load.",
  },
  {
    phase: "1",
    title: "Editor proof",
    duration: "6–10 weeks",
    goal: "Minimum Unity-like workflow",
    output: "Docking UI, viewport, hierarchy, inspector, save/load scene.",
  },
  {
    phase: "2",
    title: "Data pipeline",
    duration: "4–8 weeks",
    goal: "Real-time authoring loop",
    output: "Serialized scenes/prefabs, hot reload, validation, asset browser.",
  },
  {
    phase: "3",
    title: "Game prototype",
    duration: "4–6 weeks",
    goal: "Prove core loop cheaply",
    output: "One room, one conversation chain, Anchors/Hunger stub, board stub.",
  },
  {
    phase: "4",
    title: "Vertical slice",
    duration: "8–12 weeks",
    goal: "Prove production quality",
    output: "One polished night, hub, and aftermath.",
  },
  {
    phase: "5",
    title: "Pitch package",
    duration: "2–4 weeks",
    goal: "External-facing materials",
    output: "Trailer, deck, one-pager, clean build.",
  },
  {
    phase: "6",
    title: "VR mode",
    duration: "6–10 weeks",
    goal: "Shared-content tabletop mode",
    output: "PC VR implementation first.",
  },
];

const notes = [
  "Rendering for comfort, not just fidelity.",
  "Atmosphere is a systems problem, not only an art problem.",
  "Good graphics case studies should read like technical postmortems.",
];

const links = [
  { label: "GitHub", href: "https://github.com/Idle-Truth" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/taylor-harry" },
  { label: "Resume", href: "#" },
  { label: "Contact", href: "mailto:your@email.com" },
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
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 2.5V5M12 19V21.5M21.5 12H19M5 12H2.5M18.7 5.3L17 7M7 17L5.3 18.7M18.7 18.7L17 17M7 7L5.3 5.3" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20 14.2A8 8 0 1 1 9.8 4 6.6 6.6 0 0 0 20 14.2Z" />
          </svg>
        )}
      </span>
    </button>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`projectCard ${project.featured ? "projectCardFeatured" : ""}`}>
      <div className="projectVisual" aria-hidden="true">
        <div className="projectVisualGlow" />
        <div className="projectVisualGrid" />
      </div>

      <div className="projectContent">
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

        <a className="projectLink" href={project.href}>
          View details
        </a>
      </div>
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
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  const activeTimelineNode = timelineNodes[activeTimelineIndex];
  const leadProject = featuredProjects.find((project) => project.featured);
  const supportingProjects = featuredProjects.filter((project) => !project.featured);

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
            <a href="#roadmap">Roadmap</a>
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
        <section className="heroSection heroSectionRebuilt">
          <div className="heroBackdrop" aria-hidden="true" />

          <div className="heroMain">
            <p className="eyebrow">Taylor Harry</p>

            <h1>
              Graphics engineering for atmospheric rendering, VR performance, and
              production-minded tools.
            </h1>

            <p className="heroBody">
              I’m building WitchLight Engine alongside a game designed to test it under
              real production constraints. My work focuses on rendering systems, shader
              studies, editor workflows, XR foundations, and technical case studies that
              make graphics decisions legible.
            </p>

            <div className="heroActions">
              <a className="buttonPrimary" href="#projects">
                View WitchLight Engine
              </a>
              <a className="buttonSecondary" href="#roadmap">
                See roadmap
              </a>
            </div>

            <div className="heroStats" aria-label="Highlights">
              <div className="heroStat">
                <span className="heroStatValue">Engine</span>
                <span className="heroStatLabel">Custom runtime and tools</span>
              </div>
              <div className="heroStat">
                <span className="heroStatValue">XR</span>
                <span className="heroStatLabel">VR-first rendering interest</span>
              </div>
              <div className="heroStat">
                <span className="heroStatValue">Slice</span>
                <span className="heroStatLabel">Built toward production proof</span>
              </div>
            </div>
          </div>

          <aside className="heroStage" aria-label="Visual stage">
            <div className="heroStageFrame">
              <div className="heroStageGlow" />
              <div className="heroStageGrid" />
              <div className="heroMascotPlaceholder">
                <span className="heroMascotRing" />
                <span className="heroMascotLabel">Engine capture / live scene</span>
              </div>
            </div>

            <div className="heroStageCaption">
              <p className="eyebrow">Featured system</p>
              <h2>WitchLight Engine as the core portfolio narrative.</h2>
              <p>
                The homepage should ultimately feature an engine capture, shader study,
                or lightweight realtime scene here so the first impression matches the
                technical focus of the work.
              </p>
            </div>
          </aside>
        </section>

        <section className="introBand">
          <div className="introBandCopy">
            <p className="eyebrow">Current direction</p>
            <h2>
              One strong engine story is better than a scattered collection of unrelated experiments.
            </h2>
          </div>

          <div className="introBandText">
            <p>
              This portfolio is structured around a single throughline: build the runtime,
              build the tools, build the game that proves the tools, and document the
              technical decisions along the way.
            </p>
          </div>
        </section>

        <section id="projects" className="contentSection projectsSectionRebuilt">
          <div className="sectionIntro sectionIntroWide">
            <p className="eyebrow">Selected work</p>
            <h2>Focused projects that show rendering depth, production thinking, and technical taste.</h2>
          </div>

          <div className="projectsShowcase">
            {leadProject && <ProjectCard project={leadProject} />}

            <div className="projectColumn">
              {supportingProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="contentSection timelineSection">
          <div className="sectionIntro sectionIntroWide">
            <p className="eyebrow">Timeline</p>
            <h2>A phased build from runtime proof to vertical slice and VR mode.</h2>
          </div>

          <div className="timelineShell">
            <div
              className="timelineRail"
              role="tablist"
              aria-label="Project timeline"
            >
              <div className="timelineTrack" aria-hidden="true">
                <span
                  className="timelineTrackProgress"
                  style={{
                    width: `${(activeTimelineIndex / (timelineNodes.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {timelineNodes.map((node, index) => (
                <button
                  key={`${node.phase}-${node.title}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTimelineIndex === index}
                  aria-controls={`timeline-panel-${index}`}
                  id={`timeline-tab-${index}`}
                  className={`timelineNode ${activeTimelineIndex === index ? "timelineNodeActive" : ""}`}
                  onClick={() => setActiveTimelineIndex(index)}
                >
                  <span className="timelineNodeDot" aria-hidden="true" />
                  <span className="timelineNodeMeta">Phase {node.phase}</span>
                  <span className="timelineNodeTitle">{node.title}</span>
                  <span className="timelineNodeDuration">{node.duration}</span>
                </button>
              ))}
            </div>

            <article
              className="timelinePopup"
              role="tabpanel"
              id={`timeline-panel-${activeTimelineIndex}`}
              aria-labelledby={`timeline-tab-${activeTimelineIndex}`}
              tabIndex={0}
            >
              <div className="timelinePopupTop">
                <p className="eyebrow">Phase {activeTimelineNode.phase}</p>
                <p className="timelinePopupDuration">{activeTimelineNode.duration}</p>
              </div>

              <h3>{activeTimelineNode.title}</h3>

              <div className="timelinePopupGrid">
                <div className="timelinePopupBlock">
                  <span className="timelinePopupLabel">Goal</span>
                  <p>{activeTimelineNode.goal}</p>
                </div>

                <div className="timelinePopupBlock">
                  <span className="timelinePopupLabel">Output</span>
                  <p>{activeTimelineNode.output}</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="notes" className="contentSection notesSectionRebuilt">
          <div className="sectionIntro">
            <p className="eyebrow">Writing and notes</p>
            <h2>Technical essays that explain tradeoffs, not just outcomes.</h2>
          </div>

          <div className="notesShell">
            <div className="notesPanel">
              <ul className="noteList">
                {notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>

            <div className="notesSideCard">
              <p className="eyebrow">Case-study approach</p>
              <p>
                Strong graphics portfolios explain the challenge, the solution, and the
                result. The goal here is to make the work easy to read for both technical
                and non-technical reviewers.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="contentSection aboutSectionRebuilt">
          <div className="aboutPanelLarge">
            <p className="eyebrow">About</p>
            <h2>Graphics engineering focused on rendering systems, XR, and technical storytelling.</h2>
            <p>
              I’m a graphics engineer working across realtime rendering, shader
              experimentation, editor tooling, and VR performance. My current body of work
              is centered on WitchLight Engine and the game project built beside it, with
              an emphasis on atmosphere, constrained hardware, and production-aware system
              design.
            </p>
          </div>

          <div className="aboutPanelSmall">
            <p className="eyebrow">Links</p>
            <ul className="linkList">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noreferrer noopener">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}