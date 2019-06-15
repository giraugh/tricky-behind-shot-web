import {Unit} from '../t/unit'
import drawUnit from './drawUnit'

const drawUnits = (units: Unit[], ctx : CanvasRenderingContext2D) => {
  units.forEach(unit => drawUnit(unit, ctx))
}

export default drawUnits