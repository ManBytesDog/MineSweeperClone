document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  let width = 10
  let bombCount = 20
  let squares = []

  function createBoard() {

    const bombArray = Array(bombCount).fill('bomb')
    const emptyArray = Array(width*width - bombCount).fill('valid')
    console.log(bombArray)
    console.log(emptyArray)

    for(let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      square.setAttribute('id', i)
      grid.appendChild(square)
      squares.push(square)
    }
  }

  createBoard()


})
