import { ArcadeObject } from "../../Engine/Components/ArcadeObject.js"

export class HelloObject extends ArcadeObject {
  constructor() { super() }

  ctx:CanvasRenderingContext2D | undefined

  onStart(ctx:CanvasRenderingContext2D) {
    console.log("Hello Object is started!")
    this.ctx = ctx
  }

  readonly speed = 50 //1초 당 움직이는 픽셀
  lastMills = Date.now()

  currentX = -170
  currentY = -170

  render(ctx: CanvasRenderingContext2D) {
    console.log("Drawing new..")

    const xMax = this.ctx!.canvas.width + 100
    const yMax = this.ctx!.canvas.height + 100

    ctx.beginPath();
    //ctx.arc(x - Math.random() * 5, y - Math.random() * 5, 60, 0, Math.PI * 2);
    if(xMax < this.currentX || yMax < this.currentY){this.currentX = 0; this.currentY = 0;}

    const timeMills = Date.now() - this.lastMills //지난 시간
    const movedPixels = (timeMills / 1000) * this.speed
    console.log(`${movedPixels}만큼 이동`)
    this.currentX += movedPixels;
    this.currentY += movedPixels;

    ctx.arc(this.currentX, this.currentY, 60, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();


    this.lastMills = Date.now()
  }

}