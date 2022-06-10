const showOutput = (str = undefined) => {
    if (!str) str = ''
    const outputCard = document.getElementById('outputCard')
    if (str.trim().length == 0) outputCard.hidden = true
    else {
        document.getElementById('output').innerText = str
        outputCard.hidden = false
    }
}

const changeText = (shouldShembetengify = true) => {
    const inputTextAreaLabel = document.getElementById('inputTextAreaLabel')
    const mainButton = document.getElementById('mainButton')
    if (shouldShembetengify) {
        inputTextAreaLabel.innerText = 'Andika Hapa'
        mainButton.innerText = 'Shembetengisha!'
    } else {
        inputTextAreaLabel.innerText = 'Andimbitika Hambatapa'
        mainButton.innerText = 'Toa Shembeteng!'
    }
}

const changeButtonAbility = (enabled = true) => {
    document.getElementById('mainButton').disabled = !enabled
}

const changeStrengthSelectAbility = (enabled = true) => {
    document.getElementById('strengthSelect').disabled = !enabled
}

const ifShouldShembetengify = () => document.getElementById('modeSelect').value == 1

const onInputChanged = () => {
    const shouldShembetengify = ifShouldShembetengify()
    changeText(shouldShembetengify)
    changeStrengthSelectAbility(shouldShembetengify)
    if (document.getElementById('inputTextArea').value.trim().length > 0) {
        changeButtonAbility(true)
    } else {
        changeButtonAbility(false)
    }
}

const mainButtonClicked = () => {
    const str = document.getElementById('inputTextArea').value
    showOutput(ifShouldShembetengify() ? shembetengify(str, document.getElementById('strengthSelect').value) : deshembetengify(str))
    window.location = '#outputCard'
    changeButtonAbility(false)
}

window.onload = () => {
    showOutput()
    onInputChanged()
}