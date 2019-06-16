import {CanvasRectangle} from '../t/canvas'
import {UIState} from '../t/state'
import {Unit} from '../t/unit'
import drawUnit from './drawUnit'

const drawUnits = (units: Unit[], ui : UIState,  canvasRect : CanvasRectangle, ctx : CanvasRenderingContext2D) => {
  // Draw highlighted units last so they appear above other units
  const highlightedUnits = units.filter(unit => unit.id === ui.highlightedUnit)
  const unhighlightedUnits = units.filter(unit => unit.id !== ui.highlightedUnit)
  unhighlightedUnits.forEach(unit => drawUnit(unit, ui, canvasRect, ctx))
  highlightedUnits.forEach(unit => drawUnit(unit, ui, canvasRect, ctx))
}

export default drawUnits