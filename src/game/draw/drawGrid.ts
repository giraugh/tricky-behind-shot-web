import grid from '../config/grid'

// Get grid size in cells from config
const gridWidth = grid.width
const gridHeight = grid.height
const gridMargin = grid.margin

export default (ctx : CanvasRenderingContext2D) => {
  // get canvas size
  const canvasWidth = ctx.canvas.width

  // Draw grid with width and height from config, scales to canvas size (uses entire canvas)

  // set grid colour
  ctx.strokeStyle = 'black'

  // Get grid and cell sizes
  const cellSize = Math.floor((canvasWidth - (2 * gridMargin)) / gridWidth)
  const rightEdge = gridMargin + cellSize * gridWidth
  const bottomEdge = gridMargin + cellSize * gridHeight
  const leftEdge = gridMargin
  const topEdge = gridMargin

  // draw horiz grid lines
  for (let i = 0; i < gridWidth + 1; i++) {
    const xx = leftEdge + i * cellSize
    ctx.beginPath()
    ctx.moveTo(xx, topEdge)
    ctx.lineTo(xx, bottomEdge)
    ctx.stroke()
  }
  // draw vert grid lines
  for (let j = 0; j < gridHeight + 1; j++) {
    const yy = topEdge + j * cellSize
    ctx.beginPath()
    ctx.moveTo(leftEdge, yy)
    ctx.lineTo(rightEdge, yy)
    ctx.stroke()
  }
}
