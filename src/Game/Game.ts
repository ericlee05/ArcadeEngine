import { Renderer } from "../Engine/Renderer.js"
import { MainScene } from "./Scenes/MainScene.js"

const fps = 60

const Game = document.getElementById("PlayCanvas") as HTMLCanvasElement
const Engine = new Renderer(Game.getContext("2d")!, fps)

const NewScene = new MainScene()

Engine.addScene(NewScene)
Engine.setScene("MainScene")
Engine.startRender()