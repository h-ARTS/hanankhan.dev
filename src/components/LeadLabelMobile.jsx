import React from "react"

const LabelMobile = ({ content, lineRefs, addToRefs }) => {
    return (
        <div
            className={`line ${content.className}`}
            ref={(el) => addToRefs(el, lineRefs)}
        >
            <h2 className="rest">
                <span className="mask">S{content.label}</span>
            </h2>
        </div>
    )
}

export default LabelMobile
