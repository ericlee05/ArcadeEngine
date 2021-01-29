import { ArcadeObject } from "./Components/ArcadeObject"

export class ArcadeScene{
  name:string
  private counter:number = 0
  private ctx:CanvasRenderingContext2D | undefined
  objects:Array<ArcadeObject> = []

  constructor(){
    this.name = ""
  }

  onStart() {

  }
  
  render(ctx:CanvasRenderingContext2D){
    this.ctx = ctx
    this.counter++
    if(this.counter == 1){this.onStart()}
    this.objects.forEach(ObjectItem => {
      if(this.counter == 1){ObjectItem.onStart(ctx)}
      ObjectItem.render(ctx)
    })
  }

  addObject(object:ArcadeObject){
    this.objects.push(object)
    object.onStart(this.ctx!)
  }

}