import { useMemo, useState } from 'react';
import './hero.css';

const foodTruck = new URL('../assets/food_truck.png', import.meta.url).href;

type MenuItem = {
    id: string;
    label: string;
    heading: string;
    description: string;
    body: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref: string;
    secondaryLabel: string;
};

const MENU_ITEMS: MenuItem[] = [
    {
        id: 'work',
        label: "Today's Special",
        heading: 'Featured work, served fresh.',
        description: 'Projects and practical case studies',
        body:
            'Browse selected projects that focus on support, systems thinking, automation, and problem solving with real-world impact.',
        primaryHref: '#work',
        primaryLabel: 'View work',
        secondaryHref: '#contact',
        secondaryLabel: 'Ask for resume',
    },
    {
        id: 'skills',
        label: 'Drinks',
        heading: 'Tools, systems, and technical strengths.',
        description: 'Skills, platforms, and daily tools',
        body:
            'See the stack behind the work: Linux, scripting, troubleshooting, cloud fundamentals, infrastructure support, and the tools I rely on to keep things running smoothly.',
        primaryHref: '#skills',
        primaryLabel: 'See skills',
        secondaryHref: '#about',
        secondaryLabel: 'About me',
    },
    {
        id: 'about',
        label: 'Bites',
        heading: 'A little background behind the counter.',
        description: 'About, experience, and interests',
        body:
            'Learn more about my background, how I approach technical work, and the mix of curiosity, consistency, and care I bring to support and infrastructure problems.',
        primaryHref: '#about',
        primaryLabel: 'Read about me',
        secondaryHref: '#work',
        secondaryLabel: 'Featured work',
    },
    {
        id: 'contact',
        label: 'Thank You',
        heading: 'Let’s keep in touch.',
        description: 'Contact details and links',
        body:
            'Reach out for opportunities, collaboration, or just to say hello. You can find my contact details, resume, and links all in one place.',
        primaryHref: '#contact',
        primaryLabel: 'Contact me',
        secondaryHref: '#top',
        secondaryLabel: 'Back to top',
    },
];

export function Hero() {
    const [activeId, setActiveId] = useState<string>('work');

    const activeItem = useMemo(
        () => MENU_ITEMS.find((item) => item.id === activeId) ?? MENU_ITEMS[0],
        [activeId]
    );

    console.log('foodTruck url:', foodTruck);

    return (
        <section className="hero-shell" id="top">
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
                            <h1 className="hero-menu-title">IT Support &amp; Systems</h1>
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
                                            <span className="hero-menu-desc">{item.description}</span>
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
    );
}