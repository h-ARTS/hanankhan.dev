import React from "react"
import "./css/Container.css"

const Container = ({ className, children }) => {
    return (
        <section className={`${className} container-fluid container-lg g-lg-0`}>
            {children}
        </section>
    )
}

export default Container
