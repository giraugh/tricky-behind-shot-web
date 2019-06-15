import {UnitClass} from './unit'

export type TeamComposition = UnitClass[]
export type TeamCompositions = { red: TeamComposition, blue: TeamComposition }
export type GameParameters = {
  teamCompositions : TeamCompositions
}