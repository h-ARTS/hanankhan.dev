import { useRef } from "react"
import "./css/SkillsSection.css"
import Container from "../components/Container"
import Typography from "../components/Typography"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const SkillsSection = () => {
    const marqueeText = useRef([])
    const marqueeText2 = useRef([])
    const skills =
        "HTML CSS JAVASCRIPT THREEJS VUE REACT JAVA SPRING GSAP UNITY FIGMA TYPESCRIPT"

    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                pin: true,
                trigger: ".skills",
                start: "20% 10%",
                end: `${window.innerHeight + 800}svh center`,
                scrub: 1,
                markers: true,
            },
        })
            .from(
                marqueeText.current,
                {
                    scale: 10,
                    opacity: 0,
                },
                "0"
            )
            .from(
                marqueeText2.current,
                {
                    scale: 10,
                    opacity: 0,
                },
                "<0.2"
            )
    })

    return (
        <Container className="skills p-0">
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
        </Container>
    )
}

export default SkillsSection
