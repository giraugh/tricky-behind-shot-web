import React, {Component} from 'react'
import GameContainer from './GameContainer'

import '../style/App'

export default class App extends Component {
  render () {
    return (
      <div className='app'>
        <GameContainer />
      </div>
    )
  }
}
