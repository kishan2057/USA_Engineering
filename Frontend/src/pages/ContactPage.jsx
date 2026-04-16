import React, { useEffect, useRef, useState } from "react";
import "./ContactPage.css";

function useInView(t = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [t]);
  return [ref, inView];
}

export default function ContactPage() {
  const [heroRef, heroIn] = useInView();
  const [formRef, formIn] = useInView();
  const [sent, setSent] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="cp">
      {/* Hero */}
      <section className={`cp__hero ${heroIn ? "cp__hero--visible" : ""}`} ref={heroRef}>
        <div className="cp__hero-bg" />
        <div className="cp__hero-content">
          <p className="cp__tag">C O N T A C T</p>
          <h1>Get In Touch</h1>
          <p>Our team is ready to help with your next engineering project</p>
        </div>
      </section>

      {/* Contact body */}
      <section className={`cp__body ${formIn ? "cp__body--visible" : ""}`} ref={formRef}>

        {/* Info */}
        <div className="cp__info">
          <h2>Let's Work Together</h2>
          <p>Whether you're starting a new project or need expert consultation, we're here to help.</p>

          <div className="cp__info-items">
            {[
              { icon: "📍", label: "Address", value: "410 E Northwest Hwy, Suite #7, Grapevine, TX 76051" },
              { icon: "✉️", label: "Email",   value: "contact@yadavian.com" },
              { icon: "📞", label: "Phone",   value: "+1 (940) 300-2145" },
              { icon: "🕐", label: "Hours",   value: "Mon – Fri: 9:00 AM – 6:00 PM" },
            ].map((item, i) => (
              <div className="cp__info-item" key={i} style={{ "--i": i }}>
                <span className="cp__info-icon">{item.icon}</span>
                <div>
                  <p className="cp__info-label">{item.label}</p>
                  <p className="cp__info-value">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="cp__form-wrap">
          {sent ? (
            <div className="cp__success">
              <span>✅</span>
              <h3>Message Sent!</h3>
              <p>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className="cp__form" onSubmit={handleSubmit}>
              <h3>Send Us a Message</h3>
              <div className="cp__form-row">
                <div className="cp__field">
                  <label>First Name</label>
                  <input type="text" placeholder="John" required />
                </div>
                <div className="cp__field">
                  <label>Last Name</label>
                  <input type="text" placeholder="Doe" required />
                </div>
              </div>
              <div className="cp__field">
                <label>Email</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className="cp__field">
                <label>Phone</label>
                <input type="tel" placeholder="+1 (000) 000-0000" />
              </div>
              <div className="cp__field">
                <label>Service Needed</label>
                <select>
                  <option>MEP Design</option>
                  <option>Fire Protection</option>
                  <option>Fire Alarm & Safety</option>
                  <option>Mechanical / HVAC</option>
                  <option>Plumbing</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="cp__field">
                <label>Message</label>
                <textarea rows="5" placeholder="Tell us about your project..." required />
              </div>
              <button type="submit" className="cp__submit">Send Message</button>
            </form>
          )}
        </div>

      </section>
      {/* Map Section */}
      <div className="cp__map-section">
        <div className="cp__map-header">
          <h3>📍 Find Us</h3>
          <p>410 E Northwest Hwy, Grapevine, TX 76051, USA</p>
        </div>
        <div className="cp__map-wrap">
          <iframe
            title="Yadavian Engineering Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.123456789!2d-97.0780!3d32.9343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e47b1b1b1b1b1%3A0x1234567890abcdef!2s410%20E%20Northwest%20Hwy%2C%20Grapevine%2C%20TX%2076051%2C%20USA!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          className="cp__map-link"
          href="https://maps.google.com/?q=410+E+Northwest+Hwy,+Grapevine,+TX+76051,+USA"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps →
        </a>
      </div>
    </div>
  );
}
