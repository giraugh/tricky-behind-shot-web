import {UnitClass} from '../t/unit'
import {MovementRule, surroundingPositions, removeDuplicates} from '../util/movement'

type UnitLabels = {[unitClass: number] : string}
export const unitLabels : UnitLabels = {
  [UnitClass.Grunt] : 'G',
  [UnitClass.Archer] : 'A',
  [UnitClass.King]: 'K',
  [UnitClass.Sprinter] : 'S',
  [UnitClass.Paladin] : 'P',
  [UnitClass.Tank] : 'T'
}

type UnitHealthValues = {[unitClass: number] : number}
export const unitHealthValues : UnitHealthValues = {
  [UnitClass.Grunt] : 2,
  [UnitClass.Archer] : 1,
  [UnitClass.King]: 2,
  [UnitClass.Sprinter] : 1,
  [UnitClass.Paladin] : 2,
  [UnitClass.Tank] : 4
}

type UnitAttackDamageValues = {[unitClass: number] : number}
export const unitAttackDamageValues : UnitAttackDamageValues = {
  [UnitClass.Grunt] : 2,
  [UnitClass.Archer] : 1,
  [UnitClass.King]: 1,
  [UnitClass.Sprinter] : 2,
  [UnitClass.Paladin] : 1,
  [UnitClass.Tank] : 1
}

type MaximumActionValues = {[unitClass: number] : number}
export const maximumActionValues : MaximumActionValues = {
  [UnitClass.Grunt] : 2,
  [UnitClass.Archer] : 2,
  [UnitClass.King]: 1,
  [UnitClass.Sprinter] : 2,
  [UnitClass.Paladin] : 2,
  [UnitClass.Tank] : 2
}

type MovementRules = { [unitClass : number] : MovementRule }
export const movementRules : MovementRules = {
  [UnitClass.Grunt]: position => surroundingPositions(position, 1, true),
  [UnitClass.Sprinter]: position => surroundingPositions(position, 2, false),
  [UnitClass.Tank]: position => surroundingPositions(position, 1, false),
  [UnitClass.Archer]: position => surroundingPositions(position, 1, true),
  [UnitClass.Paladin]: position => surroundingPositions(position, 1, true),
  [UnitClass.King]: position => removeDuplicates([...surroundingPositions(position, 1, true), ...surroundingPositions(position, 2, false)])
}
