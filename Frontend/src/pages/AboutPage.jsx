import React, { useEffect, useRef, useState } from "react";
import "./AboutPage.css";

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

const STATS = [
  { value: "500+", label: "Projects Completed" },
  { value: "15+",  label: "Years Experience" },
  { value: "3",    label: "States Covered" },
  { value: "50+",  label: "Expert Engineers" },
];

const VALUES = [
  { icon: "🎯", title: "Precision", desc: "Every design is engineered to exact specifications, ensuring code compliance and optimal performance." },
  { icon: "💡", title: "Innovation", desc: "We leverage the latest technologies and methodologies to deliver forward-thinking solutions." },
  { icon: "🤝", title: "Integrity", desc: "Transparent communication and honest partnerships form the foundation of every project." },
  { icon: "⚡", title: "Excellence", desc: "We hold ourselves to the highest standards in every deliverable, from concept to closeout." },
];

export default function AboutPage() {
  const [heroRef, heroIn] = useInView(0.1);
  const [statsRef, statsIn] = useInView(0.1);
  const [valuesRef, valuesIn] = useInView(0.1);
  const [teamRef, teamIn] = useInView(0.1);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="ap">

      {/* ── Hero Banner ── */}
      <section className={`ap__hero ${heroIn ? "ap__hero--visible" : ""}`} ref={heroRef}>
        <div className="ap__hero-bg" />
        <div className="ap__hero-content">
          <p className="ap__tag">A B O U T &nbsp; U S</p>
          <h1 className="ap__hero-title">Who We Are</h1>
          <p className="ap__hero-sub">
            Yadavian Engineering is a certified MEP and Fire Protection engineering firm
            delivering innovative, code-compliant design solutions across New York, New Jersey, and Connecticut.
          </p>
        </div>
        <div className="ap__hero-scroll">
          <span />
        </div>
      </section>

      {/* ── Stats ── */}
      <section className={`ap__stats ${statsIn ? "ap__stats--visible" : ""}`} ref={statsRef}>
        {STATS.map((s, i) => (
          <div className="ap__stat" key={i} style={{ "--i": i }}>
            <h3>{s.value}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* ── Story ── */}
      <section className="ap__story">
        <div className="ap__story-img">
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&auto=format&fit=crop" alt="Engineering" />
          <div className="ap__story-badge">Est. 2009</div>
        </div>
        <div className="ap__story-text">
          <p className="ap__tag">O U R &nbsp; S T O R Y</p>
          <h2>Building the Future, One Project at a Time</h2>
          <p>
            Yadavian Engineering was founded with a singular mission — to deliver world-class MEP
            and Fire Protection engineering services that exceed client expectations. Over the years,
            we have grown into a trusted partner for architects, developers, and contractors across
            the Tri-State region.
          </p>
          <p>
            Our portfolio spans high-rise residential towers, commercial fit-outs, hospitality spaces,
            retail, food service, and fitness facilities. We take a hands-on approach from schematic
            design to construction closeout — ensuring your expectations are clearly understood and
            consistently met.
          </p>
          <button className="ap__btn" onClick={() => window.location.href = "/contact"}>Get In Touch</button>
        </div>
      </section>

      {/* ── Values ── */}
      <section className={`ap__values ${valuesIn ? "ap__values--visible" : ""}`} ref={valuesRef}>
        <div className="ap__values-header">
          <p className="ap__tag">O U R &nbsp; V A L U E S</p>
          <h2>What Drives Us</h2>
        </div>
        <div className="ap__values-grid">
          {VALUES.map((v, i) => (
            <div className="ap__value-card" key={i} style={{ "--i": i }}>
              <span className="ap__value-icon">{v.icon}</span>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className={`ap__team ${teamIn ? "ap__team--visible" : ""}`} ref={teamRef}>
        <p className="ap__tag" style={{ textAlign: "center" }}>O U R &nbsp; T E A M</p>
        <h2 style={{ textAlign: "center", fontSize: "42px", fontWeight: 800, color: "#1a1a2e", marginBottom: "48px" }}>
          Licensed Professional Engineers
        </h2>
        <div className="ap__team-grid">
          {[
            { name: "Lead MEP Engineer",       role: "Mechanical & Electrical",  img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop" },
            { name: "Fire Protection Engineer", role: "Fire & Life Safety",       img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop" },
            { name: "Plumbing Engineer",        role: "Plumbing & Gas Systems",   img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop" },
          ].map((m, i) => (
            <div className="ap__team-card" key={i} style={{ "--i": i }}>
              <div className="ap__team-img">
                <img src={m.img} alt={m.name} />
              </div>
              <h4>{m.name}</h4>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
