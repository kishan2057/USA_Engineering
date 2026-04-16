import React, { useEffect, useRef, useState } from "react";
import "./BlogPage.css";

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

const POSTS = [
  {
    tag: "MEP Design", date: "March 12, 2025",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&auto=format&fit=crop",
    title: "Top 5 MEP Trends Shaping Commercial Buildings in 2025",
    excerpt: "From smart building automation to net-zero energy systems, discover the trends redefining MEP engineering in commercial construction.",
    content: `The MEP engineering landscape is evolving rapidly. Here are the top 5 trends shaping commercial buildings in 2025:\n\n1. Smart Building Automation\nBuilding Management Systems (BMS) are becoming more intelligent, integrating AI to optimize energy use, predict maintenance needs, and improve occupant comfort in real time.\n\n2. Net-Zero Energy Design\nWith tightening energy codes and sustainability mandates, MEP engineers are designing systems that produce as much energy as they consume — through solar integration, heat recovery, and ultra-efficient HVAC.\n\n3. Electrification of Everything\nNatural gas is being phased out in many jurisdictions. All-electric buildings with heat pumps, induction cooking, and EV charging are becoming the new standard.\n\n4. Advanced Indoor Air Quality\nPost-pandemic awareness has elevated IAQ standards. Engineers are specifying MERV-13+ filtration, UV-C disinfection, and demand-controlled ventilation as baseline requirements.\n\n5. Digital Twin Technology\nBIM models are evolving into live digital twins — real-time virtual replicas of building systems that enable predictive maintenance and performance optimization.`,
    readTime: "5 min read",
  },
  {
    tag: "Fire Protection", date: "February 28, 2025",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop",
    title: "Understanding NFPA 13 Updates and What They Mean for Your Project",
    excerpt: "The latest NFPA 13 revisions bring significant changes to sprinkler system design. Here's what engineers and developers need to know.",
    content: `NFPA 13 is the standard for the installation of sprinkler systems, and its latest edition brings several important changes:\n\nKey Updates:\n\n• Residential Sprinkler Coverage\nNew provisions clarify coverage requirements for residential occupancies, including updated obstruction rules and extended coverage sprinkler applications.\n\n• Storage Occupancy Changes\nSignificant revisions to storage protection requirements reflect modern warehousing practices, including high-piled storage and rack storage configurations.\n\n• Concealed Space Protection\nUpdated guidance on when concealed spaces require sprinkler protection, with clearer definitions of combustible vs. non-combustible construction.\n\n• Hydraulic Calculation Updates\nRefined calculation methods for system design, including updated k-factors and pressure requirements for newer sprinkler technologies.\n\nWhat This Means for Your Project:\nProjects permitted under the new edition must comply with updated requirements. Yadavian Engineering stays current with all NFPA updates to ensure your project is designed to the latest standards from day one.`,
    readTime: "4 min read",
  },
  {
    tag: "Sustainability", date: "January 15, 2025",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&auto=format&fit=crop",
    title: "Energy-Efficient HVAC Design for High-Rise Residential Buildings",
    excerpt: "How modern HVAC strategies are helping high-rise developers meet energy codes while reducing operational costs.",
    content: `High-rise residential buildings present unique HVAC challenges — and opportunities. Here's how modern engineering approaches are delivering better results:\n\nChallenge 1: Stack Effect\nTall buildings experience significant pressure differences between floors. Modern HVAC design uses pressurization strategies and vestibule design to control air infiltration and maintain comfort.\n\nChallenge 2: Diverse Occupancy Loads\nResidents have varying schedules and preferences. Variable Refrigerant Flow (VRF) systems allow individual unit control while maintaining central plant efficiency.\n\nKey Strategies:\n\n• Heat Recovery Ventilators (HRV/ERV)\nRecovering energy from exhaust air can reduce heating and cooling loads by 60-80%, dramatically cutting energy costs.\n\n• High-Performance Envelope\nWorking with architects to optimize window-to-wall ratios and specify high-performance glazing reduces peak loads and improves comfort.\n\n• Domestic Hot Water Heat Pumps\nHeat pump water heaters are 3-4x more efficient than traditional electric resistance systems, a major win in all-electric buildings.\n\n• Energy Modeling\nWe use EnergyPlus and eQUEST to model building performance and optimize system selection before construction begins.`,
    readTime: "6 min read",
  },
  {
    tag: "Electrical", date: "December 5, 2024",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
    title: "EV Charging Infrastructure: Planning for the Future",
    excerpt: "As electric vehicles become mainstream, building owners must plan electrical infrastructure now to avoid costly retrofits later.",
    content: `Electric vehicle adoption is accelerating. Buildings that aren't EV-ready today will face expensive retrofits tomorrow. Here's what you need to know:\n\nCurrent Code Requirements:\nNYC Local Law 55 and similar regulations in other jurisdictions now require EV-ready parking spaces in new construction. Requirements vary by building type and number of spaces.\n\nInfrastructure Planning:\n\n• Conduit & Wiring\nInstalling conduit and wiring during construction costs a fraction of what it costs to retrofit. We design EV-ready infrastructure that can be activated as demand grows.\n\n• Electrical Service Capacity\nEV charging can significantly increase electrical demand. Load analysis and service sizing must account for future EV penetration rates.\n\n• Smart Charging Systems\nLoad management systems prevent demand spikes by intelligently distributing available power among multiple chargers.\n\n• Level 2 vs. DC Fast Charging\nFor most residential and commercial applications, Level 2 (240V) charging is sufficient. DC fast charging is appropriate for high-turnover retail and hospitality applications.\n\nOur Recommendation:\nPlan for 20% EV penetration at minimum. Install conduit to all spaces and wire at least 10% of spaces with Level 2 chargers from day one.`,
    readTime: "5 min read",
  },
  {
    tag: "Plumbing", date: "November 20, 2024",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop",
    title: "Water Conservation Strategies in Modern Plumbing Design",
    excerpt: "Innovative plumbing design techniques that reduce water consumption while maintaining performance and code compliance.",
    content: `Water conservation is no longer optional — it's a code requirement and a cost-saving imperative. Here are the strategies we use:\n\nFixture Selection:\n\n• WaterSense Certified Fixtures\nEPA WaterSense labeled fixtures use at least 20% less water than standard fixtures. For a 200-unit residential building, this can save millions of gallons annually.\n\n• Dual-Flush Toilets\nDual-flush toilets use 1.1 gpf for liquid waste and 1.6 gpf for solid waste, compared to 1.6 gpf for all flushes in standard toilets.\n\nSystem Design:\n\n• Hot Water Recirculation\nRecirculation systems eliminate the wait for hot water, saving both water and energy. Demand-controlled systems only run when needed.\n\n• Greywater Recycling\nIn applicable jurisdictions, greywater from sinks and showers can be treated and reused for toilet flushing, reducing potable water demand by 30%.\n\n• Rainwater Harvesting\nRoof runoff can be collected, filtered, and used for irrigation and toilet flushing. We design complete rainwater harvesting systems that comply with local regulations.\n\n• Pressure Regulation\nExcessive water pressure wastes water and accelerates fixture wear. Pressure reducing valves (PRVs) maintain optimal pressure throughout the building.`,
    readTime: "5 min read",
  },
  {
    tag: "Industry News", date: "October 8, 2024",
    img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&auto=format&fit=crop",
    title: "NYC Local Law 97: What Building Owners Must Do Now",
    excerpt: "New York City's landmark climate law is already in effect. Here's how MEP upgrades can help you avoid significant penalties.",
    content: `NYC Local Law 97 is the most ambitious building emissions law in the United States. Here's what building owners need to know:\n\nWhat is Local Law 97?\nPassed in 2019 as part of the Climate Mobilization Act, LL97 sets carbon emissions limits for buildings over 25,000 sq ft. Buildings that exceed their limits face fines of $268 per metric ton of CO2 over the cap.\n\nTimeline:\n• 2024-2029: First compliance period (relatively lenient caps)\n• 2030-2034: Significantly stricter caps\n• 2035+: Near-zero emissions required\n\nHow MEP Upgrades Help:\n\n• HVAC Electrification\nReplacing gas-fired heating with heat pumps dramatically reduces carbon emissions. This is often the single most impactful upgrade.\n\n• LED Lighting Retrofits\nLighting upgrades reduce electrical consumption and associated emissions. Payback periods are typically 2-4 years.\n\n• Building Envelope Improvements\nReducing heat loss through better insulation and windows reduces HVAC loads and emissions.\n\n• Energy Management Systems\nSmart controls optimize system operation and can reduce energy use by 15-30% with minimal capital investment.\n\nOur LL97 Services:\nYadavian Engineering provides LL97 compliance assessments, carbon reduction roadmaps, and MEP upgrade design to help building owners minimize penalties and achieve compliance cost-effectively.`,
    readTime: "7 min read",
  },
];

