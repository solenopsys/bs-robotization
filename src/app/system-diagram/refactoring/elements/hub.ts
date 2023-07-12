import {AbstractElement, DrawElement, TitlesElement} from "../abstract";
import {PinElement} from "./pin";
import {HubConf, TextConf} from "../model";
import {RectElement} from "./rect";
import {TextElement} from "./text";

export class HubElement extends TitlesElement<HubConf> {


    constructor(conf: HubConf) {
        super();
        this.conf=conf;
        const v = conf.sideConnectors;
        let sizes = this.addRect();
        this.width = sizes.w;
        this.height = sizes.h;
        this.addPins()
    }

    draw(ctx): void {
        super.drawItems(ctx)
    }

    addRect(): { w: number, h: number } {
        let conCount = this.conf.sideConnectors;
        let mWidth = this.theme().moduleWidth;
        let mHeight = conCount * mWidth + (conCount - 1) * this.theme().gap;
        this.elements.push(
            {
                transform: {
                    x: 0,
                    y: 0,
                    angle: 0
                },
                element: new RectElement({
                    x: 0,
                    y: 0,
                    width: mWidth,
                    height: mHeight,
                    color: this.theme().hubColor
                })
            }
        )
        return {w: mWidth, h: mHeight};
    }


    addPins() {
        for (let i = 0; i < this.conf.sideConnectors; i++) {
            const xPos = 10 //rect.x - 2
            const yPos: number = 20 // rect.y + i * (STANDARD_WIDTH + STANDARD_GAP) - STANDARD_WIDTH + PADDING - 0.5;

            let basePin = new PinElement({firstArrow: true, secondArrow: true, width: 2});
            const leftContact: DrawElement = {
                transform: {
                    x: xPos,
                    y: yPos,
                    angle: 90
                },
                element: {...basePin} as PinElement
            };
            this.elements.push(leftContact)
            const rightContact: DrawElement = {
                transform: {
                    x: xPos + this.theme().moduleWidth + this.theme().gap,
                    y: yPos,
                    angle: 90
                },
                element: {...basePin} as PinElement
            };
            this.elements.push(rightContact)
        }
    }
}