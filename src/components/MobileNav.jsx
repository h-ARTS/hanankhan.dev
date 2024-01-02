import React from "react"

const MobileNav = React.forwardRef((props, ref) => {
    const handleClick = (e) => {
        e.preventDefault()
        props.toggleMenu(e)
        setTimeout(() => {
            lenis.scrollTo(e.target.hash)
        }, 3000)
    }

    return (
        <div className="container-fluid g-0 mobile-menu">
            <nav className="row list">
                <ul className="col-12" ref={ref}>
                    <li>
                        <a href="#about" onClick={handleClick}>
                            about
                        </a>
                    </li>
                    <li>
                        <a href="#projects" onClick={handleClick}>
                            projects
                        </a>
                    </li>
                    <li>
                        <a href="#experiences" onClick={handleClick}>
                            my journey
                        </a>
                    </li>
                    <li>
                        <a href="#contact" onClick={handleClick}>
                            contact
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
})

MobileNav.displayName = "MobileNav"

export default MobileNav
