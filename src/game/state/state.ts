import {InitialStateFunc} from '../t/state'
import {Player} from '../t/player'
import {unitsFromTeamCompositions} from './unit'

const initialStateFunc : InitialStateFunc = (parameters) => ({
  game: {
    turn: Player.RedPlayer,
    units: unitsFromTeamCompositions(parameters.teamCompositions),
    turnStartTime: Date.now()
  },
  ui: {

  }
})

export default initialStateFunc
