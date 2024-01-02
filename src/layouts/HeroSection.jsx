import { useRef } from "react"
import { useMediaQuery } from "react-responsive"
import "./css/HeroSection.css"
import addToRefs from "../utils/addToRefs"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/ScrollTrigger"
import LabelMobile from "../components/LeadLabelMobile"
import Label from "../components/LeadLabel"
import GestureHint from "../components/GestureHint"
import WebGLView from "../components/webgl/WebGLView"
import { WebGLContext } from "./WebGLContext"

const HeroSection = () => {
    gsap.registerPlugin(ScrollTrigger)
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" })
    const isTablet = useMediaQuery({
        query: "(min-width: 768px) and (max-width: 991px)",
    })
    const isDesktop = useMediaQuery({ query: "(min-width: 992px)" })
    const webglRef = useRef()
    const containerRef = useRef()
    const lineRefs = useRef([])
    const maskRefs = useRef([])
    const contents = [
        { label: "PINNING", className: "text-base" },
        { label: "TUNNING", className: "text-primary" },
        { label: "OLUTIONS", className: "text-primary" },
        { label: "INCE 2015", className: "text-base" },
    ]

    useGSAP(() => {
        if (isMobile) {
            runHeroAnimationMobile()
        } else {
            runHeroAnimation(lineRefs, maskRefs)
        }

        if (isTablet || isDesktop) {
            gsap.to(".hero-text", { width: "fit-content" }, 0)
        }

        if (isDesktop) {
            gsap.fromTo(
                webglRef.current,
                {
                    y: -80,
                },
                {
                    scrollTrigger: {
                        start: "top",
                        end: "+=600px",
                        scrub: true,
                    },
                    y: 0,
                }
            )
        }
    }, [isMobile, isTablet, isDesktop])

    const runHeroAnimationMobile = () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                scrub: false,
                start: "top center",
                end: `${window.innerHeight}svh center`,
            },
            paused: true,
            defaults: { ease: "power1.in" },
        })
        tl.to(".mask", {
            y: 0,
            duration: 0.7,
            stagger: 0.2,
        })
            .fromTo("h2.rest", { opacity: 0 }, { opacity: 1, delay: 0.5 }, "0")
            .play()
    }

    const runHeroAnimation = (lineRefs, maskRefs) => {
        const totalS = lineRefs.current.length
        let completedS = 0

        lineRefs.current.forEach((line, index) => {
            const firstLetter = line.querySelector(".first-letter")

            /**
             * Wir nehmen die erste Buchstabe und animieren es von oben nach unten,
             * als wäre die Buchstabe hinter einer Maske.
             */
            gsap.to(firstLetter, {
                delay: index * 0.5,
                duration: 0.75,
                translateY: 0,
                ease: "power1.inOut",
                /**
                 * Sobald eine Buchstabe fertig animiert wurde, zählen wir
                 * den completedS hoch.
                 */
                onComplete: () => {
                    completedS++
                    if (completedS === totalS) {
                        /**
                         * Sobald alle animiert wurden, iterieren wir
                         * die maskRefs durch, welche während des Renders ins Array gepusht wurden,
                         * um die restlichen Texte einzublenden.
                         */
                        maskRefs.current.forEach((m) => {
                            gsap.to(m, {
                                duration: 1.25,
                                width: "100%",
                                ease: "power4.inOut",
                            })
                        })
                    }
                },
            })
        })
    }

    return (
        <section className="hero container-fluid container-lg g-lg-0">
            <div className="row g-lg-0">
                <div className="col-12 col-md-6 pt-xl-5">
                    <div className="hero-text">
                        {contents.map((c, idx) =>
                            isMobile ? (
                                <LabelMobile
                                    content={c}
                                    key={idx}
                                    lineRefs={lineRefs}
                                    addToRefs={addToRefs}
                                />
                            ) : (
                                <Label
                                    content={c}
                                    key={idx}
                                    lineRefs={lineRefs}
                                    maskRefs={maskRefs}
                                    addToRefs={addToRefs}
                                />
                            )
                        )}
                    </div>
                    {isMobile && <GestureHint />}
                </div>
                <div
                    className="col-12 mt-5 col-sm-8 offset-sm-2 mt-sm-0 col-md-6 offset-md-0 pt-xl-5 webgl"
                    ref={containerRef}
                >
                    <WebGLContext.Provider value={containerRef}>
                        <WebGLView ref={webglRef} />
                    </WebGLContext.Provider>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
