import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Contact from '../components/Contact';
import { Education, Certification, Skills, Footer } from '../components/Sections';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Education />
      <Certification />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}