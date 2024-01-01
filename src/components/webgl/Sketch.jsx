import React, { useEffect, useRef, useContext } from "react"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"
import Particles from "./Particles"
import sample from "../../assets/sample7.png"
import { WebGLContext } from "../../layouts/WebGLContext"

const Sketch = () => {
    const { offsetWidth, offsetHeight } = useContext(WebGLContext)
    const { camera, gl, viewport } = useThree()

    // useEffect(() => {
    //     const handleResize = () => {
    //         camera.aspect = offsetWidth / offsetHeight
    //         // camera.aspect = viewport.width / viewport.height
    //         camera.updateProjectionMatrix()
    //         gl.setSize(viewport.width, viewport.height)
    //     }
    //     window.addEventListener("resize", handleResize)
    //     return () => window.removeEventListener("resize", handleResize)
    // }, [camera, gl])

    return <Particles sample={sample} />
}

export default Sketch
