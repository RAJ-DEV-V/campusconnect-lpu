import Navbar from "../components/Navbar";
import Hero from "../components/sections/Hero";
import Footer from "../components/Footer";
import Features from "../components/sections/Features";
export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-100" />

      {/* Blue Glow */}
      <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <Footer />
      </div>

    </div>
  );
}