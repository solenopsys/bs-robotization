import {BASE_THEME, Theme} from "./config";
import {TextConf, Titles} from "./model";
import {ModuleConf} from "./old/loader";

export function drawItem(ctx: CanvasRenderingContext2D, elementDraw: DrawElement, gridPith: number) {

    console.log("DRAW ITEM", elementDraw)
    const transform = elementDraw.transform;
    if (transform) {
        ctx.save();
        const x = transform.x * gridPith;
        const y = transform.y * gridPith;
        ctx.translate(x, y);
        ctx.rotate(Math.PI * (transform.angle / 90) / 2);
        ctx.translate(-x, -y);
        elementDraw.element.draw(ctx)
        ctx.restore();
    } else {
        elementDraw.element.draw(ctx)
    }
}

export interface Element {
    draw(ctx: CanvasRenderingContext2D): void

    scale(value: number): number

    theme(): Theme
}

export interface DrawElement {
    element: Element
    transform?: { x: number, y: number, angle: number }
}

export abstract class AbstractElement<T> implements Element {
    protected conf: T
    elements: DrawElement[] = []


    abstract draw(ctx: CanvasRenderingContext2D): void


    drawItems(ctx: CanvasRenderingContext2D) {
        for (let elementDraw of this.elements) {
            drawItem(ctx, elementDraw, this.theme().gridPitch)
        }
    }

    public scale(value: number): number {
        return value * this.theme().gridPitch
    }

    theme(): Theme {
        return BASE_THEME;
    }
}