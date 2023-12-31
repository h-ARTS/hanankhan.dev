/**
 * Damit wir die Elemente ins Refs (siehe oben) speichern können.
 *
 * @param {HTMLElement} el line sowie mask element
 * @param {React.MutableRefObject} refGroup linkRefs und maskRefs
 */
const addToRefs = (el, refGroup) => {
    if (el && !refGroup.current.includes(el)) {
        refGroup.current.push(el)
    }
}

export default addToRefs
