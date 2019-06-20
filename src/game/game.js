import Canvas from './util/canvas'
import GameControl from './control'
import updateFunc from './game/update/update'
import drawFunc from './game/draw/draw'
import initialStateFunc from './game/state/state'
import gameParameters from './game/config/params'

export default (gameStateUpdatedEvent) => {
  const canvas = new Canvas('canvas', 1024, 650)
  const gameControl = new GameControl(canvas, updateFunc, drawFunc, initialStateFunc(gameParameters), [{key: 'game', event: gameStateUpdatedEvent}])

  const loop = () => {
    // Perform loop
    gameControl.loop()

    // Call again
    window.requestAnimationFrame(loop)
  }

  // Report initial state
  gameStateUpdatedEvent(gameControl.state['game'])

  // Start loop
  loop()

  return () => gameControl.state
}
