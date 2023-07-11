import {BladeConfig, HubConf, ModuleConf} from "./diagram-data";
import {DiagramConfig, Rect, Text} from "./renderer-data";

const moduleColor: string = "#D9D9D9";


const SIZES_MAP: { [key: string]: number } = {
    "XS": 2,
    "S": 4,
    "M": 8,
    "L": 16,
    "XL": 32,
    "XXL": 64,
}

export const STANDARD_WIDTH = 4;
export const STANDARD_GAP = 2;
export const PADDING = 6;


function hubTransform(hub: HubConf, x: number, y: number): Rect {
    return {
        x,
        y,
        width: STANDARD_WIDTH,
        height: hub.sideConnectors * STANDARD_WIDTH + (hub.sideConnectors - 1) * STANDARD_GAP,
        color: moduleColor
    }
}

function modTransform(mod: ModuleConf, xHub: number, y: number, right: boolean): Rect {

    let moduleWidth = SIZES_MAP[mod.len];
    return {
        x: right ? xHub + STANDARD_WIDTH + STANDARD_GAP : xHub - moduleWidth - STANDARD_GAP,
        y,
        width: moduleWidth,
        height: mod.width * STANDARD_WIDTH + (mod.width - 1) * STANDARD_GAP,
        color: moduleColor
    }
}

function findMaxWidth(modules: ModuleConf[]): number {
    let mx = 0;
    modules.forEach((mod) => {
        if (mod) {
            const curW = SIZES_MAP[mod.len]
            if (curW > mx) {
                mx = curW;
            }
        }
    });
    return mx;
}

function genText(rect: Rect, text: string, fontSize: number, vertical, description: boolean,oneLine:boolean): Text {
    let descr = description ? 1 : 0;
    let mWidth = rect.width - 2;
    let mHeight = rect.height - 2;
    return {
        point: {
            x: rect.x + (vertical ? 3-descr: 1),
            y: rect.y + 1+(vertical ? 0: descr)  ,
        },
        color: "black",
        text,
        size: fontSize,
        vertical,
        bold: !descr,
        maxWidth: vertical?mHeight:mWidth,
        maxHeight: vertical?mWidth:mHeight,
    };
}

export function transformData(conf: BladeConfig): DiagramConfig {

    let modules: Rect[] = [];
    let texts: Text[] = [];

    const leftMax = findMaxWidth(conf.leftIdiModules);
    const rightMax = findMaxWidth(conf.rightIdiModules);
    let hubsHeight = 0;
    let hubsCount = 0;

    let xHub = leftMax + PADDING + STANDARD_GAP;

    const fontSize = 10;

    conf.hubs.forEach((hub, index) => {
        let rect = hubTransform(hub, xHub, PADDING + hubsHeight);
        modules.push(rect);
        hubsHeight += rect.height + STANDARD_GAP;
        hubsCount++;

        texts.push(genText(rect, hub.title, fontSize+2, true, false,false))
        texts.push(genText(rect, hub.description, fontSize, true, true,false))
    });

    let leftY = PADDING;
    conf.leftIdiModules.forEach((mod) => {
        if (mod) {
            let rect = mod ? modTransform(mod, xHub, leftY, false) : null;
            leftY = leftY + rect.height + STANDARD_GAP;
            modules.push(rect);
            texts.push(genText(rect, mod.title, fontSize+2, false, false,false))
            texts.push(genText(rect, mod.description, fontSize, false, true,false))

        } else {
            leftY = leftY + STANDARD_WIDTH + STANDARD_GAP;
        }

    });

    let rightY = PADDING;
    conf.rightIdiModules.forEach((mod, index) => {
        if (mod) {
            let rect = mod ? modTransform(mod, xHub, rightY, true) : null;
            rightY = rightY + rect.height + STANDARD_GAP;
            modules.push(rect);

            texts.push(genText(rect, mod.title, fontSize+2, false, false,false))
            texts.push(genText(rect, mod.description, fontSize, false, true,false))
        } else {
            rightY = rightY + STANDARD_WIDTH + STANDARD_GAP;
        }
    });

    return {
        diagramSize: {
            width: leftMax + rightMax + 2 * PADDING + STANDARD_WIDTH,
            height: hubsHeight + (hubsCount - 1) * STANDARD_GAP + 2 * PADDING
        },
        modules,
        lines: [],
        contacts: [],
        texts
    }
}