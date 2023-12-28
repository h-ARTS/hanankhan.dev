import MobileNav from "./MobileNav"

const Overlay = ({ pathRef, menuRef }) => {
    const viewBox = `0 0 ${window.innerWidth * window.devicePixelRatio} ${
        window.innerHeight * window.devicePixelRatio
    }`
    const d = "M1170 1H1170V2532C1170 2503 1170 0 1170 0 1170 0 1170 0 1170 0Z"

    return (
        <div className="overlay">
            <MobileNav ref={menuRef} />
            <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
                <path ref={pathRef} d={d}></path>
            </svg>
        </div>
    )
}

export default Overlay
