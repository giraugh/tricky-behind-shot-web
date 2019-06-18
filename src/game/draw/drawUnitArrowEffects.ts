import {UIState} from '../t/state'
import {Unit} from '../t/unit'
import {drawArrow} from '../util/drawing'
import {getUnitColour} from '../util/colour'
import {CanvasRectangle} from '../t/canvas'
import { unitCenterPosition, getGridInformation } from '../util/positioning'
import { lerp } from '../util/maths'

const drawUnitArrowEffects = (units : Unit[], ui : UIState, canvasRect : CanvasRectangle, ctx : CanvasRenderingContext2D) => {
  units.forEach(unit => drawUnitArrowEffect(unit, ui, canvasRect, ctx))
}

const drawUnitArrowEffect = (unit : Unit, ui : UIState, canvasRect : CanvasRectangle, ctx : CanvasRenderingContext2D) => {
  const {cellSize} = getGridInformation(canvasRect)
  const arrowProgress = ui.unitArrows[unit.id].progress
  if (ui.unitArrows[unit.id].progress > .1) {
    const startPosition = unitCenterPosition(unit.position, canvasRect)
    const endPosition = ui.unitArrows[unit.id].position
    const arrowPosition = {x: lerp(startPosition.x, endPosition.x, arrowProgress), y: lerp(startPosition.y, endPosition.y, arrowProgress)}
    drawArrow(
      startPosition,
      arrowPosition,
      getUnitColour(unit),
      ctx,
      (cellSize * .95) * arrowProgress,
      (cellSize * .5) * arrowProgress,
      40,
      cellSize * .2
    )
  }
}

export default drawUnitArrowEffects