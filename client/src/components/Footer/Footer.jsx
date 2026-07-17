import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__top">
          <div className="footer__slogan">
            <h2>OPEN TO NEW PROJECTS<br />AND COLLABORATIONS THAT<br />SHAPE MEANINGFUL SPACES.</h2>
            <Link to="/contact" className="footer__get-in-touch">GET IN TOUCH</Link>
          </div>

          <div className="footer__links-grid">
            <div className="footer__link-col">
              <Link to="/">HOME</Link>
              <Link to="/#about">ABOUT</Link>
              <Link to="/#services">SERVICES</Link>
              <Link to="/projects">PROJECTS</Link>
              <Link to="/#process">PROCESS</Link>
              <Link to="/contact">CONTACT</Link>
            </div>
            <div className="footer__link-col">
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">PINTEREST</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer">BEHANCE</a>
            </div>
            <div className="footer__link-col">
              <a href="#">PRIVACY POLICY</a>
              <a href="#">COOKIE POLICY</a>
              <a href="#">TERMS & CONDITIONS</a>
            </div>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <div className="footer__contact-icons">
            <a href="mailto:hello@arcsphere.studio" aria-label="Email">
              <HiOutlineMail size={20} />
              <span className="footer__icon-text">hello@arcsphere.studio</span>
            </a>
            <span className="footer__icon-sep">|</span>
            <a href="tel:+971559876543" aria-label="Phone">
              <HiOutlinePhone size={20} />
              <span className="footer__icon-text">+971 55 987 6543</span>
            </a>
            <span className="footer__icon-sep">|</span>
            <a href="#" aria-label="Location">
              <HiOutlineLocationMarker size={20} />
              <span className="footer__icon-text">Dubai, UAE</span>
            </a>
          </div>
          <p className="footer__copyright">
            © 2026 Your Architecture Studio. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Marquee Text */}
      <div className="footer__marquee">
        <div className="footer__marquee-content">
          <span>Ashtagun Design Studio </span>
          <span>Ashtagun Design Studio </span>
        </div>
        <div className="footer__marquee-content" aria-hidden="true">
          <span>Ashtagun Design Studio </span>
          <span>Ashtagun Design Studio </span>
        </div>
      </div>

      {/* Footer Image */}
      <div className="footer__image">
        <img src="https://framerusercontent.com/images/3GG8FlJkc5UJfOGjTcx5PwNKKs.jpg?width=1728&height=624" alt="Architecture landscape" />
      </div>
    </footer>
  );
}
