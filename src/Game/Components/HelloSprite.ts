import { ArcadeSprite } from "../../Engine/Components/ArcadeSprite.js";

export class HelloSprite extends ArcadeSprite {
  constructor() { super() }

  onStart(){
    console.log("Cat Sprite is Started!")
  }


}