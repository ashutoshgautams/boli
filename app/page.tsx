import PromoBanner from './components/PromoBanner';
import Header from './components/Header';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default async function LandingPage() {

  return (
    <>
      <PromoBanner />
      <Header />
      <Hero />
      <SocialProof />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}
