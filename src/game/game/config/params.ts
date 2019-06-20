import {GameParameters} from '../t/params'
import {UnitClass} from '../t/unit'

// Provides a default set of parameters that will be later set by parent application
const gameParameters : GameParameters = {
  teamSize: 6,
  teamCompositions: {
    red: [UnitClass.Rogue, UnitClass.Grunt, UnitClass.Paladin, UnitClass.Lancer, UnitClass.Lancer],
    blue: [UnitClass.Rogue, UnitClass.Lancer, UnitClass.Paladin, UnitClass.Lancer, UnitClass.Rogue]
  }
  // teamCompositions: {
  //   red: [UnitClass.Grunt, UnitClass.Sprinter, UnitClass.Tank, UnitClass.Paladin, UnitClass.King],
  //   blue: [UnitClass.Grunt, UnitClass.Sprinter, UnitClass.Tank, UnitClass.Paladin, UnitClass.King]
  // }
}

export default gameParameters