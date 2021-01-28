import { ArcadeObject } from "../../Engine/Components/ArcadeObject.js"
import { Vector2 } from "../Vector2.js"
import { ArcadeMover } from "./ArcadeMover.js"

let NOTFOUND_ASSET = new Image()
NOTFOUND_ASSET.src = "./../../../assets/NOTFOUND_ASSET.svg"
console.log(NOTFOUND_ASSET.src)

export class ArcadeSprite extends ArcadeMover {
  private Texture:HTMLOrSVGImageElement = NOTFOUND_ASSET
  private TextureSizeWidth:number = 30
  private TextureSizeHeight:number = 30

  constructor(x:number | undefined = undefined, y:number | undefined = undefined, Texture:HTMLOrSVGImageElement | undefined = undefined){ 
    super() 
    if(Texture != undefined){
      this.Texture = Texture
      this.TextureSizeWidth = this.Texture.width as number
      this.TextureSizeHeight = this.Texture.height as number
    }

    this.Vector = new Vector2(x || (0 + this.TextureSizeWidth), y || (0 + this.TextureSizeHeight))
  }

  ctx:CanvasRenderingContext2D | undefined

  onStart(ctx:CanvasRenderingContext2D) {
    this.ctx = ctx
  }
  
  update(ctx: CanvasRenderingContext2D, DrawX:number, DrawY:number) {
    ctx.beginPath()
    /*if(this.isMoving){
      const timeMills = Date.now() - this.lastMills //지난 시간
      const movedPixels = (timeMills / 1000) * this.speed
      console.log(`${movedPixels}만큼 이동`)
      this.x += (movedPixels)
      this.y += (movedPixels)
      
    }*/

    ctx.drawImage(this.Texture, DrawX, DrawY, this.TextureSizeWidth, this.TextureSizeHeight)
    ctx.closePath()
  }

  setTexture(texture:HTMLOrSVGImageElement, width?:number, height?:number){
    this.Texture = texture
    this.TextureSizeWidth = width || texture.width as number
    this.TextureSizeHeight = height || texture.height as number
  }

  getTextureSize():{width:number, height:number}{
    return {width:this.TextureSizeWidth, height:this.TextureSizeHeight}
  }

}

export interface ArcadeSpriteOptions{
  speed:number
}