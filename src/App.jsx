import { useEffect, useRef, useState } from 'react'

const navItems = [
  ['home', 'Home'],
  ['about', 'About'],
  ['studies', 'Studies'],
  ['projects', 'Projects'],
  ['contact', 'Contact'],
]

const paths = {
  people: 'M12 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2M17 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21v-2a4 4 0 0 1 4-4h2M7 11a4 4 0 1 1 0-8',
  leaf: 'M20.5 3.5C12 4 5 8 4 18c4-5 8-7 13-9M4 18c2 0 4 .7 5.5 2',
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5a5.5 5.5 0 0 0 1.1-8.9Z',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-20c2.5 2.7 3.8 6 3.8 10S14.5 19.3 12 22M12 2C9.5 4.7 8.2 8 8.2 12S9.5 19.3 12 22M2 12h20',
  arrow: 'm5 12 14 0m-5-5 5 5-5 5',
  book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Zm0 0A2.5 2.5 0 0 0 6.5 22H20',
  mail: 'M3 5h18v14H3V5Zm0 1 9 7 9-7',
  pin: 'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
}

function Icon({ name, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[name]} stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const element = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && element.classList.add('is-visible'),
      { threshold: 0.12 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`} style={{ '--delay': `${delay}ms` }}>{children}</div>
}

function Header({ active, menuOpen, setMenuOpen }) {
  const goTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen, setMenuOpen])

  return (
    <>
      <header className={`site-header ${active === 'contact' || menuOpen ? 'on-dark' : ''}`}>
        <button className="wordmark" onClick={() => goTo('home')} aria-label="Back to home">Myrsinie.</button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <button key={id} className={active === id ? 'active' : ''} onClick={() => goTo(id)}>{label}</button>
          ))}
        </nav>
        <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </header>

      <div className={`menu-panel ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen} inert={!menuOpen ? true : undefined}>
        <nav aria-label="Mobile navigation">
          {navItems.map(([id, label], index) => (
            <button key={id} onClick={() => goTo(id)} style={{ '--i': index }}>{label}</button>
          ))}
        </nav>
        <p className="menu-note">People <i /> Community <i /> Change</p>
        <p className="menu-script">A kinder<br />tomorrow. ♡</p>
      </div>
    </>
  )
}

function Eyebrow({ children }) {
  return <p className="eyebrow">{children}</p>
}

function Home() {
  return (
    <section id="home" className="hero section">
      <img className="hero-image" src="/assets/hero-crete.jpg" alt="A cat resting above Heraklion and the Mediterranean sea" />
      <div className="hero-wash" />
      <div className="hero-content page-shell">
        <Reveal className="hero-copy">
          <p className="kicker">Social work · Heraklion, Crete</p>
          <h1>For People.<br />For Change.</h1>
          <span className="short-rule" />
          <p className="hero-intro">Social work. Stronger communities.<br />A kinder tomorrow.</p>
          <a className="button" href="#about">Discover my story <Icon name="arrow" size={18} /></a>
        </Reveal>
        <p className="hero-script">Heraklion,<br />Crete ♡</p>
        <div className="hero-footer"><span>01 / 05</span><span>People · Communities · Equality</span></div>
      </div>
    </section>
  )
}

function About() {
  const values = [
    ['people', 'People first'],
    ['leaf', 'Social justice'],
    ['heart', 'Mental health'],
    ['globe', 'Inclusive communities'],
  ]
  return (
    <section id="about" className="about section paper-section">
      <div className="page-shell about-grid">
        <Reveal className="about-copy">
          <Eyebrow>A student. A learner. A believer in people.</Eyebrow>
          <h2>About Me</h2>
          <div className="body-copy">
            <p>I’m Myrsinie, originally from Athens and now living in Heraklion, Crete, where I study Social Work at the Hellenic Mediterranean University.</p>
            <p>I’m drawn to work that begins with listening: mental health, community support, social justice, and more inclusive spaces where people feel seen.</p>
          </div>
          <div className="values-grid">
            {values.map(([icon, label]) => <div className="value" key={label}><Icon name={icon} size={30} /><span>{label}</span></div>)}
          </div>
        </Reveal>
        <Reveal className="about-visual" delay={120}>
          <div className="photo-frame portrait"><img src="/assets/about-desk.jpg" alt="A study desk by a sunny window in Crete" loading="lazy" /></div>
          <blockquote>“A more just world is possible,<br />and it starts with people who care.”</blockquote>
        </Reveal>
      </div>
    </section>
  )
}

