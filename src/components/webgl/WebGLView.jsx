import React, { useRef, useState, Suspense, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { Canvas } from "@react-three/fiber"
import Sketch from "./Sketch"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { GUI } from "dat.gui"

const WebGLView = () => {
    const webglRef = useRef()
    const cameraRef = useRef()
    const [cameraConfig, setCameraConfig] = useState({
        fov: 70,
        aspect: window.innerWidth / window.innerHeight,
        near: 100,
        far: 2000,
        position: [0, 0, 300],
    })
    const rendererConfig = { antialias: true, alpha: true }
    const isDesktop = useMediaQuery({ query: "(min-width: 992px)" })

    useGSAP(() => {
        if (isDesktop) {
            gsap.fromTo(
                webglRef.current,
                {
                    y: -80,
                },
                {
                    scrollTrigger: {
                        start: "top",
                        end: "+=600px",
                        scrub: true,
                    },
                    y: 0,
                }
            )
        }
    }, [isDesktop])

    return (
        <div ref={webglRef} className="canvas">
            <Canvas gl={rendererConfig}>
                <Suspense fallback={null}>
                    <Sketch />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default WebGLView
