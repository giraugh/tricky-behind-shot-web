import {CanvasRectangle} from '../t/canvas'
import {Player} from '../t/player'
import {Unit} from '../t/unit'
import {UIState} from '../t/state'
import {getGridInformation, unitPositionToCanvasPosition} from '../util/positioning'
import {lerp} from '../util/maths'
import grid from '../config/grid'
import {redPlayerColour, bluePlayerColour} from '../config/colour'
import {unitLabels} from '../config/unit'

const drawUnit = (unit : Unit, ui : UIState, canvasRect : CanvasRectangle, ctx : CanvasRenderingContext2D) => {
  const {cellSize} = getGridInformation(canvasRect)
  const {x, y} = unitPositionToCanvasPosition(unit.position, canvasRect)
  const {unitFillPercentageDefault, unitFillPercentageHighlighted} = grid
  const lineWidth = grid.unitLineWidth
  const unitLabelYOffset = grid.unitLabelYOffset
  const label = unitLabels[unit.class]
  const colour = unit.player == Player.RedPlayer ? redPlayerColour : bluePlayerColour

  // Calculate unit draw position after potential drag
  const dragOffset = ui.unitDragOffsets[unit.id]
  const dx = (dragOffset.x + x) + cellSize / 2
  const dy = (dragOffset.y + y) + cellSize / 2

  // Calculate unit radius and font size
  const unitLift = ui.unitLifts[unit.id]
  const fillPercentage = lerp(unitFillPercentageDefault, unitFillPercentageHighlighted, unitLift)
  const unitRadius = ((cellSize / 2) * fillPercentage) - lineWidth / 2
  const fontSize = lerp(grid.labelFontSizeDefault, grid.labelFontSizeHighlighted, unitLift)

  // Draw unit fill
  ctx.fillStyle = 'white'
  ctx.beginPath()
  ctx.arc(dx, dy, unitRadius, 0, 2 * Math.PI, false)
  ctx.fill()

  // Draw unit stroke
  ctx.strokeStyle = colour
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.arc(dx, dy, unitRadius, 0, 2 * Math.PI, false)
  ctx.stroke()

  // Draw unit label
  ctx.fillStyle = colour
  ctx.font = `${fontSize}px ${grid.labelFontFamily}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, dx, dy + unitLabelYOffset)
}

export default drawUnit