function Studies() {
  const areas = ['Social policy', 'Human behaviour & society', 'Vulnerable groups', 'Support & counselling', 'Community development', 'Rights & inclusion', 'Research & practice', 'Professional ethics']
  return (
    <section id="studies" className="studies section paper-section">
      <div className="page-shell studies-layout">
        <Reveal className="studies-copy">
          <Eyebrow>Social Work @ HMU</Eyebrow>
          <h2>My Studies</h2>
          <div className="body-copy compact">
            <p>I am studying Social Work at the Hellenic Mediterranean University in Heraklion, Crete.</p>
            <p>My studies explore social policy, human behaviour, vulnerable groups, community development, and the promotion of inclusion and human rights.</p>
          </div>
        </Reveal>
        <Reveal className="studies-photo-wrap" delay={100}>
          <div className="tape" />
          <div className="photo-frame campus"><img src="/assets/studies-campus.jpg" alt="A palm tree outside a modern university building" loading="lazy" /></div>
        </Reveal>
        <Reveal className="areas-card" delay={160}>
          <h3>Areas I’m Exploring</h3>
          <div>{areas.map((area) => <span key={area}>{area}</span>)}</div>
        </Reveal>
        <p className="studies-script">Knowledge<br />for a kinder<br />tomorrow.</p>
      </div>
    </section>
  )
}

function Projects() {
  const projects = [
    { number: '01', title: 'Community Support', text: 'Volunteering and participating in local initiatives that support vulnerable groups in Heraklion.', tag: 'Community', image: true },
    { number: '02', title: 'Awareness & Education', text: 'Learning how thoughtful campaigns can promote mental health, inclusion, and social awareness.', tag: 'Advocacy' },
    { number: '03', title: 'Local Community Initiatives', text: 'Getting involved in action that strengthens solidarity and community life in Heraklion and beyond.', tag: 'Action' },
  ]
  return (
    <section id="projects" className="projects section paper-section">
      <div className="page-shell">
        <Reveal className="section-heading-row">
          <div><Eyebrow>Learning through people, action and community.</Eyebrow><h2>Projects &<br className="mobile-only" /> Involvement</h2></div>
          <p>Small actions matter.<br />This is where learning becomes practice.</p>
        </Reveal>
        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal className="project-row" delay={index * 80} key={project.title}>
              <span className="project-number">{project.number}</span>
              {project.image ? <img src="/assets/community-care.jpg" alt="Hands joined in a gesture of support" loading="lazy" /> : <div className="project-symbol"><Icon name={index === 1 ? 'heart' : 'people'} size={34} /></div>}
              <div className="project-copy"><span className="project-tag">{project.tag}</span><h3>{project.title}</h3><p>{project.text}</p></div>
              <span className="project-arrow"><Icon name="arrow" size={22} /></span>
            </Reveal>
          ))}
        </div>
        <Reveal className="project-quote"><span className="short-rule" /><blockquote>“Communities grow when people care.”</blockquote></Reveal>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="contact-image" />
      <div className="page-shell contact-layout">
        <Reveal className="contact-copy">
          <Eyebrow>Ideas. Conversations. Opportunities.</Eyebrow>
          <h2>Let’s Connect</h2>
          <p>I’d love to hear from you—whether it’s about social work, a project, volunteering opportunities, or simply a thoughtful conversation.</p>
          <div className="contact-links">
            <a href="mailto:?subject=Hello%20Myrsinie"><Icon name="mail" />Start a conversation</a>
            <span><Icon name="pin" />Heraklion, Crete</span>
            <a href="https://github.com/Myrsinie" target="_blank" rel="noreferrer"><Icon name="book" />GitHub / Myrsinie</a>
          </div>
        </Reveal>
        <p className="contact-script">Good conversations<br />create opportunities. ♡</p>
        <footer><span>© {new Date().getFullYear()} Myrsinie</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button></footer>
      </div>
    </section>
  )
}

export default function App() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = navItems.map(([id]) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) setActive(visible[0].target.id)
    }, { rootMargin: '-20% 0px -45%', threshold: [0.1, 0.3, 0.6] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main><Home /><About /><Studies /><Projects /><Contact /></main>
    </>
  )
}
