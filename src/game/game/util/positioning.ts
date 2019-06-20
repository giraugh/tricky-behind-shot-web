import {CanvasRectangle} from '../t/canvas'
import grid from '../config/grid'
import {UnitPosition} from '../t/unit'

export type PixelPosition = { x : number, y : number}

export const centerPosition = (position : PixelPosition, canvasRect : CanvasRectangle) : PixelPosition => {
  const {cellSize} = getGridInformation(canvasRect)
  return {
    x: position.x + cellSize / 2,
    y: position.y + cellSize / 2
  }
}

export const unitCenterPosition = (position : UnitPosition, canvasRect : CanvasRectangle) : PixelPosition => {
  const canvasPosition = unitPositionToCanvasPosition(position, canvasRect)
  return centerPosition(canvasPosition, canvasRect)
}

export const clientPositionToUnitPosition = (position : PixelPosition, canvasRect : CanvasRectangle) : UnitPosition | undefined => {
  if (clientPositionInsideGrid(position, canvasRect)) {
    const canvasPosition = clientPositionToCanvasPosition(position, canvasRect)
    const unitPosition = canvasPositionToUnitPosition(canvasPosition, canvasRect)
    return unitPosition
  } else {
    return undefined
  }
}

export const clientPositionInsideGrid = (position : PixelPosition, canvasRect : CanvasRectangle) : boolean => {
  const inCanvas = clientPositionInsideCanvas(position, canvasRect)
  const canvasPosition = clientPositionToCanvasPosition(position, canvasRect)
  const inGrid = canvasPositionInsideGrid(canvasPosition, canvasRect)
  return inCanvas && inGrid
}

export const clientPositionInsideCanvas = (position : PixelPosition, canvasRect : CanvasRectangle) : boolean => {
  return (
    position.x >= canvasRect.x &&
    position.y >= canvasRect.y &&
    position.x <= (canvasRect.x + canvasRect.width) &&
    position.y <= (canvasRect.y + canvasRect.height)
  )
} 

export const canvasPositionInsideGrid = (position : PixelPosition, canvasRect : CanvasRectangle) : boolean => {
  const {
    left,
    top,
    right,
    bottom
  } = getGridInformation(canvasRect)
  
  return (
    position.x >= left &&
    position.y >= top &&
    position.x <= right &&
    position.y <= bottom
  )
}

export const clientPositionToCanvasPosition = (position : PixelPosition, canvasRect : CanvasRectangle) : PixelPosition => {
  return {
    x: position.x - canvasRect.x,
    y: position.y - canvasRect.y
  }
}

export const canvasPositionToUnitPosition = (position : PixelPosition, canvasRect : CanvasRectangle) : UnitPosition => {
  const {
    left,
    top,
    cellSize
  } = getGridInformation(canvasRect)

  const x = position.x - left
  const y = position.y - top
  
  const gx = Math.floor(x / cellSize)
  const gy = Math.floor(y / cellSize)

  return {
    x: gx,
    y: gy
  }
}

export const unitPositionToCanvasPosition = (position : UnitPosition, canvasRect : CanvasRectangle) : PixelPosition => {
  const {
    left,
    top,
    cellSize
  } = getGridInformation(canvasRect)

  return {
    x: left + position.x * cellSize,
    y: top + position.y * cellSize
  }
}

export const getGridInformation = (canvasRect : CanvasRectangle) => {
  return {
    ...getGridSizing(canvasRect),
    ...getGridPositioning(canvasRect)
  }
}

export const getGridSizing = (canvasRect : CanvasRectangle) => {
  // Get grid size in cells from config
  const gridWidth = grid.width
  const gridHeight = grid.height
  const gridMargin = grid.margin

  // get canvas size
  const canvasWidth = canvasRect.width

  // Get grid and cell sizes
  const cellSize = Math.floor((canvasWidth - (2 * gridMargin)) / gridWidth)

  return {
    width: gridWidth,
    height: gridHeight,
    margin: gridMargin,
    cellSize
  }
}

export const getGridPositioning = (canvasRect : CanvasRectangle) => {
  // Get grid size in cells from config
  const gridWidth = grid.width
  const gridHeight = grid.height
  const gridMargin = grid.margin

  // get canvas size
  const canvasWidth = canvasRect.width

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