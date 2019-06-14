import Canvas from './canvas'
import Game from './game'

const updateFunc = ({num}) => ({num: num + 1})
const drawFunc = state => ctx => {
  ctx.fillRect(0, 0, state.num, 51)
}
const canvas = new Canvas('canvas', 1024, 650)
const game = new Game(canvas, updateFunc, drawFunc, {num: 1})

const loop = () => {
  game.loop()
  window.requestAnimationFrame(loop)
}

loop()
