import {CanvasRectangle} from '../t/canvas'
import {State, UIState} from '../t/state'
import {Input, InputType} from '../t/input'
import grid from '../config/grid'
import {getGridInformation, canvasPositionToUnitPosition, unitPositionToCanvasPosition, unitCenterPosition} from '../util/positioning'
import {lerp} from '../util/maths'
import {maximumActionValues} from '../config/unit'
import params from '../config/params'
import {getDefendingUnit, getAssistedUnit} from '../util/targeting';
import {attackWillKill, resolveAttackedUnit} from '../util/attacking'
import {abilityEffects, abilityRequirements} from '../config/abilities'

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
      // Is it their turn?
      const unit = units.find(unit => unit.id === ui.highlightedUnit)

      // Don't select it if It has no actions remaining
      const maximumActions = maximumActionValues[unit.class] + unit.bonusActionsGranted
      const hasRemainingActions = unit.actionsCompleted < maximumActions
      if (unit.player === state.game.turn && hasRemainingActions) {
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
        // Don't highlight it if It has no actions remaining
        const maximumActions = maximumActionValues[unit.class] + unit.bonusActionsGranted
        const hasRemainingActions = unit.actionsCompleted < maximumActions
        if (unit.player === state.game.turn && hasRemainingActions) {
          ui.unitLifts[unit.id] = lerp(ui.unitLifts[unit.id], 1, grid.unitHighlightAnimSpeed)
        } else {
          ui.unitLifts[unit.id] = lerp(ui.unitLifts[unit.id], 0, grid.unitHighlightAnimSpeed)
        }
      } else {
        ui.unitLifts[unit.id] = lerp(ui.unitLifts[unit.id], 0, grid.unitHighlightAnimSpeed * 1.5)
      }
    }
  }

  // For crosses and arrows
  const selectedUnit = units.find(unit => unit.id === ui.selectedUnit)
  const selectedUnitDrawPosition = selectedUnit && ui.unitDrawPosition[selectedUnit.id]

  // Update cross effects for each unit
  const defendingTargetedUnit = selectedUnit && getDefendingUnit(selectedUnit, units, selectedUnitDrawPosition, canvasRect)
  const defendingUnit = defendingTargetedUnit && resolveAttackedUnit(defendingTargetedUnit, units)
  for (let i = 0; i < params.teamSize * 2; i++) {
    const unit = units.find(unit => unit.id === i)
    if (unit) {
      if (defendingUnit && unit.id === defendingUnit.id) {
        const willDie = attackWillKill(selectedUnit, defendingUnit)
        ui.unitCrosses[unit.id] = lerp(ui.unitCrosses[unit.id], willDie ? 1 : 0.5, grid.unitHighlightAnimSpeed * .5)
      } else {
        ui.unitCrosses[unit.id] = lerp(ui.unitCrosses[unit.id], 0, grid.unitHighlightAnimSpeed)
      }
    }
  }

  // Find whether an arrow needs to be extended, who from and where to
  let extendArrowUnitId = null
  let extendArrowPosition = null
  const assistedUnit = selectedUnit && getAssistedUnit(selectedUnit, units, selectedUnitDrawPosition, canvasRect)
  if (assistedUnit) {
    const effect = abilityEffects[selectedUnit.class]
    const requirement = abilityRequirements[selectedUnit.class]
    if (requirement(selectedUnit, assistedUnit, units)) {
      const dummyUnit = {...selectedUnit}
      const dummyAssistedUnit = {...assistedUnit}
      effect(dummyUnit, dummyAssistedUnit, units)
      const hasSamePositionX = dummyAssistedUnit.position.x === assistedUnit.position.x
      const hasSamePositionY = dummyAssistedUnit.position.y === assistedUnit.position.y
      if (!(hasSamePositionX && hasSamePositionY)) {
        extendArrowUnitId = assistedUnit.id
        const newPosition = unitCenterPosition(dummyAssistedUnit.position, canvasRect)
        extendArrowPosition = newPosition
      }
    }
  }

  // Animate arrows for each unit
  for (let i = 0; i < params.teamSize * 2; i++) {
    const unit = units.find(unit => unit.id === i)
    if (unit) {
      if ((extendArrowUnitId !== undefined) && unit.id === extendArrowUnitId) {
        ui.unitArrows[unit.id].position = extendArrowPosition
        ui.unitArrows[unit.id].progress = lerp(ui.unitArrows[unit.id].progress, 1, grid.unitHighlightAnimSpeed)
      } else {
        ui.unitArrows[unit.id].progress = lerp(ui.unitArrows[unit.id].progress, 0, grid.unitHighlightAnimSpeed)
      }
    }
  }

  // Return updated state
  return ui
}

export default updateUI