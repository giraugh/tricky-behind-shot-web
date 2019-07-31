import {CanvasRectangle} from "../t/canvas";
import {Unit} from "../t/unit";
import {getGridInformation, centerPosition} from "../util/positioning";
import {getUnitColour} from "../util/colour";
import {UIState} from '../t/state'
import {maximumActionValues} from '../config/unit'

const drawBonusActionEffects = (unit : Unit, ui : UIState, canvasRect : CanvasRectangle, ctx : CanvasRenderingContext2D) => {
  const bonusActions = Math.max(0, unit.bonusActionsGranted - unit.actionsCompleted)
  const {cellSize} = getGridInformation(canvasRect) 
  const {x, y} = centerPosition(ui.unitDrawPosition[unit.id], canvasRect)
  const style = getUnitColour(unit, 0.8)
  if (bonusActions > 0) {
    console.log(unit)
    // Draw rings for each action
    for (let i = 0; i < bonusActions; i++) {
      ctx.strokeStyle = style
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(x, y, cellSize * (.6 + (i * 0.1)), 0, Math.PI * 2, false)
      ctx.stroke()
    }
  }
}

export default drawBonusActionEffects