export default class Canvas {
  constructor (id, width = 1024, height = 650) {
    // Locate the canvas and get it's context
    this.canvas = document.querySelector(`#${id}`)
    this.canvas.width = width
    this.canvas.height = height
    this.context = this.canvas.getContext('2d')
  }

  getPosition () {
    const rect = this.canvas.getBoundingClientRect()
    return {
      x: rect.left,
      y: rect.top
    }
  }

  draw (drawOperation) {
    drawOperation(this.context)
  }
}
