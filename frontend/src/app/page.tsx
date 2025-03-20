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