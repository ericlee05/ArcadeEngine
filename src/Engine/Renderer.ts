import { ArcadeScene } from "./ArcadeScene"

export class Renderer{
  private Scenes:Array<ArcadeScene> = []
  readonly fps:number
  private readonly delayMills:number
  private RendererID:number
  private CurrentScene:ArcadeScene | undefined
  readonly Context:CanvasRenderingContext2D

  constructor(Context:CanvasRenderingContext2D, fps:number){
    this.fps = fps
    this.Context = Context
    this.delayMills = 1000/fps //몇 millisecond마다 render할지 결정
    this.RendererID = -1
  }

  startRender(){
    this.RendererID = setInterval(() => {
      this.Context.clearRect(0, 0, this.Context.canvas.width, this.Context.canvas.height)
      if(this.CurrentScene != undefined){
        this.CurrentScene.render(this.Context)
      }
    }, this.delayMills)
  }

  stopRender(){
    clearInterval(this.RendererID)
  }

  setScene(name:string){
    const Scene = this.Scenes.filter(scene => scene.name == name)[0]
    this.CurrentScene = Scene
    console.log(`Renderer will be reading new scene : ${Scene.name}`)
  }

  addScene(scene:ArcadeScene){
    this.Scenes.push(scene)
  }

}