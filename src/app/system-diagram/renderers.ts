import {Observable} from "rxjs";
import {DiagramConfig, RendererEvent} from "./renderer-data";

const BLOCK_SIZE = 60;
//
// interface Renderer {
//     (context: CanvasRenderingContext2D, conf: any): void
// }
//
// function renderRect(context: CanvasRenderingContext2D, conf: any) {
//     context.fillStyle = 'blue';
//     const startX = 10
//     const startY = 400
//     let sideCount = conf.sideCount;
//     context.fillRect(startX, startY, BLOCK_SIZE * (sideCount + 1), BLOCK_SIZE);
//     const pointSize = 10
//     for (let n = 0; n < 2; n++) {
//         for (let i = 0; i < sideCount; i++) {
//             context.fillStyle = 'black';
//             context.fillRect(startX + BLOCK_SIZE * (i + 1), startY + n * (BLOCK_SIZE - 10), pointSize, pointSize);
//         }
//     }
// }
//
// function renderIDI(context: CanvasRenderingContext2D, conf: any) {
//     console.log("TRY RENDER", conf)
// }
//
// export const RENDERERS: { [key: string]: Renderer } = {
//     "HUB": renderHub,
//     "IDI": renderIDI
// }
//
// class RendererController {
//     conf: Config;
//
//     modules: { [key: string]: any } = {}
//
//     cordinates
//
//
//     init() {
//
//     }
// }


function diagramConfigToStream(config: DiagramConfig): Observable<RendererEvent> {
    return new Observable<RendererEvent>(subscriber => {
        subscriber.next({
            type: "size",
            conf: config.diagramSize
        })

        config.lines.forEach(line => {
            subscriber.next({
                type: "line",
                conf: line
            })
        })

        config.modules.forEach(module => {
            subscriber.next({
                type: "module",
                conf: module
            })
        })

        config.contacts.forEach(contact => {
            subscriber.next({
                type: "contact",
                conf: contact
            })
        })

        config.texts.forEach(text => {
            subscriber.next({
                type: "texts",
                conf: text
            })
        })


    })

}
