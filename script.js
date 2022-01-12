const gridWidth = 28;
const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const squares = []
const totalGridWidth = gridWidth * gridWidth
let score = 0

// 28 * 28 = 784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const layout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,3,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,3,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

const createBoard = () => {
  for (let i = 0; i < layout.length; i++) {
    // create a square
    const square = document.createElement('div')
    // put square into grid
    grid.appendChild(square)
    // add square into squares array   
    squares.push(square)

    switch (layout[i]) {
      case 0:
        square.classList.add('pac-dot')
        break;
      case 1:
        square.classList.add('wall')
        break;
      case 2:
        square.classList.add('ghost-lair')
        break;
      case 3:
        square.classList.add('power-pellet')
        break;
      default:
        break;
    }
  }
}
createBoard()

// starting position of pacman
let pacmanCurrentIndex = 490 
// create pacman element
squares[pacmanCurrentIndex].classList.add('pacman') 

// move pacman
function control(e) {
  squares[pacmanCurrentIndex].classList.remove('pacman')

	switch (e.key) {
		case "ArrowDown":
      if (
        !squares[pacmanCurrentIndex + gridWidth].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + gridWidth].classList.contains('ghost-lair') &&
        pacmanCurrentIndex + gridWidth < gridWidth * gridWidth
        ) 
        pacmanCurrentIndex += 28
			break;
		case "ArrowUp":
      if (
        !squares[pacmanCurrentIndex - gridWidth].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - gridWidth].classList.contains('ghost-lair') &&
        pacmanCurrentIndex - gridWidth >= 0
        ) 
        pacmanCurrentIndex -= 28
			break;
		case "ArrowLeft":
      if (
        !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
        pacmanCurrentIndex % gridWidth !== 0
        ) 
        pacmanCurrentIndex -= 1 

      if (pacmanCurrentIndex === 364) {
        pacmanCurrentIndex = 391
      }
			break;
		case "ArrowRight":
      if (
        !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
        pacmanCurrentIndex % gridWidth < 27
        ) 
        pacmanCurrentIndex += 1

      if (pacmanCurrentIndex === 391) {
        pacmanCurrentIndex = 364
      }
			break;
		default:
			return;
	}

  squares[pacmanCurrentIndex].classList.add('pacman')
  eatPacDots()
  eatPowerPellet()
  checkForWinner()
  checkForGameOver()
}
document.onkeyup = control;

// eating pac-dots
function eatPacDots() {
  // remove 'pac-dot' class if sqaure contains a 'pac-dot'
  if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    squares[pacmanCurrentIndex].classList.remove('pac-dot')   
    score++
    scoreDisplay.innerHTML = score
  }
}

function eatPowerPellet() {
  // if pacman square contains power pellet
  if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    // remove 'power-pellet' class
    squares[pacmanCurrentIndex].classList.remove('power-pellet')
    // add 10 to score
    score += 10
    // change each ghost to isScared
    ghosts.forEach(ghost => {
      ghost.isScared = true
    })
    // use setTimeout to 'unScare' the ghost after 10 seconds
    setTimeout(() => {
      ghosts.forEach(ghost => {
        ghost.isScared = false
      })
    }, 10000)
  }
}


// create ghosts
class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className,
    this.startIndex = startIndex,
    this.speed = speed,
    this.currentIndex = startIndex,
    this.isScared = false,
    this.timerId = NaN
  }
}

const ghosts = [
  new Ghost('blinky', 376, 250),
  new Ghost('pinky', 404, 400),
  new Ghost('inky', 379, 300),
  new Ghost('clyde', 407, 500)
]

// draw ghosts onto the grid
ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className)
  squares[ghost.currentIndex].classList.add('ghost')
})

// move ghost
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
  const directions = [-1, +1, -gridWidth, +gridWidth];
  let direction = directions[Math.floor(Math.random() * directions.length)]

  ghost.timerId = setInterval(() => {
    if (
      !squares[ghost.currentIndex + direction].classList.contains('wall') &&
      !squares[ghost.currentIndex + direction].classList.contains('ghost')
    ) {
      // remove ghost class
      squares[ghost.currentIndex].classList.remove(ghost.className)
      squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
      // add direction to current index
      ghost.currentIndex += direction
      // add ghost class
      squares[ghost.currentIndex].classList.add(ghost.className)
      squares[ghost.currentIndex].classList.add('ghost')
    } else direction = directions[Math.floor(Math.random() * directions.length)]

    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost')
    }

    // if ghost is scared and pacman is on it
    if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
      // remove classnames
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      // change ghosts index to starting index
      ghost.currentIndex = ghost.startIndex
      // add 100 to score
      score += 100
      // re-add classnames
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }
    checkForGameOver()
  }, ghost.speed)
  
}

// check for game over
function checkForGameOver() {
  // if the square pacman is in contains a ghost and square does not contain a 'scared-ghost
  if (squares[pacmanCurrentIndex].classList.contains('ghost') && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) { 
    // for each ghost - stop movement
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    // remove eventListener from control function
    document.onkeyup = null
    // tell user the game is over
    scoreDisplay.innerHTML = 'YOU LOSE!'
  }
}

// check for winner
function checkForWinner() {
  if (score === 274) {
    //stop each ghost
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    //remove the eventListener for the control function
    document.onkeyup = null
    //tell our user we have won
    scoreDisplay.innerHTML = 'You WON!'
  }
}