import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCard from "@/components/FloatingCard";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import GitHubStats from "@/components/sections/GitHubStats";
import Contact from "@/components/sections/Contact";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Rehan Maulana | Web Developer Portfolio</title>
        <meta
          name="description"
          content="Rehan Maulana - Web Developer specializing in building modern, scalable, and creative web experiences using React, Next.js, and Node.js."
        />
        <meta
          name="keywords"
          content="Rehan Maulana, Web Developer, Frontend Developer, React Developer, Portfolio"
        />
        <meta name="author" content="Rehan Maulana" />
        <link rel="canonical" href="https://rehanmaulana.dev" />
      </Helmet>

      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <FloatingCard />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <GitHubStats />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
