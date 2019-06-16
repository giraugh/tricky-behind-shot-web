import {UnitPosition} from '../t/unit'
import grid from '../config/grid'

export type MovementRule = (position : UnitPosition) => UnitPosition[]

export const removeOutside = (positions : UnitPosition[]) : UnitPosition[] => {
  const {width, height} = grid
  return positions.filter(position =>
    position.x >= 0 &&
    position.y >= 0 &&
    position.x <= width - 1 &&
    position.y <= height - 1
  )
}

export const surroundingPositions = (position : UnitPosition, distance : number, includeDiagonals : boolean) : UnitPosition[] => {
  let positions = []
  for (let i = -distance; i <= distance; i++) {
    for (let j = -distance; j <= distance; j++) {
      const isDiagonal = !(i === 0 || j === 0)
      const isOriginal = !(i === 0 && j === 0)
      if (isOriginal && (includeDiagonals || !isDiagonal)) {
        positions.push({x: position.x + i, y: position.y + j})
      }
    }
  }

  return removeOutside(positions)
}