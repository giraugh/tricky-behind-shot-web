import {CanvasRectangle} from '../t/canvas'
import {UIState} from '../t/state'
import {Unit} from '../t/unit'
import drawUnit from './drawUnit'

const drawUnits = (units: Unit[], ui : UIState,  canvasRect : CanvasRectangle, ctx : CanvasRenderingContext2D) => {
  // Draw highlighted units last so they appear above other units
  units
    .sort((unitA, unitB) => -(ui.unitLifts[unitB.id] - ui.unitLifts[unitA.id]))
    .forEach(unit => drawUnit(unit, ui, canvasRect, ctx))
}

export default drawUnits