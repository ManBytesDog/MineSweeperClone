document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  let width = 10
  let bombCount = 20
  let squares = []

  function createBoard() {

    const bombArray = Array(bombCount).fill('bomb')
    const emptyArray = Array(width*width - bombCount).fill('valid')
    const gameArray = emptyArray.concat(bombArray)
    const randomArray = gameArray.sort(() => Math.random() -0.5)
  

    for(let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      square.setAttribute('id', i)
      grid.appendChild(square)
      squares.push(square)
    }
  }

  createBoard()


})
