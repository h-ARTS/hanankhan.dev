import { useRef, useCallback } from "react"
import * as THREE from "three"

const easeOutSine = (t, b, c, d) => {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b
}

const useTouchTexture = (size = 64, maxAge = 120, radius = 0.15) => {
    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const textureRef = useRef(null)
    const trailRef = useRef([])

    if (!canvasRef.current) {
        canvasRef.current = document.createElement("canvas")
        canvasRef.current.width = canvasRef.current.height = size
        ctxRef.current = canvasRef.current.getContext("2d")
        ctxRef.current.fillStyle = "black"
        ctxRef.current.fillRect(0, 0, size, size)
        textureRef.current = new THREE.Texture(canvasRef.current)
    }

    const clear = useCallback(() => {
        ctxRef.current.fillStyle = "black"
        ctxRef.current.fillRect(0, 0, size, size)
    }, [size])

    const drawTouch = useCallback(
        (point) => {
            const pos = {
                x: point.x * size,
                y: (1 - point.y) * size,
            }

            let intensity = 1
            if (point.age < maxAge * 0.3) {
                intensity = easeOutSine(point.age / (maxAge * 0.3), 0, 1, 1)
            } else {
                intensity = easeOutSine(
                    1 - (point.age - maxAge * 0.3) / (maxAge * 0.7),
                    0,
                    1,
                    1
                )
            }

            intensity *= point.force

            const drawRadius = size * radius * intensity
            // if (!isFinite(drawRadius)) return

            const grd = ctxRef.current.createRadialGradient(
                pos.x,
                pos.y,
                drawRadius * 0.25,
                pos.x,
                pos.y,
                drawRadius
            )
            grd.addColorStop(0, `rgba(255, 255, 255, 0.2)`)
            grd.addColorStop(1, `rgba(0, 0, 0, 0.0)`)

            ctxRef.current.beginPath()
            ctxRef.current.fillStyle = grd
            ctxRef.current.arc(pos.x, pos.y, drawRadius, 0, Math.PI * 2)
            ctxRef.current.fill()
        },
        [size, radius, maxAge]
    )

    const addTouch = useCallback((point) => {
        let force = 0
        const last = trailRef.current[trailRef.current.length - 1]
        if (last) {
            const dx = last.x - point.x
            const dy = last.y - point.y
            const dd = dx * dx + dy * dy
            force = Math.min(dd * 10000, 1)
        }

        trailRef.current.push({ x: point.x, y: point.y, age: 0, force })
    }, [])

    const update = useCallback(
        (delta) => {
            clear()

            trailRef.current.forEach((point, i) => {
                point.age++
                if (point.age > maxAge) {
                    trailRef.current.splice(i, 1)
                }
            })

            trailRef.current.forEach(drawTouch)

            textureRef.current.needsUpdate = true
        },
        [clear, drawTouch, maxAge]
    )

    return { texture: textureRef.current, addTouch, update }
}

export default useTouchTexture
