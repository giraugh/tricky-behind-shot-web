import {Player} from '../t/player'
import {Unit} from '../t/unit'
import {getGridInformation, unitPositionToCanvasPosition} from './gridPositioning'
import grid from '../config/grid'
import {redPlayerColour, bluePlayerColour} from '../config/colour'

const drawUnit = (unit : Unit, ctx : CanvasRenderingContext2D) => {
  const {cellSize} = getGridInformation(ctx)
  const {x, y} = unitPositionToCanvasPosition(unit.position, ctx)
  const {unitFillPercentage} = grid
  const lineWidth = grid.unitLineWidth
  const unitRadius = ((cellSize / 2) * unitFillPercentage) - lineWidth / 2

  // Draw unit circle
  ctx.strokeStyle = unit.player == Player.RedPlayer ? redPlayerColour : bluePlayerColour
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.arc(x + cellSize / 2, y + cellSize / 2, unitRadius, 0, 2 * Math.PI, false)
  ctx.stroke()
}

export default drawUnit