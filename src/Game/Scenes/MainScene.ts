import { ArcadeScene } from "../../Engine/ArcadeScene.js"
import { BallCircle } from "../Components/BallCircle.js"
import { CatSprite } from "../Components/CatSprite.js"

export class MainScene extends ArcadeScene{
  constructor(){
    super()
    this.name = "MainScene"
  }

  objects = [
    new BallCircle(-400, 400),
    //new BallCircle(-200, 200),
    new BallCircle(),
    //new BallCircle(200, -200),
    new BallCircle(400, -400)
  ]

  Cat = new CatSprite()

  onStart(){
    console.log("Scene is started!")
    let CatTexture = new Image()
    CatTexture.src = "./../../../assets/cat.png"

    this.Cat.setTexture(CatTexture, 150, 150)
    super.addObject(this.Cat)

    document.onmousemove = (event:MouseEvent) => {
      this.lastMouseX = event.x
      this.lastMouseY = event.y
    }
  }

  lastMouseX:number = 0
  lastMouseY:number = 0

  CrashCount = 0
  LastCrashTime = 0
  isGameOver = false

  render(ctx:CanvasRenderingContext2D){
    this.Cat.moveTo((this.lastMouseX - 75 -5) + Math.random() * 10, (this.lastMouseY - 75 -5) + Math.random() * 10, 100)

    this.objects.forEach(Ball => {
      const distance = Ball.distanceTo(this.Cat)
      //console.log(`공과 고양이의 거리는 ${distance}`)
      const isCrashed = Ball.isCrashedTo(this.Cat, Ball.ballSize, (this.Cat.getTextureSize().width + this.Cat.getTextureSize().height) / 2) && (distance != 0)
      if(isCrashed){
        if(Date.now() - this.LastCrashTime  > 1000){
          this.LastCrashTime = 0
          this.CrashCount++
        }
        this.LastCrashTime = Date.now()
      }
    })

    ctx.beginPath()
    ctx.font = "30px Arial"
    ctx.fillStyle = "#F24675"
    ctx.textAlign = "right"
    ctx.fillText(`Bumped : ${this.CrashCount} times`, ctx.canvas.width - 10, 0 + 30 + 10)
    ctx.closePath()

    if(this.CrashCount == 10 && !this.isGameOver){
      this.isGameOver = true
      alert("Game Over!")
      alert("If you enjoyed our Example, please visit our GameEngine website :D")
      window.location.href = "https://github.com/Axtus/ArcadeEngine"
    }

    super.render(ctx)
  }

}