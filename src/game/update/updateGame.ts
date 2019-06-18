import {CanvasRectangle} from '../t/canvas'
import {State, GameState} from '../t/state'
import {Input, InputType} from '../t/input'
import {canvasPositionToUnitPosition} from '../util/positioning'
import {resolveAttackedUnit} from '../util/attacking'
import {movementRules, attackingRules, abilityRules, maximumActionValues, unitAttackDamageValues, unitHealthValues} from '../config/unit'
import {abilityEffects, abilityRequirements} from '../config/abilities'
import turns from '../config/turns'
import {Player} from '../t/player';

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
      const legalAttacks = attackingRules[unit.class](unitPosition)
      const legalAbilities = abilityRules[unit.class](unitPosition)
      const isLegalMove = legalMoves.find(move => move.x === targetPosition.x && move.y === targetPosition.y) !== undefined
      const isLegalAttack = legalAttacks.find(move => move.x === targetPosition.x && move.y === targetPosition.y) !== undefined
      const isLegalAbility = legalAbilities.find(move => move.x === targetPosition.x && move.y === targetPosition.y) !== undefined

      if (hasRemainingActions && isUnitsTurn) {
        // Is there a unit there already?
        const targetedUnit = units.find(unit => unit.position.x === targetPosition.x && unit.position.y === targetPosition.y)
        if (targetedUnit === undefined) {
          // Is this a legal move?
          if (isLegalMove) {
            // Update position
            unit.position = targetPosition

            // Increment completed actions
            unit.actionsCompleted += 1

            // Action completed
            actionCompletedThisUpdate = true
          }
        } else {
          // What team is it on?
          const friendly = unit.player === targetedUnit.player
          if (!friendly && isLegalAttack) {
            // targetedUnit is how we are trying to attack, defendingUnit is how takes the damage
            // We get a bonus action for killing either but can only move to the position of the targeted unit when it dies
            const defendingUnit = resolveAttackedUnit(targetedUnit, units)

            // Attack it
            const attackDamage = unitAttackDamageValues[unit.class]
            const defendingMaxHealth = unitHealthValues[defendingUnit.class]
            const defendingHealth = defendingMaxHealth - defendingUnit.damageTaken
            const targetedMaxHealth = unitHealthValues[targetedUnit.class]
            const targetedHealth = targetedMaxHealth - targetedUnit.damageTaken

            // Deal damage
            defendingUnit.damageTaken += attackDamage

            if (defendingHealth - attackDamage <= 0) {
              // Grant bonus actions
              unit.bonusActionsGranted += 1

              // Remove the dead unit
              unitsToRemove.push(defendingUnit.id)
            }

            // Did it die? (refering to the targetted unit)
            if (targetedUnit === defendingUnit) {
              if (targetedHealth - attackDamage <= 0) {
                // Jump to its position
                unit.position = targetedUnit.position
              }
            }

            // Increment completed actions
            unit.actionsCompleted += 1

            // Action completed
            actionCompletedThisUpdate = true
          }

          if (friendly && isLegalAbility) {
            const effect = abilityEffects[unit.class]
            const requirement = abilityRequirements[unit.class]
            if (requirement(unit, targetedUnit, units)) {
              effect(unit, targetedUnit, units)

              // Increment completed actions
              unit.actionsCompleted += 1

              // Action completed
              actionCompletedThisUpdate = true
            }
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