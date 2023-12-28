import React from "react"

const Logo = React.forwardRef((_, ref) => {
    return (
        <div ref={ref} className="logo">
            <p className="logo first">Hanan</p>
            <p className="logo last">Khan</p>
        </div>
    )
})

Logo.displayName = "Logo"

export default Logo
