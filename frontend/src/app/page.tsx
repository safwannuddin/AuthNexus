import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
import Features_Section from "../../components/Features_Section";
import FAQSection from "../../components/FAQSection";
import ContactSection from "../../components/ContactSection";
import CTASection from "../../components/CTASection";
import AboutSection from "../../components/AboutSection";
import QuickGuide from "../../components/QuickGuide";
import SecurityMatters from "../../components/SecurityMatters";



export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 -z-50">
        {/* Animated Gradient Layer */}
        <div className="absolute inset-0 
          bg-[radial-gradient(ellipse_at_center,#3b82f61a_0%,transparent_70%)] 
          dark:bg-[radial-gradient(ellipse_at_center,#8b5cf61a_0%,transparent_70%)]
          animate-gradient-pulse" />
        
        {/* Animated Grid Layer */}
        <div className="absolute inset-0 
          bg-[url('/grid.svg')] 
          bg-[size:40px_40px] 
          opacity-10 dark:opacity-5 
          animate-grid-scroll" />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        
        <main>
        <Header />
          <HeroSection />
          <QuickGuide />
          <Features_Section />
          <SecurityMatters />
          <AboutSection />
          <FAQSection />
          <ContactSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}