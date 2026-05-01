import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Tracks from "./components/sections/Tracks";
import Timeline from "./components/sections/Timeline";
import FAQ from "./components/sections/FAQ";
import Sponsors from "./components/sections/Sponsors";

function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Tracks />
        <Timeline />
        <Sponsors />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

export default App;
