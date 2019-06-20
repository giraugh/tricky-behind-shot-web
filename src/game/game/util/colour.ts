import {Player} from '../t/player'
import {Unit} from '../t/unit'
import {redPlayerColour, bluePlayerColour} from '../config/colour'

export type Colour = string

export const formatColour = (colour : string, opacity = 1) => `rgba(${colour}, ${opacity})`

export const getUnitColour = (unit : Unit, opacity = 1) : Colour => {
  const colour = unit.player == Player.RedPlayer ? redPlayerColour : bluePlayerColour
  return formatColour(colour, opacity)
}