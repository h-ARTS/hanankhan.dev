import React from "react"
import Typography from "./Typography"

const ShowcaseItem = React.forwardRef(({ item }, ref) => {
    return (
        <div ref={ref} className={`showcase-item ${item.className || ""}`}>
            <img src={item.img} alt="Viboo - Mobile UI Design" />
            <Typography tag="h3" className="display text-primary">
                {item.title}
            </Typography>
            <Typography className="text caption upper spread bold">
                {item.caption}
            </Typography>
        </div>
    )
})

export default ShowcaseItem
