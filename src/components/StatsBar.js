import React, {Component} from 'react'
import IntStatDisplay from './IntStatDisplay'

import '../style/StatsBar'

export default class StatsBar extends Component {
  render () {
    // #TODO: get these variables from the game state
    const {
      health,
      maxHealth,
      attack,
      turnActions,
      maxTurnActions,
      colour
    } = this.props

    const style = {
      '--bar-col': colour,
      '--bar-dot-col': colour
    }
    return (
      <div className='stats-bar' style={style}>
        <IntStatDisplay className={'stat health'} currentValue={health} maxValue={maxHealth} icon='heart' />
        <IntStatDisplay className={'stat attack'} currentValue={attack} maxValue={attack} icon='fist-raised' />
        <IntStatDisplay className={'stat turn-actions'} currentValue={turnActions} maxValue={maxTurnActions} icon='arrow-right' />
        {this.props.children}
      </div>
    )
  }
}
