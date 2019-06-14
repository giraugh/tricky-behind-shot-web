// manage mouse position and input events
// pushes events into a queue
// when input is requested, queue is reduced into a single event and then returned.

const PRESSED = 'pressed'
const MOVED = 'moved'
const RELEASED = 'released'

export default class Input {
  constructor (originX, originY) {
    this.originX = originX
    this.originY = originY
    this.mouseEvents = []

    this.initMouseHandlers()
  }

  initMouseHandlers () {
    window.onmousedown = (e) => {
      const mp = this.translateMousePosition(e.clientX, e.clientY)
      this.handleMouseDown(mp.x, mp.y)
    }
    window.onmouseup = (e) => {
      const mp = this.translateMousePosition(e.clientX, e.clientY)
      this.handleMouseUp(mp.x, mp.y)
    }
    window.onmousemove = (e) => {
      const mp = this.translateMousePosition(e.clientX, e.clientY)
      this.handleMouseMove(mp.x, mp.y)
    }
  }

  translateMousePosition (x, y) {
    return {
      x: x - this.originX,
      y: y - this.originY
    }
  }

  handleMouseMove (x, y) {
    this.pushMouseEvent(x, y, MOVED, null)
  }

  handleMouseDown (x, y) {
    this.pushMouseEvent(x, y, PRESSED, true)
  }

  handleMouseUp (x, y) {
    this.pushMouseEvent(x, y, RELEASED, false)
  }

  pushMouseEvent (x, y, type, held) {
    this.mouseEvents.push({
      x, y, type, held
    })
  }

  popMouseEvents () {
    const events = [...this.mouseEvents]
    this.mouseEvents = []
    return events
  }

  reduceMouseEvents (events) {
    let x = 0
    let y = 0
    let pressed = false
    let released = false
    let held = (events[0] || {}).held || false
    for (let i = 0; i < events.length; i++) {
      let event = events[i]

      // Update mouse position to latest
      x = event.x
      y = event.y

      // Update mouse button properties
      if (event.type === PRESSED && !held) {
        pressed = true
        released = false
        held = true
      }
      if (event.type === RELEASED && held) {
        pressed = false
        released = true
        held = false
      }
    }

    // Create reduced state
    const reducedState = {
      x,
      y,
      held,
      type: (pressed ? PRESSED : released ? RELEASED : MOVED)
    }

    return reducedState
  }

  getMouseInput () {
    const events = this.popMouseEvents()
    const reducedState = this.reduceMouseEvents(events)
    this.pushMouseEvent(reducedState.x, reducedState.y, reducedState.type, reducedState.held)
    return reducedState
  }
}
