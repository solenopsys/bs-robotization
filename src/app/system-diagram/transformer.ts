import {BladeConfig, HubConf, ModuleConf} from "./diagram-data";
import {Contact, DiagramConfig, Rect, Text} from "./renderer-data";

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

enum TextType {
    TITLE,
    DESCRIPTION,
    CONTACT,
}

function genText(rect: Rect, text: string, fontSize: number, vertical, type: TextType): Text {
    const PADD=1;
    let descr = type===TextType.DESCRIPTION? PADD : 0;
    let padding = type===TextType.CONTACT ? 0 : PADD*2;
    let mWidth = rect.width - padding;
    let mHeight = rect.height - padding;
    return {
        point: type===TextType.CONTACT? {
            x: rect.x ,
            y: rect.y,
        }: {
            x: rect.x + (vertical ? 3 - descr : PADD),
            y: rect.y + 1 + (vertical ? 0 : descr),
        },
        color: "black",
        text,
        size: fontSize,
        vertical,
        bold: !descr,
        maxWidth: vertical ? mHeight : mWidth,
        maxHeight: vertical ? mWidth : mHeight,
    };
}

export function transformData(conf: BladeConfig): DiagramConfig {

    let modules: Rect[] = [];
    let texts: Text[] = [];
    let contacts: Contact[] = [];

    const leftMax = findMaxWidth(conf.leftIdiModules);
    const rightMax = findMaxWidth(conf.rightIdiModules);
    let hubsHeight = 0;
    let hubsCount = 0;

    let xHub = leftMax + PADDING + STANDARD_GAP;

    const fontSize = 10;


    let leftY = PADDING;
    conf.leftIdiModules.forEach((mod) => {
        if (mod) {
            let rect = mod ? modTransform(mod, xHub, leftY, false) : null;
            leftY = leftY + rect.height + STANDARD_GAP;
            modules.push(rect);
            texts.push(genText(rect, mod.title, fontSize + 2, false, TextType.TITLE))
            texts.push(genText(rect, mod.description, fontSize, false, TextType.DESCRIPTION))
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

            texts.push(genText(rect, mod.title, fontSize + 2, false, TextType.TITLE))
            texts.push(genText(rect, mod.description, fontSize, false, TextType.DESCRIPTION))
        } else {
            rightY = rightY + STANDARD_WIDTH + STANDARD_GAP;
        }
    });

    conf.hubs.forEach((hub, index) => {
        let rect = hubTransform(hub, xHub, PADDING + hubsHeight);
        modules.push(rect);


        for (let i = 0; i < hub.sideConnectors; i++) {
            const xPos = rect.x - 2
            const yPos: number = rect.y + i * (STANDARD_WIDTH + STANDARD_GAP) - STANDARD_WIDTH + PADDING - 0.5;

            const leftPoint: Contact = {
                first: {
                    x: xPos,
                    y: yPos
                },
                second: {
                    x: xPos + STANDARD_GAP,
                    y: yPos
                },
                firstArrow: true,
                secondArrow: true,
            };
            contacts.push(leftPoint)
           // texts.push(genText(rect, "blabla", fontSize , false, TextType.CONTACT))


            const rightPoint: Contact = {
                first: {
                    x: xPos + STANDARD_WIDTH + STANDARD_GAP,
                    y: yPos
                },
                second: {
                    x: xPos + STANDARD_GAP + STANDARD_WIDTH + STANDARD_GAP,
                    y: yPos
                },
                firstArrow: true,
                secondArrow: true,
            };
            contacts.push(rightPoint)

        }


        hubsHeight += rect.height + STANDARD_GAP;
        hubsCount++;

        texts.push(genText(rect, hub.title, fontSize + 2, true, TextType.TITLE))
        texts.push(genText(rect, hub.description, fontSize, true, TextType.DESCRIPTION))
    });


    return {
        diagramSize: {
            width: leftMax + rightMax + 2 * PADDING + STANDARD_WIDTH,
            height: hubsHeight + (hubsCount - 1) * STANDARD_GAP + 2 * PADDING
        },
        modules,
        lines: [],
        contacts,
        texts
    }
}