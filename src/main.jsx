import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import Lenis from "@studio-freight/lenis"
import "bootstrap/dist/css/bootstrap-grid.min.css"
import "./index.css"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

lenis.on("scroll", ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App lenis={lenis} />
    </React.StrictMode>
)
