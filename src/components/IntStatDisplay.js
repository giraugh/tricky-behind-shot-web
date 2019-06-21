import React, {Component} from 'react'

import '../style/IntStatDisplay'

export default class IntStatDisplay extends Component {
  render () {
    const {currentValue, maxValue, icon, className} = this.props
    const maxPossibleValue = 4
    return (
      <div className={`int-stat-display ${className}`}>
        <span className={`icon fas fa-${icon}`} />
        <div className='dots-container'>
          {
            Array.from({length: maxPossibleValue}).fill(1).map((_, i) => {
              const filled = i < currentValue
              const enabled = i < maxValue
              const stateClass = enabled ? (filled ? 'filled' : '') : 'disabled'
              return (
                <span key={i} className={`dot ${stateClass}`} />
              )
            })
          }
        </div>
      </div>
    )
  }
}
