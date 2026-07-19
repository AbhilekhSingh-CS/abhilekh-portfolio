import { useEffect, useRef, useState } from 'react';
import './ProjectModal.css';

// The admin key is asked for once and kept in localStorage so editing stays
// painless. If the server rejects it (401) we clear it and ask again.
function getAdminKey() {
  let key = localStorage.getItem('portfolio-admin-key');
  if (!key) {
    key = window.prompt('Enter the admin key (the one set in server/.env):') || '';
    if (key) localStorage.setItem('portfolio-admin-key', key);
  }
  return key;
}

async function authedFetch(url, options = {}, retry = true) {
  const res = await fetch(url, {
    ...options,
    headers: { ...(options.headers || {}), 'x-admin-key': getAdminKey() },
  });
  if (res.status === 401 && retry) {
    localStorage.removeItem('portfolio-admin-key');
    return authedFetch(url, options, false);
  }
  return res;
}

function ProjectModal({ project, onClose, onUpdated }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const startEditing = () => {
    setForm({
      title: project.title,
      tagline: project.tagline,
      description: project.description,
      tech: project.tech.join(', '),
      github: project.github,
      live: project.live,
    });
    setMessage('');
    setEditing(true);
  };

  const setField = (name) => (e) => setForm({ ...form, [name]: e.target.value });

  const saveEdits = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    const res = await authedFetch(`/api/projects/${project._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
      }),
    });
    setBusy(false);
    if (res.ok) {
      onUpdated(await res.json());
      setEditing(false);
      setMessage('Saved.');
    } else {
      setMessage('Save failed — check the admin key and try again.');
    }
  };

  const uploadVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const body = new FormData();
    body.append('video', file);
    setBusy(true);
    setMessage('Uploading video…');
    const res = await authedFetch(`/api/projects/${project._id}/video`, {
      method: 'POST',
      body,
    });
    setBusy(false);
    e.target.value = ''; // allow picking the same file again later
    if (res.ok) {
      onUpdated(await res.json());
      setMessage('Video uploaded.');
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage(data.error || 'Upload failed — check the admin key and try again.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <header className="modal-header">
          <h3>{project.title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close" type="button">
            ×
          </button>
        </header>

        {project.videoUrl && (
          <video
            key={project.videoUrl}
            className="project-video"
            src={project.videoUrl}
            controls
          />
        )}

        {!editing && (
          <div className="modal-body">
            <p className="modal-tagline">{project.tagline}</p>
            {project.description.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <div className="chip-row">
              {project.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <div className="modal-links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer">
                  GitHub repo →
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer">
                  Live site →
                </a>
              )}
            </div>
          </div>
        )}

        {editing && form && (
          <form className="modal-form" onSubmit={saveEdits}>
            <label>
              Title
              <input value={form.title} onChange={setField('title')} required />
            </label>
            <label>
              Tagline
              <input value={form.tagline} onChange={setField('tagline')} />
            </label>
            <label>
              Description (blank line between paragraphs)
              <textarea
                rows={8}
                value={form.description}
                onChange={setField('description')}
              />
            </label>
            <label>
              Tech (comma separated)
              <input value={form.tech} onChange={setField('tech')} />
            </label>
            <label>
              GitHub link
              <input value={form.github} onChange={setField('github')} />
            </label>
            <label>
              Live link
              <input value={form.live} onChange={setField('live')} />
            </label>
            <div className="modal-form-actions">
              <button className="btn" type="submit" disabled={busy}>
                {busy ? 'Saving…' : 'Save changes'}
              </button>
              <button
                className="btn secondary"
                type="button"
                onClick={() => setEditing(false)}
                disabled={busy}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <footer className="modal-admin">
          <span className="modal-admin-label">Owner tools</span>
          {!editing && (
            <div className="modal-admin-actions">
              <button className="btn secondary" onClick={startEditing} type="button">
                Edit details
              </button>
              <button
                className="btn secondary"
                type="button"
                disabled={busy}
                onClick={() => fileInputRef.current.click()}
              >
                {project.videoUrl ? 'Replace walkthrough video' : 'Upload walkthrough video'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={uploadVideo}
                hidden
              />
            </div>
          )}
          {message && <p className="modal-message">{message}</p>}
        </footer>
      </div>
    </div>
  );
}

export default ProjectModal;
