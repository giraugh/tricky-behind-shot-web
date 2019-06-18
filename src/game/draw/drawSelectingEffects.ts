import {State } from "../t/state"
import {unitPositionToCanvasPosition, getGridInformation, canvasPositionToUnitPosition} from '../util/positioning'
import {CanvasRectangle} from "../t/canvas"
import {getUnitColour} from '../util/colour'
import {movementRules, attackingRules, abilityRules} from '../config/unit'

const drawSelectingEffects = ({game, ui} : State, canvasRect : CanvasRectangle, ctx : CanvasRenderingContext2D) => {
  const selectedUnit = game.units.find(unit => unit.id == ui.highlightedUnit)
  const {cellSize} = getGridInformation(canvasRect)

  if (selectedUnit) {
    // Get legal move locations
    const squareDefaultColour = getUnitColour(selectedUnit, 0.05)
    const squareInhabitedColour = getUnitColour(selectedUnit, 0.3)
    const squareHighlightedColour = getUnitColour(selectedUnit, 0.5)
    const borderColour = getUnitColour(selectedUnit, 0.6)
    const unitPosition = selectedUnit.position
    const legalMovementMoves = movementRules[selectedUnit.class](unitPosition)
    const legalAttackMoves = attackingRules[selectedUnit.class](unitPosition)
    const legalAbilityMoves = abilityRules[selectedUnit.class](unitPosition)

    const legalMoves = [...legalAttackMoves, ...legalMovementMoves, ...legalAbilityMoves]

    legalMoves.forEach(position => {
      const {x, y} = unitPositionToCanvasPosition(position, canvasRect)
      const {x: dx, y: dy} = ui.unitDrawPosition[selectedUnit.id]
      const {x: cx, y: cy} = canvasPositionToUnitPosition({x: dx + cellSize / 2, y: dy + cellSize / 2}, canvasRect)
      const highlighted = cx == position.x && cy === position.y
      const inhabitingUnit = game.units.find(unit => unit.position.x === position.x && unit.position.y === position.y)
      const inhabited = inhabitingUnit !== undefined 
      const friendly = inhabited && inhabitingUnit.player === selectedUnit.player

      const isMove = legalMovementMoves.includes(position) && !inhabited
      const isAttack = legalAttackMoves.includes(position) && inhabited && !friendly
      const isAbility = legalAbilityMoves.includes(position) && inhabited && friendly

      // Draw move squares and borders
      if (isMove || isAttack || isAbility) {
        ctx.fillStyle = highlighted ? squareHighlightedColour : (inhabited ? squareInhabitedColour : squareDefaultColour)
        ctx.strokeStyle = borderColour
        ctx.lineWidth = 2
        ctx.fillRect(x, y, cellSize, cellSize)
        ctx.strokeRect(x, y, cellSize, cellSize)
      }
    })
  }
}

export default drawSelectingEffects