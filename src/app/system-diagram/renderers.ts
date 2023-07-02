
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

const BLOCK_SIZE = 60;

interface Renderer {
    (context: CanvasRenderingContext2D, conf: any): void
}

export interface Config {
    modules: { [key: string]: string }
    name: string
    instances: { [key: string]: string }
}

export async function cascadeLoad(http: HttpClient) {
    const controller = new RendererController()
    controller.conf = await firstValueFrom(http.get<Config>(this.configUrl))
    for (let key in this.conf.modules) {
        controller.modules[key] = await firstValueFrom(http.get<string>(this.conf.modules[key]))
    }

    return controller;
}

function renderHub(context: CanvasRenderingContext2D, conf: any) {
    context.fillStyle = 'blue';
    const startX = 10
    const startY = 400
    let sideCount = conf.sideCount;
    context.fillRect(startX, startY, BLOCK_SIZE * (sideCount + 1), BLOCK_SIZE);
    const pointSize = 10
    for (let n = 0; n < 2; n++) {
        for (let i = 0; i < sideCount; i++) {
            context.fillStyle = 'black';
            context.fillRect(startX + BLOCK_SIZE * (i + 1), startY + n * (BLOCK_SIZE - 10), pointSize, pointSize);
        }
    }
}

function renderIDI(context: CanvasRenderingContext2D, conf: any) {
    console.log("TRY RENDER", conf)
}

export const RENDERERS: { [key: string]: Renderer } = {
    "HUB": renderHub,
    "IDI": renderIDI
}

interface RenderCoordinates {
    x: number
    y: number
    width: number
    height: number
    pins: { [key: string]: { x: number, y: number } }
}

class RendererController {
    conf: Config;

    modules: { [key: string]: any } = {}

    cordinates


    init() {

    }
}