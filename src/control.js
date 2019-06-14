import Input from './util/input'

export default class GameControl {
  constructor (canvas, updateFunc, drawFunc, initialState) {
    this.canvas = canvas
    this.updateFunc = updateFunc
    this.drawFunc = drawFunc
    this.state = {...initialState}
    this.previousUpdateTime = Date.now()

    const canvasPos = this.canvas.getPosition()
    this.input = new Input(canvasPos.x, canvasPos.y)
  }

  update () {
    const deltaTime = Date.now() - this.previousUpdateTime
    const input = this.input.getMouseInput()
    const newState = this.updateFunc(this.state, input, deltaTime)
    this.state = {...newState}

    // Update updateTime
    this.previousUpdateTime = Date.now()
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
