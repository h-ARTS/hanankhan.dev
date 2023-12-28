import React from "react"

const BurgerMenu = React.forwardRef(({ onClick }, ref) => (
    <nav className="menu">
        <div className="burger-icon" onClick={onClick}>
            <span ref={ref}></span>
        </div>
    </nav>
))

BurgerMenu.displayName = "BurgerMenu"

export default BurgerMenu
