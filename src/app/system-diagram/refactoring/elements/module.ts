import {AbstractElement} from "../abstract";
import {ModuleConf} from "../old/loader";
import {RectElement} from "./rect";
import {SIZES_MAP} from "../config";
import {TitlesElement} from "./titles";


export class ModuleElement extends AbstractElement<ModuleConf> {
    constructor(conf: ModuleConf) {
        super()
        this.conf = conf
        let sizes = this.addRect();
        this.addTitles(sizes)
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.drawItems(ctx)
    }

    addTitles(sizes :{ w: number, h: number })  {
        this.elements.push({ element: new TitlesElement({
                exWidth: sizes.w,
                exHeight: sizes.h,
                title: this.conf.title,
                description: this.conf.description
            })})
    }


    addRect(): { w: number, h: number } {
        let conCount = this.conf.width;
        let mWidth = SIZES_MAP[this.conf.len];
        let mHeight = conCount * mWidth + (conCount - 1) * this.theme().gap;
        this.elements.push(
            {

                element: new RectElement({
                    x: 0,
                    y: 0,
                    width: mWidth,
                    height: mHeight,
                    color: this.theme().moduleColor
                })
            }
        )
        return {w: mWidth, h: mHeight};
    }
}