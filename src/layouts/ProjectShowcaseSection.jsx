import React from "react"
import Typography from "../components/Typography"
import ShowcaseItem from "../components/ShowcaseItem"
import vibooImage from "../assets/viboo_concept_1.png"
import nomos from "../assets/Nomos_Home_1.png"
import digi from "../assets/digidev_1.png"
import "./css/ProjectShowcases.css"

const ProjectShowcaseSection = () => {
    const items = [
        {
            img: vibooImage,
            title: "Viboo",
            caption: "Mobile design",
            className: "",
        },
        {
            img: nomos,
            title: "Nomos Home",
            caption: "Mobile app development",
            className: "text-right",
        },
        {
            img: digi,
            title: "Digicomp Academy AG",
            caption: "Web Engineering",
        },
    ]
    return (
        <section className="project-showcases container g-0">
            <Typography tag="h3" className="text upper normal spread bold">
                PROJECT SHOWCASES
            </Typography>
            <div className="showcases">
                {items.map((item, idx) => (
                    <ShowcaseItem item={item} key={idx} />
                ))}
            </div>
        </section>
    )
}

export default ProjectShowcaseSection
