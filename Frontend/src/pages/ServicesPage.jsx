import React, { useEffect, useRef, useState } from "react";
import "./ServicesPage.css";

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
    icon: "⚡", title: "Electrical",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
    desc: "Advanced, code-compliant electrical systems built for safety, efficiency, and long-term scalability.",
    details: {
      overview: "We deliver comprehensive electrical engineering solutions for residential, commercial, and industrial projects. Our team ensures every system is safe, efficient, and built to last.",
      features: [
        "Power distribution system design",
        "Intelligent lighting & controls",
        "Emergency & backup generation",
        "Utility coordination & metering",
        "EV charging infrastructure",
        "Energy management systems",
        "Arc flash hazard analysis",
        "Short circuit & load flow studies",
      ],
      standards: ["NEC (NFPA 70)", "IEEE Standards", "NYC Electrical Code", "OSHA Compliance"],
      process: "Our electrical engineers work from schematic design through construction documents, providing full construction administration support to ensure proper installation.",
    },
  },
  {
    icon: "🔥", title: "Fire Alarm & Safety",
    img: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&auto=format&fit=crop",
    desc: "Life-safety systems ensuring rapid hazard detection, seamless emergency response, and regulatory compliance.",
    details: {
      overview: "We design and engineer state-of-the-art fire alarm and life-safety systems that protect occupants and assets while meeting all regulatory requirements.",
      features: [
        "Addressable fire alarm systems",
        "Mass notification systems",
        "Emergency voice evacuation",
        "Smoke & heat detection",
        "Carbon monoxide detection",
        "Centralized control panels",
        "Wireless fire alarm systems",
        "Integration with building automation",
      ],
      standards: ["NFPA 72", "NFPA 101", "IBC", "FDNY Requirements", "NYC DOB"],
      process: "From system design to commissioning, we handle all aspects of fire alarm engineering including shop drawing review, inspection coordination, and final acceptance testing.",
    },
  },
  {
    icon: "🛡️", title: "Fire Protection",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop",
    desc: "High-performance fire suppression systems meeting NFPA, FDNY, and NYC DOB standards.",
    details: {
      overview: "We engineer high-performance fire suppression systems that protect lives, assets, and critical infrastructure across all building types and occupancies.",
      features: [
        "Wet & dry pipe sprinkler systems",
        "Pre-action & deluge systems",
        "Clean agent suppression (FM-200, Novec)",
        "Kitchen hood suppression systems",
        "Standpipe & hose systems",
        "Fire pump design & sizing",
        "Underground fire mains",
        "Hydraulic calculations",
      ],
      standards: ["NFPA 13", "NFPA 14", "NFPA 20", "FDNY", "NYC DOB", "FM Global"],
      process: "Our fire protection engineers provide complete design services from concept through construction, including hydraulic calculations, equipment specifications, and coordination with AHJs.",
    },
  },
  {
    icon: "❄️", title: "Mechanical / HVAC",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&auto=format&fit=crop",
    desc: "Advanced HVAC systems designed for consistent comfort, energy efficiency, and scalable performance.",
    details: {
      overview: "We provide comprehensive mechanical engineering services, designing HVAC systems that deliver optimal comfort, energy efficiency, and indoor air quality for all building types.",
      features: [
        "Central plant design (chillers, boilers)",
        "Air handling unit selection & design",
        "VAV & VRF system design",
        "Exhaust & ventilation systems",
        "Energy recovery systems",
        "BMS/BAS integration",
        "Duct design & sizing",
        "Thermal comfort analysis",
      ],
      standards: ["ASHRAE Standards", "SMACNA", "IMC", "NYC Mechanical Code", "Energy Code Compliance"],
      process: "We perform detailed load calculations, equipment selection, and system design, followed by energy modeling to optimize performance and meet code requirements.",
    },
  },
  {
    icon: "🔧", title: "Plumbing",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop",
    desc: "Reliable, efficient plumbing systems meeting strict regulatory standards and supporting water conservation.",
    details: {
      overview: "We design complete plumbing systems that are efficient, code-compliant, and built for long-term reliability. Our solutions support water conservation while meeting all performance requirements.",
      features: [
        "Domestic hot & cold water systems",
        "Sanitary & storm drainage",
        "Natural gas distribution",
        "Medical gas systems",
        "Grease interceptor design",
        "Backflow prevention",
        "Water heater & booster pump systems",
        "Rainwater harvesting systems",
      ],
      standards: ["IPC", "NYC Plumbing Code", "ASSE Standards", "NFPA 54 (Gas)", "Water Conservation Codes"],
      process: "Our plumbing engineers design systems from fixture unit calculations through complete construction documents, coordinating with all trades for seamless installation.",
    },
  },
  {
    icon: "🔍", title: "Other Services",
    img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&auto=format&fit=crop",
    desc: "Specialized inspections, technical peer reviews, and system evaluations ensuring top-quality performance.",
    details: {
      overview: "Beyond core MEP design, we offer a range of specialized engineering services to support project quality, compliance, and risk management at every stage.",
      features: [
        "Technical peer reviews",
        "MEP system inspections",
        "Energy audits & benchmarking",
        "Commissioning support",
        "As-built documentation",
        "Feasibility studies",
        "Expert witness services",
        "Code compliance consulting",
      ],
      standards: ["ASHRAE Level I/II/III Audits", "LEED Documentation", "NYC LL87 Compliance", "NYSERDA Programs"],
      process: "We provide independent, objective assessments that help identify risks, optimize costs, and ensure your project meets all applicable codes and standards.",
    },
  },
];

