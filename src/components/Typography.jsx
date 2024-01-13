import React from "react"
import "./scss/Typography.scss"

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
