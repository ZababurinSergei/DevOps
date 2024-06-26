export default async (self, actions) => {

    const iformatrad = self.shadowRoot.querySelector('#iformatrad')
    const iformatdeg = self.shadowRoot.querySelector('#iformatdeg')
    const rotationMatrix = self.shadowRoot.querySelectorAll('.nk-rotation-matrix')
    const nkQuaternion = self.shadowRoot.querySelectorAll('.nk-quaternion')
    const nkAxisAngle = self.shadowRoot.querySelectorAll('.nk-axis-angle')
    const nkAxisWithSngleMagnitude = self.shadowRoot.querySelectorAll('.nk-axis-with-angle-magnitude')
    const nkEulerAnglesOfMultipleAxisRotationsOnchange = self.shadowRoot.querySelectorAll('.nk-euler-angles-of-multiple-axis-rotations-onchange')
    const nkEulerAnglesOfMultipleAxisRotationsInput = self.shadowRoot.querySelectorAll('.nk-euler-angles-of-multiple-axis-rotations-input')
    const nkTripleOfPoints = self.shadowRoot.querySelectorAll('.nk-triple-of-points')
    const nkOutputAngleFormat = self.shadowRoot.querySelectorAll('.nk-output-angle-format')

    const actionUpdateMode_0 = (event) => actions.update(event, {inputMode: 0})
    const actionUpdateMode_1 = (event) => actions.update(event, {inputMode: 1})
    const actionUpdateMode_2 = (event) => actions.update(event, {inputMode: 2})
    const actionUpdateMode_3 = (event) => actions.update(event, {inputMode: 3})
    const actionUpdateMode_4 = (event) => actions.update(event, {inputMode: 4})
    const actionUpdateMode_5 = (event) => actions.update(event, {inputMode: 5})

    return {
        init: () => {
            iformatrad.addEventListener('change', actionUpdateMode_0)
            iformatdeg.addEventListener('change', actionUpdateMode_0)
            rotationMatrix.forEach(item => {
                item.addEventListener('input', actionUpdateMode_0)
            })
            nkQuaternion.forEach(item => {
                item.addEventListener('input', actionUpdateMode_1)
            })
            nkAxisAngle.forEach(item => {
                item.addEventListener('input', actionUpdateMode_2)
            })
            nkAxisWithSngleMagnitude.forEach(item => {
                item.addEventListener('input', actionUpdateMode_3)
            })
            nkEulerAnglesOfMultipleAxisRotationsOnchange.forEach(item => {
                item.addEventListener('change', actionUpdateMode_4)
            })
            nkEulerAnglesOfMultipleAxisRotationsInput.forEach(item => {
                item.addEventListener('input', actionUpdateMode_4)
            })
            nkTripleOfPoints.forEach(item => {
                item.addEventListener('input', actionUpdateMode_5)
            })
            nkOutputAngleFormat.forEach(item => {
                item.addEventListener('change', actions.doOutput)
            })
        },
        terminate: () => {
            iformatrad.removeEventListener('change', actionUpdateMode_0)
            iformatdeg.removeEventListener('change', actionUpdateMode_0)
            rotationMatrix.forEach(item => {
                item.removeEventListener('input', actionUpdateMode_0)
            })
            nkQuaternion.forEach(item => {
                item.removeEventListener('input', actionUpdateMode_1)
            })
            nkAxisAngle.forEach(item => {
                item.removeEventListener('input', actionUpdateMode_2)
            })
            nkAxisWithSngleMagnitude.forEach(item => {
                item.removeEventListener('input', actionUpdateMode_3)
            })
            nkEulerAnglesOfMultipleAxisRotationsOnchange.forEach(item => {
                item.removeEventListener('change', actionUpdateMode_4)
            })
            nkEulerAnglesOfMultipleAxisRotationsInput.forEach(item => {
                item.removeEventListener('input', actionUpdateMode_4)
            })
            nkTripleOfPoints.forEach(item => {
                item.removeEventListener('input', actionUpdateMode_5)
            })
            nkOutputAngleFormat.forEach(item => {
                item.removeEventListener('change', actions.doOutput)
            })
        }
    }
}