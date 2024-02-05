import { useEffect } from "react"
import GUI from "dat.gui"

const useDatGui = (settings, setSettings) => {
    useEffect(() => {
        const gui = new GUI()
        Object.keys(settings).forEach((key) => {
            gui.add(settings, key).onChange((newValue) => {
                setSettings((prevSettings) => ({
                    ...prevSettings,
                    [key]: newValue,
                }))
            })
        })

        return () => gui.destroy()
    }, [settings, setSettings])
}

export default useDatGui
