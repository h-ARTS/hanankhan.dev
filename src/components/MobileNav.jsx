import React from "react"

const MobileNav = React.forwardRef((_, ref) => (
    <div className="container-fluid g-0 mobile-menu">
        <nav className="row list">
            <ul className="col-12" ref={ref}>
                <li>
                    <a href="#">about</a>
                </li>
                <li>
                    <a href="#">work</a>
                </li>
                <li>
                    <a href="#">my journey</a>
                </li>
                <li>
                    <a href="#">contact</a>
                </li>
                <li>
                    <a href="#">blog</a>
                </li>
            </ul>
        </nav>
    </div>
))

MobileNav.displayName = "MobileNav"

export default MobileNav
