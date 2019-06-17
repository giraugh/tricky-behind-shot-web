import {GameParameters} from '../t/params'
import {UnitClass} from '../t/unit'

// Provides a default set of parameters that will be later set by parent application
const gameParameters : GameParameters = {
  teamSize: 5,
  teamCompositions: {
    red: [UnitClass.Grunt, UnitClass.Sprinter, UnitClass.Tank, UnitClass.Paladin, UnitClass.King],
    blue: [UnitClass.Grunt, UnitClass.Sprinter, UnitClass.Tank, UnitClass.Paladin, UnitClass.King]
  }
}

export default gameParameters