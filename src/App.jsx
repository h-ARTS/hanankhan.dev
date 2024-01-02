import "./App.css"
import Header from "./components/Header"
import HeroSection from "./layouts/HeroSection"
import AboutSection from "./layouts/AboutSection"
import ProjectShowcaseSection from "./layouts/ProjectShowcaseSection"
import ExperienceSection from "./layouts/ExperienceSection"
import SkillsSection from "./layouts/SkillsSection"
import Contact from "./layouts/Contact"

function App({ lenis }) {
    window.lenis = lenis

    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <AboutSection />
                <ProjectShowcaseSection />
                <ExperienceSection />
                <SkillsSection />
                <Contact />
            </main>
        </>
    )
}

export default App
