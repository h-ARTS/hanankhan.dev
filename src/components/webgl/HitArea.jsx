import React, { useRef } from "react"
import { useThree, useFrame } from "@react-three/fiber"

const HitArea = React.forwardRef(
    ({ width, height, onInteractiveMove }, ref) => {
        const { raycaster, pointer, camera } = useThree()

        useFrame(() => {
            if (!ref.current) return

            // Perform raycasting when needed to check for intersections
            raycaster.setFromCamera(pointer, camera)
            const intersects = raycaster.intersectObject(ref.current)

            if (intersects.length > 0) {
                // Handle the intersection event
                const intersectionData = intersects[0]
                onInteractiveMove({ intersectionData })
            }
        })

        return (
            <mesh ref={ref} visible={false}>
                <planeGeometry args={[width, height, 1, 1]} />
                <meshBasicMaterial visible={false} />
            </mesh>
        )
    }
)

export default HitArea
