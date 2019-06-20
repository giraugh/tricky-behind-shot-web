import {UnitClass} from './unit'

export type TeamComposition = UnitClass[]
export type TeamCompositions = { red: TeamComposition, blue: TeamComposition }
export type GameParameters = {
  teamSize : number,
  teamCompositions : TeamCompositions
}