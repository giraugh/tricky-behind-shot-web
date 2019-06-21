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
      turnColour,
      unitColour
    } = this.props

    const turnStyle = {
      '--bar-col': turnColour,
      '--bar-dot-col': turnColour
    }
    const unitStyle = {
      '--bar-col': unitColour,
      '--bar-dot-col': unitColour
    }
    return (
      <div className='stats-bar'>
        <IntStatDisplay className={'stat health'} style={unitStyle} currentValue={health} maxValue={maxHealth} icon='heart' />
        <IntStatDisplay className={'stat attack'} style={unitStyle} currentValue={attack} maxValue={attack} icon='fist-raised' />
        <IntStatDisplay className={'stat turn-actions'} style={turnStyle} currentValue={turnActions} maxValue={maxTurnActions} icon='arrow-right' />
        {this.props.children}
      </div>
    )
  }
}
