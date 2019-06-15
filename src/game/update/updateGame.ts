import {State, GameState} from '../t/state'
import {Input} from '../t/input'

type UpdateGameFunc = (game : GameState, input : Input, dt : number, state : State) => GameState
const updateGame : UpdateGameFunc = (game, input, dt, state) => {
  return game
}

export default updateGame