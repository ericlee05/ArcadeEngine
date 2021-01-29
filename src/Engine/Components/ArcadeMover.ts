import { Vector2 } from "../Vector2.js"
import { ArcadeObject } from "./ArcadeObject.js"

export class ArcadeMover extends ArcadeObject {
  private readonly CORRECTION_TIME = 1.2 //중요 : 1ms당 이동거리 계산 시 보정값 상수(계산시 반올림 또는 버림으로 인해 이동 거리가 부족해지는 현상 방지)

  Vector:Vector2 = new Vector2()
  private deltaTime = 0
  private lastMills = Date.now()

  private VectorQueue:Array<VectorQueueItem> = []

  constructor(){super()}
  
  onStart(ctx: CanvasRenderingContext2D){}

  //ArcadeMover를 상속받은 클래스에서는 update함수만 사용할 것!
  render(ctx: CanvasRenderingContext2D){
    if(this.VectorQueue.length >= 100){ //Vector Queue가 100개 이상 있다면
      this.VectorQueue = this.VectorQueue.filter(Item => Date.now() <= Item.startAt + Item.duration) //끝나는 시간이 아직 안된 Queue만 가져오기
    }

    const timeMills = Date.now() - this.lastMills //이전 프레임을 완료하는데 걸린 시간
    this.deltaTime = timeMills

    //Vector 이동연산(duration이 있는 이동일 때, duration만큼 나누어 이동하도록 함)
    const VectorQueue = this.VectorQueue.filter( Item => Date.now() >= Item.startAt && Date.now() <= Item.startAt + Item.duration )
    //console.log(`mount of item is ${VectorQueue.length}`)
    if(VectorQueue.length > 0){
      const VectorItem = VectorQueue[0]
      this.Vector.add(VectorItem.x_PerTime * this.deltaTime, VectorItem.y_PerTime * this.deltaTime) //1ms당 이동 거리와 경과한 ms를 곱해 해당 frame에서 이동해야 할 거리를 구함
    }

    //update 호출
    const ThisVector = this.Vector.getObject()
    this.update(ctx, ThisVector.x, ThisVector.y) //프레임 업데이트 하기 전에 호출

    this.lastMills = Date.now() //완료했으므로 현재 시간을 대입
  }

  private getMarginTime(): number{
    let cnt = 0
    this.VectorQueue.filter( Item => Date.now() >= Item.startAt && Date.now() <= Item.startAt + Item.duration ).forEach(v => cnt += v.duration)
    return cnt
  }

  //상속받은 class에서 사용할 함수들 :

  update(ctx:CanvasRenderingContext2D, DrawX:number, DrawY:number){} //업데이트 될 때 호출(DrawX와 DrawY는 특정 스프라이트 등이 그려져야 할 위치를 나타냄)
  onDestroy(){}

  distanceTo(to:ArcadeMover){
    const len_X = Math.abs(to.Vector.getObject().x - this.Vector.getObject().x) //x축 거리
    const len_Y = Math.abs(to.Vector.getObject().y - this.Vector.getObject().y) //y축 거리
    console.log(`CAT ${to.Vector.getObject().x.toFixed(0)} / BALL ${this.Vector.getObject().x.toFixed(0)}`)
    //피타고라스 정리 사용
    const Result = Math.sqrt( Math.pow(len_X, 2) + Math.pow(len_Y, 2) ) //빗변의 거리, 즉 두 object간의 거리 구하기
    return Result //두 반지름 사이의 거리를 반환
  }

  isCrashedTo(to:ArcadeMover, radius_This:number = 0, radius_To:number = 0){
    const distance = this.distanceTo(to)
    return (radius_This + radius_To) > distance
  }

  //deltaTime 얻기
  getDeltaTime(){
    return this.deltaTime
  }
  
  //절대좌표로 이동
  moveTo(x:number, y:number, durationMs:number = 0){
    if(durationMs == 0){ this.Vector = new Vector2(x, y) }else{
      const VectorObj = this.Vector.getObject()
      const lengthX = x - VectorObj.x //x를 얼마만큼 이동해야 하는지 규정
      const lengthY = y - VectorObj.y //y를 얼마만큼 이동해야 하는지 규정

      const QueueItem:VectorQueueItem = {
        startAt:Date.now(),// + this.getMarginTime(),
        x_PerTime:lengthX / durationMs * this.CORRECTION_TIME, //1 ms당 이동해야 할 거리
        y_PerTime:lengthY / durationMs * this.CORRECTION_TIME,
        duration:durationMs
      }
      //console.log(`${this.getMarginTime()} 뒤에 시작합니다`)
      this.VectorQueue.push(QueueItem)
    }
  }

  //인자값만큼 위치 이동
  move(x:number, y:number, durationMs:number = 0){
    if(durationMs == 0){ this.Vector.add(x, y) }else{
      const VectorObj = this.Vector.getObject()
      const lengthX = x - VectorObj.x //x를 얼마만큼 이동해야 하는지 규정
      const lengthY = y - VectorObj.y //y를 얼마만큼 이동해야 하는지 규정

      const QueueItem:VectorQueueItem = {
        startAt:Date.now(), //+ this.getMarginTime(),
        x_PerTime:lengthX / durationMs * this.CORRECTION_TIME, //1 ms당 이동해야 할 거리
        y_PerTime:lengthY / durationMs * this.CORRECTION_TIME,
        duration:durationMs
      }
      this.VectorQueue.push(QueueItem)
    }
  }
  
}

interface VectorQueueItem{
  startAt:number
  x_PerTime:number
  y_PerTime:number
  duration:number
}