import { useRef } from "react"
import "./scss/GestureHint.scss"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import swipeUpSvg from "../assets/swipe-up.svg"

const GestureHint = () => {
    const gesture = useRef(null)
    const img = useRef(null)
    const innerHeight = window.innerHeight

    useGSAP(() => {
        gsap.to(gesture.current, {
            scrollTrigger: {
                start: () => `${innerHeight - 200}px center`,
                end: () => `${innerHeight}px center`,
                scrub: true,
            },
            opacity: 0,
            scale: 0,
        })
    })

    return (
        <button ref={gesture} className="gesture-hint">
            <div className="dot"></div>
            <img src={swipeUpSvg} ref={img} alt="swipe up" />
            <h5>SWIPE UP</h5>
        </button>
    )
}

export default GestureHint
