import Canvas from './util/canvas'
import GameControl from './control'
import updateFunc from './game/update/update'
import drawFunc from './game/draw/draw'
import initialStateFunc from './game/state/state'
import gameParameters from './game/config/params'

const canvas = new Canvas('canvas', 1024, 650)
const gameControl = new GameControl(canvas, updateFunc, drawFunc, initialStateFunc(gameParameters))

const loop = () => {
  gameControl.loop()
  window.requestAnimationFrame(loop)
}

// Start loop
loop()
