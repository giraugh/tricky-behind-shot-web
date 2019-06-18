import {InitialStateFunc} from '../t/state'
import {Player} from '../t/player'
import {PixelPosition} from '../util/positioning'
import {unitsFromTeamCompositions, unitDictFromTeamCompositions} from './unit'

const initialStateFunc : InitialStateFunc = (parameters) => ({
  game: {
    turn: Player.RedPlayer,
    units: unitsFromTeamCompositions(parameters.teamCompositions),
    turnStartTime: Date.now(),
    turnActionsCompleted: 0
  },
  ui: {
    highlightedUnit: null,
    selectedUnit: null,
    unitLifts: unitDictFromTeamCompositions(parameters.teamCompositions, 0),
    unitCrosses: unitDictFromTeamCompositions(parameters.teamCompositions, 0), // 0 -> nothing, 0.5 -> one diag, 1 -> two diags (cross)
    unitArrows: <{position: {x: 0, y: 0}, progress: 0}>unitDictFromTeamCompositions(parameters.teamCompositions, () => ({position: {x: 0, y: 0}, progress: 0})),
    unitDrawPosition: unitDictFromTeamCompositions<PixelPosition>(parameters.teamCompositions, {x: 0, y: 0})
  }
})

export default initialStateFunc
