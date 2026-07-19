import { profile } from '../data/profile';
import './Contact.css';

function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="section-head">
          <h2>Get in touch</h2>
          <p>
            The fastest way to reach me is email — I usually reply within a day.
            Calls and LinkedIn messages work too.
          </p>
        </div>

        <p className="contact-big-email">
          <a className="email-highlight" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </p>

        <div className="contact-extra">
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
          <span aria-hidden="true">·</span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <span aria-hidden="true">·</span>
          <span>{profile.location}</span>
        </div>
      </div>
    </section>
  );
}

export default Contact;
