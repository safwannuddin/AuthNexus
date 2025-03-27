import Header from "../../components/landingpage/Header";
import Footer from "../../components/landingpage/Footer";
import HeroSection from "../../components/landingpage/HeroSection";
import Features_Section from "../../components/landingpage/Features_Section";
import FAQSection from "../../components/landingpage/FAQSection";
import ContactSection from "../../components/landingpage/ContactSection";
import CTASection from "../../components/landingpage/CTASection";
import AboutSection from "../../components/landingpage/AboutSection";
import QuickGuide from "../../components/landingpage/QuickGuide";
import SecurityMatters from "../../components/landingpage/SecurityMatters";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Header />
      <div className="relative z-10 pt-12"> {/* Reduced from pt-16 to pt-12 */}
        <main>
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
  )
}