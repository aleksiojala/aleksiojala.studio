import { site } from '../content.js'

// ABOUT: a big, bold bio statement in the middle, the email address under
// it (clickable), and small INSTAGRAM — LINKEDIN links below.
function About() {
  const links = [
    { label: 'INSTAGRAM', href: site.instagram },
    { label: 'LINKEDIN', href: site.linkedin },
  ]

  return (
    <main className="page page--center">
      <div className="bio">
        {site.bio.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      {site.email && (
        <a className="about-email" href={`mailto:${site.email}`} data-text={site.email}>
          {site.email}
        </a>
      )}

      <ul className="about-links">
        {links.map((link) => (
          <li key={link.label}>
            {/* A link without an address yet is shown dimmed and isn't clickable. */}
            {link.href ? (
              <a href={link.href} target="_blank" rel="noreferrer" data-text={link.label}>
                {link.label}
              </a>
            ) : (
              <span className="dim">{link.label}</span>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default About
