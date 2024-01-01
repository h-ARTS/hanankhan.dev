import React from "react"

const Logo = React.forwardRef((_, ref) => {
    return (
        <div ref={ref} className="logo">
            <p className="first">Hanan</p>
            <p className="last">Khan</p>
        </div>
    )
})

Logo.displayName = "Logo"

export default Logo
