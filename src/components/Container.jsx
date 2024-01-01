import React from "react"
import "./css/Container.css"

const Container = ({ className, children }) => {
    return (
        <section className={`${className} page container g-0`}>
            {children}
        </section>
    )
}

export default Container
