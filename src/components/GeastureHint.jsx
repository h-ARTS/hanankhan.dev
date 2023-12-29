import { useRef } from "react"
import "./css/GeastureHint.css"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import swipeUpSvg from "../assets/swipe-up.svg"

const GestureHint = () => {
    const img = useRef(null)

    useGSAP(() => {
        gsap.to(".gesture-hint", {
            scrollTrigger: {
                start: "+=30% center",
                end: "40% center",
                scrub: true,
            },
            opacity: 0,
            scale: 0,
        })
    })

    return (
        <button className="gesture-hint">
            <div className="dot"></div>
            <img src={swipeUpSvg} ref={img} alt="swipe up" />
            <h5>SWIPE UP</h5>
        </button>
    )
}

export default GestureHint
