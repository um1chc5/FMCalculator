var equation = []
var numbers = [0,1,2,3,4,5,6,7,8,9,'.']
var mathFunction = {
    plus: (prev, current) => prev + current,
    subtract: (prev, current) => prev - current,
    mutiple: (prev, current) => prev*current,
    divide: (prev, current) => prev/current,
}

const button = document.querySelectorAll('.button>*:not(#delete)')

const caclBuntton = document.querySelector('#calc')
const resetButton = document.querySelector('#reset')
const deleteButton = document.querySelector('#delete')
const screen = document.querySelector('.screen')
var isCalc = false
var result;


const Calc = function() {

    // Xử lý dữ liệu đầu vào
    var equationCopy = [...equation]
    var functionArray = equation.filter((e) => { return !numbers.includes(e)})
    const numberObject = {}
    for (var i = 0; i <= functionArray.length; i++) {
        numberObject[`number-${i}`] = ''
    }
    
    var scan = 0
    for (var i = 0; i < equationCopy.length; i++) {
        if (!functionArray.includes(equation[i])) {
            numberObject[`number-${scan}`] += equation[i]
        } else {scan += 1}
    }

    var numberArray = Object.keys(numberObject).map(key => parseInt(numberObject[key]));
    // console.log(numberArray)
    // console.log(functionArray)
    // console.log(numberObject)
    
    // Tính toán 

    for (var func of functionArray) {
        result = mathFunction[func](numberArray[0],numberArray[1])
        numberArray = numberArray.slice(2)
        numberArray.unshift(result)
    }

    console.log(result)
}

const resetScreen = function() {
    screen.textContent = ''
}



Array.from(button).forEach(e => {
    e.onclick = () => {
        
        var inputValue = e.textContent

        if (isCalc) {
            if (numbers.includes(parseInt(inputValue))) {
                resetButton.click()
            } else {
                resetScreen()
            }
            isCalc = false
        }

        if (numbers.includes(inputValue) || numbers.includes(parseInt(inputValue))) {
            inputValue == '.' ? equation.push('.') : equation.push(parseInt(inputValue))
        } else {
            equation.push(e.id)
        }
        
        screen.textContent += inputValue

        console.log(equation)
    }
})

caclBuntton.onclick = () => {
    Calc()
    isCalc = true
    screen.textContent = result
}

resetButton.onclick = () => {
    resetScreen()
    equation = []
}

deleteButton.onclick = () => {
    currentScreen = Array.from(screen.textContent)
    currentScreen.pop()
    equation.pop()
    screen.textContent = currentScreen.join('')
}