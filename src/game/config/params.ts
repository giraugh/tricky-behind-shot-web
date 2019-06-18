import {GameParameters} from '../t/params'
import {UnitClass} from '../t/unit'

// Provides a default set of parameters that will be later set by parent application
const gameParameters : GameParameters = {
  teamSize: 6,
  teamCompositions: {
    red: [UnitClass.Grunt, UnitClass.Sprinter, UnitClass.Tank, UnitClass.Paladin, UnitClass.King, UnitClass.Archer],
    blue: [UnitClass.Grunt, UnitClass.Sprinter, UnitClass.Tank, UnitClass.Paladin, UnitClass.King, UnitClass.Archer]
  }
}

export default gameParameters