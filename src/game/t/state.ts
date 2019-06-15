import {Unit, UnitClass} from './unit'
import {Player} from './player'
import {GameParameters} from './params'

export type GameState = {
  turn : Player,
  units : Unit[],
  turnStartTime : number // in milliseconds
}

export type UIState = {}

export type State = {
  game : GameState,
  ui : UIState
}

export type InitialStateFunc = (parameters : GameParameters) => State