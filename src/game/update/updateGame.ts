import {CanvasRectangle} from '../t/canvas'
import {State, GameState} from '../t/state'
import {Input, InputType} from '../t/input'
import {canvasPositionToUnitPosition} from '../util/positioning'
import {movementRules} from '../config/unit'

type UpdateGameFunc = (game : GameState, input : Input, dt : number, canvasRect : CanvasRectangle, state : State) => GameState
const updateGame : UpdateGameFunc = (game, input, dt, canvasRect, state) => {
  const units = game.units

  // Moving units
  if (input.type == InputType.RELEASED) {
    if (state.ui.selectedUnit !== null) {
      const unit = game.units[state.ui.selectedUnit]
      const unitPosition = unit.position

      // calculate target location
      const targetPosition = canvasPositionToUnitPosition(input, canvasRect)

      // Is this a legal move?
      const legalMoves = movementRules[unit.class](unitPosition)
      const isLegal = legalMoves.find(move => move.x === targetPosition.x && move.y === targetPosition.y) !== undefined

      if (isLegal) {
        // Is there a unit there already?
        const defendingUnit = units.find(unit => unit.position.x === targetPosition.x && unit.position.y === targetPosition.y)
        if (defendingUnit === undefined) {
          // Move there
          unit.position = targetPosition
        } else {
          // Is it attackable?
        }
      }
    }
  }

  return game
}

export default updateGame