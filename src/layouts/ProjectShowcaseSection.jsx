import React, { useRef } from "react"
import { useMediaQuery } from "react-responsive"
import vibooImage from "../assets/viboo_concept_1.png"
import vibooImageBig from "../assets/viboo_concept_big.png"
import nomos from "../assets/Nomos_Home_1.png"
import nomosBig from "../assets/Nomos_Home_Big.png"
import digi from "../assets/digidev_1.png"
import digiBig from "../assets/digiweb_big.png"
import siege from "../assets/level1.png"
import "./scss/ProjectShowcases.scss"
import Container from "../components/Container"
import Typography from "../components/Typography"
import ShowcaseItem from "../components/ShowcaseItem"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/ScrollTrigger"
import addToRefs from "../utils/addToRefs"

const ProjectShowcaseSection = () => {
    gsap.registerPlugin(ScrollTrigger)
    const showcaseItemsRef = useRef([])
    const isTablet = useMediaQuery({ query: "(min-width: 768px)" })
    const items = [
        {
            img: siege,
            title: "Siege Breaker: Break The Reign",
            caption: "Game Development",
            className: "",
            colClasses: "col-12 col-sm-10 col-md-6",
        },
        {
            img: isTablet ? vibooImageBig : vibooImage,
            title: "Viboo",
            caption: "Mobile design",
            className: "text-right right",
            colClasses:
                "col-12 mt-5 col-sm-10 offset-sm-2 col-md-6 offset-md-6",
        },
        {
            img: isTablet ? nomosBig : nomos,
            title: "Nomos Home",
            caption: "Mobile app development",
            className: "",
            colClasses: "col-12 col-sm-10 col-md-6",
        },
        {
            img: isTablet ? digiBig : digi,
            title: "Digicomp Academy AG",
            caption: "Web Engineering",
            className: "text-right right",
            colClasses:
                "col-12 mt-5 col-sm-10 offset-sm-2 col-md-6 offset-md-6",
        },
    ]

    useGSAP(() => {
        showcaseItemsRef.current.forEach((project) => {
            const isRight = project.getAttribute("class").includes("right")
            const from = isRight
                ? {
                      y: -40,
                  }
                : { x: -40 }
            const to = isRight
                ? {
                      y: 0,
                      "--clip-path-right":
                          "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                  }
                : {
                      "--clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                  }

            gsap.fromTo(
                project,
                from,
                {
                    scrollTrigger: {
                        trigger: project,
                        start: "41% center",
                        toggleActions: "play none none reverse",
                    },
                    duration: 1,
                    x: 0,
                    ...to,
                    ease: "power4.inOut",
                },
                "0"
            )
        })
    }, [isTablet])

    return (
        <Container id="projects" className="project-showcases">
            <Typography
                tag="h3"
                className={`text ${
                    isTablet ? "lead" : "normal"
                } upper spread bold`}
            >
                PROJECT SHOWCASES
            </Typography>
            <div className="row">
                {items.map((item, idx) => (
                    <div className={item.colClasses} key={idx}>
                        <div className="showcases">
                            <ShowcaseItem
                                ref={(item) =>
                                    addToRefs(item, showcaseItemsRef)
                                }
                                item={item}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default ProjectShowcaseSection
