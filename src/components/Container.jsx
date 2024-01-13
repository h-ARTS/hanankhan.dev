import React from "react"
import "./scss/Container.scss"

const Container = ({ id, className, children }) => {
    return (
        <section
            id={id}
            className={`${className} layout container-fluid container-lg g-lg-0`}
        >
            {children}
        </section>
    )
}

export default Container
