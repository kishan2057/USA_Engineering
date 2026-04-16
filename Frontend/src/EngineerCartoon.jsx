import React, { useEffect, useRef, useState } from "react";
import "./EngineerCartoon.css";

export default function EngineerCartoon() {
  const wrapRef = useRef(null);
  const posRef = useRef({ x: 80, y: 200 });
  const [pos, setPos] = useState({ x: 80, y: 200 });
  const [flipped, setFlipped] = useState(false);
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef(null);
  const hideTimer = useRef(null);

  function resetIdleTimer() {
    setIdle(false);
    clearTimeout(idleTimer.current);
    clearTimeout(hideTimer.current);
    idleTimer.current = setTimeout(() => {
      setIdle(true);
      // auto-hide bubble after 5 seconds
      hideTimer.current = setTimeout(() => setIdle(false), 5000);
    }, 2500);
  }

  useEffect(() => {
    resetIdleTimer();

    function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }

    let lastScroll = window.scrollY;
    function onScroll() {
      const delta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      const newY = clamp(posRef.current.y + delta * 0.5, 60, window.innerHeight - 280);
      posRef.current = { ...posRef.current, y: newY };
      setPos({ ...posRef.current });
      resetIdleTimer();
    }

    function onMouseMove(e) {
      const cx = posRef.current.x + 80;
      const cy = posRef.current.y + 130;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 160) {
        const angle = Math.atan2(dy, dx);
        let nx = posRef.current.x - Math.cos(angle) * 180;
        let ny = posRef.current.y - Math.sin(angle) * 180;
        nx = clamp(nx, 0, window.innerWidth - 160);
        ny = clamp(ny, 60, window.innerHeight - 280);
        setFlipped(Math.cos(angle) > 0);
        posRef.current = { x: nx, y: ny };
        setPos({ x: nx, y: ny });
        resetIdleTimer();
      }
    }

    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouseMove);

    // ── Random position every 5 seconds ──
    const roamInterval = setInterval(() => {
      const nx = clamp(Math.random() * (window.innerWidth - 160), 0, window.innerWidth - 160);
      const ny = clamp(Math.random() * (window.innerHeight - 280), 60, window.innerHeight - 280);
      setFlipped(Math.random() > 0.5);
      posRef.current = { x: nx, y: ny };
      setPos({ x: nx, y: ny });
      resetIdleTimer();
    }, 5000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(idleTimer.current);
      clearTimeout(hideTimer.current);
      clearInterval(roamInterval);
    };
  }, []);

  return (
    <>
      {/* Bubble rendered OUTSIDE the flipped wrapper — always readable */}
      {idle && (
        <div
          className="ec__idle-bubble"
          style={{ left: pos.x - 20 + "px", top: pos.y - 70 + "px" }}
          onClick={() => window.location.href = "/contact"}
        >
          <span className="ec__bubble-title">📞 Contact Us Now!</span>
          <span className="ec__bubble-number">+1 (940) 300-2145</span>
        </div>
      )}

      <div
        className="ec__wrap"
        ref={wrapRef}
        style={{
          left: pos.x + "px",
          top: pos.y + "px",
          transform: flipped ? "scaleX(-1)" : "scaleX(1)",
        }}
      >
      <svg
        className="ec__svg"
        viewBox="0 0 160 260"
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="200"
      >
        {/* Hard hat */}
        <ellipse cx="80" cy="52" rx="38" ry="8" fill="#e6a800" />
        <path d="M44 52 Q44 18 80 16 Q116 18 116 52 Z" fill="#ffc107" />
        <path d="M44 52 Q44 18 80 16 Q116 18 116 52 Z" fill="none" stroke="#333" strokeWidth="2.5" />
        <path d="M62 24 Q70 20 78 22" stroke="#ffe082" strokeWidth="3" strokeLinecap="round" fill="none" />
        <line x1="80" y1="16" x2="80" y2="52" stroke="#e6a800" strokeWidth="2" />
        <ellipse cx="80" cy="52" rx="38" ry="8" fill="#ffc107" stroke="#333" strokeWidth="2" />
        {/* Hair */}
        <path d="M50 54 Q48 62 52 68" stroke="#4a2c0a" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M110 54 Q112 62 108 68" stroke="#4a2c0a" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* Head */}
        <ellipse cx="80" cy="80" rx="28" ry="30" fill="#f5c5a3" stroke="#333" strokeWidth="2" />
        {/* Ears */}
        <ellipse cx="52" cy="80" rx="6" ry="8" fill="#f5c5a3" stroke="#333" strokeWidth="1.5" />
        <ellipse cx="108" cy="80" rx="6" ry="8" fill="#f5c5a3" stroke="#333" strokeWidth="1.5" />
        <ellipse cx="52" cy="80" rx="3" ry="5" fill="#e8a882" />
        <ellipse cx="108" cy="80" rx="3" ry="5" fill="#e8a882" />
        {/* Eyebrows */}
        <path d="M64 66 Q70 63 76 66" stroke="#4a2c0a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M84 66 Q90 63 96 66" stroke="#4a2c0a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Eyes */}
        <circle cx="70" cy="76" r="7" fill="#fff" stroke="#333" strokeWidth="1.5" />
        <circle cx="90" cy="76" r="7" fill="#fff" stroke="#333" strokeWidth="1.5" />
        <circle cx="71" cy="77" r="4" fill="#2c1810" />
        <circle cx="91" cy="77" r="4" fill="#2c1810" />
        <circle cx="72" cy="76" r="1.5" fill="#111" />
        <circle cx="92" cy="76" r="1.5" fill="#111" />
        <circle cx="73" cy="74" r="1.5" fill="#fff" />
        <circle cx="93" cy="74" r="1.5" fill="#fff" />
        {/* Cheeks */}
        <ellipse cx="62" cy="87" rx="7" ry="5" fill="#f4a0a0" opacity="0.5" />
        <ellipse cx="98" cy="87" rx="7" ry="5" fill="#f4a0a0" opacity="0.5" />
        {/* Nose */}
        <ellipse cx="80" cy="85" rx="3" ry="2" fill="#e8a882" />
        {/* Smile */}
        <path d="M68 93 Q80 104 92 93" stroke="#c0724a" strokeWidth="2.5" strokeLinecap="round" fill="#f4a0a0" />
        {/* Neck */}
        <rect x="73" y="108" width="14" height="10" rx="4" fill="#f5c5a3" stroke="#333" strokeWidth="1.5" />
        {/* White shirt */}
        <rect x="55" y="116" width="50" height="60" rx="8" fill="#fff" stroke="#ddd" strokeWidth="1.5" />
        <path d="M73 116 L80 126 L87 116" fill="#fff" stroke="#ccc" strokeWidth="1.5" />
        {/* Blue overalls bib */}
        <rect x="62" y="116" width="36" height="38" rx="6" fill="#1565c0" stroke="#333" strokeWidth="2" />
        <rect x="70" y="124" width="20" height="14" rx="3" fill="#1976d2" stroke="#333" strokeWidth="1.5" />
        <line x1="70" y1="131" x2="90" y2="131" stroke="#333" strokeWidth="1" />
        <circle cx="68" cy="118" r="4" fill="#ffc107" stroke="#333" strokeWidth="1.5" />
        <circle cx="92" cy="118" r="4" fill="#ffc107" stroke="#333" strokeWidth="1.5" />
        <rect x="64" y="112" width="8" height="20" rx="4" fill="#1976d2" stroke="#333" strokeWidth="1.5" />
        <rect x="88" y="112" width="8" height="20" rx="4" fill="#1976d2" stroke="#333" strokeWidth="1.5" />
        {/* Pants */}
        <rect x="58" y="152" width="44" height="52" rx="6" fill="#1565c0" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="152" x2="80" y2="204" stroke="#333" strokeWidth="2" />
        {/* Tool belt */}
        <rect x="56" y="152" width="48" height="10" rx="4" fill="#ffc107" stroke="#333" strokeWidth="2" />
        <rect x="74" y="153" width="12" height="8" rx="2" fill="#e6a800" stroke="#333" strokeWidth="1.5" />
        <rect x="90" y="158" width="20" height="22" rx="4" fill="#ffc107" stroke="#333" strokeWidth="2" />
        <rect x="93" y="155" width="4" height="16" rx="2" fill="#9e9e9e" stroke="#555" strokeWidth="1" />
        <rect x="99" y="155" width="4" height="18" rx="2" fill="#9e9e9e" stroke="#555" strokeWidth="1" />
        <rect x="105" y="155" width="4" height="14" rx="2" fill="#9e9e9e" stroke="#555" strokeWidth="1" />
        <ellipse cx="95" cy="154" rx="3" ry="2" fill="#757575" stroke="#555" strokeWidth="1" />
        <ellipse cx="101" cy="154" rx="3" ry="2" fill="#757575" stroke="#555" strokeWidth="1" />
        <ellipse cx="107" cy="154" rx="3" ry="2" fill="#757575" stroke="#555" strokeWidth="1" />
        {/* Left arm + clipboard */}
        <g className="ec__arm-left">
          <rect x="36" y="118" width="14" height="28" rx="7" fill="#fff" stroke="#ddd" strokeWidth="1.5" />
          <rect x="32" y="142" width="14" height="24" rx="7" fill="#f5c5a3" stroke="#333" strokeWidth="1.5" />
          <ellipse cx="39" cy="168" rx="8" ry="7" fill="#f5c5a3" stroke="#333" strokeWidth="1.5" />
          <rect x="14" y="140" width="26" height="34" rx="3" fill="#8d5524" stroke="#333" strokeWidth="2" />
          <rect x="16" y="144" width="22" height="28" rx="2" fill="#e3f2fd" />
          <rect x="22" y="137" width="10" height="8" rx="2" fill="#90a4ae" stroke="#333" strokeWidth="1.5" />
          <line x1="18" y1="150" x2="36" y2="150" stroke="#90caf9" strokeWidth="1.5" />
          <line x1="18" y1="155" x2="36" y2="155" stroke="#90caf9" strokeWidth="1.5" />
          <line x1="18" y1="160" x2="36" y2="160" stroke="#90caf9" strokeWidth="1.5" />
          <line x1="18" y1="165" x2="30" y2="165" stroke="#90caf9" strokeWidth="1.5" />
        </g>
        {/* Right arm */}
        <g className="ec__arm-right">
          <rect x="110" y="118" width="14" height="28" rx="7" fill="#fff" stroke="#ddd" strokeWidth="1.5" />
          <rect x="112" y="142" width="14" height="20" rx="7" fill="#f5c5a3" stroke="#333" strokeWidth="1.5" />
          <ellipse cx="119" cy="164" rx="8" ry="7" fill="#f5c5a3" stroke="#333" strokeWidth="1.5" />
        </g>
        {/* Left leg */}
        <g className="ec__leg-left">
          <rect x="60" y="200" width="18" height="28" rx="6" fill="#1565c0" stroke="#333" strokeWidth="2" />
          <ellipse cx="69" cy="210" rx="8" ry="5" fill="#e3f2fd" stroke="#333" strokeWidth="1.5" />
          <rect x="56" y="224" width="24" height="14" rx="5" fill="#6d4c41" stroke="#333" strokeWidth="2" />
          <ellipse cx="68" cy="238" rx="14" ry="5" fill="#5d4037" stroke="#333" strokeWidth="1.5" />
        </g>
        {/* Right leg */}
        <g className="ec__leg-right">
          <rect x="82" y="200" width="18" height="28" rx="6" fill="#1565c0" stroke="#333" strokeWidth="2" />
          <ellipse cx="91" cy="210" rx="8" ry="5" fill="#e3f2fd" stroke="#333" strokeWidth="1.5" />
          <rect x="80" y="224" width="24" height="14" rx="5" fill="#6d4c41" stroke="#333" strokeWidth="2" />
          <ellipse cx="92" cy="238" rx="14" ry="5" fill="#5d4037" stroke="#333" strokeWidth="1.5" />
        </g>
        {/* Shadow */}
        <ellipse cx="80" cy="252" rx="30" ry="5" fill="rgba(0,0,0,0.12)" className="ec__shadow" />
      </svg>
    </div>
    </>
  );
}
