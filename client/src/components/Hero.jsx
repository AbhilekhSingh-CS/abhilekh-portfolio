import { useState } from 'react';
import { profile } from '../data/profile';
import './Hero.css';

function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be blocked on plain http — the mailto link
      // right next to the button still works, so we just do nothing here.
    }
  };

  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="hero-kicker">Hello, I&rsquo;m</p>
          <h1>{profile.name}</h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions">
            <a className="btn" href={`mailto:${profile.email}`}>
              Email me
            </a>
            <a
              className="btn secondary"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <aside className="contact-card">
          <h2>Contact</h2>
          <p className="contact-availability">{profile.availability}</p>

          <div className="contact-row">
            <span className="contact-label">Email</span>
            <span className="contact-value">
              <a className="email-highlight" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <button className="copy-btn" onClick={copyEmail} type="button">
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </span>
          </div>

          <div className="contact-row">
            <span className="contact-label">Phone</span>
            <span className="contact-value">
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            </span>
          </div>

          <div className="contact-row">
            <span className="contact-label">Based in</span>
            <span className="contact-value">{profile.location}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Hero;
