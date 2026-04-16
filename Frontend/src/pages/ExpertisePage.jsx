import React, { useEffect, useRef, useState } from "react";
import "./ExpertisePage.css";

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

const INDUSTRIES = [
  {
    label: "Commercial Buildings",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&auto=format&fit=crop",
    desc: "Office towers, retail centers, and mixed-use developments designed for efficiency and code compliance.",
    details: {
      overview: "We deliver full MEP and Fire Protection engineering for commercial buildings of all scales — from boutique retail to high-rise office towers. Our designs prioritize energy efficiency, occupant comfort, and long-term operational savings.",
      scope: ["Office Buildings & Towers", "Retail Centers & Malls", "Mixed-Use Developments", "Corporate Campuses", "Data Centers", "Parking Structures"],
      highlights: ["Energy-efficient HVAC systems", "Smart lighting & controls", "Code-compliant fire protection", "EV charging infrastructure", "BMS integration"],
    },
  },
  {
    label: "Residential Developments",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&auto=format&fit=crop",
    desc: "High-rise condos, multi-family housing, and luxury residences with smart MEP systems.",
    details: {
      overview: "From luxury condominiums to affordable multi-family housing, we engineer MEP systems that enhance resident comfort, reduce energy costs, and meet all NYC and Tri-State building codes.",
      scope: ["High-Rise Condominiums", "Multi-Family Housing", "Luxury Residences", "Affordable Housing", "Mixed-Income Developments", "Senior Living Facilities"],
      highlights: ["In-unit HVAC systems", "Domestic hot water systems", "Fire sprinkler & alarm systems", "Smart home integration", "Energy code compliance"],
    },
  },
  {
    label: "Industrial Facilities",
    img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=700&auto=format&fit=crop",
    desc: "Manufacturing plants, warehouses, and industrial complexes with robust mechanical and electrical systems.",
    details: {
      overview: "Industrial facilities demand robust, reliable engineering. We design MEP systems that handle heavy loads, harsh environments, and complex process requirements while maintaining safety and compliance.",
      scope: ["Manufacturing Plants", "Warehouses & Distribution", "Food Processing Facilities", "Chemical Plants", "Power Generation", "Utility Infrastructure"],
      highlights: ["Heavy-duty electrical systems", "Industrial ventilation & exhaust", "Process piping & plumbing", "Hazardous area classification", "Fire suppression for high-piled storage"],
    },
  },
  {
    label: "Hospitality & Leisure",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&auto=format&fit=crop",
    desc: "Hotels, resorts, and entertainment venues with premium comfort and energy-efficient systems.",
    details: {
      overview: "Hospitality projects require exceptional comfort, aesthetic integration, and energy efficiency. We engineer systems that enhance the guest experience while minimizing operational costs.",
      scope: ["Hotels & Resorts", "Restaurants & Bars", "Spas & Wellness Centers", "Entertainment Venues", "Sports Facilities", "Theme Parks"],
      highlights: ["Zoned HVAC for guest comfort", "Kitchen hood & suppression systems", "Pool & spa mechanical systems", "Decorative lighting design", "Energy management systems"],
    },
  },
  {
    label: "Educational Institutions",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&auto=format&fit=crop",
    desc: "Schools, universities, and research facilities with safe, sustainable engineering solutions.",
    details: {
      overview: "Educational environments require safe, healthy, and sustainable MEP systems. We design solutions that support learning, meet strict safety codes, and achieve sustainability goals.",
      scope: ["K-12 Schools", "Universities & Colleges", "Research Laboratories", "Libraries", "Dormitories", "Athletic Facilities"],
      highlights: ["IAQ-focused ventilation systems", "Lab exhaust & fume hoods", "Fire alarm & mass notification", "Sustainable HVAC design", "LEED documentation support"],
    },
  },
  {
    label: "Healthcare Facilities",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&auto=format&fit=crop",
    desc: "Hospitals, clinics, and medical centers meeting the strictest health and safety standards.",
    details: {
      overview: "Healthcare facilities have the most demanding MEP requirements. We engineer systems that ensure patient safety, infection control, and 24/7 reliability while meeting all FGI and NFPA standards.",
      scope: ["Hospitals & Medical Centers", "Outpatient Clinics", "Surgical Centers", "Dental Offices", "Imaging & Radiology", "Pharmaceutical Facilities"],
      highlights: ["Medical gas systems", "Infection control ventilation", "Emergency power systems", "NFPA 99 compliance", "Nurse call & life safety systems"],
    },
  },
];

function Modal({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div className="ep__backdrop" onClick={onClose}>
      <div className="ep__modal" onClick={(e) => e.stopPropagation()}>
        <button className="ep__modal-close" onClick={onClose}>✕</button>

        <div className="ep__modal-hero">
          <img src={item.img} alt={item.label} />
          <div className="ep__modal-hero-overlay" />
          <h2 className="ep__modal-hero-title">{item.label}</h2>
        </div>

        <div className="ep__modal-body">
          <p className="ep__modal-overview">{item.details.overview}</p>

          <div className="ep__modal-cols">
            <div className="ep__modal-section">
              <h4>Project Scope</h4>
              <ul className="ep__modal-list">
                {item.details.scope.map((s, i) => (
                  <li key={i} style={{ "--i": i }}><span>🏗️</span>{s}</li>
                ))}
              </ul>
            </div>
            <div className="ep__modal-section">
              <h4>Key Highlights</h4>
              <ul className="ep__modal-list">
                {item.details.highlights.map((h, i) => (
                  <li key={i} style={{ "--i": i }}><span>✓</span>{h}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ep__modal-cta">
            <p>Ready to start your {item.label.toLowerCase()} project?</p>
            <button className="ep__modal-btn" onClick={() => { onClose(); window.location.href = "/contact"; }}>Get a Free Consultation →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExpertisePage() {
  const [heroRef, heroIn] = useInView();
  const [gridRef, gridIn] = useInView(0.05);
  const [selected, setSelected] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="ep">
      <section className={`ep__hero ${heroIn ? "ep__hero--visible" : ""}`} ref={heroRef}>
        <div className="ep__hero-bg" />
        <div className="ep__hero-content">
          <p className="ep__tag">E X P E R T I S E</p>
          <h1>We Work Across All Industries</h1>
          <p>Click on any industry to learn more about our expertise</p>
        </div>
      </section>

      <section className={`ep__grid-section ${gridIn ? "ep__grid--visible" : ""}`} ref={gridRef}>
        {INDUSTRIES.map((item, i) => (
          <div className="ep__card" key={i} style={{ "--i": i }} onClick={() => setSelected(item)}>
            <div className="ep__card-img">
              <img src={item.img} alt={item.label} />
              <div className="ep__card-overlay" />
              <div className="ep__card-click-hint">Click to explore →</div>
            </div>
            <div className="ep__card-body">
              <h3>{item.label}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
