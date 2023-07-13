import {AbstractElement, DrawElement} from "../abstract";
import {PinElement} from "./pin";
import {HubConf} from "../model";
import {RectElement} from "./rect";
import {TitlesElement} from "./titles";

export class HubElement extends AbstractElement<HubConf> {


    constructor(conf: HubConf) {
        super();
        this.conf = conf;
        const v = conf.sideConnectors;
        let sizes = this.addRect();
        this.addTitles(sizes)
        this.addPins()
    }


    draw(ctx: CanvasRenderingContext2D): void {
        super.drawItems(ctx)
    }

    addTitles(sizes: { w: number, h: number }) {
        this.elements.push({
            element: new TitlesElement({
                exWidth: sizes.w,
                exHeight: sizes.h,
                title: this.conf.title,
                description: this.conf.description
            })
        })
    }

    addRect(): { w: number, h: number } {
        let conCount = this.conf.sideConnectors;
        let mWidth = this.theme().moduleWidth;
        let mHeight = conCount * mWidth + (conCount - 1) * this.theme().gap;
        this.elements.push(
            {

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

            let basePin = new PinElement({firstArrow: true, secondArrow: true, width: 2, title: "uic"});
            const leftContact: DrawElement = {
                transform: {
                    x: xPos,
                    y: yPos,
                    angle: 90
                },
                element: basePin
            };
            this.elements.push(leftContact)
            const rightContact: DrawElement = {
                transform: {
                    x: xPos + this.theme().moduleWidth + this.theme().gap,
                    y: yPos,
                    angle: 90
                },
                element: basePin
            };
            this.elements.push(rightContact)
        }
    }
}