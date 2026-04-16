import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Expertise from "./Expertise";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ExpertisePage from "./pages/ExpertisePage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import Chatbot from "./chatbot/Chatbot";
import EngineerCartoon from "./EngineerCartoon";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Expertise />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ margin: 0, padding: 0 }}>
        <Navbar />
        <Routes>
          <Route path="/"          element={<HomePage />} />
          <Route path="/about"     element={<AboutPage />} />
          <Route path="/services"  element={<ServicesPage />} />
          <Route path="/expertise" element={<ExpertisePage />} />
          <Route path="/blog"      element={<BlogPage />} />
          <Route path="/contact"   element={<ContactPage />} />
        </Routes>
        <Footer />
        <Chatbot />
        <EngineerCartoon />
      </div>
    </BrowserRouter>
  );
}
