import drawGrid from './drawGrid'

export default state => ctx => {
  // get canvas size
  const width = ctx.canvas.width
  const height = ctx.canvas.height

  // Clear screen
  ctx.clearRect(0, 0, width, height)

  // draw grid
  drawGrid(ctx)
}
