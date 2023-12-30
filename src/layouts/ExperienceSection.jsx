import React from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/ScrollTrigger"
import Typography from "../components/Typography"
import Container from "../components/Container"
import ExperienceItem from "../components/ExperienceItem"
import "./css/ExperienceSection.css"

const ExperienceSection = () => {
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
    return (
        <Container className="experiences">
            <Typography
                tag="h3"
                className="text upper normal spread bold title"
            >
                Experiences
            </Typography>
            {experiences.map((content, idx) => (
                <ExperienceItem content={content} key={idx} />
            ))}
        </Container>
    )
}

export default ExperienceSection
