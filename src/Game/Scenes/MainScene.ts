import { ArcadeScene } from "../../Engine/ArcadeScene.js"
import { HelloObject } from "../Components/HelloObject.js"
import { HelloSprite } from "../Components/HelloSprite.js"

export class MainScene extends ArcadeScene{
  constructor(){
    super()
    this.name = "MainScene"
  }

  objects = [
    new HelloObject(-400, 400),
    new HelloObject(-200, 200),
    new HelloObject(),
    new HelloObject(200, -200),
    new HelloObject(400, -400)
  ]

  newSprite = new HelloSprite()

  onStart(){
    console.log("Scene is started!")
    let CatTexture = new Image()
    CatTexture.src = "./../../../assets/cat.png"

    this.newSprite.setTexture(CatTexture, 150, 150)
    super.addObject(this.newSprite)

    document.onmousemove = (event:MouseEvent) => {
      this.lastMouseX = event.x
      this.lastMouseY = event.y
    }
  }

  lastMouseX:number = 0
  lastMouseY:number = 0

  render(ctx:CanvasRenderingContext2D){
    this.newSprite.moveTo((this.lastMouseX - 75 -5) + Math.random() * 10, (this.lastMouseY - 75 -5) + Math.random() * 10)
    super.render(ctx)
  }

}