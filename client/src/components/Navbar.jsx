import { profile } from '../data/profile';
import './Navbar.css';

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Profiles', href: '#profiles' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="navbar-brand">
          {profile.name}
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
