import combineReducers from '../../util/combineReducers'
import gameReducer from './updateGame'
import uiReducer from './updateUI'

export default combineReducers({game: gameReducer, ui: uiReducer})
