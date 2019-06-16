import {InitialStateFunc} from '../t/state'
import {Player} from '../t/player'
import {PixelPosition} from '../util/positioning'
import {unitsFromTeamCompositions, unitDictFromTeamCompositions} from './unit'

const initialStateFunc : InitialStateFunc = (parameters) => ({
  game: {
    turn: Player.RedPlayer,
    units: unitsFromTeamCompositions(parameters.teamCompositions),
    turnStartTime: Date.now()
  },
  ui: {
    highlightedUnit: null,
    selectedUnit: null,
    unitLifts: unitDictFromTeamCompositions(parameters.teamCompositions, 0),
    unitDrawPosition: unitDictFromTeamCompositions<PixelPosition>(parameters.teamCompositions, {x: 0, y: 0})
  }
})

export default initialStateFunc
