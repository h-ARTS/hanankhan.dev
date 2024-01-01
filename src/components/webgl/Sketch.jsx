import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"
import Particles from "./Particles"
import sample from "../../assets/sample7.png"

const Sketch = () => {
    const { camera, gl } = useThree()

    useEffect(() => {
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            gl.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [camera, gl])

    return <Particles sample={sample} />
}

export default Sketch
