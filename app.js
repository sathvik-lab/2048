document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.content')
    const scoreDisplay = document.getElementById('score')
    const resultsDisplay = document.getElementById('results')
    const width = 4
    const arr = []
    const colors = ["#B9FBC2", "#98F5E1", "#8EECF5", "#90DBF4", "#A3C4F3", "#CFBAF0", "#F1C0E8", "#FFCFD2", "#FDE4CF", "#FBF8CC"]
    score = 0

    // function to create a playing board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            arr.push(square)
        }
        generate()
        generate()
    }
    createBoard()


    // function to generate random number
    function generate() {
        let rand = Math.floor(Math.random() * arr.length)
        if (arr[rand].innerHTML == 0) {
            arr[rand].innerHTML = 2
            checkForGameOver()
        } else generate()
    }


    //swipe Right
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = arr[i].innerHTML
                let totalTwo = arr[i + 1].innerHTML
                let totalThree = arr[i + 2].innerHTML
                let totalFour = arr[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                // console.log(row)

                let filteredRow = row.filter(num => num)
                    // console.log(filteredRow)
                let missing = 4 - (filteredRow.length)
                let zeros = Array(missing).fill(0)
                    // console.log(zeros)
                let newRow = zeros.concat(filteredRow)
                    // console.log(nerRow)

                arr[i].innerHTML = newRow[0]
                arr[i + 1].innerHTML = newRow[1]
                arr[i + 2].innerHTML = newRow[2]
                arr[i + 3].innerHTML = newRow[3]

            }
        }
    }



    //swipe Left
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = arr[i].innerHTML
                let totalTwo = arr[i + 1].innerHTML
                let totalThree = arr[i + 2].innerHTML
                let totalFour = arr[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                // console.log(row)

                let filteredRow = row.filter(num => num)
                    // console.log(filteredRow)
                let missing = 4 - (filteredRow.length)
                let zeros = Array(missing).fill(0)
                    // console.log(zeros)
                let newRow = filteredRow.concat(zeros)
                    // console.log(nerRow)

                arr[i].innerHTML = newRow[0]
                arr[i + 1].innerHTML = newRow[1]
                arr[i + 2].innerHTML = newRow[2]
                arr[i + 3].innerHTML = newRow[3]

            }
        }
    }


    // swipe down
    function moveDown() {
        for (let i = 0; i < 4; i++) {

            let totalOne = arr[i].innerHTML
            let totalTwo = arr[i + width].innerHTML
            let totalThree = arr[i + (width * 2)].innerHTML
            let totalFour = arr[i + (width * 3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            // console.log(row)

            let filteredColumn = column.filter(num => num)
                // console.log(filteredRow)
            let missing = 4 - (filteredColumn.length)
            let zeros = Array(missing).fill(0)
                // console.log(zeros)
            let newColumn = zeros.concat(filteredColumn)
                // console.log(nerRow)

            arr[i].innerHTML = newColumn[0]
            arr[i + width].innerHTML = newColumn[1]
            arr[i + (width * 2)].innerHTML = newColumn[2]
            arr[i + (width * 3)].innerHTML = newColumn[3]

        }
    }

    // swipe up
    function moveUp() {
        for (let i = 0; i < 4; i++) {

            let totalOne = arr[i].innerHTML
            let totalTwo = arr[i + width].innerHTML
            let totalThree = arr[i + (width * 2)].innerHTML
            let totalFour = arr[i + (width * 3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            // console.log(row)

            let filteredColumn = column.filter(num => num)
                // console.log(filteredRow)
            let missing = 4 - (filteredColumn.length)
            let zeros = Array(missing).fill(0)
                // console.log(zeros)
            let newColumn = filteredColumn.concat(zeros)
                // console.log(nerRow)

            arr[i].innerHTML = newColumn[0]
            arr[i + width].innerHTML = newColumn[1]
            arr[i + (width * 2)].innerHTML = newColumn[2]
            arr[i + (width * 3)].innerHTML = newColumn[3]

        }
    }



    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (arr[i].innerHTML === arr[i + 1].innerHTML) {
                let combinedTotal = parseInt(arr[i].innerHTML) + parseInt(arr[i + 1].innerHTML)
                arr[i].innerHTML = combinedTotal
                arr[i + 1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }


    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (arr[i].innerHTML === arr[i + width].innerHTML) {
                let combinedTotal = parseInt(arr[i].innerHTML) + parseInt(arr[i + width].innerHTML)
                arr[i].innerHTML = combinedTotal
                arr[i + width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }


    //assign keycodes
    function control(e) {
        if (e.keyCode === 39) {
            keyRight()
        } else if (e.keyCode === 37) {
            keyLeft()
        } else if (e.keyCode === 38) {
            keyUp()
        } else if (e.keyCode === 40) {
            keyDown()
        }

    }
    document.addEventListener('keyup', control)

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }

    function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }



    //check for the number 2048 in the squares to win
    function checkForWin() {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].innerHTML == 2048) {
                resultsDisplay.innerHTML = 'You Win!!'
                document.removeEventListener('keyup', control)
            }
        }
    }


    function checkForGameOver() {
        let zeros = 0
        let comb = 0
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].innerHTML == 0) {
                zeros++
                arr[i].style.backgroundColor = `#AAA`
            } else {
                for (let j = 0; j < colors.length; j++) {
                    if (arr[i].innerHTML == Math.pow(2, j + 1)) {
                        arr[i].style.backgroundColor = colors[j]
                    }
                }
            }
        }
        if (zeros === 0) {
            let zeros = 0
            let comb = 0
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].innerHTML == 0) {
                    zeros++
                    arr[i].style.backgroundColor = `#AAA`
                } else {
                    for (let j = 0; j < colors.length; j++) {
                        if (arr[i].innerHTML == Math.pow(2, j + 1)) {
                            arr[i].style.backgroundColor = colors[j]
                        }
                    }
                }
            }
            resultsDisplay.innerHTML = 'You Lose!!'
            document.removeEventListener('keyup', control)
        }
    }



})