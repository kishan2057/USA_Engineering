import React from "react";
import Navbar from "../Navbar";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Expertise from "./Expertise";
import Footer from "./Footer";

export default function App() {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Expertise />
      <Footer />
    </div>
  );
}
