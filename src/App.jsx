import "./App.css"
import Header from "./components/Header"
import HeroSection from "./layouts/HeroSection"
import AboutSection from "./layouts/AboutSection"
import ProjectShowcaseSection from "./layouts/ProjectShowcaseSection"
import ExperienceSection from "./layouts/ExperienceSection"

function App({ lenis }) {
    return (
        <>
            <Header />
            <HeroSection />
            <AboutSection />
            <ProjectShowcaseSection />
            <ExperienceSection />
        </>
    )
}

export default App
