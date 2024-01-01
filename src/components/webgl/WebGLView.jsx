import React from "react"
import { Canvas } from "@react-three/fiber"
import Sketch from "./Sketch"
import { Suspense } from "react"

const WebGLView = () => {
    const cameraConfig = {
        fov: 70,
        near: 100,
        far: 2000,
        position: [0, 0, 300],
    }
    const rendererConfig = { antialias: true, alpha: true }

    return (
        <Canvas camera={cameraConfig} gl={rendererConfig}>
            <Suspense fallback={null}>
                <Sketch />
            </Suspense>
        </Canvas>
    )
}

export default WebGLView
