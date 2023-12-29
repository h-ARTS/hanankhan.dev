import React from "react"
import "./css/AboutSection.css"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/ScrollTrigger"
import SplitType from "split-type"
import { useLayoutEffect } from "react"
import { useRef } from "react"

const AboutSection = () => {
    const reveal = useRef([])
    gsap.registerPlugin(ScrollTrigger)

    useGSAP(() => {
        const text = new SplitType(reveal.current, { types: "chars" })

        gsap.from(text.chars, {
            scrollTrigger: {
                trigger: reveal.current,
                start: "-=30% 70%",
                end: "top 10%",
                scrub: true,
            },
            opacity: 0.2,
            stagger: 0.2,
        })
    })

    return (
        <section className="about container g-0">
            <div className="row g-0">
                <div className="col">
                    <h3 className="heading">ABOUT ME</h3>
                    <p ref={reveal}>
                        I'm a{" "}
                        <span className="text-primary">
                            dedicated software engineer
                        </span>
                        , blending a potent mix of design savvy and coding
                        prowess. My journey revolves around crafting top-tier
                        products with a relentless focus on quality and
                        unforgettable digital experiences. With every project, I
                        bring an unyielding passion for innovation and a
                        commitment to lifelong learning, ensuring that each
                        creation is not just technically sound, but also a
                        masterpiece of modern technology.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
