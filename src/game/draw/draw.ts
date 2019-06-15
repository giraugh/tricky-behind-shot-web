import {State} from '../t/state'
import drawGrid from './drawGrid'
import drawUnits from './drawUnits'

export default (state : State) => (ctx : CanvasRenderingContext2D) => {
  // get canvas size
  const width = ctx.canvas.width
  const height = ctx.canvas.height

  // Clear screen
  ctx.clearRect(0, 0, width, height)

  // draw grid
  drawGrid(ctx)

  // draw units
  drawUnits(state.game.units, ctx)
}
