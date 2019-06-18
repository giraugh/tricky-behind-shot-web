import {CanvasRectangle} from '../t/canvas'
import {State, UIState} from '../t/state'
import {Input, InputType} from '../t/input'
import grid from '../config/grid'
import {getGridInformation, canvasPositionToUnitPosition, unitPositionToCanvasPosition} from '../util/positioning'
import {lerp} from '../util/maths'
import {maximumActionValues} from '../config/unit'
import params from '../config/params'
import {getDefendingUnit} from '../util/targeting';
import {attackWillKill, resolveAttackedUnit} from '../util/attacking'

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
      // Don't highlight it if It has no actions remaining
      const maximumActions = maximumActionValues[highlightedUnit.class] + highlightedUnit.bonusActionsGranted
      const hasRemainingActions = highlightedUnit.actionsCompleted < maximumActions
      if (hasRemainingActions) {
        ui.highlightedUnit = highlightedUnit.id
      }
    }
  }

  // Selected unit is highlighted also
  if (ui.selectedUnit !== null) {
    ui.highlightedUnit = ui.selectedUnit
  }

  // Selecting Units
  if (ui.highlightedUnit !== null && ui.selectedUnit === null) {
    if (input.type == InputType.PRESSED) {
      // Is it their turn?
      const unit = units.find(unit => unit.id === ui.highlightedUnit)
      if (unit.player === state.game.turn) {
        ui.selectedUnit = ui.highlightedUnit
      }
    }
  }

  // Unit Draw Positions
  for (let i = 0; i < params.teamSize * 2; i++) {
    const unit = units.find(unit => unit.id === i)
    if (unit) {
      const canvasPosition = unitPositionToCanvasPosition(unit.position, canvasRect)
      if (unit.id === ui.selectedUnit) {
        ui.unitDrawPosition[unit.id] = {x: input.x - (gridCellSize / 2), y: input.y - (gridCellSize / 2)}
      } else {
        const dx = ui.unitDrawPosition[unit.id].x
        const dy = ui.unitDrawPosition[unit.id].y
        ui.unitDrawPosition[unit.id] = {
          x: lerp(dx, canvasPosition.x, grid.unitHighlightAnimSpeed * 1.5),
          y: lerp(dy, canvasPosition.y, grid.unitHighlightAnimSpeed * 1.5)
        }
      }
    }
  }

  // De-selecting units
  if (ui.selectedUnit !== null) {
    if (input.type == InputType.RELEASED) {
      ui.selectedUnit = null
    }
  }

  // Update Unit lifting effect
  for (let i = 0; i < params.teamSize * 2; i++) {
    const unit = units.find(unit => unit.id === i)
    if (unit) {
      if (unit.id === ui.highlightedUnit) {
        if (unit.player === state.game.turn) {
          ui.unitLifts[unit.id] = lerp(ui.unitLifts[unit.id], 1, grid.unitHighlightAnimSpeed)
        } else {
          ui.unitLifts[unit.id] = lerp(ui.unitLifts[unit.id], 0, grid.unitHighlightAnimSpeed)
        }
      } else {
        ui.unitLifts[unit.id] = lerp(ui.unitLifts[unit.id], 0, grid.unitHighlightAnimSpeed * 1.5)
      }
    }
  }

  // Update cross effects for each unit
  const selectedUnit = units.find(unit => unit.id === ui.selectedUnit)
  const selectedUnitDrawPosition = selectedUnit && ui.unitDrawPosition[selectedUnit.id]
  const defendingTargetedUnit = selectedUnit && getDefendingUnit(selectedUnit, units, selectedUnitDrawPosition, canvasRect)
  const defendingUnit = defendingTargetedUnit && resolveAttackedUnit(defendingTargetedUnit, units)
  for (let i = 0; i < params.teamSize * 2; i++) {
    const unit = units.find(unit => unit.id === i)
    if (unit) {
      if (defendingUnit && unit.id === defendingUnit.id) {
        const willDie = attackWillKill(selectedUnit, defendingUnit)
        ui.unitCrosses[unit.id] = lerp(ui.unitCrosses[unit.id], willDie ? 1 : 0.5, grid.unitHighlightAnimSpeed * .9)
      } else {
        ui.unitCrosses[unit.id] = lerp(ui.unitCrosses[unit.id], 0, grid.unitHighlightAnimSpeed)
      }
    }
  }

  // Return updated state
  return ui
}

export default updateUI