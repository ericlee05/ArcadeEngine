import { ArcadeSprite } from "../../Engine/Components/ArcadeSprite.js";

export class CatSprite extends ArcadeSprite {
  constructor() { super() }

  onStart(){
    console.log("Cat Sprite is Started!")
  }


}