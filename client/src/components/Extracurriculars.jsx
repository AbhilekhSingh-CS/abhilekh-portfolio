import { extracurriculars } from '../data/extracurriculars';
import './Extracurriculars.css';

function Extracurriculars() {
  return (
    <section id="extracurricular">
      <div className="container">
        <div className="section-head">
          <h2>Extracurricular</h2>
          <p>What I do beyond the codebase.</p>
        </div>

        <ul className="extra-list">
          {extracurriculars.map((item) => (
            <li key={item.title} className="extra-row">
              <div className="extra-head">
                <span className="extra-title">{item.title}</span>
                {item.period && <span className="extra-period">{item.period}</span>}
              </div>
              <p className="extra-description">{item.description}</p>
              {item.url && (
                <a href={item.url} target="_blank" rel="noreferrer">
                  Have a look →
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Extracurriculars;
