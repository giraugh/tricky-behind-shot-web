import grid from '../config/grid'
import {UnitPosition} from '../t/unit'

export const unitPositionToCanvasPosition = (position : UnitPosition, ctx : CanvasRenderingContext2D) : UnitPosition => {
  const {
    left,
    top,
    cellSize
  } = getGridInformation(ctx)

  return {
    x: left + position.x * cellSize,
    y: top + position.y * cellSize
  }
}

export const getGridInformation = (ctx : CanvasRenderingContext2D) => {
  return {
    ...getGridSizing(ctx),
    ...getGridPositioning(ctx)
  }
}

export const getGridSizing = (ctx : CanvasRenderingContext2D) => {
  // Get grid size in cells from config
  const gridWidth = grid.width
  const gridHeight = grid.height
  const gridMargin = grid.margin

  // get canvas size
  const canvasWidth = ctx.canvas.width

  // Get grid and cell sizes
  const cellSize = Math.floor((canvasWidth - (2 * gridMargin)) / gridWidth)

  return {
    width: gridWidth,
    height: gridHeight,
    margin: gridMargin,
    cellSize
  }
}

export const getGridPositioning = (ctx : CanvasRenderingContext2D) => {
  // Get grid size in cells from config
  const gridWidth = grid.width
  const gridHeight = grid.height
  const gridMargin = grid.margin

  // get canvas size
  const canvasWidth = ctx.canvas.width

  // Get grid and cell sizes
  const cellSize = Math.floor((canvasWidth - (2 * gridMargin)) / gridWidth)
  const rightEdge = gridMargin + cellSize * gridWidth
  const bottomEdge = gridMargin + cellSize * gridHeight
  const leftEdge = gridMargin
  const topEdge = gridMargin

  return {
    left: leftEdge,
    right: rightEdge,
    bottom: bottomEdge,
    top: topEdge
  }
}