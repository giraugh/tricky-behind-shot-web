import {Unit, UnitClass, UnitPosition} from '../t/unit'
import grid from './grid'

const doNothing : Ability = (unit, targetUnit) => {}

const movementIsValid = (position : UnitPosition, units : Unit[]) : boolean => {
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

const pushAbility : (distance : number) => Ability = distance => (unit, targetUnit, units) => {
  const directionX = targetUnit.position.x - unit.position.x
  const directionY = targetUnit.position.y - unit.position.y
  const pushPosition = {
    x: targetUnit.position.x + directionX * distance,
    y: targetUnit.position.y + directionY * distance
  }
  if (movementIsValid(pushPosition, units)) {
    targetUnit.position = pushPosition
  }
}

const grantActionAbility : (amount : number) => Ability = amount => (unit, targetUnit, units) => {
  targetUnit.bonusActionsGranted += amount
}

type Ability = (unit : Unit, targetUnit : Unit, units : Unit[]) => void
type Abilities = { [unitClass : number] : Ability }
export const abilityRules : Abilities = {
  [UnitClass.Grunt]: pushAbility(1),
  [UnitClass.Sprinter]: pushAbility(2),
  [UnitClass.Tank]: pushAbility(-1),
  [UnitClass.Archer]: pushAbility(-1),
  [UnitClass.King]: grantActionAbility(1),
  [UnitClass.Paladin]: doNothing // ability is to defend adjacent units -> implemented in "util/attacking:resolveAttackedUnit()"
}