import { useState } from "react";
import "./App.scss";
import Navbar from "./Components/navbar/navbar";
import Hero from "./Components/hero/hero";
import Parallax from "./Components/parallax/parallax";
import Stack from "./Components/stack/stack";
import Portfolio from "./Components/portfolio/portfolio";
import Contact from "./Components/contact/contact";
import Cursor from "./Components/cursor/cursor";
import About from "./Components/about/about";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Cursor />
      <section id="Homepage">
        <Navbar />
        <Hero />
      </section>
      <section id="About">
        <About />
      </section>
      <section id="Tech-Stack">
        <Parallax type="stack" />
      </section>
      <section>
        <Stack />
      </section>
      <section id="Portfolio">
        <Parallax type="portfolio" />
      </section>
      <Portfolio />
      <section id="Contact">
        <Contact />
      </section>
    </div>
  );
}

export default App;
