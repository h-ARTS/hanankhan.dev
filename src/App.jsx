import gsap from "gsap"
import { useEffect, useRef } from "react"

function App() {
    const lineRefs = useRef([])
    const maskRefs = useRef([])
    const contents = [
        { label: "PINNING", className: "text-base" },
        { label: "TUNNING", className: "text-primary" },
        { label: "OLUTIONS", className: "text-primary" },
        { label: "INCE 2015", className: "text-base" },
    ]

    useEffect(() => {
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
                duration: 1,
                translateY: 0,
                /**
                 * Sobald eine Buchstabe fertig animiert wurde, zählen wir
                 * den completedS hoch.
                 */
                onComplete: () => {
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
    }, [])

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
        <header>
            {contents.map((c, index) => (
                <div
                    className={`line ${c.className}`}
                    key={index}
                    ref={(el) => addToRefs(el, lineRefs)}
                >
                    <span className="first-letter">S</span>
                    <span className="rest">
                        <span
                            ref={(el) => addToRefs(el, maskRefs)}
                            className="mask"
                        ></span>
                        <span>{c.label}</span>
                    </span>
                </div>
            ))}
        </header>
    )
}

export default App
