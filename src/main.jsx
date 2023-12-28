import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import Lenis from "@studio-freight/lenis"
import "bootstrap/dist/css/bootstrap-grid.min.css"
import "./index.css"

const lenis = new Lenis()

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
