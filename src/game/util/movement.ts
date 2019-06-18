import isEqual from 'lodash.isequal'
import uniqWith from 'lodash.uniqwith'
import {UnitPosition} from '../t/unit'
import grid from '../config/grid'

export type MovementRule = (position : UnitPosition) => UnitPosition[]

export const removeDuplicates = (positions : UnitPosition[]) : UnitPosition[] => {
  return uniqWith(positions, isEqual)
}

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

export const excludePositions = (positions : UnitPosition[], positionToExclude : UnitPosition[]) : UnitPosition[] => {
  return positions.filter(
    position => positionToExclude.find(eposition => eposition.x === position.x && eposition.y === position.y) === undefined
  )
}