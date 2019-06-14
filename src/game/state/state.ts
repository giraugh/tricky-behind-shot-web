enum UnitClass {
  Grunt,
  Archer,
  Tank,
  King,
  Paladin,
  Sprinter
}

enum Turn {
  RedPlayer,
  BluePlayer
}

type Position = {
  x : number,
  y : number
}

type UnitID = number

type Unit = {
  id : UnitID,
  class : UnitClass,
  position : Position,
  damageTaken : number,
  actionsCompleted : number
}

type GameState = {
  turn : Turn,
  units : Unit[],
  turnTime : number // in milliseconds
}

type UIState = {

}

type State = {
  game : GameState,
  ui : UIState
}

const initialState : State = {
  game: {
    turn: Turn.RedPlayer,
    units: [],
    turnTime: 0
  },
  ui: {

  }
}

export default initialState
