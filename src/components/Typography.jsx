import React from "react"
import "./css/Typography.css"

const Typography = ({ tag = "p", className = "", children }) => {
    return React.createElement(
        tag,
        {
            className: `typography ${className}`,
        },
        children
    )
}

export default Typography
