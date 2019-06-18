import {PixelPosition} from './positioning'

export const drawArrow = (startPosition : PixelPosition, endPosition : PixelPosition, colour : string, ctx : CanvasRenderingContext2D, headWidth=45, headLength=50, lineWidth=40, lineExtension=0) => {
  // We draw a line with a given thickness to a point before the end position then draw a triangle to fill the rest

  const angle = Math.atan2(endPosition.y - startPosition.y, endPosition.x - startPosition.x)
  const totalLength = Math.sqrt((endPosition.x - startPosition.x) ** 2 + (endPosition.y - startPosition.y) ** 2)
  const lineLength = totalLength - headLength + lineExtension
  const lineJoin = 3

  // Drawing props
  ctx.fillStyle = colour
  ctx.strokeStyle = colour

  // Draw line
  const lineEnd = {x: startPosition.x + (lineLength + lineJoin) * Math.cos(angle), y: startPosition.y + (lineLength + lineJoin) * Math.sin(angle)}
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.moveTo(startPosition.x, startPosition.y)
  ctx.lineTo(lineEnd.x, lineEnd.y)
  ctx.stroke()

  // Draw head clockwise
  const anglePerp = angle + (Math.PI / 2)
  const point1 = {x: lineEnd.x + (headWidth/2) * Math.cos(anglePerp), y: lineEnd.y + (headWidth/2) * Math.sin(anglePerp)}
  const point2 = {x: endPosition.x + lineExtension * Math.cos(angle), y: endPosition.y + lineExtension * Math.sin(angle)}
  const point3 = {x: lineEnd.x - (headWidth/2) * Math.cos(anglePerp), y: lineEnd.y - (headWidth/2) * Math.sin(anglePerp)}

  ctx.beginPath()
  ctx.moveTo(point1.x, point1.y)
  ctx.lineTo(point2.x, point2.y)
  ctx.lineTo(point3.x, point3.y)
  ctx.lineTo(point1.x, point1.y)
  ctx.fill()
}