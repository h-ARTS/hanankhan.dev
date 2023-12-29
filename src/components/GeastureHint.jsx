import React from "react"
import "./css/GeastureHint.css"
import swipeUpSvg from "../assets/swipe-up.svg"

const GestureHint = () => (
    <button className="gesture-hint">
        <div className="dot"></div>
        <img src={swipeUpSvg} alt="swipe up" />
        <h5>SWIPE UP</h5>
    </button>
)

export default GestureHint
