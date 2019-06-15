import {Player} from '../t/player'
import {Unit, UnitClass, UnitPosition} from '../t/unit'
import {TeamCompositions} from '../t/params'
import grid from '../config/grid'

let globalUnitIDCounter = 0
type CreateUnitFunc = (player : Player, unitClass : UnitClass, position : UnitPosition) => Unit
export const createUnit : CreateUnitFunc = (player, unitClass, position) => ({
  id: globalUnitIDCounter++,
  player,
  class: unitClass,
  position,
  damageTaken: 0,
  actionsCompleted: 0
})

type UnitsFromTeamCompositionsFunc = (teamCompositions : TeamCompositions) => Unit[]
export const unitsFromTeamCompositions : UnitsFromTeamCompositionsFunc = (teamCompositions) =>
  [
    ...teamCompositions.red.map((unitClass, i) => createUnit(Player.RedPlayer, unitClass, {x: 1, y: 1 + i})),
    ...teamCompositions.blue.map((unitClass, i) => createUnit(Player.BluePlayer, unitClass, {x: grid.width - 2, y: 1 + i}))
  ]