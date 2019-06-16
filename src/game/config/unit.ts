import {UnitClass} from '../t/unit'

type UnitLabels = {[unitClass: number] : string}
export const unitLabels : UnitLabels = {
  [UnitClass.Grunt] : 'G',
  [UnitClass.Archer] : 'A',
  [UnitClass.King]: 'K',
  [UnitClass.Sprinter] : 'S',
  [UnitClass.Paladin] : 'P',
  [UnitClass.Tank] : 'T'
}