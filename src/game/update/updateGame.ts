import {CanvasRectangle} from '../t/canvas'
import {State, GameState} from '../t/state'
import {Input} from '../t/input'

type UpdateGameFunc = (game : GameState, input : Input, dt : number, canvasRect : CanvasRectangle, state : State) => GameState
const updateGame : UpdateGameFunc = (game, input, dt, canvasRect, state) => {
  return game
}

export default updateGame