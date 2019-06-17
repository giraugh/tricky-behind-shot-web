import {CanvasRectangle} from '../t/canvas'
import {State, GameState} from '../t/state'
import {Input, InputType} from '../t/input'
import {canvasPositionToUnitPosition} from '../util/positioning'
import {movementRules, maximumActionValues, unitAttackDamageValues, unitHealthValues} from '../config/unit'
import turns from '../config/turns'
import { Player } from '../t/player';

type UpdateGameFunc = (game : GameState, input : Input, dt : number, canvasRect : CanvasRectangle, state : State) => GameState
const updateGame : UpdateGameFunc = (game, input, dt, canvasRect, state) => {
  // Unit Actions
  const units = game.units
  let unitsToRemove = []
  let actionCompletedThisUpdate = false

  if (input.type == InputType.RELEASED) {
    if (state.ui.selectedUnit !== null) {
      const unit = game.units.find(unit => unit.id === state.ui.selectedUnit)
      const unitPosition = unit.position

      // Is units turn? (in practice, won't be selected if this isn't true)
      const isUnitsTurn = unit.player === game.turn

      // Has sufficient actions remaining? (in practice, won't be selected if this isn't true)
      const maximumActions = maximumActionValues[unit.class] + unit.bonusActionsGranted
      const hasRemainingActions = unit.actionsCompleted < maximumActions

      // calculate target location
      const targetPosition = canvasPositionToUnitPosition(input, canvasRect)

      // Is this a legal move?
      const legalMoves = movementRules[unit.class](unitPosition)
      const isLegalMove = legalMoves.find(move => move.x === targetPosition.x && move.y === targetPosition.y) !== undefined

      if (hasRemainingActions && isLegalMove && isUnitsTurn) {
        // Is there a unit there already?
        const defendingUnit = units.find(unit => unit.position.x === targetPosition.x && unit.position.y === targetPosition.y)
        if (defendingUnit === undefined) {
          // Move there 

          // Update position
          unit.position = targetPosition

          // Increment completed actions
          unit.actionsCompleted += 1

          // Action completed
          actionCompletedThisUpdate = true
        } else {
          // What team is it on?
          const friendly = unit.player === defendingUnit.player
          if (!friendly) {
            // Attack it
            const attackDamage = unitAttackDamageValues[unit.class]
            const defendingMaxHealth = unitHealthValues[defendingUnit.class]
            const defendingHealth = defendingMaxHealth - defendingUnit.damageTaken

            // Deal damage
            defendingUnit.damageTaken += attackDamage

            // Did it die?
            if (defendingHealth - attackDamage <= 0) {
              unit.position = defendingUnit.position
              unit.bonusActionsGranted += 1

              unitsToRemove.push(defendingUnit.id)
            }

            // Increment completed actions
            unit.actionsCompleted += 1

            // Action completed
            actionCompletedThisUpdate = true
          }
        }
      }
    }
  }

  // Remove dead units
  game.units = game.units.filter(unit => !unitsToRemove.includes(unit.id))

  // Increment turn actions if possible and change turns
  if (actionCompletedThisUpdate) {
    game.turnActionsCompleted += 1
  }

  // Turn ended?
  if (game.turnActionsCompleted >= turns.maximumTurnActions) {
    // Reset turn actions completed
    game.turnActionsCompleted = 0

    // Swap turn
    game.turn = game.turn === Player.RedPlayer ? Player.BluePlayer : Player.RedPlayer

    // Heal and reset this team's units
    game.units.filter(unit => unit.player === game.turn).forEach(unit => {
      unit.damageTaken = 0
      unit.actionsCompleted = 0
      unit.bonusActionsGranted = 0
    })
  }

  return game
}

export default updateGame