import { codingProfiles } from '../data/profiles';
import './Profiles.css';

function Profiles() {
  return (
    <section id="profiles">
      <div className="container">
        <div className="section-head">
          <h2>Profiles</h2>
          <p>Where my work actually lives — code, problem solving and everything else.</p>
        </div>

        <div className="profiles-grid">
          {codingProfiles.map((item) => (
            <a
              key={item.name}
              className="profile-card"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="profile-top">
                <h3>{item.name}</h3>
                <span className="profile-handle">{item.handle}</span>
              </div>
              <p>{item.blurb}</p>
              <span className="profile-link">Visit profile →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Profiles;
