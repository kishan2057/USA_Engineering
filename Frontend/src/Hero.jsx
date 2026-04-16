import React from "react";
import "./Hero.css";
const heroImg = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&auto=format&fit=crop";

export default function Hero() {
  return (
    <div className="hero">
      {/* Left side — text */}
      <div className="hero__left">
        <p className="hero__tag">ENGINEERING INNOVATION</p>
        <h1 className="hero__title">
          MEP <span>&</span> Fire Protection Solutions
        </h1>
        <p className="hero__states">
          New York · Texas · Florida · Colorado · Arizona · Oklahoma
        </p>
        <p className="hero__sub">
          Expert MEP Solutions by Licensed Professional Engineers
        </p>
        <button className="hero__btn">Get a Free Consultation</button>
      </div>

      {/* Right side — image */}
      <div className="hero__right">
        <img src={heroImg} alt="Engineering site" />
      </div>
    </div>
  );
}
