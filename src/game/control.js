import Input from './util/input'
import equal from 'fast-deep-equal'

export default class GameControl {
  constructor (canvas, updateFunc, drawFunc, initialState, stateChangeSubscriptions = []) {
    this.canvas = canvas
    this.updateFunc = updateFunc
    this.drawFunc = drawFunc
    this.state = {...initialState}
    this.previousStates = []
    this.previousUpdateTime = Date.now()
    this.stateChangeSubscriptions = stateChangeSubscriptions

    this.input = new Input(
      this.canvas.getClientRect.bind(this.canvas),
      this.canvas.getRect.bind(this.canvas)
    )
  }

  update () {
    const deltaTime = Date.now() - this.previousUpdateTime
    const input = this.input.getMouseInput()
    const canvasRect = this.canvas.getRect()
    const newState = this.updateFunc({...this.state}, input, deltaTime, canvasRect)

    // Store old state and set new state
    if (!equal(newState, this.state)) {
      // Report to subscribers if the state changes
      this.stateChangeSubscriptions.forEach(({key, event}) => {
        if (!equal(newState[key], this.state[key])) { event(newState[key]) }
      })

      // Record state changes
      this.previousStates.push({...this.state})
    }
    this.state = newState

    // Update updateTime
    this.previousUpdateTime = Date.now()
  }

  draw () {
    const canvasRect = this.canvas.getRect()
    const drawOperation = this.drawFunc({...this.state}, canvasRect)
    this.canvas.draw(drawOperation)
  }

  loop () {
    this.update()
    this.draw()
  }
}
