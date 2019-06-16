import {getUnitColour} from '../util/colour'
import { Unit } from '../t/unit'
import { UIState } from '../t/state'
import { CanvasRectangle } from '../t/canvas'
import { unitCenterPosition, centerPosition } from '../util/positioning'

const drawUnitDragLine = (unit : Unit, ui : UIState, canvasRect : CanvasRectangle, ctx : CanvasRenderingContext2D) => {
  // Get unit's positions
  const initialPosition = unitCenterPosition(
    unit.position,
    canvasRect
  )
  const draggedPosition = centerPosition(
    ui.unitDrawPosition[unit.id],
    canvasRect
  )

  // Draw Connecting Line
  ctx.strokeStyle = getUnitColour(unit)
  ctx.lineWidth = 20
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(initialPosition.x, initialPosition.y)
  ctx.lineTo(draggedPosition.x, draggedPosition.y)
  ctx.lineCap
  ctx.stroke()
}

export default drawUnitDragLine