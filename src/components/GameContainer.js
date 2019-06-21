import React, {Component} from 'react'
import initGame from '../game/game'
import StatsBar from './StatsBar'
import {unitHealthValues, unitAttackDamageValues} from '../game/game/config/unit'
import turns from '../game/game/config/turns'
import {getPlayerColour, getUnitColour} from '../game/game/util/colour'

import '../style/GameContainer'
import TurnTimerBar from './TurnTimerBar'

export default class GameContainer extends Component {
  constructor () {
    super()
    this.state = {game: {}, highlightedUnitID: null}
  }

  componentDidMount () {
    initGame(
      this.gameStateDidUpdate.bind(this),
      this.uiStateDidUpdate.bind(this)
    )
  }

  gameStateDidUpdate (newGameState) {
    // Update state
    this.setState({game: newGameState})
  }

  uiStateDidUpdate (uiGameState) {
    // Update state
    const highlightedUnitID = uiGameState.highlightedUnit
    this.setState({highlightedUnitID})
  }

  render () {
    let unitHealth
    let unitMaxHealth
    let unitAttack
    let remainingTurnActions
    let maxTurnActions
    let playerColour
    let unitColour
    let turnStartTime
    let turnMaxDuration

    if (this.state.game) {
      if (this.state.highlightedUnitID !== null) {
        const selectedID = this.state.highlightedUnitID
        const selectedUnit = this.state.game.units.find(unit => unit.id === selectedID)
        unitMaxHealth = unitHealthValues[selectedUnit.class]
        unitHealth = unitMaxHealth - selectedUnit.damageTaken
        unitAttack = unitAttackDamageValues[selectedUnit.class]
        unitColour = getUnitColour(selectedUnit)
      }

      playerColour = getPlayerColour(this.state.game.turn)
      maxTurnActions = turns.maximumTurnActions
      remainingTurnActions = maxTurnActions - this.state.game.turnActionsCompleted

      turnStartTime = this.state.game.turnStartTime
      turnMaxDuration = turns.turnMaxTime
    }

    return (
      <div className='game-container'>
        <StatsBar turnColour={playerColour} unitColour={unitColour} health={unitHealth} maxHealth={unitMaxHealth} attack={unitAttack} turnActions={remainingTurnActions} maxTurnActions={maxTurnActions} />
        <TurnTimerBar colour={playerColour} turnStartTime={turnStartTime} turnMaxDuration={turnMaxDuration} />
        <div className='canvas-container'>
          <canvas id='canvas' />
        </div>
      </div>
    )
  }
}
