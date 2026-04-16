import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Expertise.css";

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

const INDUSTRIES = [
  { label: "Commercial Buildings",    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&auto=format&fit=crop" },
  { label: "Residential Developments",img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop" },
  { label: "Industrial Facilities",   img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&auto=format&fit=crop" },
  { label: "Hospitality & Leisure",   img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop" },
  { label: "Educational Institutions",img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop" },
  { label: "Healthcare Facilities",   img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop" },
];

export default function Expertise() {
  const [sectionRef, inView] = useInView();
  const navigate = useNavigate();

  return (
    <section className={`expertise ${inView ? "expertise--visible" : ""}`} ref={sectionRef}>

      {/* Header */}
      <div className="expertise__header">
        <p className="expertise__tag">E X P E R T I S E</p>
        <h2 className="expertise__title">We Work Across All Industries</h2>
        <p className="expertise__sub">
          Yadavian Engineering delivers professional MEP/FP design services across diverse sectors,
          creating innovative and tailored solutions to meet your project requirements.
        </p>
      </div>

      {/* Grid — 3 columns, 2 rows */}
      <div className="expertise__grid">
        {INDUSTRIES.map((item, i) => (
          <div className="expertise__card" key={i} style={{ "--i": i }} onClick={() => navigate("/expertise")}>
            <img src={item.img} alt={item.label} />
            <div className="expertise__overlay" />
            <span className="expertise__label">{item.label}</span>
          </div>
        ))}
      </div>

    </section>
  );
}
