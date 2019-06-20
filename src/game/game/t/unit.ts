import { Player } from './player'
import { TeamCompositions } from './params'
import grid from '../config/grid'
export type UnitPosition = {
  x : number,
  y : number
}

export enum UnitClass {
  Grunt,
  Lancer,
  Tank,
  King,
  Paladin,
  Sprinter,
  Rogue
}

export type UnitID = number

export type Unit = {
  id : UnitID,
  player : Player,
  class : UnitClass,
  position : UnitPosition,
  damageTaken : number,
  actionsCompleted : number,
  bonusActionsGranted : number
}