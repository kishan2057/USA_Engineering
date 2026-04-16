import React, { useEffect, useRef, useState } from "react";
import "./About.css";

function useInView(threshold = 0.15) {
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

const ITEMS = [
  { num: "1.", title: "Who We Are", text: "A certified MEP and Fire Protection engineering firm serving New York, New Jersey, and Connecticut with precision and expertise." },
  { num: "2.", title: "What Do We Do", text: "We provide comprehensive MEP and Fire Protection design services for new construction and renovation projects." },
  { num: "3.", title: "How Do We Help", text: "Hands-on engineering support from schematic design to construction closeout, keeping your project on time and on budget." },
  { num: "4.", title: "Create Success Story", text: "Licensed professional engineers with years of field experience turning your vision into reality with precision." },
];

const PHOTOS = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&auto=format&fit=crop",
];

export default function About() {
  const [sectionRef, inView] = useInView();

  return (
    <section className={`about ${inView ? "about--visible" : ""}`} ref={sectionRef}>

      {/* ── Left ── */}
      <div className="about__left">
        <p className="about__tag">A B O U T &nbsp; U S</p>
        <h2 className="about__title"><span>Who we are</span></h2>
        <p className="about__desc">
          Our team of experienced engineers specializes in delivering
          code-compliant, energy-efficient, and innovative design solutions
          tailored to meet the needs of architects, developers, and contractors.
        </p>
        <button className="about__learn-btn">Learn more</button>
      </div>

      {/* ── Right ── */}
      <div className="about__right">

        {/* Numbered grid */}
        <div className="about__grid">
          {ITEMS.map((item, i) => (
            <div className="about__item" key={i} style={{ "--i": i }}>
              <span className="about__num">{item.num}</span>
              <h4 className="about__item-title">{item.title}</h4>
              <p className="about__item-text">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Photo collage */}
        <div className="about__photos">
          <img src={PHOTOS[0]} alt="Engineering" className="about__photo about__photo--tall" />
          <div className="about__photos-col">
            <img src={PHOTOS[1]} alt="Engineering" className="about__photo" />
            <img src={PHOTOS[2]} alt="Engineering" className="about__photo" />
          </div>
        </div>

      </div>
    </section>
  );
}
