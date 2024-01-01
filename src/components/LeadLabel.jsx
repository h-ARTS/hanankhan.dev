import React from "react"

const Label = ({ content, lineRefs, maskRefs, addToRefs }) => {
    return (
        <div
            className={`line ${content.className}`}
            ref={(el) => addToRefs(el, lineRefs)}
        >
            <span className="first-letter">S</span>
            <span className="rest">
                <span ref={(el) => addToRefs(el, maskRefs)}>
                    {content.label}
                </span>
            </span>
        </div>
    )
}

export default Label
