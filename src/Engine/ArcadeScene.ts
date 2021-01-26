import { ArcadeObject } from "./Components/ArcadeObject"

export class ArcadeScene{
  name:string
  private counter:number = 0
  objects:Array<ArcadeObject> = []

  constructor(){
    this.name = ""
  }
  
  render(ctx:CanvasRenderingContext2D){
    this.counter++
    this.objects.forEach(ObjectItem => {
      if(this.counter == 1){ObjectItem.onStart(ctx)}
      ObjectItem.render(ctx)
    })
  }

  addObject(object:ArcadeObject){
    this.objects.push(object)
  }

}