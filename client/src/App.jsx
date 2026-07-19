import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Profiles from './components/Profiles.jsx';
import Certificates from './components/Certificates.jsx';
import Contact from './components/Contact.jsx';
import { profile } from './data/profile';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Profiles />
        <Certificates />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="container">
          © {new Date().getFullYear()} {profile.name} · Built by hand with MongoDB,
          Express, React and Node.
        </div>
      </footer>
    </>
  );
}

export default App;
