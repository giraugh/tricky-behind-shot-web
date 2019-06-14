import Canvas from './canvas'
import Game from './game'
import updateFunc from './game/update'
import drawFunc from './game/draw'
import initialState from './game/state'

const canvas = new Canvas('canvas', 1024, 650)
const game = new Game(canvas, updateFunc, drawFunc, initialState)

const loop = () => {
  game.loop()
  window.requestAnimationFrame(loop)
}

// Start loop
loop()
