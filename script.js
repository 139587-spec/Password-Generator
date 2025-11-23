const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if(!password) { return }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    //generate password
    const generatedPassword = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
    resultEl.innerText = generatedPassword

    //Update strength indicator
    const strengthEl = document.getElementById('strength');
    const strengthValue = calculatestrength(generatedPassword);

    strengthEl.teztContent = strengthValue
    strengthEl.className = '' //this removes old class

    if (strengthValue === 'Weak') {
        strengthEl.classList.add('strength-weak');
    } else if (strengthValue === 'Medium') {
        strengthEl.classList.add('strength-medium');
    } else if (strengthValue === 'Strong') {
        strengthEl.classList.add('strength-strong');
    }
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{lower}, {upper}, {number}, {symbol}].
    filter(item => Object.values(item) [0])

    if(typesCount === 0) {
        return ''
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type) [0]
            generatedPassword += randomFunc[funcName] ()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!#@^$&()*{}[]=<>,./'
    return symbols[Math.floor(Math.random() * symbols.length)]
}

function calculatestrength(password) {
    let strength = 0;

    //check the character types
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    //check length
    if (password.length >= 12) strength++;
    else if (password.length >= 8) strength+= 0.5;

    //determine strength label
    if (strength <= 2) return "Weak";
    else if (strength <= 3.5) return "Medium";
    else return "Strong";
}
