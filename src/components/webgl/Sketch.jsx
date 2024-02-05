import React, { useEffect, useRef, useContext } from "react"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"
import Particles from "./Particles"
import sample from "../../assets/sample7.png"
import { WebGLContext } from "../../layouts/WebGLContext"
import { GUI } from "dat.gui"
import { PerspectiveCamera } from "three"
import { useGSAP } from "@gsap/react"

const Sketch = () => {
    const { offsetWidth, offsetHeight } = useContext(WebGLContext)
    const { camera, gl, viewport } = useThree()
    const set = useThree((state) => state.set)

    const initCamera = () => {
        camera.fov = 70
        camera.near = 1
        camera.aspect = window.innerWidth / window.innerHeight
        camera.far = 2000
        camera.position.set(-200, 0, 380)
        // camera.lookAt(-220, 0, 380)
        camera.updateProjectionMatrix()
    }

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

    useEffect(() => {
        const gui = new GUI()

        const cameraFolder = gui.addFolder("Camera")
        cameraFolder.open()

        cameraFolder.add(camera, "fov", 0, 120)
        cameraFolder.add(camera, "near", 0, 1000).step(10)
        cameraFolder.add(camera, "far", 0, 5000)

        // Handle position separately because it's an array
        cameraFolder.add(camera.position, "x", -1000, 1000).step(10)

        cameraFolder.add(camera.position, "y", 0, 1000).step(10)

        cameraFolder.add(camera.position, "z", 0, 1000).step(10)

        return () => {
            gui.removeFolder("Camera")
            gui.destroy()
        }
    }, [camera])

    useGSAP(() => {
        initCamera()
        // Update camera position on scroll
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            camera.position.y = scrollPosition * -0.5
            camera.position.copy(
                new THREE.Vector3(-220, scrollPosition * -0.5, 380)
            )
            camera.updateProjectionMatrix()
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [camera])

    return <Particles sample={sample} />
}

export default Sketch
