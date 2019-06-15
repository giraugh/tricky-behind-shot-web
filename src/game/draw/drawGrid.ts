import {getGridInformation} from './gridPositioning'
import {gridLineColour} from '../config/colour'

export default (ctx : CanvasRenderingContext2D) => {

  // Get grid positioning
  const {
    left,
    right,
    top,
    bottom,
    width,
    height,
    cellSize
  } = getGridInformation(ctx)

  // set grid colour
  ctx.lineWidth = 1
  ctx.strokeStyle = gridLineColour

  // draw horiz grid lines
  for (let i = 0; i < width + 1; i++) {
    const xx = left + i * cellSize
    ctx.beginPath()
    ctx.moveTo(xx, top)
    ctx.lineTo(xx, bottom)
    ctx.stroke()
  }
  // draw vert grid lines
  for (let j = 0; j < height + 1; j++) {
    const yy = top + j * cellSize
    ctx.beginPath()
    ctx.moveTo(left, yy)
    ctx.lineTo(right, yy)
    ctx.stroke()
  }
}
