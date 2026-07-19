import { useEffect, useState } from 'react';
import ProjectModal from './ProjectModal.jsx';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('Bad response');
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  // Called after an edit or a video upload so the list stays in sync
  const handleUpdated = (updated) => {
    setProjects((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    setSelected(updated);
  };

  return (
    <section id="projects">
      <div className="container">
        <div className="section-head">
          <h2>Projects</h2>
          <p>Things I have actually built and shipped. Click any project for the full story and a video walkthrough.</p>
        </div>

        {status === 'loading' && <p className="projects-note">Loading projects…</p>}

        {status === 'error' && (
          <p className="projects-note">
            Couldn&rsquo;t load projects — make sure the backend server is running
            (<code>npm run dev</code> inside the <code>server</code> folder).
          </p>
        )}

        <div className="projects-grid">
          {projects.map((project) => (
            <article
              key={project._id}
              className="project-card"
              onClick={() => setSelected(project)}
              onKeyDown={(e) => e.key === 'Enter' && setSelected(project)}
              tabIndex={0}
              role="button"
            >
              <h3>{project.title}</h3>
              <p className="project-tagline">{project.tagline}</p>
              <div className="chip-row">
                {project.tech.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <span className="project-more">View details →</span>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
          onUpdated={handleUpdated}
        />
      )}
    </section>
  );
}

export default Projects;
