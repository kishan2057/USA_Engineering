import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Services",  to: "/services" },
  { label: "Expertise", to: "/expertise" },
  { label: "About",     to: "/about" },
  { label: "Blog",      to: "/blog" },
  { label: "Contact",   to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <Link to="/" className="navbar__logo" style={{ textDecoration: "none" }}>
        <div className="navbar__logo-icon">
          <span>YE</span>
          <div className="navbar__logo-ring" />
        </div>
        <div className="navbar__logo-text">
          <span className="navbar__logo-name">YADAVIAN</span>
          <span className="navbar__logo-sub">ENGINEERING</span>
        </div>
      </Link>

      <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <li key={link.label} className={location.pathname === link.to ? "active" : ""}>
            <Link to={link.to} onClick={() => setMenuOpen(false)}>
              {link.label}
              <span className="navbar__link-underline" />
            </Link>
          </li>
        ))}
      </ul>

      <div className="navbar__cta">
        <div className="navbar__cta-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18" height="18">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
          </svg>
          <span className="navbar__cta-pulse" />
        </div>
        <div className="navbar__cta-text">
          <span className="navbar__cta-label">Call Us</span>
          <span className="navbar__cta-number">+1 (940) 300-2145</span>
        </div>
      </div>

      <button
        className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}
