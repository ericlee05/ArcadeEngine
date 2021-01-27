import { ArcadeMover } from "../../Engine/Components/ArcadeMover.js"

export class HelloObject extends ArcadeMover {
  offsetX = 0
  offsetY = 0
  
  constructor(offsetX?: number, offsetY?: number) { 
    super() 
    this.offsetX = offsetX || 0
    this.offsetY = offsetY || 0
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
    super.moveTo(this.offsetX, this.offsetY, 0)
  }

  color = "#0095DD"
  isBacking = false

  update(ctx: CanvasRenderingContext2D, x:number, y:number) {
    const margin = 120
    const xMax = this.ctx!.canvas.width + margin + this.offsetX
    const yMax = this.ctx!.canvas.height + margin + this.offsetY

    //처음으로 돌아왔다면
    if(x <= this.offsetX || y <= this.offsetY){
      this.isBacking = false
      this.color = this.getRandomColor()
      super.moveTo(xMax, yMax, 10000);
    }
  
    if(xMax <= x || yMax <= y){
      console.log("Back!")
      if(!this.isBacking){this.color = this.getRandomColor()}
      this.isBacking = true
      super.moveTo(this.offsetX - 20, this.offsetY - 20, 0);
    }

    ctx.beginPath();
    //ctx.arc(x - Math.random() * 5, y - Math.random() * 5, 60, 0, Math.PI * 2);

    ctx.arc(x, y, 60, 0, Math.PI * 2);
    ctx.fillStyle = this.color
    ctx.fill();
    ctx.closePath();


  }

}