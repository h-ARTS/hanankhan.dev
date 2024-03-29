import { useRef } from "react"
import "./scss/SkillsSection.scss"
import Typography from "../components/Typography"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const SkillsSection = () => {
    const marqueeText = useRef([])
    const marqueeText2 = useRef([])
    const skills =
        "HTML CSS JAVASCRIPT THREEJS VUE REACT JAVA SPRING GSAP UNITY FIGMA TYPESCRIPT"

    const innerHeight = window.innerHeight

    useGSAP(() => {
        gsap.timeline({
            immediateRender: false,
            scrollTrigger: {
                pin: true,
                trigger: ".skills",
                start: "top top",
                end: () => `${innerHeight * 3}svh center`,
                scrub: true,
            },
        })
            .from(
                marqueeText.current,
                {
                    scale: 8,
                    opacity: 0,
                },
                "0"
            )
            .from(
                marqueeText2.current,
                {
                    scale: 8,
                    opacity: 0,
                },
                "<0.2"
            )
    })

    return (
        <section className="skills container-fill p-0">
            <div className="marquee">
                <div className="marquee-inner" ref={marqueeText}>
                    <Typography className="marquee-line text upper bold">
                        {skills}
                    </Typography>
                    <Typography className="marquee-line text upper bold">
                        {skills}
                    </Typography>
                </div>
                <div className="marquee-inner reverse" ref={marqueeText2}>
                    <Typography className="marquee-line text upper bold">
                        {skills}
                    </Typography>
                    <Typography className="marquee-line text upper bold">
                        {skills}
                    </Typography>
                </div>
            </div>
        </section>
    )
}

export default SkillsSection
