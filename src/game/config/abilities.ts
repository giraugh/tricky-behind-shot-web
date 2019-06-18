import {Unit, UnitClass, UnitPosition} from '../t/unit'
import grid from './grid'
import {Ability, pushAbility, grantActionAbility, doNothing, AbilityRequirement, alwaysAllow, pushAbilityRequirement} from '../util/abilities'

type Abilities = { [unitClass : number] : Ability }
export const abilityEffects : Abilities = {
  [UnitClass.Grunt]: pushAbility(1, true),
  [UnitClass.Sprinter]: pushAbility(2, true),
  [UnitClass.Tank]: pushAbility(-2, false),
  [UnitClass.Archer]: pushAbility(-1, false),
  [UnitClass.King]: grantActionAbility(1),
  [UnitClass.Paladin]: doNothing // ability is to defend adjacent units -> implemented in "util/attacking:resolveAttackedUnit()"
}

type AbilityRequirements = { [unitClass : number] : AbilityRequirement }
export const abilityRequirements : AbilityRequirements = {
  [UnitClass.Grunt]: pushAbilityRequirement(1, true),
  [UnitClass.Sprinter]: pushAbilityRequirement(2, true),
  [UnitClass.Tank]: pushAbilityRequirement(-2, false),
  [UnitClass.Archer]: pushAbilityRequirement(-1, false),
  [UnitClass.King]: alwaysAllow,
  [UnitClass.Paladin]: alwaysAllow // ability is to defend adjacent units -> implemented in "util/attacking:resolveAttackedUnit()"
}