import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { glslify } from "vite-plugin-glslify"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), glslify()],
})
