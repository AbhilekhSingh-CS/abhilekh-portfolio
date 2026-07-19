import { skillGroups } from '../data/skills';
import './Skills.css';

function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <div className="section-head">
          <h2>Skills</h2>
          <p>What I work with day to day.</p>
        </div>

        <div className="skills-table">
          {skillGroups.map(({ group, items }) => (
            <div className="skills-row" key={group}>
              <span className="skills-group">{group}</span>
              <div className="chip-row">
                {items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
