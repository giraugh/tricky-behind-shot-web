import {Unit, UnitPosition} from '../t/unit'
import {PixelPosition, canvasPositionToUnitPosition, getGridInformation} from './positioning'
import {ActionRules} from './actions'
import {CanvasRectangle} from '../t/canvas'
import {movementRules, attackingRules, abilityRules} from '../config/unit'

export type TargetedUnitFunc = (unit : Unit, units : Unit[], drawPosition : PixelPosition, canvasRect : CanvasRectangle) => Unit | undefined
export type TargetedUnitFuncWithLegality = (unit : Unit, units : Unit[], drawPosition : PixelPosition, canvasRect : CanvasRectangle, legalMoveSet : ActionRules) => Unit | undefined
export type TargetedPositionFunc = (unit : Unit, drawPosition : PixelPosition, canvasRect : CanvasRectangle) => UnitPosition | undefined
export type LegalTargetedPositionFunc = (unit : Unit, drawPosition : PixelPosition, canvasRect : CanvasRectangle, legalMoveSet : ActionRules) => UnitPosition | undefined

export const getDefendingUnit : TargetedUnitFunc = (unit, units, drawPosition, canvasRect) => {
  const targetedUnit = getTargetedUnit(unit, units, drawPosition, canvasRect, attackingRules)
  if (!targetedUnit) {return undefined}
  const attackingPlayer = unit.player
  const defendingPlayer = targetedUnit.player
  return attackingPlayer !== defendingPlayer && targetedUnit
}

export const getAssistedUnit : TargetedUnitFunc = (unit, units, drawPosition, canvasRect) => {
  const targetedUnit = getTargetedUnit(unit, units, drawPosition, canvasRect, abilityRules)
  if (!targetedUnit) {return undefined}
  const assistingPlayer = unit.player
  const assistedPlayer = targetedUnit.player
  return assistingPlayer === assistedPlayer && targetedUnit
}

export const getTargetedUnit : TargetedUnitFuncWithLegality = (unit, units, drawPosition, canvasRect, legalMoveSet) => {
  const targetedPosition = getLegalTargetedPosition(unit, drawPosition, canvasRect, legalMoveSet)
  if (targetedPosition) {
    const defendingUnit = units.find(unit => unit.position.x === targetedPosition.x && unit.position.y === targetedPosition.y)
    return defendingUnit
  } else {
    return undefined
  }
}

export const getTargetedMovePosition : TargetedPositionFunc = (unit, drawPosition, canvasRect) => {
  return getLegalTargetedPosition(unit, drawPosition, canvasRect, movementRules)
}

export const getLegalTargetedPosition : LegalTargetedPositionFunc = (unit, drawPosition, canvasRect, legalMoveSet) => {
  const targetedPosition = getTargetedPosition(unit, drawPosition, canvasRect)
  const legalMoves = legalMoveSet[unit.class](unit.position)
  const isLegalMove = legalMoves.find(move => move.x === targetedPosition.x && move.y === targetedPosition.y)
  return isLegalMove && targetedPosition
}

export const getTargetedPosition : TargetedPositionFunc = (unit, drawPosition, canvasRect) => {
  const {cellSize} = getGridInformation(canvasRect)
  const adjustedDrawPosition = {x: drawPosition.x + cellSize / 2, y: drawPosition.y + cellSize / 2}
  const targetedPosition = canvasPositionToUnitPosition(adjustedDrawPosition, canvasRect)
  return targetedPosition
}