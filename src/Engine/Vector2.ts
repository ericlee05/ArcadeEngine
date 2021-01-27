export class Vector2{
  private x:number //x좌표
  private y:number //y좌표

  constructor(x?:number, y?:number){
    this.x = x || 0
    this.y = y || 0
  }

  //벡터값 얻기
  getObject():Vector2Object{
    return {x:this.x, y:this.y}
  }

  //벡터의 길이 얻기
  getLength():number{
    return Math.abs(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)))
  }

  //모든 원소에 스칼라값 더하기
  addScalar(scalar:number):Vector2Object{
    this.addScalarX(scalar)
    this.addScalarY(scalar)
    return this.getObject()
  }

  //x 원소에 스칼라값 더하기
  addScalarX(scalar:number):Vector2Object{
    this.x += scalar
    return this.getObject()
  }

  //y 원소에 스칼라값 더하기
  addScalarY(scalar:number):Vector2Object{
    this.y += scalar
    return this.getObject()
  }

  //모든 원소에 스칼라값 빼기
  sumScalar(scalar:number):Vector2Object{
    this.sumScalarX(scalar)
    this.sumScalarY(scalar)
    return this.getObject()
  }

  //x 원소에 스칼라값 빼기
  sumScalarX(scalar:number):Vector2Object{
    this.x -= scalar
    return this.getObject()
  }

  //y 원소에 스칼라값 빼기
  sumScalarY(scalar:number):Vector2Object{
    this.y -= scalar
    return this.getObject()
  }

  //모든 원소에 스칼라값 나누기
  divScalar(scalar:number):Vector2Object{
    this.x /= scalar
    this.y /= scalar
    return this.getObject()
  }
  
  //모든 원소에 스칼라값 곱하기
  mulScalar(scalar:number):Vector2Object{
    this.x *= scalar
    this.y *= scalar
    return this.getObject()
  }

  //벡터 더하기
  add(x:number, y:number):Vector2Object{
    this.x += x
    this.y += y
    return this.getObject()
  }

  //벡터 빼기
  sum(x:number, y:number):Vector2Object{
    this.x -= x
    this.y -= y
    return this.getObject()
  }

}

export interface Vector2Object{
  x:number, y:number
}