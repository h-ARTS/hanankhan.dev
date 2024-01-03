import React from "react"
import Typography from "../components/Typography"
import "./css/ExperienceItem.scss"

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
            <q className="quote">{content.quote}</q>
            <div className="line">
                <div className="content">
                    <Typography tag="h3" className="display bold">
                        {content.position}
                    </Typography>
                    <Typography tag="h5" className="text bold normal company">
                        {content.location}
                        {content.present && (
                            <Typography
                                tag="span"
                                className="text caption normal"
                            >
                                &nbsp;&nbsp;(present)
                            </Typography>
                        )}
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
