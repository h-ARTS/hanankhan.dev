import React from "react"
import "./css/Typography.css"

const Typography = React.forwardRef(
    ({ tag = "p", className = "", children }, ref) => {
        return React.createElement(
            tag,
            {
                ref,
                className: `typography ${className}`,
            },
            children
        )
    }
)

Typography.displayName = "Typography"

export default Typography
