import { useEffect, useRef } from "react"
import gsap from "gsap"
import Header from "./components/Header"
import swipeUpSvg from "./assets/swipe-up.svg"
import { useMediaQuery } from "react-responsive"
import "./App.css"

function App() {
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" })
    const lineRefs = useRef([])
    const maskRefs = useRef([])
    const contents = [
        { label: "PINNING", className: "text-base" },
        { label: "TUNNING", className: "text-primary" },
        { label: "OLUTIONS", className: "text-primary" },
        { label: "INCE 2015", className: "text-base" },
    ]

    useEffect(() => {
        if (isMobile) {
            runHeroAnimationMobile()
        } else {
            runHeroAnimation()
        }
    }, [])

    const runHeroAnimationMobile = () => {
        const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "power1.in" },
        })
        tl.to(".mask", {
            y: 0,
            duration: 0.7,
            stagger: 0.2,
        })
            .fromTo("h2.rest", { opacity: 0 }, { opacity: 1, delay: 0.5 }, "0")
            .play()
    }

    const runHeroAnimation = () => {
        const totalS = lineRefs.current.length
        let completedS = 0

        lineRefs.current.forEach((line, index) => {
            const firstLetter = line.querySelector(".first-letter")

            /**
             * Wir nehmen die erste Buchstabe und animieren es von oben nach unten,
             * als wäre die Buchstabe hinter einer Maske.
             */
            gsap.to(firstLetter, {
                delay: index * 0.5,
                duration: 0.75,
                translateY: 0,
                ease: "power1.inOut",
                /**
                 * Sobald eine Buchstabe fertig animiert wurde, zählen wir
                 * den completedS hoch.
                 */
                onComplete: () => {
                    console.log("completed")
                    completedS++
                    if (completedS === totalS) {
                        /**
                         * Sobald alle animiert wurden, iterieren wir
                         * die maskRefs durch, welche während des Renders ins Array gepusht wurden,
                         * um die restlichen Texte einzublenden.
                         */
                        maskRefs.current.forEach((m) => {
                            gsap.to(m, {
                                duration: 1.25,
                                translateX: "100%",
                                ease: "power4.inOut",
                            })
                        })
                    }
                },
            })
        })
    }

    /**
     * Damit wir die Elemente ins Refs (siehe oben) speichern können.
     *
     * @param {HTMLElement} el line sowie mask element
     * @param {React.MutableRefObject} refGroup linkRefs und maskRefs
     */
    const addToRefs = (el, refGroup) => {
        if (el && !refGroup.current.includes(el)) {
            refGroup.current.push(el)
        }
    }

    return (
        <>
            <Header />
            <section className="hero container g-0">
                <div className="row g-0">
                    <div className="col">
                        <div className="hero-text">
                            {isMobile
                                ? contents.map((c, idx) => (
                                      <div
                                          className={`line ${c.className}`}
                                          key={idx}
                                          ref={(el) => addToRefs(el, lineRefs)}
                                      >
                                          <h2 className="rest">
                                              <span className="mask">
                                                  S{c.label}
                                              </span>
                                          </h2>
                                      </div>
                                  ))
                                : contents.map((c, index) => (
                                      <div
                                          className={`line ${c.className}`}
                                          key={index}
                                          ref={(el) => addToRefs(el, lineRefs)}
                                      >
                                          <span className="first-letter">
                                              S
                                          </span>
                                          <span className="rest">
                                              <span
                                                  ref={(el) =>
                                                      addToRefs(el, maskRefs)
                                                  }
                                                  className="mask"
                                              ></span>
                                              <span>{c.label}</span>
                                          </span>
                                      </div>
                                  ))}
                        </div>
                        <button className="gesture-hint">
                            <img src={swipeUpSvg} alt="swipe up" />
                            <h5>SWIPE UP</h5>
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default App
