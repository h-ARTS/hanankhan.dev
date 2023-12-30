import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/ScrollTrigger"
import SplitType from "split-type"
import Typography from "../components/Typography"
import Container from "../components/Container"
import ExperienceItem from "../components/ExperienceItem"
import "./css/ExperienceSection.css"

const ExperienceSection = () => {
    const itemRefs = useRef([])
    const experiences = [
        {
            year: 2015,
            position: "Web Developer",
            location: "Freelancing",
            description:
                "Built websites for various clients like Lustenberger, CrispyChicken, Fortress Gold Group and more..",
        },
        {
            year: 2016,
            position: "Frontend Developer",
            location: "Banovi AG",
            description:
                "Built websites for various clients like Football Agency, Business Consulting Firms, Magazines",
            className: "right lg",
        },
        {
            year: 2017,
            position: "Frontend Engineer",
            location: "Nomos-System AG",
            description:
                "Built User Interfaces and replaced legacy IoT Dashboard, developed mobile app for our Nomos Home.",
        },
        {
            year: 2020,
            position: "Software Engineer",
            location: "Digicomp Academy AG",
            className: "right",
            description:
                "Integrated CMS System in a multi-complex web application. Developing and maintaining in-house built e-commerce site",
        },
        {
            year: 2023,
            position: "Software Engineer",
            location: "FHNW Rover Team",
            present: true,
            className: "lg height-3",
            description:
                "Implemented an energy reporting system in our Mission Control Center, utilizing the Robot Operating System (ROS). Integrated this system seamlessly with NASA's OpenMCT for effective energy monitoring and power controlling. Upgraded the entire control center from Vanilla JavaScript to a Vue3 and TypeScript environment.",
        },
    ]

    gsap.registerPlugin(ScrollTrigger)
    const right = { x: window.innerWidth - 300 }
    const left = { x: -100 }

    useGSAP(() => {
        // const text = new SplitType(desc.current, { types: "chars" })
        itemRefs.current.forEach((item, index) => {
            const isRight = Array.from(item.classList).includes("right")
            const propsCircle = isRight ? right : left
            const propsContent = isRight
                ? {
                      translateX: window.innerWidth - window.innerWidth + 20,
                  }
                : { translateX: -10 }

            const tl = gsap
                .timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "-=5% top",
                        end: "70% 20%",
                        pin: true,
                        scrub: false,
                        toggleActions: "play none play reverse",
                    },
                })
                .from(item.querySelector(".circle"), {
                    scale: 0,
                    ...propsCircle,
                    duration: 0.6,
                })
                .from(item.querySelector(".line"), {
                    height: 0,
                    duration: 0.6,
                    ease: "power3.out",
                })
                .from(item.querySelector(".content"), {
                    ...propsContent,
                    opacity: 0,
                    duration: 0.6,
                })
        })
    })

    const addToRefs = (el, refGroup) => {
        if (el && !refGroup.current.includes(el)) {
            refGroup.current.push(el)
        }
    }

    return (
        <Container className="experiences">
            <Typography
                tag="h3"
                className="text upper normal spread bold title"
            >
                Experiences
            </Typography>
            {experiences.map((content, idx) => (
                <ExperienceItem
                    ref={(el) => addToRefs(el, itemRefs)}
                    content={content}
                    key={idx}
                />
            ))}
        </Container>
    )
}

export default ExperienceSection
