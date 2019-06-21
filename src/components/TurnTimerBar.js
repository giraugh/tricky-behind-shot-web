import React, {Component} from 'react'

import '../style/TurnTimerBar'

export default class TurnTimerBar extends Component {
  constructor (props) {
    super()
    this.cutoff = 0.6
    this.offset = 0
    this.earlyCutoff = 0.01
    this.intervalHandle = null
    this.state = {
      startTime: null,
      turnMaxDuration: null
    }
  }

  componentWillMount () {
    this.resetTimer(this.props.turnStartTime, this.props.turnMaxDuration)
  }

  resetTimer (startTime, turnMaxDuration) {
    if (this.intervalHandle) { clearInterval(this.intervalHandle) }
    this.intervalHandle = setInterval(this.forceUpdate.bind(this), 5)
  }

  componentWillUnmount () {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle)
    }
  }

  getProgress () {
    const {turnStartTime, turnMaxDuration} = this.props
    if (turnStartTime && turnMaxDuration) {
      const turnDuration = (Date.now() - turnStartTime)
      const turnProgress = Math.min(1, this.offset + turnDuration / turnMaxDuration)
      const targetProgress = Math.min(1, Math.max(0, turnProgress - this.cutoff) / (1 - this.cutoff))
      const enabled = targetProgress > 0 && !(targetProgress > (1 - this.earlyCutoff))
      return {enabled, progress: targetProgress}
    } else {
      return {enabled: false, progress: 0}
    }
  }

  render () {
    const {progress, enabled} = this.getProgress() // progress is [0, 1]
    const childStyle = {
      width: `${progress * 100}%`
    }
    return (
      <div className={`turn-timer-bar parent ${enabled ? 'enabled' : 'disabled'}`} style={{'--timer-col': this.props.colour}}>
        <div className='turn-timer-bar child' style={childStyle} />
      </div>
    )
  }
}
