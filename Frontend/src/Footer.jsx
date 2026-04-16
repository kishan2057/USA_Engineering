import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const SERVICES_LINKS = [
  { label: "Electrical",          to: "/services" },
  { label: "Fire Alarm and Safety", to: "/services" },
  { label: "Fire Protection",     to: "/services" },
  { label: "Mechanical",          to: "/services" },
  { label: "Plumbing",            to: "/services" },
  { label: "Other Services",      to: "/services" },
];

const QUICK = [
  { label: "Services",  to: "/services" },
  { label: "Expertise", to: "/expertise" },
  { label: "About",     to: "/about" },
  { label: "Contact",   to: "/contact" },
];

export default function Footer() {
  const [ref, inView] = useInView();

  return (
    <footer className={`footer ${inView ? "footer--visible" : ""}`} ref={ref}>

      {/* animated gradient top border */}
      <div className="footer__topbar" />

      <div className="footer__main">

        {/* Col 1 — Brand */}
        <div className="footer__col footer__brand" style={{ "--i": 0 }}>
          <div className="footer__logo">
            <div className="footer__logo-icon">
              <span>YE</span>
              <div className="footer__logo-ring" />
            </div>
            <div className="footer__logo-text">
              <span className="footer__logo-name">YADAVIAN</span>
              <span className="footer__logo-sub">ENGINEERING</span>
            </div>
          </div>
          <p className="footer__brand-desc">
            Yadavian Engineering is a certified MEP (Mechanical, Electrical, and Plumbing)
            and Fire Protection engineering firm providing comprehensive engineering design services.
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" className="footer__social" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2 — Services */}
        <div className="footer__col" style={{ "--i": 1 }}>
          <h4 className="footer__col-title">Services</h4>
          <ul className="footer__links">
            {SERVICES_LINKS.map((s, i) => (
              <li key={i}><Link to={s.to}>{s.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Quick Links */}
        <div className="footer__col" style={{ "--i": 2 }}>
          <h4 className="footer__col-title">Quick Links</h4>
          <ul className="footer__links">
            {QUICK.map((q, i) => (
              <li key={i}><Link to={q.to}>{q.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Contact */}
        <div className="footer__col" style={{ "--i": 3 }}>
          <h4 className="footer__col-title">Contact</h4>
          <ul className="footer__contact-list">
            <li>
              <span className="footer__contact-icon">📍</span>
              410 E Northwest Hwy, Suite #7,<br />Grapevine, TX 76051
            </li>
            <li>
              <span className="footer__contact-icon">✉️</span>
              <a href="mailto:contact@yadavian.com">contact@yadavian.com</a>
            </li>
            <li>
              <span className="footer__contact-icon">📞</span>
              <a href="tel:+19403002145">+1 (940) 300-2145</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p>Copyright © 2026 · by Yadavian™ | IT Home Pvt.Ltd</p>
        <div className="footer__bottom-links">
          <a href="#">Terms &amp; Condition</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>

    </footer>
  );
}
