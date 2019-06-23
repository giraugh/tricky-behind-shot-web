import {CanvasRectangle} from '../t/canvas'
import {Unit} from '../t/unit'
import {UIState} from '../t/state'
import {getGridInformation, unitPositionToCanvasPosition} from '../util/positioning'
import {lerp} from '../util/maths'
import grid from '../config/grid'
import {getUnitColour, formatColour} from '../util/colour'
import {unitLabels, maximumActionValues} from '../config/unit'
import drawUnitDragLine from './drawUnitDragLine'
import {gridLineColour} from '../config/colour'

const drawUnit = (unit : Unit, ui : UIState, canvasRect : CanvasRectangle, ctx : CanvasRenderingContext2D) => {
  const {cellSize} = getGridInformation(canvasRect)
  const {unitFillPercentageDefault, unitFillPercentageHighlighted} = grid
  const unitLabelYOffset = grid.unitLabelYOffset
  const label = unitLabels[unit.class]

  const lineWidth = grid.unitLineWidthDefault + unit.damageTaken * grid.unitLineWidthDamageIncrease

  // Does unit have remaining actions?
  const maximumActions = maximumActionValues[unit.class] + unit.bonusActionsGranted
  const hasRemainingActions = unit.actionsCompleted < maximumActions
  const colour = hasRemainingActions ? getUnitColour(unit) : formatColour(gridLineColour)

  // Calculate unit draw position after potential drag
  const drawPosition = ui.unitDrawPosition[unit.id]
  const dx = drawPosition.x + cellSize / 2
  const dy = drawPosition.y + cellSize / 2

  // Calculate unit radius and font size
  const unitLift = ui.unitLifts[unit.id]
  const fillPercentage = lerp(unitFillPercentageDefault, unitFillPercentageHighlighted, unitLift)
  const unitRadius = ((cellSize / 2) * fillPercentage) - lineWidth / 2
  const fontSize = lerp(grid.labelFontSizeDefault, grid.labelFontSizeHighlighted, unitLift)

  // Draw drag line
  if (ui.selectedUnit === unit.id) {
    drawUnitDragLine(unit, ui, canvasRect, ctx)
  }

  // Draw unit fill
  ctx.fillStyle = 'white'
  ctx.beginPath()
  ctx.arc(dx, dy, unitRadius, 0, 2 * Math.PI, false)
  ctx.fill()

  // Draw unit stroke
  ctx.strokeStyle = colour
  ctx.lineWidth = lineWidth
  ctx.lineCap = 'butt'
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