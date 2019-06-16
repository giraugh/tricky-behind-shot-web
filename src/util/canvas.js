export default class Canvas {
  constructor (id, width = 1024, height = 650) {
    // Locate the canvas and get it's context
    this.canvas = document.querySelector(`#${id}`)
    this.canvas.width = width
    this.canvas.height = height
    this.context = this.canvas.getContext('2d')
  }

  getRect () {
    return {
      ...this.getSize(),
      ...this.getPosition()
    }
  }

  getSize () {
    const {width, height} = this.canvas.getBoundingClientRect()
    return {
      width,
      height
    }
  }

  getPosition () {
    const {x, y} = this.canvas.getBoundingClientRect()
    return {
      x,
      y
    }
  }

  draw (drawOperation) {
    drawOperation(this.context)
  }
}
