document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  let width = 10
  let bombCount = 20
  let flags = 0
  let squares = []
  let isGameOver = false 

  function createBoard() {

    const bombArray = Array(bombCount).fill('bomb')
    const emptyArray = Array(width*width - bombCount).fill('valid')
    const gameArray = emptyArray.concat(bombArray)
    const randomArray = gameArray.sort(() => Math.random() -0.5)
  

    for(let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      square.setAttribute('id', i)
      square.classList.add(randomArray[i])
      grid.appendChild(square)
      squares.push(square)

      square.addEventListener('click', function(e) {
        click(square)
      })

      square.oncontextmenu = function(e) {
        e.preventDefault()
        addFlag(square)
      }
    }

      for (let i = 0; i < squares.length; i++) {
      let total = 0
      const isLeftSide = (i % width === 0)
      const isRightSide = (i % width === width -1)

      if (squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftSide && squares[i -1].classList.contains('bomb')) total ++
        if (i > 9 && !isRightSide && squares[i +1 -width].classList.contains('bomb')) total ++
        if (i > 10 && squares[i -width].classList.contains('bomb')) total ++
        if (i > 11 && !isLeftSide && squares[i -1 -width].classList.contains('bomb')) total ++
        if (i < 98 && !isRightSide && squares[i +1].classList.contains('bomb')) total ++
        if (i < 90 && !isLeftSide && squares[i -1 +width].classList.contains('bomb')) total ++
        if (i < 88 && !isRightSide && squares[i +1 +width].classList.contains('bomb')) total ++
        if (i < 89 && squares[i +width].classList.contains('bomb')) total ++
        squares[i].setAttribute('data', total)
      }
    }
  }

  createBoard()


  function addFlag(square) {
    if (isGameOver) return
    if (!square.classList.contains('checked') && (flags < bombCount)) {
      if (!square.classList.contains('flag')) {
        square.classList.add('flag')
        square.innerHTML = '????'
        flags ++
        checkForWin()
      } else {
        square.classList.remove('flag')
        square.innerHTML = ''
        flags --
      }
    }
  }

  function click(square) {
    let currentId = square.id
    if (isGameOver) return
    if (square.classList.contains('checked') || square.classList.contains('flag')) return 
    if (square.classList.contains('bomb')) {
      // console.log('Game Over!')
      gameOver(square)
    } else {
      let total = square.getAttribute('data') 
      if (total !=0) {
        square.classList.add('checked')
        square.innerHTML = total
        return
      }
      checkSquare(square, currentId)
    }
    square.classList.add('checked')
  }

  
  
  function checkSquare(square, currentId) {
    const isLeftSide = (currentId % width === 0)
    const isRightSide = (currentId % width === width -1)

    setTimeout(() => {
      if (currentId > 0 && !isLeftSide) {
        const newId = squares[parseInt(currentId) -1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 9 && !isRightSide) {
        const newId = squares[parseInt(currentId) +1 -width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 10 ) {
        const newId = squares[parseInt(currentId) -width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 11 && !isLeftSide) {
        const newId = squares[parseInt(currentId) -1 -width].id 
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 99 && !isRightSide) {
        const newId = squares[parseInt(currentId) +1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 90 && !isLeftSide) {
        const newId = squares[parseInt(currentId) -1 +width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 88 && !isRightSide) {
        const newId = squares[parseInt(currentId) +1 +width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 89) {
        const newId = squares[parseInt(currentId) +width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
    }, 10)
  }


function gameOver(square) {
  console.log('BOOM! Game Over!')
  isGameOver = true 

  squares.forEach(square => {
    if (square.classList.contains('bomb')) {
      square.innerHTML = '????'
    }
  })
}

function checkForWin() {
let matches = 0

  for (let i = 0; i < squares.length; i++) {
    if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
      matches ++
    }
    if (matches === bombCount) {
      console.log('You Win! No Boom and Go Bye Bye!')
      isGameOver = true 
    }
  }
}


})
