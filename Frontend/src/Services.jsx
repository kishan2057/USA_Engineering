import React, { useEffect, useRef, useState } from "react";
import "./Services.css";

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

const SERVICES = [
  {
    title: "Electrical",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop",
    desc: "We deliver advanced, code-compliant electrical systems built for safety, efficiency, and long-term scalability. Our expertise covers power distribution, intelligent lighting, backup generation, and utility coordination for residential, commercial, and industrial projects.",
  },
  {
    title: "Fire Alarm and Safety",
    img: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500&auto=format&fit=crop",
    desc: "We design and engineer life-safety systems that ensure rapid hazard detection, seamless emergency response, and regulatory compliance. Our fire alarm solutions focus on early warning, efficient evacuation, and centralized control integration.",
  },
  {
    title: "Fire Protection",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop",
    desc: "We engineer high-performance fire suppression systems to protect lives, assets, and critical infrastructure. Our scalable solutions meet stringent NFPA, FDNY, and NYC DOB standards for residential, commercial, and mission-critical environments.",
  },
  {
    title: "Mechanical",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&auto=format&fit=crop",
    desc: "We provide advanced HVAC and mechanical systems designed for consistent comfort, energy efficiency, and scalable performance. Our solutions deliver optimal indoor conditions and smart climate control for all building types year-round.",
  },
  {
    title: "Plumbing",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&auto=format&fit=crop",
    desc: "We design reliable, efficient plumbing systems that meet strict regulatory standards and support water conservation. Our expertise spans domestic water supply, natural gas distribution, and advanced drainage solutions for diverse property needs.",
  },
  {
    title: "Other Services",
    img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=500&auto=format&fit=crop",
    desc: "We offer specialized inspections, technical peer reviews, and system evaluations to ensure top-quality performance and regulatory compliance. Our independent assessments minimize risks, optimize costs, and strengthen project execution at every stage.",
  },
];

export default function Services() {
  const [sectionRef, inView] = useInView();

  return (
    <section className={`services ${inView ? "services--visible" : ""}`} ref={sectionRef}>

      {/* Header */}
      <div className="services__header">
        <p className="services__tag">S E R V I C E S</p>
        <h2 className="services__title">What We Do</h2>
        <p className="services__sub">Providing Engineering Design Solutions Across These Key Sectors</p>
      </div>

      {/* Grid */}
      <div className="services__grid">
        {SERVICES.map((s, i) => (
          <div className="services__card" key={i} style={{ "--i": i }}>
            <div className="services__img-wrap">
              <img src={s.img} alt={s.title} />
              <div className="services__img-overlay" />
            </div>
            <h3 className="services__card-title">{s.title}</h3>
            <p className="services__card-desc">{s.desc}</p>
            <button className="services__btn">Read More</button>
          </div>
        ))}
      </div>

    </section>
  );
}
