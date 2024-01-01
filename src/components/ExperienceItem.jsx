import React from "react"
import Typography from "../components/Typography"
import "./css/ExperienceItem.css"

const ExperienceItem = React.forwardRef(({ className = "", content }, ref) => {
    return (
        <section
            ref={ref}
            className={`experience-item ${content.className || className}`}
        >
            <div className="circle">
                <div className="year">
                    <Typography tag="h1">{content.year}</Typography>
                </div>
            </div>
            <div className="line">
                <div className="content">
                    <Typography tag="h3" className="display bold">
                        {content.position}
                    </Typography>
                    <Typography tag="h5" className="text bold normal company">
                        {content.location}
                    </Typography>
                    <Typography className="description">
                        {content.description}
                    </Typography>
                </div>
            </div>
        </section>
    )
})

ExperienceItem.displayName = "ExperienceItem"

export default ExperienceItem
