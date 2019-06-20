import React, {Component} from 'react'
import initGame from '../game/game'

import '../style/GameContainer'

export default class GameContainer extends Component {
  constructor () {
    super()
    this.state = {}
  }

  componentDidMount () {
    initGame(this.gameStateDidUpdate.bind(this))
  }

  gameStateDidUpdate (newGameState) {
    // Update state
    this.setState(newGameState)
  }

  render () {
    const playerNum = this.state.turn
    const playerString = playerNum === 0 ? 'RED' : 'BLUE'
    const totalTurnActions = this.state.turnActionsCompleted

    return (
      <div className='game-container'>
        <h2>{ `It is ${playerString}'s turn. Completed ${totalTurnActions} actions.` }</h2>
        <canvas id='canvas' />
      </div>
    )
  }
}
