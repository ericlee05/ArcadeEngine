import { ArcadeScene } from "../../Engine/ArcadeScene.js"
import { HelloObject } from "../Components/HelloObject.js"

export class MainScene extends ArcadeScene{
  constructor(){
    super()
    this.name = "MainScene"
  }

  objects = [
    new HelloObject()
  ]

  render(ctx:CanvasRenderingContext2D){
    super.render(ctx)
  }

}