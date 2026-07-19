import { profile } from '../data/profile';
import photo from '../assets/profile-photo.jpg';
import './Navbar.css';

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Profiles', href: '#profiles' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Extracurricular', href: '#extracurricular' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="navbar-brand">
          <img className="navbar-photo" src={photo} alt={profile.name} />
          <span>{profile.name}</span>
        </a>
        <nav className="navbar-links">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
