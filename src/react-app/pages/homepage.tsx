import { useMemo, useState } from 'react';
import '../pages-css/homepage.css';
import foodTruck from '../assets/food_truck.png';

const MENU_ITEMS = [
    {
        id: 'work',
        label: "Today's Special",
        short: 'Featured projects and practical wins',
        heading: 'Featured work, served fresh.',
        body:
            'Browse selected projects focused on troubleshooting, automation, systems reliability, and solving technical problems with care.',
        primaryHref: '#work',
        primaryLabel: 'View work',
        secondaryHref: '#contact',
        secondaryLabel: 'Contact me',
    },
    {
        id: 'skills',
        label: 'Drinks',
        short: 'Tools, systems, and daily stack',
        heading: 'Tools, systems, and technical strengths.',
        body:
            'See the stack behind the work: Linux, scripting, cloud fundamentals, support workflows, infrastructure basics, and the tools I use to keep things running smoothly.',
        primaryHref: '#skills',
        primaryLabel: 'See skills',
        secondaryHref: '#about',
        secondaryLabel: 'About me',
    },
    {
        id: 'about',
        label: 'Bites',
        short: 'Background, approach, and interests',
        heading: 'A little background behind the counter.',
        body:
            'Learn more about my background, how I approach technical work, and the mix of curiosity, consistency, and care I bring to support and systems problems.',
        primaryHref: '#about',
        primaryLabel: 'Read about me',
        secondaryHref: '#work',
        secondaryLabel: 'Featured work',
    },
    {
        id: 'contact',
        label: 'Thank You',
        short: 'Contact details and next steps',
        heading: 'Let’s keep in touch.',
        body:
            'Reach out for opportunities, collaboration, or just to say hello. You can find my contact details, resume, and links all in one place.',
        primaryHref: '#contact',
        primaryLabel: 'Contact me',
        secondaryHref: '#top',
        secondaryLabel: 'Back to top',
    },
];

const FEATURED_WORK = [
    {
        title: 'Automation and Workflow Cleanup',
        text: 'Built small scripts and process improvements to reduce repetitive work and make routine technical tasks more consistent.',
    },
    {
        title: 'Systems Troubleshooting',
        text: 'Tracked down hard-to-find issues across software, local environments, and configurations with a methodical debugging approach.',
    },
    {
        title: 'Technical Documentation',
        text: 'Wrote notes and internal references that made setup, handoff, and repeated tasks easier for future work.',
    },
];

const SKILLS = [
    'Linux',
    'Windows',
    'Git',
    'Python',
    'Bash',
    'PowerShell',
    'Cloud fundamentals',
    'Troubleshooting',
    'Networking basics',
    'Documentation',
    'Scripting',
    'System setup',
];

export default function Homepage() {
    const [activeId, setActiveId] = useState('work');

    const activeItem = useMemo(
        () => MENU_ITEMS.find((item) => item.id === activeId) ?? MENU_ITEMS[0],
        [activeId]
    );

    return (
        <main className="homepage" id="top">
            <section className="hero-shell">
                <div className="hero-image-wrap">
                    <img
                        src={foodTruck}
                        alt="Soft pastel food truck with cherry blossoms and a menu board"
                        className="hero-image"
                    />

                    <div className="hero-overlay">
                        <nav className="hero-menu" aria-label="Hero content selector">
                            <header className="hero-menu-header">
                                <p className="hero-menu-kicker">Taylor Harry</p>
                                <h1 className="hero-menu-title">Personal Site Menu</h1>
                            </header>

                            <ul className="hero-menu-list">
                                {MENU_ITEMS.map((item) => {
                                    const isActive = item.id === activeItem.id;

                                    return (
                                        <li key={item.id} className="hero-menu-item">
                                            <button
                                                type="button"
                                                className={`hero-menu-link ${isActive ? 'is-active' : ''}`}
                                                onClick={() => setActiveId(item.id)}
                                                aria-pressed={isActive}
                                            >
                                                <span className="hero-menu-label">{item.label}</span>
                                                <span className="hero-menu-desc">{item.short}</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <div className="hero-intro" aria-live="polite">
                            <p className="hero-intro-kicker">Welcome in</p>
                            <h2 className="hero-intro-title">{activeItem.heading}</h2>
                            <p className="hero-intro-body">{activeItem.body}</p>
                            <div className="hero-intro-actions">
                                <a href={activeItem.primaryHref} className="btn btn-primary">
                                    {activeItem.primaryLabel}
                                </a>
                                <a href={activeItem.secondaryHref} className="btn btn-ghost">
                                    {activeItem.secondaryLabel}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content-section section-soft" id="work">
                <div className="section-heading">
                    <p className="section-kicker">Today’s special</p>
                    <h2>Featured work</h2>
                    <p>
                        A few highlights that show how I think through technical problems,
                        document solutions, and improve the way work gets done.
                    </p>
                </div>

                <div className="card-grid">
                    {FEATURED_WORK.map((item) => (
                        <article key={item.title} className="info-card">
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="content-section" id="skills">
                <div className="split-layout">
                    <div className="section-heading compact">
                        <p className="section-kicker">Drinks</p>
                        <h2>Skills and tools</h2>
                        <p>
                            The stack I reach for most often when supporting systems,
                            troubleshooting issues, and keeping technical work organized.
                        </p>
                    </div>

                    <div className="chip-wrap">
                        {SKILLS.map((skill) => (
                            <span key={skill} className="skill-chip">
                {skill}
              </span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="content-section section-soft" id="about">
                <div className="about-card">
                    <div className="section-heading compact">
                        <p className="section-kicker">Bites</p>
                        <h2>About me</h2>
                    </div>

                    <p>
                        I like technical work that blends structure and care: solving problems,
                        cleaning up messy workflows, writing useful documentation, and making
                        systems easier for people to use.
                    </p>

                    <p>
                        This site leans a little softer and more personal on purpose. I wanted
                        something that still feels organized and functional, but warmer than a
                        standard portfolio layout.
                    </p>
                </div>
            </section>

            <section className="content-section" id="contact">
                <div className="contact-card">
                    <div>
                        <p className="section-kicker">Thank you</p>
                        <h2>Contact</h2>
                        <p>
                            Reach out for opportunities, collaboration, or just to say hello.
                        </p>
                    </div>

                    <div className="contact-links">
                        <a href="mailto:you@example.com">you@example.com</a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                            LinkedIn
                        </a>
                        <a href="/resume.pdf" download>
                            Resume
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}