import { useRef, useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import gsap from "gsap"
import styles from "./Header.module.css"
const { first, last, logo, burgerIcon, menu, header, overlay } = styles

const Header = () => {
    const isSmallScreen = useMediaQuery({ query: "(min-width: 576px)" })
    const viewBox = `0 0 ${window.innerWidth * window.devicePixelRatio} ${
        window.innerHeight * window.devicePixelRatio
    }`

    const start = "M0 0H1170V2532C780 1688 1170 0 0 0Z"
    const end = "M0 0H1170V2532C-1288 2554-938 2719 0 0Z"
    const path = useRef(null)
    const burger = useRef(null)

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const tl = useRef(gsap.timeline({ paused: true }))

    useEffect(() => {
        tl.current
            .to(path.current, {
                duration: 0.8,
                attr: {
                    d: start,
                },
                ease: "power2.inOut",
            })
            .to(burger.current, {
                "--background-burger": "#13141C",
                duration: 0.3,
                ease: "power2.in",
                position: "-0.7",
            })
            .to(
                path.current,
                {
                    duration: 0.8,
                    attr: {
                        d: end,
                    },
                    ease: "power2.inOut",
                },
                ">"
            )
    }, [])

    const toggleMenu = (e) => {
        e.stopPropagation()
        console.log("hello")

        if (tl.current.progress() === 1) {
            tl.current.reverse()
        } else if (!isMenuOpen) {
            tl.current.play()
        }

        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className={header}>
            <div className="container-sm g-0">
                <div className="row">
                    <div className="col-6">
                        <div className={logo}>
                            <p className={`${logo} ${first}`}>Hanan</p>
                            <p className={`${logo} ${last}`}>Khan</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <nav className={menu}>
                            <div
                                className={burgerIcon}
                                onClick={(e) => toggleMenu(e)}
                            >
                                <span ref={burger}></span>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className={overlay}>
                <svg viewBox={viewBox}>
                    <path
                        ref={path}
                        d="M1170 0H1170V2532C1168 1914 1168 0 1170 0Z"
                    ></path>
                </svg>
            </div>
        </header>
    )
}

export default Header
