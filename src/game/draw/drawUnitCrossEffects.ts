import { Unit } from "../t/unit"
import { CanvasRectangle } from "../t/canvas"
import { unitCenterPosition, getGridInformation } from "../util/positioning"
import { getUnitColour } from "../util/colour"
import { UIState } from "../t/state"
import { lerp } from "../util/maths"

const drawUnitCrossEffects = (units : Unit[], ui : UIState, canvasRect : CanvasRectangle, ctx : CanvasRenderingContext2D) => {
  units.forEach(unit => drawUnitCrossEffect(unit, ui, canvasRect, ctx))
}

const drawUnitCrossEffect = (unit : Unit, ui : UIState, canvasRect : CanvasRectangle, ctx : CanvasRenderingContext2D) => {
  const lineWidth = 20
  const cellOffsetPercentage = 0.8
  
  const {cellSize} = getGridInformation(canvasRect)
  const {x, y} = unitCenterPosition(unit.position, canvasRect)

  const crossProgress = ui.unitCrosses[unit.id]
  const crossOneProgress = Math.min(0.5, crossProgress) / 0.5
  const crossTwoProgress = Math.max(0, crossProgress - 0.5) / 0.5
  const offset = cellOffsetPercentage * (cellSize / 2)
  const positionOne = {x: -offset, y: -offset}
  const positionTwo = {x: offset, y: offset}
  const positionThree = {x: offset, y: -offset}
  const positionFour = {x: -offset, y: offset}
  const endPointOne = {
    x: lerp(positionOne.x, positionTwo.x, crossOneProgress),
    y: lerp(positionOne.y, positionTwo.y, crossOneProgress)
  }
  const endPointTwo = {
    x: lerp(positionThree.x, positionFour.x, crossTwoProgress),
    y: lerp(positionThree.y, positionFour.y, crossTwoProgress)
  }
  
  // Draw crosses
  ctx.strokeStyle = getUnitColour(unit)
  ctx.lineCap = 'butt'

  // Cross One
  ctx.lineWidth = crossOneProgress * lineWidth
  ctx.beginPath()
  ctx.moveTo(x + positionOne.x, y + positionOne.y)
  ctx.lineTo(x + endPointOne.x, y + endPointOne.y)
  ctx.stroke()

  // Cross Two
  ctx.lineWidth = crossTwoProgress * lineWidth
  ctx.beginPath()
  ctx.moveTo(x + positionThree.x, y + positionThree.y)
  ctx.lineTo(x + endPointTwo.x, y + endPointTwo.y)
  ctx.stroke()
}

export default drawUnitCrossEffects