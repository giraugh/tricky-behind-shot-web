import gameReducer from './updateGame'
import uiReducer from './updateUI'
import {State} from '../t/state'
import {CanvasRectangle} from '../t/canvas'
import {Input} from '../t/input';

export default (state : State, input : Input, dt : number, canvasRect : CanvasRectangle) => {
  const ui = uiReducer({...state.ui}, input, dt, canvasRect, {...state})
  const game = gameReducer({...state.game}, input, dt, canvasRect, {...state})
  return {ui, game}
}