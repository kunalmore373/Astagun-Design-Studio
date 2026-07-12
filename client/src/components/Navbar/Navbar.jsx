import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'DESIGN PROCESS', path: '/#process' },
    { label: 'PROJECTS', path: '/projects' },
    { label: 'SERVICES', path: '/#services' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner">
        <div className="navbar__left">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="navbar__link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link to="/" className="navbar__logo">
          ArcSphere Studio
        </Link>

        <div className="navbar__right">
          <Link to="/contact" className="btn btn-ghost navbar__cta">
            CONTACT US
          </Link>
        </div>

        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${mobileOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {navLinks.map((link) => (
          <Link key={link.label} to={link.path} className="navbar__mobile-link">
            {link.label}
          </Link>
        ))}
        <Link to="/contact" className="btn btn-primary" style={{ marginTop: '16px', width: '100%' }}>
          CONTACT US
        </Link>
      </div>
    </header>
  );
}
