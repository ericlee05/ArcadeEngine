import { ArcadeObject } from "../../Engine/Components/ArcadeObject.js"

export class HelloObject extends ArcadeObject {
  offsetX = 0
  offsetY = 0

  currentX = -170
  currentY = -170
  
  constructor(offsetX?: number, offsetY?: number) { 
    super() 
    this.offsetX = offsetX || 0
    this.offsetY = offsetY || 0

    this.currentX += offsetX || 0
    this.currentY += offsetY || 0
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  ctx:CanvasRenderingContext2D | undefined

  onStart(ctx:CanvasRenderingContext2D) {
    console.log("Hello Object is started!")
    this.ctx = ctx
  }

  readonly speed = 50 //1초 당 움직이는 픽셀
  lastMills = Date.now()
  color = "#0095DD"

  render(ctx: CanvasRenderingContext2D) {
    console.log("Drawing new..")

    const xMax = this.ctx!.canvas.width + 100 + this.offsetX
    const yMax = this.ctx!.canvas.height + 100 + this.offsetY

    ctx.beginPath();
    //ctx.arc(x - Math.random() * 5, y - Math.random() * 5, 60, 0, Math.PI * 2);
    if(xMax < this.currentX || yMax < this.currentY){this.currentX = -170 + this.offsetX; this.currentY = -170 + this.offsetY;this.color = this.getRandomColor()}

    const timeMills = Date.now() - this.lastMills //지난 시간
    const movedPixels = (timeMills / 1000) * this.speed
    //console.log(`${movedPixels}만큼 이동`)
    this.currentX += movedPixels;
    this.currentY += movedPixels;

    ctx.arc(this.currentX, this.currentY, 60, 0, Math.PI * 2);
    ctx.fillStyle = this.color
    ctx.fill();
    ctx.closePath();


    this.lastMills = Date.now()
  }

}