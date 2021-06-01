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
      square.classList.add(randomArray[i])
      grid.appendChild(square)
      squares.push(square)
    }


    for (let i = 0; i < squares.length; i++) {
      const isLeftSide = (i % width === 0)
      const isRightSide = (i % width === width -1)

      
    }





  }

  createBoard()


})
