import React, { useRef, useEffect, useState, useContext } from "react"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import {
    TextureLoader,
    LinearFilter,
    RGBAFormat,
    InstancedBufferAttribute,
    InstancedBufferGeometry,
    RawShaderMaterial,
    Vector2,
    BufferAttribute,
} from "three"
import gsap from "gsap"
import useTouchTexture from "../../hooks/useTouchTexture"
import vertexShader from "../../shaders/vertex.glsl"
import fragmentShader from "../../shaders/fragment.glsl"
import HitArea from "./HitArea"
import { WebGLContext } from "../../layouts/WebGLContext"

const THRESHOLD = 99

function Particles({ sample, discard = true }) {
    const webgl = useContext(WebGLContext)
    const texture = useLoader(TextureLoader, sample)
    const { size, viewport, gl } = useThree()
    const touchTexture = useTouchTexture()
    const [numPoints, setNumPoints] = useState(0)
    const containerRef = useRef()
    const meshRef = useRef()
    const hitAreaRef = useRef()

    useEffect(() => {
        texture.minFilter = LinearFilter
        texture.magFilter = LinearFilter
        texture.format = RGBAFormat

        const width = texture.image.width
        const height = texture.image.height

        setNumPoints(width * height)

        const [geometry, material] = initParticles(width, height, texture)

        meshRef.current.geometry = geometry
        meshRef.current.material = material

        showAnimation(meshRef.current)

        return () => {
            geometry.dispose()
            material.dispose()
        }
    }, [])

    const canvasRatio = viewport.width / viewport.height
    useEffect(() => {
        const handleResize = () => {
            if (webgl.current) {
                const { offsetWidth, offsetHeight } = webgl.current
                const textureRatio = texture.image.width / texture.image.height
                let scale

                if (canvasRatio < textureRatio) {
                    // console.log("canvas ratio is LESS")
                    gl.setSize(offsetWidth, offsetHeight)
                    scale = (texture.image.width / texture.image.height) * 0.9
                } else {
                    // console.log("canvas ratio is HIGHER")
                    gl.setSize(offsetWidth, viewport.height)
                    scale = offsetWidth / texture.image.height
                }

                // console.log("canvasRatio", canvasRatio)
                // console.log("textureRatio", textureRatio)
                // console.log("offsetWidth", offsetWidth)
                // console.log("offsetHeight", offsetHeight)
                // console.log("viewport height", viewport.height)
                // console.log("viewport width", viewport.width)

                if (meshRef.current) {
                    meshRef.current.scale.set(scale, scale, 1)
                }
                if (hitAreaRef.current) {
                    hitAreaRef.current.scale.set(scale, scale, 1)
                }
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [gl])

    useFrame(({ clock }) => {
        let delta = clock.getDelta()
        if (meshRef.current) {
            delta += 0.01
            // delta *= 17 + 0.01

            touchTexture.update()

            if (meshRef.current.material.hasOwnProperty("uniforms"))
                meshRef.current.material.uniforms.uTime.value += delta
        }
    })

    function initParticles(width, height, texture) {
        const numPoints = width * height
        let numVisible = 0
        let originalColors

        if (discard) {
            const img = texture.image
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")

            canvas.width = img.width
            canvas.height = img.height
            ctx.scale(1, -1)
            ctx.drawImage(img, 0, 0, width, height * -1)

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            originalColors = Float32Array.from(imgData.data)

            for (let i = 0; i < numPoints; i++) {
                if (originalColors[i * 4] > THRESHOLD) numVisible++
            }

            // console.log("numVisible", numVisible, numPoints)
        }

        // Daten pro Partikel vorbereiten in buffers
        const geometry = new InstancedBufferGeometry()

        const positions = new Float32Array(4 * 3)
        positions.set([
            -0.5, 0.5, 0.0, 0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0,
        ])
        geometry.setAttribute(
            "position",
            new BufferAttribute(positions, 3, false)
        )

        const uvs = new Float32Array(4 * 2)
        uvs.set([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0])
        geometry.setAttribute("uv", new BufferAttribute(uvs, 2, false))

        const indexArray = [0, 2, 1, 2, 3, 1]
        geometry.setIndex(new BufferAttribute(new Uint16Array(indexArray), 1))

        const indices = new Uint16Array(numVisible)
        const offsets = new Float32Array(numVisible * 3) // 3 Werte (x, y, z) pro Point da Vector3
        const angles = new Float32Array(numVisible)

        for (let i = 0, j = 0; i < numPoints; i++) {
            if (discard && originalColors[i * 4] <= THRESHOLD) continue

            offsets[j * 3] = i % width
            offsets[j * 3 + 1] = Math.floor(i / width)
            offsets[j * 3 + 2] = 0 // für die z-achse
            angles[j] = Math.random() * Math.PI
            indices[j] = j // neues index
            j++
        }

        geometry.setAttribute(
            "pindex",
            new InstancedBufferAttribute(indices, 1, false)
        )
        geometry.setAttribute(
            "offset",
            new InstancedBufferAttribute(offsets, 3, false)
        )
        geometry.setAttribute(
            "angle",
            new InstancedBufferAttribute(angles, 1, false)
        )

        const uniforms = {
            uTime: { value: 0 },
            uRandom: { value: 1.0 },
            uDepth: { value: 2.0 },
            uSize: { value: 0.0 },
            uTextureSize: { value: new Vector2(width, height) },
            uTexture: { value: texture },
            uTouch: { value: touchTexture.texture },
        }

        const material = new RawShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            depthTest: false,
            transparent: true,
        })

        return [geometry, material]
    }

    function showAnimation(mesh) {
        gsap.fromTo(
            mesh.material.uniforms.uSize,
            { value: 0.0 },
            { value: 1.1, duration: 1.0 }
        )
        gsap.to(mesh.material.uniforms.uRandom, { value: 2, duration: 1.0 })
        gsap.fromTo(
            mesh.material.uniforms.uDepth,
            { value: 60.0 },
            { value: 4.0, duration: 1.5, ease: "power4.inOut" }
        )
    }

    const handleInteractionMove = (e) => {
        const uv = e.intersectionData?.uv
        if (uv && touchTexture) touchTexture.addTouch(uv)
    }

    return (
        <object3D>
            <mesh ref={meshRef} />
            <HitArea
                ref={hitAreaRef}
                width={texture.image.width}
                height={texture.image.height}
                onInteractiveMove={handleInteractionMove}
            />
        </object3D>
    )
}

export default Particles
