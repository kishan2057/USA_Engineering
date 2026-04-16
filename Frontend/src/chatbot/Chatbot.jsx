import React, { useState, useRef, useEffect } from "react";
import { getResponse } from "./chatEngine";
import "./Chatbot.css";

const SUGGESTIONS = [
  "What services do you offer?",
  "Where are you located?",
  "How do I get a quote?",
  "Tell me about HVAC",
  "What industries do you serve?",
];

function formatMessage(text) {
  return text.split("\n").map((line, i) => (
    <span key={i}>
      {line.startsWith("•") || line.startsWith("🔥") || line.startsWith("⚡") ||
       line.startsWith("🛡") || line.startsWith("❄") || line.startsWith("🔧") ||
       line.startsWith("🔍") || line.startsWith("📍") || line.startsWith("✉") ||
       line.startsWith("📞") || line.startsWith("🕐") || /^\d\./.test(line) ? (
        <span className="cb__msg-line cb__msg-line--bullet">{line}</span>
      ) : line.startsWith("**") ? (
        <strong>{line.replace(/\*\*/g, "")}</strong>
      ) : (
        <span className="cb__msg-line">{line}</span>
      )}
    </span>
  ));
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I'm Yada, your Yadavian Engineering assistant. How can I help you today?", time: now() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);

  function now() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [open, messages]);

  function send(text) {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");

    setMessages((prev) => [...prev, { from: "user", text: msg, time: now() }]);
    setTyping(true);

    setTimeout(() => {
      const reply = getResponse(msg);
      setMessages((prev) => [...prev, { from: "bot", text: reply, time: now() }]);
      setTyping(false);
      if (!open) setUnread((u) => u + 1);
    }, 800 + Math.random() * 400);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {/* Floating button */}
      <button className={`cb__fab ${open ? "cb__fab--open" : ""}`} onClick={() => setOpen(!open)} aria-label="Chat">
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
            {/* Antennas */}
            <rect x="32" y="6" width="7" height="18" rx="3.5" fill="#1a3a8f"/>
            <rect x="61" y="6" width="7" height="18" rx="3.5" fill="#1a3a8f"/>
            {/* Left ear */}
            <rect x="4" y="38" width="16" height="22" rx="8" fill="#2563eb"/>
            {/* Right ear */}
            <rect x="80" y="38" width="16" height="22" rx="8" fill="#6366f1"/>
            {/* Head */}
            <ellipse cx="50" cy="52" rx="34" ry="32" fill="#e8eef8"/>
            {/* Head shading right half */}
            <path d="M50 20 Q84 20 84 52 Q84 84 50 84 Z" fill="#d0d8ee" opacity="0.5"/>
            {/* Face panel outer */}
            <rect x="22" y="38" width="56" height="26" rx="13" fill="#c8d4e8"/>
            {/* Face panel inner */}
            <rect x="26" y="42" width="48" height="18" rx="9" fill="#1a3a8f"/>
            {/* Left eye */}
            <rect x="33" y="47" width="10" height="14" rx="5" fill="#3b82f6"/>
            {/* Right eye */}
            <rect x="57" y="47" width="10" height="14" rx="5" fill="#818cf8"/>
            {/* Center divider */}
            <line x1="50" y1="20" x2="50" y2="84" stroke="#b0bcd4" strokeWidth="1" opacity="0.4"/>
            {/* Headset arc */}
            <path d="M72 62 Q88 72 80 86" stroke="#1a3a8f" strokeWidth="5" fill="none" strokeLinecap="round"/>
            {/* Mic */}
            <circle cx="78" cy="88" r="6" fill="#1a3a8f"/>
          </svg>
        )}
        {!open && unread > 0 && <span className="cb__badge">{unread}</span>}
        <span className="cb__fab-pulse" />
      </button>

      {/* Chat window */}
      <div className={`cb__window ${open ? "cb__window--open" : ""}`}>

        {/* Header */}
        <div className="cb__header">
          <div className="cb__header-avatar">Y</div>
          <div className="cb__header-info">
            <span className="cb__header-name">Yada</span>
            <span className="cb__header-status">● Online</span>
          </div>
          <button className="cb__header-close" onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* Messages */}
        <div className="cb__messages">
          {messages.map((msg, i) => (
            <div key={i} className={`cb__msg cb__msg--${msg.from}`}>
              {msg.from === "bot" && <div className="cb__msg-avatar">Y</div>}
              <div className="cb__msg-bubble">
                <div className="cb__msg-text">{formatMessage(msg.text)}</div>
                <span className="cb__msg-time">{msg.time}</span>
              </div>
            </div>
          ))}
          {typing && (
            <div className="cb__msg cb__msg--bot">
              <div className="cb__msg-avatar">Y</div>
              <div className="cb__msg-bubble cb__typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="cb__suggestions">
          {SUGGESTIONS.map((s, i) => (
            <button key={i} className="cb__suggestion" onClick={() => send(s)}>{s}</button>
          ))}
        </div>

        {/* Input */}
        <div className="cb__input-row">
          <textarea
            className="cb__input"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
          />
          <button className="cb__send" onClick={() => send()} disabled={!input.trim()}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>

      </div>
    </>
  );
}
