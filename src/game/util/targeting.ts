import {Unit, UnitPosition} from '../t/unit'
import {PixelPosition, canvasPositionToUnitPosition, getGridInformation} from './positioning'
import {CanvasRectangle} from '../t/canvas'
import {movementRules} from '../config/unit'

export type TargetedUnitFunc = (unit : Unit, units : Unit[], drawPosition : PixelPosition, canvasRect : CanvasRectangle) => Unit | undefined
export type TargetedPositionFunc = (unit : Unit, drawPosition : PixelPosition, canvasRect : CanvasRectangle) => UnitPosition | undefined

export const getDefendingUnit : TargetedUnitFunc = (unit, units, drawPosition, canvasRect) => {
  const targetedUnit = getTargetedUnit(unit, units, drawPosition, canvasRect)
  if (!targetedUnit) {return undefined}
  const attackingPlayer = unit.player
  const defendingPlayer = targetedUnit.player
  return attackingPlayer !== defendingPlayer && targetedUnit
}

export const getAssistedUnit : TargetedUnitFunc = (unit, units, drawPosition, canvasRect) => {
  const targetedUnit = getTargetedUnit(unit, units, drawPosition, canvasRect)
  if (!targetedUnit) {return undefined}
  const assistingPlayer = unit.player
  const assistedPlayer = targetedUnit.player
  return assistingPlayer === assistedPlayer && targetedUnit
}

export const getTargetedUnit : TargetedUnitFunc = (unit, units, drawPosition, canvasRect) => {
  const targetedPosition = getLegalTargetedPosition(unit, drawPosition, canvasRect)
  if (targetedPosition) {
    const defendingUnit = units.find(unit => unit.position.x === targetedPosition.x && unit.position.y === targetedPosition.y)
    return defendingUnit
  } else {
    return undefined
  }
}

export const getLegalTargetedPosition : TargetedPositionFunc = (unit, drawPosition, canvasRect) => {
  const targetedPosition = getTargetedPosition(unit, drawPosition, canvasRect)
  const legalMoves = movementRules[unit.class](unit.position)
  const isLegalMove = legalMoves.find(move => move.x === targetedPosition.x && move.y === targetedPosition.y)
  return isLegalMove && targetedPosition
}

export const getTargetedPosition : TargetedPositionFunc = (unit, drawPosition, canvasRect) => {
  const {cellSize} = getGridInformation(canvasRect)
  const adjustedDrawPosition = {x: drawPosition.x + cellSize / 2, y: drawPosition.y + cellSize / 2}
  const targetedPosition = canvasPositionToUnitPosition(adjustedDrawPosition, canvasRect)
  return targetedPosition
}