import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import LazySection from "@/components/LazySection";

// ponytail: below-the-fold sections are lazy-loaded near the viewport.
// Hero (above the fold) remains eager so LCP text/images paint immediately.
const About = () => import("@/components/sections/About").then((m) => ({ default: m.default }));
const Experience = () => import("@/components/sections/Experience").then((m) => ({ default: m.default }));
const IdCard3D = () => import("@/components/sections/IdCard3D").then((m) => ({ default: m.default }));
const Projects = () => import("@/components/sections/Projects").then((m) => ({ default: m.default }));
const GitHubStats = () => import("@/components/sections/GitHubStats").then((m) => ({ default: m.default }));
const Contact = () => import("@/components/sections/Contact").then((m) => ({ default: m.default }));

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Rehan Maulana | Web Developer portfolio</title>
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
        <meta property="og:title" content="Rehan Maulana | Web Developer Portfolio" />
        <meta
          property="og:description"
          content="Web Developer specializing in modern, scalable web experiences with React, Next.js, and Node.js."
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <main id="main-content">
          <Hero />
          <LazySection loader={About} minHeight={800} />
          <LazySection loader={Experience} minHeight={500} />
          <LazySection loader={IdCard3D} minHeight={900} />
          <LazySection loader={Projects} minHeight={900} />
          <LazySection loader={GitHubStats} minHeight={900} />
          <LazySection loader={Contact} minHeight={700} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;