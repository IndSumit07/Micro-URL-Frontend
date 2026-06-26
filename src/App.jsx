import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const App = () => {
  return (
    <div className="relative min-h-screen bg-background text-white font-sans overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <Navbar />
      <Hero />
    </div>
  );
};

export default App;
