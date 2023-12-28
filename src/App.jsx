import { useEffect, useRef } from "react"
import "./App.css"
import Header from "./components/Header"
import HeroSection from "./components/layouts/HeroSection"
import AboutSection from "./components/layouts/AboutSection"

function App({ lenis }) {
    return (
        <>
            <Header />
            <HeroSection />
            <AboutSection />
        </>
    )
}

export default App
