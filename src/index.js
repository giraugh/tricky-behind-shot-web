import Canvas from './util/canvas'
import GameControl from './control'
import updateFunc from './game/update/update'
import drawFunc from './game/draw/draw'
import initialState from './game/state/state'

const canvas = new Canvas('canvas', 1024, 650)
const gameControl = new GameControl(canvas, updateFunc, drawFunc, initialState)

const loop = () => {
  gameControl.loop()
  window.requestAnimationFrame(loop)
}

// Start loop
loop()
