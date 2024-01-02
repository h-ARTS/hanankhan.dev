import MobileNav from "./MobileNav"

const Overlay = ({ pathRef, menuRef, viewport, toggleMenu }) => {
    const viewportWidth = viewport.width
    const viewportHeight = viewport.height
    const viewBox = `0 0 ${viewportWidth} ${viewportHeight}`
    const d = `M${viewportWidth} 1H${viewportWidth}V${viewportHeight}C${viewportWidth} ${
        viewportHeight - 29
    } ${viewportWidth} 0 ${viewportWidth} 0 ${viewportWidth} 0 ${viewportWidth} 0 ${viewportWidth} 0Z`

    return (
        <div className="overlay">
            <MobileNav ref={menuRef} toggleMenu={toggleMenu} />
            <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
                <path ref={pathRef} d={d}></path>
            </svg>
        </div>
    )
}

export default Overlay