function Modal({ post, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div className="bp__backdrop" onClick={onClose}>
      <div className="bp__modal" onClick={(e) => e.stopPropagation()}>
        <button className="bp__modal-close" onClick={onClose}>✕</button>

        <div className="bp__modal-hero">
          <img src={post.img} alt={post.title} />
          <div className="bp__modal-hero-overlay" />
          <span className="bp__modal-tag-badge">{post.tag}</span>
        </div>

        <div className="bp__modal-body">
          <div className="bp__modal-meta">
            <span>📅 {post.date}</span>
            <span>⏱ {post.readTime}</span>
          </div>
          <h2>{post.title}</h2>
          <div className="bp__modal-content">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i} className={para.startsWith("•") || /^\d\./.test(para) ? "bp__modal-bullet" : ""}>{para}</p>
            ))}
          </div>
          <div className="bp__modal-footer">
            <p>Have questions about this topic?</p>
            <button className="bp__modal-btn" onClick={() => { onClose(); window.location.href = "/contact"; }}>Contact Our Engineers →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [heroRef, heroIn] = useInView();
  const [gridRef, gridIn] = useInView(0.05);
  const [selected, setSelected] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bp">
      <section className={`bp__hero ${heroIn ? "bp__hero--visible" : ""}`} ref={heroRef}>
        <div className="bp__hero-bg" />
        <div className="bp__hero-content">
          <p className="bp__tag">B L O G</p>
          <h1>Insights & Updates</h1>
          <p>Engineering knowledge, industry news, and project insights</p>
        </div>
      </section>

      <section className={`bp__grid ${gridIn ? "bp__grid--visible" : ""}`} ref={gridRef}>
        {POSTS.map((post, i) => (
          <article className="bp__card" key={i} style={{ "--i": i }}>
            <div className="bp__card-img">
              <img src={post.img} alt={post.title} />
              <span className="bp__card-tag">{post.tag}</span>
            </div>
            <div className="bp__card-body">
              <p className="bp__card-date">{post.date} · {post.readTime}</p>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <button className="bp__read-more" onClick={() => setSelected(post)}>Read More →</button>
            </div>
          </article>
        ))}
      </section>

      {selected && <Modal post={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
