import { useRef, useEffect, useState } from "react"
import "./css/Header.css"
import gsap from "gsap"
import BurgerMenu from "./BurgerMenu"
import Logo from "./Logo"
import Overlay from "./Overlay"

const BACKGROUND_400 = "#13141C"

const Header = () => {
    const start = "M0 0H1170V2532C780 1688 1171 75 214 75-164 69-202 97-202 0Z"
    const end =
        "M0 0H1170V2532C-1949 2503-1937 2512-887 447-876 63-796 5-313 0Z"
    const path = useRef(null)
    const burger = useRef(null)
    const myLogo = useRef(null)
    const menuRef = useRef(null)

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const tl = useRef(gsap.timeline({ paused: true }))

    useEffect(() => {
        const mainTl = gsap.timeline({ paused: true })

        mainTl
            .to(path.current, {
                duration: 0.5,
                attr: { d: start },
                ease: "power1.inOut",
            })
            .add(() => {
                if (mainTl.reversed()) {
                    burger.current.classList.remove("active")
                } else {
                    burger.current.classList.add("active")
                }
            }, "<")

            .to("body", { overflow: "hidden" }, "<")
            .to(".overlay", { zIndex: 1 }, "<")
            .to(
                path.current,
                {
                    duration: 0.8,
                    attr: { d: end },
                    ease: "power1.inOut",
                },
                "+=0.1"
            )
            .to(
                "meta[name='theme-color']",
                { attr: { content: "#749BFF" } },
                "-=1.35"
            )
            .to(
                burger.current,
                {
                    "--background-burger": BACKGROUND_400,
                    duration: 0.3,
                    ease: "power2.in",
                },
                "-=1.45"
            )
            .to(
                myLogo.current,
                {
                    color: BACKGROUND_400,
                    duration: 0.3,
                    ease: "power2.in",
                },
                "-=0.8"
            )

        // Separate timeline for staggered menu items
        const menuTl = gsap.timeline({
            paused: true,
            onStart: () => mainTl.play(),
            onReverseComplete: () => mainTl.reverse().delay(0),
        })

        menuTl.to(menuRef.current.children, {
            delay: 0.8,
            duration: 0.8,
            y: 50,
            autoAlpha: 1,
            stagger: 0.2,
            ease: "power1.out",
        })

        tl.current = { main: mainTl, menu: menuTl }
    }, [])

    const toggleMenu = (e) => {
        e.stopPropagation()

        setIsMenuOpen((prevState) => {
            if (!prevState) {
                tl.current.menu.play()
            } else {
                tl.current.menu.reverse()
            }

            return !prevState
        })
    }

    return (
        <>
            <header className="header">
                <div className="container-sm g-0">
                    <div className="row">
                        <div className="col-6">
                            <Logo ref={myLogo} />
                        </div>
                        <div className="col-6">
                            <BurgerMenu onClick={toggleMenu} ref={burger} />
                        </div>
                    </div>
                </div>
            </header>
            <Overlay pathRef={path} menuRef={menuRef} />
        </>
    )
}

export default Header
