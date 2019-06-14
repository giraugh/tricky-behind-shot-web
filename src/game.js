export default class Game {
  constructor (canvas, updateFunc, drawFunc, initialState) {
    this.canvas = canvas
    this.updateFunc = updateFunc
    this.drawFunc = drawFunc
    this.state = {...initialState}
  }

  update () {
    const newState = this.updateFunc(this.state)
    this.state = {...newState}
  }

  draw () {
    const drawOperation = this.drawFunc(this.state)
    this.canvas.draw(drawOperation)
  }

  loop () {
    this.update()
    this.draw()
  }
}
