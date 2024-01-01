import { createContext } from "react"

export const WebGLContext = createContext({
    containerRef: null,
})

export function webglReducer(webgl, action) {
    switch (action.type) {
        case "init-ref":
            return webgl
        default:
            break
    }
}
