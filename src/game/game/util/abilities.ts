import {Unit, UnitPosition} from '../t/unit'
import grid from '../config/grid'

export type Ability = (unit : Unit, targetUnit : Unit, units : Unit[]) => void
export type AbilityRequirement = (unit : Unit, targetUnit : Unit, units : Unit[]) => boolean

export const doNothing : Ability = (unit, targetUnit) => {}

export const alwaysAllow : AbilityRequirement = (unit, targetUnit, units) => true

export const movementIsValid = (position : UnitPosition, units : Unit[]) : boolean => {
  const {width, height} = grid
  const insideGrid = (
    position.x >= 0 &&
    position.y >= 0 &&
    position.x <= width-1 &&
    position.y <= height-1
  )
  const inhabited = units.find(unit => unit.position.x === position.x && unit.position.y === position.y) !== undefined

  return !inhabited && insideGrid
}

export const calculatePushPosition = (unit, targetUnit, distance) => {
  const directionX = Math.sign(targetUnit.position.x - unit.position.x)
  const directionY = Math.sign(targetUnit.position.y - unit.position.y)
  const pushPosition = {
    x: targetUnit.position.x + (directionX * distance),
    y: targetUnit.position.y + (directionY * distance)
  }
  return pushPosition
}

export const pushAbility : (distance : number, follow : boolean) => Ability = (distance, follow) => (unit, targetUnit, units) => {
  const pushPosition = calculatePushPosition(unit, targetUnit, distance)
  if (movementIsValid(pushPosition, units)) {
    if (follow) {unit.position = targetUnit.position}
    targetUnit.position = pushPosition
  }
}

export const pushAbilityRequirement : (distance : number, follow : boolean) => AbilityRequirement = (distance, follow) => (unit, targetUnit, units) => {
  return movementIsValid(calculatePushPosition(unit, targetUnit, distance), units)
}

export const grantActionAbility : (amount : number) => Ability = amount => (unit, targetUnit, units) => {
  targetUnit.bonusActionsGranted += amount
}

export const swapPlaceAbility = () => (unit, targetUnit, units) => {
  const unitOriginalPosition = {...unit.position}
  unit.position = targetUnit.position
  targetUnit.position = unitOriginalPosition
}