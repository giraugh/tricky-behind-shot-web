import {CanvasRectangle} from '../t/canvas'
import {State, UIState} from '../t/state'
import {Input, InputType} from '../t/input'
import grid from '../config/grid'
import {getGridInformation, canvasPositionToUnitPosition, unitPositionToCanvasPosition} from '../util/positioning'
import {lerp} from '../util/maths'

type UpdateUIFunc = (ui : UIState, input : Input, dt : number, canvasRect : CanvasRectangle, state : State) => UIState
const updateUI : UpdateUIFunc = (ui, input, dt, canvasRect, state) => {
  const units = state.game.units
  const {cellSize: gridCellSize} = getGridInformation(canvasRect)

  // Highlight 
  ui.highlightedUnit = null // Reset first
  const gridMousePosition = canvasPositionToUnitPosition(input, canvasRect)
  if (gridMousePosition) {
    const highlightedUnit = units.find(unit => unit.position.x === gridMousePosition.x && unit.position.y === gridMousePosition.y)
    if (highlightedUnit) {
      ui.highlightedUnit = highlightedUnit.id
    }
  }

  // Selected unit is highlighted also
  if (ui.selectedUnit !== null) {
    ui.highlightedUnit = ui.selectedUnit
  }

  // Selecting Units
  if (ui.highlightedUnit !== null && ui.selectedUnit === null) {
    if (input.type == InputType.PRESSED) {
      ui.selectedUnit = ui.highlightedUnit
    }
  }

  // Dragging units
  for (let i = 0; i < units.length; i++) {
    const unit = units[i]
    const canvasPosition = unitPositionToCanvasPosition(unit.position, canvasRect)
    if (i === ui.selectedUnit) {
      ui.unitDrawPosition[i] = {x: input.x - (gridCellSize / 2), y: input.y - (gridCellSize / 2)}
    } else {
      const dx = ui.unitDrawPosition[i].x
      const dy = ui.unitDrawPosition[i].y
      ui.unitDrawPosition[i] = {
        x: lerp(dx, canvasPosition.x, grid.unitHighlightAnimSpeed * 1.5),
        y: lerp(dy, canvasPosition.y, grid.unitHighlightAnimSpeed * 1.5)
      }
    }
  }

  // De-selecting units
  if (ui.selectedUnit !== null) {
    if (input.type == InputType.RELEASED) {
      const unit = units.find(unit => unit.id === ui.selectedUnit)
      ui.selectedUnit = null
    }
  }

  // Update Unit lifting effect
  for (let i = 0; i < units.length; i++) {
    if (i === ui.highlightedUnit) {
      ui.unitLifts[i] = lerp(ui.unitLifts[i], 1, grid.unitHighlightAnimSpeed)
    } else {
      ui.unitLifts[i] = lerp(ui.unitLifts[i], 0, grid.unitHighlightAnimSpeed * 1.5)
    }
  }

  // Return updated state
  return ui
}

export default updateUI