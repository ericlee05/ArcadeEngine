import { ArcadeObject } from "../../Engine/Components/ArcadeObject.js"

export class ArcadeSprite extends ArcadeObject {
  
  constructor(){ 
    super() 
  }

  ctx:CanvasRenderingContext2D | undefined

  onStart(ctx:CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  render(ctx: CanvasRenderingContext2D) {
    
  }

}