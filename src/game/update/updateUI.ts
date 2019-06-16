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

  // De-selecting units
  if (ui.selectedUnit !== null) {
    if (input.type == InputType.RELEASED) {
      ui.selectedUnit = null
    }
  }

  // Dragging units
  for (let i = 0; i < units.length; i++) {
    if (i === ui.selectedUnit) {
      const unit = units[i]
      const canvasPosition = unitPositionToCanvasPosition(unit.position, canvasRect)
      ui.unitDragOffsets[i] = {x: input.x - canvasPosition.x - (gridCellSize / 2), y: input.y - canvasPosition.y - (gridCellSize / 2)}
    } else {
      const dx = ui.unitDragOffsets[i].x
      const dy = ui.unitDragOffsets[i].y
      ui.unitDragOffsets[i] = {
        x: lerp(dx, 0, grid.unitHighlightAnimSpeed * 1.5),
        y: lerp(dy, 0, grid.unitHighlightAnimSpeed * 1.5)
      }
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