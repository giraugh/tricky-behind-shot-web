import {Unit, UnitClass} from "../t/unit"
import {unitHealthValues, unitAttackDamageValues} from '../config/unit'
import {surroundingPositions} from './movement'

export const attackWillKill = (attackingUnit : Unit, defendingUnit : Unit) : boolean => {
  const attackDamage = unitAttackDamageValues[attackingUnit.class]
  const defendingHealth = unitHealthValues[defendingUnit.class]
  const willDie = (defendingHealth - defendingUnit.damageTaken) <= attackDamage
  return willDie
}

export const resolveAttackedUnit = (defendingUnit : Unit, units : Unit[]) : Unit => {
  // Paladins take hits for nearby friendly units
  const adjacentPositions = surroundingPositions(defendingUnit.position, 1, true)
  for (let position of adjacentPositions) {
    const unit = units.find(unit => unit && unit.position.x === position.x && unit.position.y === position.y)
    if (unit) {
      if (unit.class === UnitClass.Paladin) {
        return unit
      }
    }
  }

  return defendingUnit
}