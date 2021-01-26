import { ArcadeObject } from "../../Engine/Components/ArcadeObject.js"

let NOTFOUND_ASSET = new Image()
NOTFOUND_ASSET.src = "./../../../assets/NOTFOUND_ASSET.svg"
console.log(NOTFOUND_ASSET.src)

export class ArcadeSprite extends ArcadeObject {
  private Texture:HTMLOrSVGImageElement = NOTFOUND_ASSET
  private x:number 
  private y:number
  private TextureSizeWidth:number = 30
  private TextureSizeHeight:number = 30

  constructor(x:number | undefined = undefined, y:number | undefined = undefined, Texture:HTMLOrSVGImageElement | undefined = undefined){ 
    super() 
    if(Texture != undefined){
      this.Texture = Texture
      this.TextureSizeWidth = this.Texture.width as number
      this.TextureSizeHeight = this.Texture.height as number
    }

    this.x = x || (0 + this.TextureSizeWidth)
    this.y = y || (0 + this.TextureSizeHeight)
  }

  ctx:CanvasRenderingContext2D | undefined

  onStart(ctx:CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  private isMoving:boolean = false
  private lastMills:number = Date.now()
  private speed:number = 0
  private moveTarget:SpritePoint = {x:-1, y:-1}
  
  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    /*if(this.isMoving){
      const timeMills = Date.now() - this.lastMills //지난 시간
      const movedPixels = (timeMills / 1000) * this.speed
      console.log(`${movedPixels}만큼 이동`)
      this.x += (movedPixels)
      this.y += (movedPixels)
      
    }*/

    ctx.drawImage(this.Texture, this.x, this.y, this.TextureSizeWidth, this.TextureSizeHeight)
    ctx.closePath()

    this.lastMills = Date.now()
  }

  moveTo(x:number, y:number, options:ArcadeSpriteOptions | undefined = undefined) {
    if(options == undefined){
      this.x = x
      this.y = y
    }else{
      this.isMoving = true
      this.speed = options.speed
      this.moveTarget = {x, y}
    }
  }

  setTexture(texture:HTMLOrSVGImageElement, width?:number, height?:number){
    this.Texture = texture
    this.TextureSizeWidth = width || texture.width as number
    this.TextureSizeHeight = height || texture.height as number
  }

}

interface SpritePoint{
  x:number, y:number
}


export interface ArcadeSpriteOptions{
  speed:number
}