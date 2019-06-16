import {CanvasRectangle} from '../t/canvas'
import {State, GameState} from '../t/state'
import {Input, InputType} from '../t/input'
import {canvasPositionToUnitPosition} from '../util/positioning'
import {movementRules, maximumActionValues} from '../config/unit'

type UpdateGameFunc = (game : GameState, input : Input, dt : number, canvasRect : CanvasRectangle, state : State) => GameState
const updateGame : UpdateGameFunc = (game, input, dt, canvasRect, state) => {
  const units = game.units

  // Moving units
  if (input.type == InputType.RELEASED) {
    if (state.ui.selectedUnit !== null) {
      const unit = game.units[state.ui.selectedUnit]
      const unitPosition = unit.position

      // Has sufficient actions remaining? (in practice, won't be selected if case)
      const maximumActions = maximumActionValues[unit.class]
      const hasRemainingActions = unit.actionsCompleted < maximumActions

      // calculate target location
      const targetPosition = canvasPositionToUnitPosition(input, canvasRect)

      // Is this a legal move?
      const legalMoves = movementRules[unit.class](unitPosition)
      const isLegal = legalMoves.find(move => move.x === targetPosition.x && move.y === targetPosition.y) !== undefined

      if (hasRemainingActions && isLegal) {
        // Is there a unit there already?
        const defendingUnit = units.find(unit => unit.position.x === targetPosition.x && unit.position.y === targetPosition.y)
        if (defendingUnit === undefined) {
          //TODO: THIS NEEDS TO BE MADE MORE OFFICIAL/STANDARDISED - KEEP TRACK OF ACTIONS COMPLETED / NETWORK SYNC IN FUTURE
          // Move there 
          unit.position = targetPosition
          unit.actionsCompleted += 1
        } else {
          // Is it attackable?
        }
      }
    }
  }

  return game
}

export default updateGame