import React from "react"

const Container = ({ className, children }) => {
    return (
        <section className={`${className} container g-0`}>{children}</section>
    )
}

export default Container
