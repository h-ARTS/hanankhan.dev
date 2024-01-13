import { useRef } from "react"
import { useMediaQuery } from "react-responsive"
import addToRefs from "../utils/addToRefs"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/ScrollTrigger"
import Typography from "../components/Typography"
import ExperienceItem from "../components/ExperienceItem"
import "./scss/ExperienceSection.scss"

const ExperienceSection = () => {
    const isTablet = useMediaQuery({ query: "(min-width: 768px)" })
    const itemRefs = useRef([])
    const experiences = [
        {
            year: 2015,
            position: "Web Developer",
            location: "Freelancing",
            quote: "The beginning of my journey",
            description:
                "Built websites for various clients like Lustenberger, CrispyChicken, Fortress Gold Group and more..",
            mobileClassNames: "left",
            className: "left",
        },
        {
            year: 2016,
            position: "Frontend Developer",
            location: "Banovi AG",
            quote: "My first job as a developer",
            description:
                "Built websites for various clients like Football Agency, Business Consulting Firms, Magazines",
            className: "right horizontal lg",
            mobileClassNames: "right lg",
        },
        {
            year: 2017,
            position: "Frontend Engineer",
            location: "Nomos-System AG",
            quote: "The golden era of my career",
            description:
                "Built User Interfaces and replaced legacy IoT Dashboard, developed mobile app for our Nomos Home.",
            className: "centered vertical-top",
            mobileClassNames: "left",
        },
        {
            year: 2020,
            position: "Software Engineer",
            location: "Digicomp Academy AG",
            quote: "Doing more great stuff",
            present: true,
            description:
                "Integrated CMS System in a multi-complex web application. Developing and maintaining in-house built e-commerce site",
            className: "left horizontal",
            mobileClassNames: "right",
        },
        {
            year: 2023,
            position: "Software Engineer",
            location: "FHNW Rover Team",
            present: true,
            quote: "We secured 2nd place in European Rover Challenge!",
            description:
                "Implemented an energy reporting system in our Mission Control Center, utilizing the Robot Operating System (ROS). Integrated this system seamlessly with NASA's OpenMCT for effective energy monitoring and power controlling. Upgraded the entire control center from Vanilla JavaScript to a Vue3 and TypeScript environment.",
            className: "centered vertical-bottom lg",
            mobileClassNames: "left lg",
        },
    ]

    gsap.registerPlugin(ScrollTrigger)
    const right = { x: window.innerWidth - 300 }
    const left = { x: -100 }
    const center = { y: 140, x: 0 }

    useGSAP(() => {
        itemRefs.current.forEach((item) => {
            const isRight = Array.from(item.classList).includes("right")
            const isHorizontal = item
                .getAttribute("class")
                .includes("horizontal")
            const isVertical = item
                .getAttribute("class")
                .includes(["vertical-top", "vertical-bottom"])
            const isLeftMd = item.getAttribute("class").includes("left")
            const isCenter = item.getAttribute("class").includes("centered")

            const start = isTablet ? "-=7% center" : "-=3% 10%"

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start,
                    pin: !isTablet,
                    scrub: false,
                    toggleActions: "play none play reverse",
                },
            })
            // right? left? centered?
            const propsCircle = isCenter ? center : isRight ? right : left
            tl.from(item.querySelector(".circle"), {
                scale: 0,
                ...propsCircle,
                duration: 0.6,
            })

            const linePropsFrom =
                isHorizontal && isTablet ? { width: 0 } : { height: 0 }
            const linePropsVertical = isVertical && {
                "--border-height": 0,
                height: 0,
            }
            // right? left? horizontal? centered?
            tl.from(item.querySelector(".line"), {
                ...linePropsVertical,
                ...linePropsFrom,
                duration: 0.6,
                ease: "power3.out",
            })

            const propsContent = isLeftMd
                ? { translateX: -10 }
                : isRight || !isVertical
                ? {
                      translateX: window.innerWidth - window.innerWidth + 20,
                  }
                : { translateX: -10 }
            // right? left? centered?
            tl.from(item.querySelector(".content"), {
                ...propsContent,
                opacity: 0,
                duration: 0.6,
            })

            if (isTablet) {
                tl.from(
                    item.querySelector(".quote"),
                    {
                        duration: 0.6,
                        opacity: 0,
                        x: isHorizontal && isRight ? 20 : -20,
                    },
                    ">0.3"
                )
            }
        })
    }, [isTablet, window.innerWidth])

    return (
        <section id="experiences" className="experiences container-fluid g-0">
            <Typography
                tag="h3"
                className={`text upper ${
                    isTablet ? "lead" : "normal"
                } spread bold title`}
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
        </section>
    )
}

export default ExperienceSection
