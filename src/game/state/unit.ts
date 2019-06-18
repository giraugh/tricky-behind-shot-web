import fromEntries from 'object.fromentries'
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
  actionsCompleted: 0,
  bonusActionsGranted: 0
})

type UnitsFromTeamCompositionsFunc = (teamCompositions : TeamCompositions) => Unit[]
export const unitsFromTeamCompositions : UnitsFromTeamCompositionsFunc = (teamCompositions) =>
  [
    ...teamCompositions.red.map((unitClass, i) => createUnit(Player.RedPlayer, unitClass, {x: 1, y: 1 + i})),
    ...teamCompositions.blue.map((unitClass, i) => createUnit(Player.BluePlayer, unitClass, {x: grid.width - 2, y: 1 + i}))
  ]

type UnitDictFromTeamCompositionsFunc = <T extends any>(teamCompositions : TeamCompositions, initValue : T) => {[unitId : number] : T}
export const unitDictFromTeamCompositions : UnitDictFromTeamCompositionsFunc = <T extends any>(teamCompositions, initValue) =>
  fromEntries(
    Array
      .from({length: teamCompositions.red.length + teamCompositions.blue.length})
      .fill(0)
      .map((_,i) => [i, (typeof initValue === 'function') ? initValue() : initValue])
  )