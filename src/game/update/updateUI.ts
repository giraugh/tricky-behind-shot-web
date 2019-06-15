import {State, UIState} from '../t/state'
import {Input} from '../t/input'

type UpdateUIFunc = (ui : UIState, input : Input, dt : number, state : State) => UIState
const updateUI : UpdateUIFunc = (ui, input, dt, state) => {
  return ui
}

export default updateUI