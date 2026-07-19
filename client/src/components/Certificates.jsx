import { certificates } from '../data/certificates';
import './Certificates.css';

function Certificates() {
  return (
    <section id="certificates">
      <div className="container">
        <div className="section-head">
          <h2>Certificates</h2>
          <p>Courses I have completed end to end, not just enrolled in.</p>
        </div>

        <ul className="cert-list">
          {certificates.map((cert) => (
            <li key={cert.title} className="cert-row">
              <div>
                <span className="cert-title">{cert.title}</span>
                <span className="cert-issuer">{cert.issuer}</span>
              </div>
              <div className="cert-right">
                <span className="cert-year">{cert.year}</span>
                {cert.url && (
                  <a href={cert.url} target="_blank" rel="noreferrer">
                    View credential →
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Certificates;
