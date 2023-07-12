import {BASE_THEME, Theme} from "./config";
import {TextConf, Titles} from "./model";
import {ModuleConf} from "./old/loader";

export interface Element {
    draw(ctx): void

    scale(value: number): number

    theme(): Theme
}

export interface DrawElement {
    element: Element
    transform: { x: number, y: number, angle: number }
}

export abstract class AbstractElement<T> implements Element {
    protected conf: T
    elements: DrawElement[] = []




    abstract draw(ctx): void

    drawItem(ctx,transform,elementDraw){
        ctx.save();
        ctx.translate(transform.x, transform.y);
        ctx.rotate(Math.PI * (transform.angle / 90) / 2);
        ctx.translate(-transform.x, -transform.x);
        elementDraw.element.draw(ctx)
        ctx.restore();
    }

    drawItems(ctx) {
        for (let elementDraw of this.elements) {
            let transform = elementDraw.transform;
            this.drawItem(ctx,transform,elementDraw)
        }
    }

    public scale(value: number): number {
        return value
    }

    theme(): Theme {
        return BASE_THEME;
    }
}


export abstract class TitlesElement<T extends Titles> extends AbstractElement<T> {
    protected width: number;
    protected height: number;


    // genText(rect: any, text: string, fontSize: number, vertical, type: TextType): Text {
    //     const PADD = 1;
    //     let descr = type === TextType.DESCRIPTION ? PADD : 0;
    //     let padding = type === TextType.CONTACT ? 0 : PADD * 2;
    //
    //     return {
    //         point: type === TextType.CONTACT ? {
    //             x: rect.x,
    //             y: rect.y,
    //         } : {
    //             x: rect.x + (vertical ? 3 - descr : PADD),
    //             y: rect.y + 1 + (vertical ? 0 : descr),
    //         },
    //         color: "black",
    //         text,
    //         size: fontSize,
    //         vertical,
    //         bold: !descr,
    //         maxWidth: vertical ? mHeight : mWidth,
    //         maxHeight: vertical ? mWidth : mHeight,
    //     };
    // }

    protected addTexts() {
        let mWidth = this.width - this.theme().padding;
        let mHeight = this.height - this.theme().padding;
        const titleText: TextConf = {
            text: this.conf.title,
            color: this.theme().hubFontColor,
            size: this.theme().titleFontSize,
            bold: true,
            maxWidth: mWidth,
            maxHeight: mHeight,
        }
        this.elements.push(
            {
                transform: {
                    x: 1,
                    y: 1,
                    angle: 0
                },
                element: null //new TextElement(titleText)
            }
        );
    }
}

