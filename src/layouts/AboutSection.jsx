import { useRef } from "react"
import { useMediaQuery } from "react-responsive"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/ScrollTrigger"
import SplitType from "split-type"
import Typography from "../components/Typography"
import Container from "../components/Container"
import "./css/AboutSection.css"

const AboutSection = () => {
    const isTablet = useMediaQuery({
        query: "(min-width: 768px)",
    })
    const reveal = useRef([])
    gsap.registerPlugin(ScrollTrigger)

    useGSAP(() => {
        const text = new SplitType(reveal.current, { types: "chars" })

        gsap.from(text.chars, {
            scrollTrigger: {
                trigger: reveal.current,
                start: "-=26% 70%",
                end: "top 10%",
                scrub: true,
            },
            opacity: 0.2,
            stagger: 0.2,
        })
    })

    return (
        <Container id="about" className="about">
            <div className="row g-0">
                <div className="col">
                    <Typography
                        tag="h3"
                        className={`text upper ${
                            isTablet ? "lead" : "normal"
                        } spread bold`}
                    >
                        ABOUT ME
                    </Typography>
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
        </Container>
    )
}

export default AboutSection