function Modal({ service, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div className="sp__modal-backdrop" onClick={onClose}>
      <div className="sp__modal" onClick={(e) => e.stopPropagation()}>
        <button className="sp__modal-close" onClick={onClose}>✕</button>

        <div className="sp__modal-hero">
          <img src={service.img} alt={service.title} />
          <div className="sp__modal-hero-overlay" />
          <div className="sp__modal-hero-text">
            <span>{service.icon}</span>
            <h2>{service.title}</h2>
          </div>
        </div>

        <div className="sp__modal-body">
          <p className="sp__modal-overview">{service.details.overview}</p>

          <div className="sp__modal-section">
            <h4>Key Features</h4>
            <ul className="sp__modal-features">
              {service.details.features.map((f, i) => (
                <li key={i} style={{ "--i": i }}><span>✓</span>{f}</li>
              ))}
            </ul>
          </div>

          <div className="sp__modal-section">
            <h4>Standards & Codes</h4>
            <div className="sp__modal-tags">
              {service.details.standards.map((s, i) => (
                <span key={i} className="sp__modal-tag">{s}</span>
              ))}
            </div>
          </div>

          <div className="sp__modal-section">
            <h4>Our Process</h4>
            <p className="sp__modal-process">{service.details.process}</p>
          </div>

          <div className="sp__modal-cta">
            <button className="sp__modal-btn" onClick={() => { onClose(); window.location.href = "/contact"; }}>Get a Free Quote →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [heroRef, heroIn] = useInView(0.1);
  const [cardsRef, cardsIn] = useInView(0.05);
  const [selected, setSelected] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="sp">
      <section className={`sp__hero ${heroIn ? "sp__hero--visible" : ""}`} ref={heroRef}>
        <div className="sp__hero-bg" />
        <div className="sp__hero-content">
          <p className="sp__tag">S E R V I C E S</p>
          <h1>What We Do</h1>
          <p>Providing Engineering Design Solutions Across These Key Sectors</p>
        </div>
      </section>

      <section className={`sp__cards ${cardsIn ? "sp__cards--visible" : ""}`} ref={cardsRef}>
        {SERVICES.map((s, i) => (
          <div className="sp__card" key={i} style={{ "--i": i }}>
            <div className="sp__card-img">
              <img src={s.img} alt={s.title} />
              <div className="sp__card-overlay"><span>{s.icon}</span></div>
            </div>
            <div className="sp__card-body">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <button className="sp__btn" onClick={() => setSelected(s)}>Learn More</button>
            </div>
          </div>
        ))}
      </section>

      <section className="sp__cta">
        <h2>Ready to Start Your Project?</h2>
        <p>Our licensed engineers are ready to bring your vision to life.</p>
        <button className="sp__cta-btn" onClick={() => window.location.href = "/contact"}>Contact Us Today</button>
      </section>

      {selected && <Modal service={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
