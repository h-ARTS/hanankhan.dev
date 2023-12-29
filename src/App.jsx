import "./App.css"
import Header from "./components/Header"
import HeroSection from "./layouts/HeroSection"
import AboutSection from "./layouts/AboutSection"
import ProjectShowcaseSection from "./layouts/ProjectShowcaseSection"

function App({ lenis }) {
    return (
        <>
            <Header />
            <HeroSection />
            <AboutSection />
            <ProjectShowcaseSection />
        </>
    )
}

export default App
