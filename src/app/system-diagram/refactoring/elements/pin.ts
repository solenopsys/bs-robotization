import {ContactConf, Point, PolygonConf} from "../model";
import {AbstractElement} from "../abstract";
import {PolygonElement} from "./polygon";

export class PinElement extends AbstractElement<ContactConf> {

    constructor(conf: ContactConf) {
        super();
        this.conf = conf
        this.addPolygon()
    }

    draw(ctx): void {
        this.drawItems(ctx)
    }

    addPolygon(){
        const half = 1 / 2
        const contact = this.conf
        const startPoint = {x: half, y: 0}
        const endPoint = {x: half+contact.width, y: 0}

        const topPoints = [
            startPoint,
            endPoint
        ]

        const bottomPoints = [
            {x: endPoint.x, y: endPoint.y+1},
            {x: startPoint.x, y: startPoint.y+1}]

        let rightArrow = contact.secondArrow ? [{x: endPoint.x + half, y: endPoint.y + half}] : [];
        let leftArrow = contact.firstArrow ? [{x: startPoint.x - half, y: startPoint.y + half}] : [];

        const points= [
            ...topPoints,
            ...rightArrow,
            ...bottomPoints,
            ...leftArrow
        ];

        let polygonConf:PolygonConf = {points };
        let polygonElement = new PolygonElement(polygonConf);
        this.elements.push({element: polygonElement, transform: {x: 0, y: 0, angle: 0}})
    }


}
