import {Unit, UnitClass, UnitID} from './unit'
import {Player} from './player'
import {PixelPosition} from '../util/positioning'
import {GameParameters} from './params'

export type GameState = {
  turn : Player,
  units : Unit[],
  turnActionsCompleted : number,
  turnStartTime : number // in milliseconds
}

export type UIState = {
  highlightedUnit : UnitID | null,
  selectedUnit : UnitID | null,
  unitLifts : { [unitId : number] : number },
  unitCrosses: { [unitId : number] : number },
  unitArrows: { [unitId : number] : {position : PixelPosition, progress : number} },
  unitDrawPosition: { [unitId : number] : PixelPosition }
}

export type State = {
  game : GameState,
  ui : UIState
}

export type InitialStateFunc = (parameters : GameParameters) => State